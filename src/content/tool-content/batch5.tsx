import type { ToolArticle } from './index'

export const batch5: Record<string, ToolArticle> = {
  'json-to-xml': {
    body: (
      <>
        <h2>Mapping JSON into XML markup</h2>
        <p>
          JSON and XML both describe structured data, but they disagree on the
          basics. JSON has objects, arrays, numbers, booleans, and null. XML has
          only elements, attributes, and text, with no native idea of a list or a
          number type. A JSON-to-XML conversion has to invent conventions to
          bridge that gap, which is why two converters rarely produce identical
          output from the same input.
        </p>
        <h3>When this comes up</h3>
        <p>
          You usually need it when a modern service speaks JSON but has to feed a
          legacy consumer: a SOAP endpoint, an enterprise message bus, an older
          bank or government API, or an XSLT pipeline that only understands XML.
          Config migration is another case, moving a settings file into a toolset
          that expects XML.
        </p>
        <h3>Example</h3>
        <p>JSON input:</p>
        <pre><code>{`{
  "book": {
    "id": 7,
    "tags": ["sci-fi", "classic"]
  }
}`}</code></pre>
        <p>A common XML rendering:</p>
        <pre><code>{`<book>
  <id>7</id>
  <tags>sci-fi</tags>
  <tags>classic</tags>
</book>`}</code></pre>
        <h3>Where the mapping gets awkward</h3>
        <p>
          Arrays are the first headache. JSON says &quot;two tags&quot;; XML just
          repeats the element, so you lose the explicit grouping unless you wrap
          it in a parent like <code>{'<tags>'}</code>. Keys that start with a
          digit or contain spaces are not legal XML element names and must be
          escaped or rejected. And since everything becomes text, the number 7
          and the string &quot;7&quot; look the same once converted, so type
          information is gone unless you add attributes to carry it.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What happens to a top-level array?</strong> XML needs exactly
          one root element, so an array at the top must be wrapped in a synthetic
          root like <code>{'<root>'}</code> before each item is emitted.
        </p>
        <p>
          <strong>How is null represented?</strong> There is no standard. Some
          converters emit an empty element, others add{' '}
          <code>xsi:nil=&quot;true&quot;</code>. Decide with the consumer so an
          empty tag is not misread as an empty string.
        </p>
        <p>
          <strong>Can I get the JSON back later?</strong> Not losslessly through
          a naive round trip, since repeated elements and dropped types do not
          reconstruct cleanly. The{' '}
          <a href="/tools/xml-to-json">XML to JSON</a> tool handles the reverse
          with its own set of conventions.
        </p>
      </>
    ),
  },

  'xml-to-json': {
    body: (
      <>
        <h2>Turning markup into objects</h2>
        <p>
          XML carries three kinds of information: element nesting, attributes on
          those elements, and the text between tags. JSON has no attributes, so a
          converter must fold them in somehow, typically into special keys. The
          choices a tool makes here define how usable the result is in your code.
        </p>
        <h3>The attribute problem</h3>
        <p>
          A common convention prefixes attributes with <code>@</code> and stores
          text under a key like <code>#text</code>. That keeps everything but
          makes the shape verbose. Other tools drop attributes entirely or merge
          them with child elements, which is simpler to read but silently loses
          data. Knowing which strategy your converter uses matters before you
          build code against the output.
        </p>
        <h3>Example</h3>
        <p>XML input:</p>
        <pre><code>{`<user id="42" active="true">
  <name>Ada</name>
</user>`}</code></pre>
        <p>JSON with attributes preserved:</p>
        <pre><code>{`{
  "user": {
    "@id": "42",
    "@active": "true",
    "name": "Ada"
  }
}`}</code></pre>
        <h3>Single child versus list</h3>
        <p>
          The trickiest edge case: one <code>{'<item>'}</code> becomes an object,
          but two <code>{'<item>'}</code> elements become an array. Code that
          assumes an array breaks the moment a document happens to contain a
          single item. If you control the schema, force arrays consistently; if
          you do not, write parsing that tolerates both shapes.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my number a string?</strong> XML text has no type, so{' '}
          <code>42</code> comes out as <code>&quot;42&quot;</code>. You have to
          cast it yourself after conversion.
        </p>
        <p>
          <strong>What about namespaces?</strong> Prefixes like{' '}
          <code>ns:tag</code> usually survive as part of the key name, colon and
          all, which can be awkward in JavaScript where you then need bracket
          access. Going the other direction is handled by{' '}
          <a href="/tools/json-to-xml">JSON to XML</a>.
        </p>
      </>
    ),
  },

  'json-to-go': {
    body: (
      <>
        <h2>From sample JSON to typed Go structs</h2>
        <p>
          Go has no dynamic maps-of-anything that are pleasant to work with, so
          decoding JSON idiomatically means defining a struct with field types
          and <code>json:</code> tags. Writing those by hand for a large payload
          is tedious and error prone. A generator reads one representative sample
          and infers the struct layout, including nested types for objects and
          slices for arrays.
        </p>
        <h3>Example</h3>
        <p>Input:</p>
        <pre><code>{`{ "user_id": 7, "name": "Ada", "tags": ["a"] }`}</code></pre>
        <p>Generated Go:</p>
        <pre><code>{`type AutoGenerated struct {
	UserID int      \`json:"user_id"\`
	Name   string   \`json:"name"\`
	Tags   []string \`json:"tags"\`
}`}</code></pre>
        <p>
          Note how <code>user_id</code> becomes the exported field{' '}
          <code>UserID</code> while the tag keeps the original snake_case key.
          Exported (capitalized) fields are required or{' '}
          <code>encoding/json</code> cannot populate them.
        </p>
        <h3>Pitfalls the sample cannot show</h3>
        <p>
          Inference only knows what is in the sample. A field that is{' '}
          <code>null</code> or absent in your example gives the generator nothing
          to work with, so it may guess <code>interface{}</code> or omit the
          field. Numbers are the other trap: JSON has one number type, so{' '}
          <code>1</code> infers as <code>int</code> even when the real data later
          contains <code>1.5</code>. If a field can be fractional, widen it to{' '}
          <code>float64</code> by hand.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Should I add omitempty?</strong> Add it to fields that are
          optional on output so Go skips zero values during marshaling. The
          generator cannot know your intent, so this is a manual pass.
        </p>
        <p>
          <strong>How do I handle a field that is sometimes a string and
          sometimes a number?</strong> Mixed-type JSON forces{' '}
          <code>json.RawMessage</code> or a custom <code>UnmarshalJSON</code>.
          Generators flag these as <code>interface{}</code> at best.
        </p>
        <p>
          <strong>What about Python or Rust?</strong> See{' '}
          <a href="/tools/json-to-python">JSON to Python</a> and{' '}
          <a href="/tools/json-to-rust">JSON to Rust</a> for the same idea in
          other languages.
        </p>
      </>
    ),
  },

  'json-to-python': {
    body: (
      <>
        <h2>Generating dataclasses from JSON</h2>
        <p>
          Python can parse JSON into dicts with one call, but a dict gives you no
          autocomplete, no type checking, and no clear contract. A dataclass with
          type hints turns a loose payload into a documented structure your
          editor and type checker understand. This tool reads a sample and emits
          those classes, nesting a new class for each nested object.
        </p>
        <h3>Example</h3>
        <p>Input:</p>
        <pre><code>{`{ "id": 7, "name": "Ada", "scores": [9.5, 8.0] }`}</code></pre>
        <p>Generated dataclass:</p>
        <pre><code>{`from dataclasses import dataclass

@dataclass
class Root:
    id: int
    name: str
    scores: list[float]`}</code></pre>
        <h3>Hints are not enforcement</h3>
        <p>
          A frequent misunderstanding: type hints do not validate anything at
          runtime. If the JSON delivers a string where you annotated{' '}
          <code>int</code>, the dataclass will happily hold it. The hints help
          your tooling, not your runtime. For actual validation you want a library
          like Pydantic or a schema check; see the{' '}
          <a href="/tools/json-schema-validator">JSON Schema validator</a>.
        </p>
        <h3>Optional and null fields</h3>
        <p>
          A value that appears as <code>null</code> in the sample should become{' '}
          <code>Optional[...]</code> (or <code>X | None</code>). Generators often
          infer the non-null type and miss this, so fields that can be absent
          need a default of <code>None</code> added by hand, or construction will
          raise when the key is missing.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why list[float] when my sample had an int?</strong> If any
          element is fractional the whole list widens to float. A sample of all
          whole numbers would instead infer <code>list[int]</code>, which may be
          wrong for real data.
        </p>
        <p>
          <strong>Can I nest classes?</strong> Yes. Each nested object becomes
          its own dataclass, referenced by name from the parent, which keeps the
          structure readable instead of one giant flat class.
        </p>
        <p>
          <strong>Does field order matter?</strong> Dataclass fields with
          defaults must come after fields without them, so adding{' '}
          <code>Optional</code> defaults can force a reordering.
        </p>
      </>
    ),
  },

  'json-to-rust': {
    body: (
      <>
        <h2>Serde structs from a JSON sample</h2>
        <p>
          In Rust, JSON work almost always goes through serde and{' '}
          <code>serde_json</code>. That means defining structs that derive{' '}
          <code>Deserialize</code> (and often <code>Serialize</code>) with field
          names that match the JSON. This generator reads a sample and produces
          those structs, adding <code>#[serde(rename)]</code> when a JSON key is
          not a valid Rust identifier.
        </p>
        <h3>Example</h3>
        <p>Input:</p>
        <pre><code>{`{ "userId": 7, "name": "Ada", "verified": true }`}</code></pre>
        <p>Generated Rust:</p>
        <pre><code>{`use serde::Deserialize;

#[derive(Deserialize)]
struct Root {
    #[serde(rename = "userId")]
    user_id: i64,
    name: String,
    verified: bool,
}`}</code></pre>
        <p>
          Rust convention is snake_case fields, so <code>userId</code> maps to{' '}
          <code>user_id</code> with a rename. For a whole payload in camelCase,{' '}
          <code>#[serde(rename_all = &quot;camelCase&quot;)]</code> on the struct
          is cleaner than one rename per field.
        </p>
        <h3>Ownership and optionality decisions</h3>
        <p>
          The generator defaults to owned types like <code>String</code>, which
          is the right call for deserialization since the data must be owned
          somewhere. The real manual work is optionality: a field that may be
          missing needs <code>Option&lt;T&gt;</code>, otherwise serde errors on
          absent keys. Integers default to <code>i64</code> to be safe, but a
          value that can exceed that range needs <code>u64</code> or a bignum
          type.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why i64 instead of i32?</strong> JSON does not bound integer
          size, so a wide default avoids overflow on deserialize. Narrow it only
          if you know the range.
        </p>
        <p>
          <strong>How do I handle fields that may be absent?</strong> Wrap them
          in <code>Option</code> and add{' '}
          <code>#[serde(default)]</code> so missing keys deserialize to{' '}
          <code>None</code> rather than failing.
        </p>
        <p>
          <strong>What about an untagged union?</strong> A field that is one of
          several shapes maps to a serde <code>enum</code> with{' '}
          <code>#[serde(untagged)]</code>, which a sample-based generator cannot
          infer on its own.
        </p>
      </>
    ),
  },

  'json-to-jsonschema': {
    body: (
      <>
        <h2>Inferring a schema from data</h2>
        <p>
          A JSON Schema describes the shape data is allowed to take: which keys
          exist, their types, which are required. Writing one from scratch is
          slow, so inferring a draft from a sample document gives you a starting
          point. This tool walks a sample and produces a Draft-07 schema you then
          tighten by hand.
        </p>
        <h3>Example</h3>
        <p>Sample input:</p>
        <pre><code>{`{ "id": 7, "name": "Ada" }`}</code></pre>
        <p>Inferred schema:</p>
        <pre><code>{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" }
  },
  "required": ["id", "name"]
}`}</code></pre>
        <h3>Inference is a draft, not an answer</h3>
        <p>
          One sample cannot reveal which fields are truly optional. The tool
          marks every key it sees as required, which is almost always too strict
          for real data. It also cannot know your intended constraints: string
          length, number ranges, enums, or formats like email and date-time. Add
          those yourself. Treat the output as scaffolding, then prune the{' '}
          <code>required</code> array and add validation keywords.
        </p>
        <h3>Arrays with mixed items</h3>
        <p>
          For an array, inference looks at the elements and generalizes. A list
          of objects with slightly different keys may produce a loose{' '}
          <code>items</code> schema that accepts more than you intend. Feed it a
          sample that covers the real variety, or merge several samples before
          inferring.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is everything required?</strong> The tool only sees what is
          present, so it assumes presence is mandatory. Remove keys that can be
          omitted from the <code>required</code> list.
        </p>
        <p>
          <strong>Can I validate against the result?</strong> Yes, feed the
          schema and some data to the{' '}
          <a href="/tools/json-schema-validator">JSON Schema validator</a> to
          confirm it accepts and rejects the right documents.
        </p>
      </>
    ),
  },

  'json-schema-validator': {
    body: (
      <>
        <h2>Checking data against a contract</h2>
        <p>
          A validator takes two inputs, a JSON Schema and a JSON document, and
          reports whether the document satisfies the schema. Unlike a formatter
          that only checks syntax, this checks meaning: correct types, required
          keys present, values inside their allowed ranges, strings matching their
          patterns. When something fails, a good validator points at the exact
          path that broke the rule.
        </p>
        <h3>Example</h3>
        <p>Schema requires an integer <code>age</code>:</p>
        <pre><code>{`{
  "type": "object",
  "properties": { "age": { "type": "integer", "minimum": 0 } },
  "required": ["age"]
}`}</code></pre>
        <p>Data that fails:</p>
        <pre><code>{`{ "age": -3 }
Error at /age: -3 is less than minimum 0`}</code></pre>
        <h3>Why path-based errors matter</h3>
        <p>
          In a deeply nested payload, &quot;validation failed&quot; is useless.
          The value of a validator is the pointer, something like{' '}
          <code>/items/2/price</code>, telling you the third item&apos;s price is
          wrong. That turns a guessing game into a one-line fix. Draft-07 uses
          JSON Pointer syntax for these paths.
        </p>
        <h3>Gotchas that surprise people</h3>
        <p>
          By default, extra properties not listed in the schema are allowed; you
          must set <code>additionalProperties: false</code> to reject them. The{' '}
          <code>integer</code> type rejects <code>1.0</code> in some
          implementations and accepts it in others depending on how the number
          was parsed. And a <code>null</code> is not the same as a missing key, a
          nullable field needs <code>type</code> to include{' '}
          <code>&quot;null&quot;</code>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my extra field pass?</strong> Schemas are permissive by
          default. Add <code>additionalProperties: false</code> to forbid
          unlisted keys.
        </p>
        <p>
          <strong>Where do I get a schema to start from?</strong> Infer one from
          a sample with <a href="/tools/json-to-jsonschema">JSON to JSON
          Schema</a>, then tighten the rules before validating.
        </p>
      </>
    ),
  },

  'json-diff': {
    body: (
      <>
        <h2>Comparing two JSON documents</h2>
        <p>
          A text diff of JSON is noisy: reorder two keys or change indentation
          and every line looks changed even though the data is identical. A
          structural diff parses both sides and compares the actual values, then
          reports three things, keys added, keys removed, and values that
          changed, independent of formatting or key order.
        </p>
        <h3>Example</h3>
        <p>Old versus new:</p>
        <pre><code>{`old: { "name": "Ada", "role": "dev" }
new: { "name": "Ada", "role": "lead", "team": "core" }

~ role: "dev" -> "lead"
+ team: "core"`}</code></pre>
        <p>
          The <code>~</code> marks a changed value, <code>+</code> an addition. A
          removal would show as <code>-</code>. Because it compares parsed data,
          swapping the order of <code>name</code> and <code>role</code> produces
          no diff at all.
        </p>
        <h3>Where arrays complicate things</h3>
        <p>
          Objects compare by key, which is unambiguous. Arrays compare by
          position, which is not. Insert one element at the front of a list and a
          naive diff reports every following element as changed, even though they
          only shifted. Some tools try to match array elements by identity or a
          key field; most compare index by index, so be skeptical of large array
          diffs.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does key order ever matter?</strong> For comparison, no, two
          objects with the same keys are equal regardless of order. If order
          matters in your system, normalize first with{' '}
          <a href="/tools/json-sort-keys">JSON Sort Keys</a> so a plain text diff
          becomes meaningful too.
        </p>
        <p>
          <strong>How are types handled?</strong> <code>7</code> and{' '}
          <code>&quot;7&quot;</code> are different, a number versus a string, so a
          type change is reported as a changed value.
        </p>
        <p>
          <strong>Is null equal to a missing key?</strong> No. A key present with
          value <code>null</code> differs from a key that is absent, and a good
          diff distinguishes the two.
        </p>
      </>
    ),
  },

  'json-query': {
    body: (
      <>
        <h2>Pulling values out by path</h2>
        <p>
          When you only need one field buried in a large response, parsing the
          whole thing in code is overkill. A path query lets you address a value
          directly: dot notation to step into objects, bracket indexes to reach
          array elements, and wildcards to collect many matches at once. It is the
          read side of JSON, no mutation, just extraction.
        </p>
        <h3>Example</h3>
        <p>Given this data:</p>
        <pre><code>{`{
  "users": [
    { "name": "Ada", "roles": ["dev"] },
    { "name": "Lin", "roles": ["lead", "dev"] }
  ]
}`}</code></pre>
        <p>Queries and results:</p>
        <pre><code>{`users[0].name      -> "Ada"
users[1].roles[0]  -> "lead"
users[*].name      -> ["Ada", "Lin"]`}</code></pre>
        <h3>Dot paths versus the real thing</h3>
        <p>
          Simple dot-and-bracket paths cover most needs, but they are not JSONPath
          or jq. There is no filtering (&quot;users where role is lead&quot;), no
          arithmetic, no recursion into unknown depth beyond a wildcard. If your
          selection needs conditions, you have outgrown dot paths and want a full
          query language. Knowing that boundary saves time fighting a tool that
          cannot do what you need.
        </p>
        <h3>Keys that break dot notation</h3>
        <p>
          A key with a dot or space in its name, like{' '}
          <code>&quot;user.name&quot;</code>, cannot be reached with plain dot
          syntax because the dot is read as a step. Those keys need bracket
          access, and some tools do not support quoted bracket keys at all, which
          is a hard wall worth checking before you rely on it.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What does a wildcard return?</strong> An array of every match,
          even if there is only one. Code consuming it should expect a list, not
          a single value.
        </p>
        <p>
          <strong>What if the path does not exist?</strong> Most tools return
          nothing or <code>undefined</code> rather than erroring, so a silent
          empty result usually means a typo in the path or a wrong index.
        </p>
      </>
    ),
  },

  'json-sort-keys': {
    body: (
      <>
        <h2>Deterministic key ordering</h2>
        <p>
          JSON objects have no required key order, so the same data can serialize
          a dozen different ways. Sorting keys alphabetically, recursively through
          every nested object, forces a single canonical layout. The data does
          not change; only the order of keys within each object does.
        </p>
        <h3>Why canonical order helps</h3>
        <p>
          The main payoff is clean diffs. If two tools or two runs emit the same
          data with different key orders, a line-based diff lights up with false
          changes. Sort both first and the diff shows only real differences. The
          same trick stabilizes snapshot tests and makes config files in version
          control change only when the data actually changes.
        </p>
        <h3>Example</h3>
        <p>Before:</p>
        <pre><code>{`{ "name": "Ada", "id": 7, "meta": { "z": 1, "a": 2 } }`}</code></pre>
        <p>After recursive sort:</p>
        <pre><code>{`{
  "id": 7,
  "meta": { "a": 2, "z": 1 },
  "name": "Ada"
}`}</code></pre>
        <p>
          Notice the sort reaches into <code>meta</code> too, reordering its keys
          as well as the top level.
        </p>
        <h3>When not to sort</h3>
        <p>
          Arrays are never reordered, their order is data, not presentation.
          Also, a few formats lean on object key order to mean something, and some
          tools emit keys in a deliberate sequence for readability. Sorting those
          loses intent. If order carries meaning in your system, leave it alone.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How are numbers in keys sorted?</strong> As strings, not
          numerically, so <code>&quot;10&quot;</code> sorts before{' '}
          <code>&quot;2&quot;</code>. That surprises people expecting numeric
          order.
        </p>
        <p>
          <strong>Does sorting change values?</strong> No, only key order. For
          comparing two documents regardless of order, the{' '}
          <a href="/tools/json-diff">JSON Diff</a> tool ignores order outright.
        </p>
        <p>
          <strong>Is the sort case-sensitive?</strong> Usually yes, so uppercase
          keys sort before lowercase ones under standard character ordering.
        </p>
      </>
    ),
  },

  'json-tree-viewer': {
    body: (
      <>
        <h2>Seeing structure instead of text</h2>
        <p>
          A big JSON blob is hard to navigate as a wall of text. A tree viewer
          renders it as a hierarchy of collapsible nodes, so you can fold away
          branches you do not care about and drill into the one you do. It turns
          &quot;where is that field&quot; from scrolling and counting braces into
          clicking down a path.
        </p>
        <h3>What the view shows you fast</h3>
        <p>
          Nesting depth becomes obvious at a glance, which is exactly what is
          invisible in minified text. You see which keys hold objects, which hold
          arrays, and how long those arrays are, without parsing brackets in your
          head. Collapsing the top level and expanding one branch at a time is the
          quickest way to understand an unfamiliar API response.
        </p>
        <h3>Example</h3>
        <p>This structure:</p>
        <pre><code>{`{
  "order": {
    "id": 7,
    "items": [ { "sku": "A1" }, { "sku": "B2" } ]
  }
}`}</code></pre>
        <p>renders as a tree like:</p>
        <pre><code>{`▾ order
    id: 7
  ▾ items [2]
    ▸ 0
    ▸ 1`}</code></pre>
        <p>
          The <code>[2]</code> next to <code>items</code> tells you the array
          length before you expand it, and each item collapses on its own.
        </p>
        <h3>Practical limits</h3>
        <p>
          Rendering thousands of nodes at once can bog a browser down, so very
          large documents may need you to collapse aggressively or query a slice
          first. For pulling a specific value rather than browsing, the{' '}
          <a href="/tools/json-query">JSON Query</a> tool is faster.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I edit in the tree?</strong> A viewer is read-only by
          design, meant for inspection. Editing is a separate concern handled by a
          formatter or editor.
        </p>
        <p>
          <strong>Does it validate my JSON?</strong> It must parse the input to
          build the tree, so invalid JSON will not render and the error points you
          to the syntax problem.
        </p>
      </>
    ),
  },

  'json-payload-tester': {
    body: (
      <>
        <h2>Measuring a payload, not just parsing it</h2>
        <p>
          Beyond &quot;is this valid JSON,&quot; you often need to know how big
          and how deep a payload is. This tool parses the input and reports
          metrics: total byte size, number of keys, and maximum nesting depth.
          Those numbers matter when a payload is about to cross a limit you care
          about.
        </p>
        <h3>Why size and depth are not academic</h3>
        <p>
          API gateways cap request bodies (commonly a few megabytes), message
          queues cap individual messages, and some databases cap document size.
          Nesting depth matters too: many parsers refuse documents deeper than a
          set limit to prevent stack-exhaustion attacks, so a deeply nested
          payload can be rejected even when it is small. Key count hints at
          serialization cost and at payloads that have grown unwieldy.
        </p>
        <h3>Example</h3>
        <pre><code>{`Input:
{ "a": { "b": { "c": [1, 2, 3] } } }

Size:        36 bytes
Keys:        3
Max depth:   4   (object > object > object > array)`}</code></pre>
        <p>
          Depth counts each level of nesting, so three nested objects plus the
          array inside reach a depth of four.
        </p>
        <h3>Byte size versus character count</h3>
        <p>
          A common slip: size in bytes is not the same as the number of
          characters when the content includes non-ASCII text. A single emoji or
          accented letter is one character but several UTF-8 bytes, so a payload
          can be under your character budget yet over the byte limit the gateway
          enforces. Always measure the bytes you actually send.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does whitespace count toward size?</strong> Yes, if you send
          formatted JSON. Minify before measuring if the wire payload will be
          compact.
        </p>
        <p>
          <strong>What counts as one key?</strong> Each key in each object,
          including nested ones. Array elements are not keys, which is why a long
          array can be large yet have a low key count.
        </p>
      </>
    ),
  },

  'js-object-to-json': {
    body: (
      <>
        <h2>Object literals are not JSON</h2>
        <p>
          A JavaScript object literal and a JSON document look similar but follow
          different rules. JS lets you write unquoted keys, single quotes,
          trailing commas, comments, and values like <code>undefined</code>. JSON
          allows none of that. This tool rewrites a JS object into strict JSON so
          it can be stored, sent over the wire, or fed to a parser that only
          accepts the standard.
        </p>
        <h3>Example</h3>
        <p>JS input:</p>
        <pre><code>{`{
  name: 'Ada',      // unquoted key, single quotes
  tags: ['x', 'y',], // trailing comma
}`}</code></pre>
        <p>Valid JSON output:</p>
        <pre><code>{`{
  "name": "Ada",
  "tags": ["x", "y"]
}`}</code></pre>
        <p>
          Keys get double-quoted, string quotes switch to double, the trailing
          comma is dropped, and the comment is removed.
        </p>
        <h3>Values with no JSON equivalent</h3>
        <p>
          Some JS values simply cannot be represented. <code>undefined</code>,
          functions, and symbols have no JSON form, mirroring how{' '}
          <code>JSON.stringify</code> drops them. <code>NaN</code> and{' '}
          <code>Infinity</code> are not valid JSON numbers either and usually
          become <code>null</code> or an error. If your object relies on those,
          the conversion is lossy by necessity.
        </p>
        <h3>A note on safety</h3>
        <p>
          Converting by actually executing the input with <code>eval</code> is
          dangerous, since a crafted literal can run arbitrary code. A sound
          converter parses the text rather than evaluating it, so paste from
          untrusted sources with that in mind.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my function property disappear?</strong> JSON has no
          function type, so methods are dropped, exactly as{' '}
          <code>JSON.stringify</code> would.
        </p>
        <p>
          <strong>What about dates?</strong> A <code>Date</code> has no JSON
          literal; it typically serializes to an ISO string. Reconstructing it is
          on the consumer.
        </p>
        <p>
          <strong>Can I go the other way?</strong> JSON is already valid JS, so
          round-tripping is one-way interesting; use a{' '}
          <a href="/tools/json-formatter">JSON formatter</a> to tidy the result.
        </p>
      </>
    ),
  },

  'csv-viewer': {
    body: (
      <>
        <h2>CSV as a table you can sort</h2>
        <p>
          Raw CSV is a stream of commas and newlines that is hard to read past a
          few rows. A viewer parses it into a real table with a header row and
          sortable columns, so you can click a column to order by it and actually
          see your data. No spreadsheet app, no import step, just paste and read.
        </p>
        <h3>The quoting rules that trip parsers</h3>
        <p>
          CSV looks trivial until a field contains a comma. The rule: wrap such a
          field in double quotes. A field with a quote inside doubles it. And a
          field can even contain a newline if it is quoted, which breaks any
          naive split-on-newline approach. A correct viewer honors all three, so
          an address with a comma stays in one cell.
        </p>
        <h3>Example</h3>
        <pre><code>{`name,note
Ada,"Hello, world"
Lin,"Line one
Line two"`}</code></pre>
        <p>
          This is two data rows. The first note holds a comma, the second holds a
          newline, both protected by the surrounding quotes rather than ending the
          field.
        </p>
        <h3>Sorting is display, not data</h3>
        <p>
          Clicking a column reorders what you see, it does not change the
          underlying rows or their original order. Watch for numeric columns
          sorted as text, where <code>10</code> lands before <code>2</code>; a
          good viewer detects numbers and sorts them numerically. Mixed columns
          (numbers and blanks) are where sort order gets ambiguous.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What if my file uses semicolons?</strong> Some locales export
          with <code>;</code> as the separator because the comma is a decimal
          mark. The viewer needs to detect or let you set the delimiter.
        </p>
        <p>
          <strong>Is the first row always a header?</strong> By convention yes,
          but CSV does not mark it. If your data has no header, the first row of
          values will be misread as column names.
        </p>
      </>
    ),
  },

  'toml-to-json': {
    body: (
      <>
        <h2>Config in TOML, data in JSON</h2>
        <p>
          TOML is a configuration format built to be obvious to read and write by
          hand, used by Cargo, pyproject, and many tools. JSON is what programs
          prefer to consume. Converting TOML to JSON lets a config written for
          humans feed a pipeline that expects JSON, or lets you inspect how a
          TOML file actually nests.
        </p>
        <h3>How tables become objects</h3>
        <p>
          TOML&apos;s headline feature is tables, written with bracketed headers.
          A header like <code>[server.http]</code> creates nested objects:{' '}
          <code>server</code> containing <code>http</code>. That dotted header is
          the main thing people misread, since it looks flat but produces depth.
        </p>
        <h3>Example</h3>
        <p>TOML input:</p>
        <pre><code>{`title = "App"

[server]
host = "localhost"
port = 8080`}</code></pre>
        <p>JSON output:</p>
        <pre><code>{`{
  "title": "App",
  "server": {
    "host": "localhost",
    "port": 8080
  }
}`}</code></pre>
        <h3>Types TOML has that JSON lacks</h3>
        <p>
          TOML has first-class dates and times, so{' '}
          <code>2024-01-01T00:00:00Z</code> is a real datetime, not a string. JSON
          has no date type, so it becomes a string on conversion and the type
          information is lost. TOML also distinguishes integers from floats
          explicitly, while JSON blurs them into one number type.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What is an array of tables?</strong> The{' '}
          <code>[[products]]</code> syntax repeats a table into a JSON array of
          objects, one per occurrence. It is TOML&apos;s way of writing a list of
          records.
        </p>
        <p>
          <strong>Why did my date become a string?</strong> JSON cannot represent
          a native datetime, so the converter preserves the text but drops the
          type. Parse it back in your code.
        </p>
        <p>
          <strong>Can I convert .env files too?</strong> Different format, use the
          <a href="/tools/env-to-json"> .env to JSON</a> converter for those.
        </p>
      </>
    ),
  },

  'env-to-json': {
    body: (
      <>
        <h2>Bridging .env files and JSON</h2>
        <p>
          A <code>.env</code> file is a flat list of <code>KEY=value</code> lines
          that tools load into environment variables. JSON is structured and
          typed. Converting between them is handy when you want to feed env values
          into a config system that reads JSON, or generate a <code>.env</code>{' '}
          from a settings object. The conversion is simple on the surface and full
          of small traps underneath.
        </p>
        <h3>Example</h3>
        <p>.env input:</p>
        <pre><code>{`# database
DB_HOST=localhost
DB_PORT=5432
DEBUG=true`}</code></pre>
        <p>JSON output:</p>
        <pre><code>{`{
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "DEBUG": "true"
}`}</code></pre>
        <h3>Everything is a string</h3>
        <p>
          The biggest gotcha: environment variables are always strings. Note{' '}
          <code>DB_PORT</code> comes out as <code>&quot;5432&quot;</code>, not the
          number, and <code>DEBUG</code> is the string{' '}
          <code>&quot;true&quot;</code>, not a boolean. That matches how the OS
          actually hands these to your process. If you want typed JSON, you have
          to coerce after converting, and decide which keys are numbers or
          booleans.
        </p>
        <h3>Quotes, comments, and flat keys</h3>
        <p>
          Comment lines starting with <code>#</code> are dropped. Values may be
          quoted to preserve spaces or special characters, and the quotes are
          usually stripped on conversion. Going from JSON back to{' '}
          <code>.env</code> only works cleanly for flat objects, a nested object
          has no natural <code>.env</code> representation and must be flattened
          with a key naming scheme you choose.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How are nested JSON objects handled?</strong> They cannot map
          directly, since <code>.env</code> is flat. You either flatten keys like{' '}
          <code>DB_HOST</code> or JSON-encode the value into a single string.
        </p>
        <p>
          <strong>Are secrets safe to paste?</strong> <code>.env</code> files
          routinely hold credentials, so avoid pasting production secrets into any
          external tool and prefer a placeholder sample.
        </p>
      </>
    ),
  },

  'querystring-json': {
    body: (
      <>
        <h2>Query strings as objects</h2>
        <p>
          A URL query string packs key-value pairs after the <code>?</code>,
          separated by <code>&amp;</code>. Turning it into a JSON object makes it
          easy to inspect or build in code, and the reverse lets you assemble a
          query from structured data. The subtleties are all in how edge cases,
          repeats, nesting, and encoding, get handled.
        </p>
        <h3>Example</h3>
        <p>Query string:</p>
        <pre><code>{`?name=Ada&role=dev&role=lead&active=true`}</code></pre>
        <p>As JSON:</p>
        <pre><code>{`{
  "name": "Ada",
  "role": ["dev", "lead"],
  "active": "true"
}`}</code></pre>
        <h3>Repeated keys and types</h3>
        <p>
          The same key twice is the ambiguous part. Here <code>role</code> appears
          twice and collapses into an array, but some parsers keep only the last
          value instead. There is no single standard, so check which behavior your
          tool uses. Also note everything is a string, <code>active</code> is{' '}
          <code>&quot;true&quot;</code>, not a boolean, because query strings carry
          no types.
        </p>
        <h3>Encoding is part of the job</h3>
        <p>
          Values are percent-encoded in the URL, so <code>%20</code> is a space
          and <code>%26</code> is a literal ampersand that is not a separator. A
          correct converter decodes on the way in and re-encodes on the way out,
          otherwise a value containing <code>&amp;</code> silently splits into two
          keys. For the raw encoding mechanics, see the{' '}
          <a href="/tools/url-encode-decode">URL encoder</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How is a key with no value treated?</strong> Something like{' '}
          <code>?flag</code> usually becomes an empty string or <code>null</code>,
          depending on the parser, so do not rely on it being a boolean true.
        </p>
        <p>
          <strong>Can I nest objects in a query string?</strong> Only through
          conventions like <code>a[b]=1</code>, which some libraries expand into
          nested JSON and others leave as a literal key. It is not part of the
          core spec.
        </p>
      </>
    ),
  },

  'markdown-to-html': {
    body: (
      <>
        <h2>From Markdown to rendered HTML</h2>
        <p>
          Markdown is a shorthand for writing formatted text in plain characters,
          then converting to HTML for display. A converter reads the Markdown
          rules, headings with <code>#</code>, emphasis with asterisks, links in
          brackets, and emits the equivalent tags. It is how READMEs, comments,
          and docs become web pages.
        </p>
        <h3>Example</h3>
        <p>Markdown:</p>
        <pre><code>{`# Title

A paragraph with **bold** and a [link](https://ex.com).

- one
- two`}</code></pre>
        <p>Resulting HTML:</p>
        <pre><code>{`<h1>Title</h1>
<p>A paragraph with <strong>bold</strong> and a
<a href="https://ex.com">link</a>.</p>
<ul><li>one</li><li>two</li></ul>`}</code></pre>
        <h3>Flavors are not one standard</h3>
        <p>
          There is no single Markdown. Original Markdown, CommonMark, and GitHub
          Flavored Markdown differ. Tables, strikethrough, task lists, and
          fenced code with language hints are GFM extensions that plain Markdown
          does not define. Content that renders on GitHub may come out as literal
          text in a stricter parser, which is the most common &quot;why does this
          look wrong&quot; moment.
        </p>
        <h3>The sanitization question</h3>
        <p>
          Markdown allows raw HTML inline, so a document can contain a{' '}
          <code>{'<script>'}</code> tag. If you render untrusted Markdown and pass
          that HTML straight to a page, you have an XSS hole. Any converter
          handling user input must sanitize the output. For the reverse direction,
          see <a href="/tools/html-to-markdown">HTML to Markdown</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why do my single line breaks disappear?</strong> Standard
          Markdown treats a single newline as a space; you need two trailing
          spaces or a blank line to force a break. GFM is more lenient.
        </p>
        <p>
          <strong>How do I get a code block with a language?</strong> Fence it
          with triple backticks and a language name. That is a GFM feature that
          adds a class for syntax highlighting.
        </p>
      </>
    ),
  },

  'html-to-markdown': {
    body: (
      <>
        <h2>Stripping HTML back to Markdown</h2>
        <p>
          Going from HTML to Markdown is lossy by nature: HTML can express far
          more than Markdown can. The converter keeps what maps cleanly, headings,
          paragraphs, links, lists, emphasis, and drops or inlines the rest. It is
          most useful for turning a copied web article or a WYSIWYG export into
          clean, editable text.
        </p>
        <h3>Example</h3>
        <p>HTML input:</p>
        <pre><code>{`<h2>Notes</h2>
<p>See <a href="/x">the docs</a> for <em>details</em>.</p>`}</code></pre>
        <p>Markdown output:</p>
        <pre><code>{`## Notes

See [the docs](/x) for *details*.`}</code></pre>
        <h3>What does not survive</h3>
        <p>
          Styling attributes, class names, inline CSS, and layout elements like{' '}
          <code>{'<div>'}</code> have no Markdown equivalent and are unwrapped or
          removed. Tables convert only if the converter supports the GFM table
          extension; otherwise they fall back to raw HTML or a mangled mess.
          Nested or complex markup, like a list inside a table cell, often comes
          out imperfect and needs a manual pass.
        </p>
        <h3>Whitespace is the quiet enemy</h3>
        <p>
          HTML collapses whitespace and uses tags for structure; Markdown cares
          about blank lines and indentation. Converters frequently produce stray
          blank lines or lose the spacing around inline elements, so the output
          usually benefits from a quick cleanup. Content pasted from word
          processors is especially noisy because of the markup they inject.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is there leftover HTML in my Markdown?</strong> When an
          element has no Markdown form, a good converter keeps the raw HTML rather
          than lose the content, since Markdown permits inline HTML.
        </p>
        <p>
          <strong>Can I round-trip without loss?</strong> No. Convert to Markdown
          and back with <a href="/tools/markdown-to-html">Markdown to HTML</a> and
          you will get valid but simplified HTML, not the original markup.
        </p>
      </>
    ),
  },

  'graphql-formatter': {
    body: (
      <>
        <h2>Consistent GraphQL layout</h2>
        <p>
          A GraphQL formatter re-indents queries, mutations, and schema
          definitions to a consistent style: nested selection sets indented,
          arguments spaced predictably, braces aligned. The operation is not
          changed, only its layout, which makes a hand-written or machine-glued
          query readable and diff-friendly.
        </p>
        <h3>Example</h3>
        <p>Messy input:</p>
        <pre><code>{`query{user(id:7){name posts{title}}}`}</code></pre>
        <p>Formatted:</p>
        <pre><code>{`query {
  user(id: 7) {
    name
    posts {
      title
    }
  }
}`}</code></pre>
        <p>
          The nested <code>posts</code> selection set is indented under{' '}
          <code>user</code>, and the argument <code>id: 7</code> gets a space
          after the colon, matching the convention most GraphQL tooling expects.
        </p>
        <h3>Formatting is not validation</h3>
        <p>
          A formatter checks that the query is syntactically parseable, but it
          does not know your schema. It cannot tell you that <code>posts</code> is
          not a field on <code>User</code> or that an argument type is wrong. Those
          are schema-validation errors a server or a schema-aware linter catches,
          not something indentation can reveal. Treat a clean format as &quot;the
          syntax is sound,&quot; nothing more.
        </p>
        <h3>Fragments and schema SDL</h3>
        <p>
          The same tool typically formats fragment definitions and schema SDL (the
          <code>type</code>, <code>input</code>, and <code>enum</code> blocks).
          Watch directives and multi-line descriptions, which some formatters
          reflow and others leave as-is; if a formatter mangles a triple-quoted
          description, that is usually the cause.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Will it reorder my fields?</strong> No. Field order is
          significant in a GraphQL response, so a formatter preserves it and only
          adjusts whitespace.
        </p>
        <p>
          <strong>Does it strip comments?</strong> GraphQL comments start with{' '}
          <code>#</code>. Good formatters keep them, but some drop them because
          they are not part of the parsed AST, so check before relying on it.
        </p>
      </>
    ),
  },

  'xml-formatter': {
    body: (
      <>
        <h2>Reading and shrinking XML</h2>
        <p>
          An XML formatter does two opposite jobs. Pretty-printing adds
          indentation and line breaks so nested elements are readable.
          Minifying strips that whitespace back out to make the document as small
          as possible for transmission. Neither changes the data, only the
          whitespace between tags.
        </p>
        <h3>Example</h3>
        <p>Minified:</p>
        <pre><code>{`<order id="7"><item>A1</item><item>B2</item></order>`}</code></pre>
        <p>Pretty-printed:</p>
        <pre><code>{`<order id="7">
  <item>A1</item>
  <item>B2</item>
</order>`}</code></pre>
        <h3>The whitespace-is-significant trap</h3>
        <p>
          This is the catch that bites people. In XML, whitespace inside an
          element can be meaningful text content. If an element holds mixed
          content, text and child elements together, reformatting may insert or
          remove spaces that are actually part of the data. For data-only XML
          (configs, API payloads) pretty-printing is safe; for document-style XML
          with prose, it can subtly corrupt content.
        </p>
        <h3>Keeping it well-formed</h3>
        <p>
          A formatter must parse the input first, so it will reject XML that is
          not well-formed: an unclosed tag, mismatched nesting, or an unescaped{' '}
          <code>&amp;</code> that should be <code>&amp;amp;</code>. That makes it a
          quick validity check as a side effect. Entities and{' '}
          <code>CDATA</code> sections are preserved rather than expanded, so your
          escaped characters stay escaped.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my formatter refuse the file?</strong> It is almost
          always a well-formedness error, a stray <code>{'<'}</code>, an unclosed
          tag, or a bad entity. Fix the parse error and it will format.
        </p>
        <p>
          <strong>Does minifying ever break XML?</strong> It can if whitespace
          inside mixed content was significant, so minify data-oriented XML
          freely but be careful with document text.
        </p>
        <p>
          <strong>Can it convert to JSON?</strong> Formatting only touches layout.
          For a structural change, use <a href="/tools/xml-to-json">XML to
          JSON</a>.
        </p>
      </>
    ),
  },
}
