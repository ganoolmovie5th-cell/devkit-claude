import type { ToolArticle } from './index'

export const batch6: Record<string, ToolArticle> = {
  'aes-encrypt': {
    body: (
      <>
        <h2>Symmetric encryption with a passphrase</h2>
        <p>
          AES-256-GCM encrypts text so that only someone holding the same
          passphrase can read it back. AES is the cipher; GCM is the mode that
          bundles in authentication, so decryption fails loudly if a single byte
          of the ciphertext was altered. Because the same key both locks and
          unlocks, this is symmetric encryption. There is no public key here, so
          the passphrase is the entire secret.
        </p>
        <h3>How the passphrase becomes a key</h3>
        <p>
          A passphrase like <code>correct horse</code> is not 256 bits of key
          material on its own. A key-derivation function such as PBKDF2 stretches
          it, mixing in a random salt and running many iterations so that
          guessing is slow. The output is a 32-byte key the cipher can use. The
          salt and iteration count are stored alongside the ciphertext, usually
          not secret, because they are only useful with the passphrase.
        </p>
        <h3>Example</h3>
        <pre><code>{`passphrase + random salt
  -> PBKDF2 (200000 rounds) -> 256-bit key
plaintext + key + random 12-byte nonce
  -> AES-GCM -> ciphertext + 16-byte auth tag

output = salt | nonce | ciphertext | tag  (then Base64)`}</code></pre>
        <h3>The nonce rule that matters most</h3>
        <p>
          GCM demands a unique nonce (also called an IV) for every message
          encrypted under the same key. Reuse a nonce with the same key and GCM
          catastrophically leaks: an attacker can recover the keystream and even
          forge messages. That is why a fresh random nonce is generated per
          encryption and prepended to the output. Never hardcode it.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I recover my text if I forget the passphrase?</strong> No.
          There is no backdoor. The passphrase is the only input that regenerates
          the key, so a lost passphrase means lost data.
        </p>
        <p>
          <strong>Why does decryption say the data is corrupt?</strong> GCM
          verifies the auth tag first. A wrong passphrase, a truncated copy-paste,
          or a modified byte all fail the same check, which is the mode working as
          intended.
        </p>
        <p>
          <strong>Is this strong enough for real secrets?</strong> AES-256-GCM is
          sound, but strength ultimately rests on passphrase quality. A short or
          common phrase can be brute-forced regardless of the cipher.
        </p>
      </>
    ),
  },

  'hmac-generator': {
    body: (
      <>
        <h2>Signing a message with a shared secret</h2>
        <p>
          HMAC produces a short tag that proves two things at once: the message
          was not changed, and it came from someone who knows the secret key. It
          combines a hash function (SHA-256, say) with the key in a specific
          nested construction, which is what separates HMAC from naively hashing
          the key and message together.
        </p>
        <h3>Why not just hash key plus message</h3>
        <p>
          Concatenating <code>key + message</code> and hashing it is vulnerable to
          length-extension attacks on Merkle-Damgard hashes like SHA-256: an
          attacker who sees one valid tag can append data and compute a new valid
          tag without the key. HMAC&apos;s inner and outer padding steps close that
          hole, which is why it is the standard for keyed authentication rather
          than a plain <a href="/tools/hash-generator">hash</a>.
        </p>
        <h3>Example</h3>
        <pre><code>{`HMAC-SHA256(key="s3cr3t", msg="pay=100&to=bob")
= 9f86d081884c7d659a2feaa0c55ad015
  a3bf4f1b2b0b822cd15d6c15b0f00a08  (hex)`}</code></pre>
        <p>
          The receiver recomputes the HMAC with the same key and compares. If the
          message or the key differs by one bit, the tag is completely different.
        </p>
        <h3>Where it shows up</h3>
        <p>
          Webhook providers sign payloads with HMAC so you can confirm a request
          truly came from them. API gateways sign requests to prevent tampering.
          JWTs using HS256 are HMAC under the hood (see the{' '}
          <a href="/tools/jwt-verify">JWT verifier</a>).
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Which hash should I pick?</strong> SHA-256 is the sane default.
          SHA-1 HMAC is still used in legacy systems and is not broken for HMAC
          the way SHA-1 collisions break signatures, but prefer SHA-256+ for new
          work.
        </p>
        <p>
          <strong>Why compare tags with a constant-time check?</strong> A normal
          string compare returns early on the first mismatched byte, leaking
          timing that can reveal the tag byte by byte. Production verifiers use a
          constant-time comparison.
        </p>
        <p>
          <strong>Does HMAC hide the message?</strong> No. It authenticates but
          does not encrypt. The message is still readable; HMAC only proves it is
          genuine and untampered.
        </p>
      </>
    ),
  },

  'caesar-cipher': {
    body: (
      <>
        <h2>Shifting letters around the alphabet</h2>
        <p>
          A Caesar cipher replaces each letter with one a fixed number of
          positions further along the alphabet, wrapping past Z back to A. A shift
          of 3 turns <code>A</code> into <code>D</code>. ROT13 is simply a Caesar
          cipher with a shift of 13, which is its own inverse: applying ROT13
          twice returns the original text.
        </p>
        <h3>What it is good for (and not)</h3>
        <p>
          This is a toy by modern standards. With only 25 possible shifts, anyone
          can break it by trying them all in seconds, and even that is unnecessary
          because letter-frequency analysis cracks it instantly. ROT13 is not
          secrecy at all; it is a convention for lightly obscuring spoilers, puzzle
          answers, or offensive words so a reader has to opt in to see them.
        </p>
        <h3>Example</h3>
        <pre><code>{`shift = 3
HELLO -> KHOOR

ROT13 (shift 13)
Why did the chicken? -> Jul qvq gur puvpxra?
apply again         -> Why did the chicken?`}</code></pre>
        <p>
          Non-letter characters like spaces, digits, and punctuation are normally
          passed through unchanged, which is why word boundaries stay visible and
          make the cipher trivial to read.
        </p>
        <h3>Common gotchas</h3>
        <p>
          Case is usually preserved, so uppercase maps to uppercase and lowercase
          to lowercase separately. A shift of 26 (or 0) does nothing, and a
          negative shift just decodes. If accented or non-Latin characters appear,
          most implementations leave them alone rather than guessing an alphabet.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is ROT13 ever acceptable for hiding data?</strong> Only for
          casual obfuscation where you are not trying to stop anyone determined.
          For real protection use <a href="/tools/aes-encrypt">AES encryption</a>.
        </p>
        <p>
          <strong>How do I decode if I do not know the shift?</strong> Try all 25,
          or look at the most frequent letter and assume it maps to E. The right
          shift usually jumps out as readable English.
        </p>
      </>
    ),
  },

  'rsa-keygen': {
    body: (
      <>
        <h2>Generating an asymmetric keypair</h2>
        <p>
          RSA produces a matched pair: a public key you can hand out freely and a
          private key you must guard. Data encrypted to the public key can only be
          decrypted with the private key, and signatures made with the private key
          can be checked by anyone holding the public one. The pair is derived from
          two large random prime numbers whose product forms the modulus.
        </p>
        <h3>Why key size matters</h3>
        <p>
          Security rests on the difficulty of factoring that modulus back into its
          primes. A 1024-bit key is now considered weak; 2048 bits is the practical
          minimum, and 3072 or 4096 bits buys more margin at the cost of slower
          operations and larger keys. Larger keys mainly slow signing and
          decryption, which happen on the private-key side.
        </p>
        <h3>Example</h3>
        <pre><code>{`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...
-----END PUBLIC KEY-----

-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----`}</code></pre>
        <p>
          PEM is just Base64-encoded DER wrapped in those header lines. The public
          key carries the modulus and exponent; the private key additionally holds
          the primes and other values needed to decrypt. You can inspect the raw
          structure with the <a href="/tools/asn1-parser">ASN.1 parser</a>.
        </p>
        <h3>Handling the private key</h3>
        <p>
          The private key is the whole ballgame. If it leaks, every signature and
          every message encrypted to the matching public key is compromised, and
          you cannot un-leak it. Generate it where it will live, protect it with a
          passphrase if the format supports one, and never paste a production
          private key into a page you do not control.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Should I use RSA or an elliptic-curve key?</strong> EC keys
          (like Ed25519 or P-256) give equivalent security with much smaller keys
          and faster operations. RSA is still everywhere for compatibility, which
          is often the deciding factor.
        </p>
        <p>
          <strong>Can I regenerate the public key from the private one?</strong>{' '}
          Yes. The private key contains everything needed to derive the public key.
          The reverse is not possible.
        </p>
      </>
    ),
  },

  'password-strength': {
    body: (
      <>
        <h2>Estimating how guessable a password is</h2>
        <p>
          A strength checker approximates how much work an attacker needs to guess
          your password. It does this by estimating entropy, measured in bits:
          each additional bit doubles the number of guesses required. The estimate
          combines the length and the variety of characters, then penalizes
          predictable structure the raw math would miss.
        </p>
        <h3>Entropy is not the whole story</h3>
        <p>
          Naive entropy assumes every character is random, but humans are not
          random. <code>P@ssw0rd1</code> looks mixed-case with symbols and digits,
          yet it follows a pattern attackers model directly, so its real strength
          is far below the naive estimate. Good checkers (the zxcvbn approach)
          score against dictionaries, keyboard walks, dates, and common
          substitutions rather than just counting character classes.
        </p>
        <h3>Example</h3>
        <pre><code>{`"hunter2"            ~ 12 bits   cracked instantly
"P@ssw0rd1"          naive ~52,  real ~15 bits
"glider-mantis-cove" ~60 bits    strong passphrase`}</code></pre>
        <p>
          The passphrase wins because length multiplies the search space faster
          than squeezing in symbols does, and random words dodge the dictionary
          penalties that sink leetspeak.
        </p>
        <h3>Why run it locally</h3>
        <p>
          A password is only safe if it never leaves your control. A checker that
          scores entirely in the browser avoids ever sending the candidate over
          the network, so there is no server log, no transit, nothing to leak. A
          strong generator pairs well here (see the{' '}
          <a href="/tools/password-generator">password generator</a>).
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does a green bar mean my password is safe?</strong> It means it
          resists common guessing models. It cannot know if that exact string has
          already appeared in a breach, which is a separate check against known
          leaked lists.
        </p>
        <p>
          <strong>Why does adding a symbol barely move the score?</strong> Because
          length dominates. Appending two more random characters usually helps more
          than swapping one letter for a symbol.
        </p>
      </>
    ),
  },

  'random-token': {
    body: (
      <>
        <h2>Tokens you can actually trust</h2>
        <p>
          A random token is a string used where unpredictability is the security
          property: session identifiers, password-reset links, API keys, CSRF
          tokens. The one requirement that matters is that it comes from a
          cryptographically secure random source, not a plain pseudo-random
          generator an attacker could predict or reproduce.
        </p>
        <h3>CSPRNG vs Math.random</h3>
        <p>
          Functions like JavaScript&apos;s <code>Math.random()</code> are fast but
          predictable: their internal state can be recovered from a few outputs,
          which is fatal for a token. Secure generators draw from the operating
          system entropy pool via <code>crypto.getRandomValues</code> or
          equivalent. The encoding (hex, Base64URL, alphanumeric) only changes how
          the bytes are printed, not the underlying randomness.
        </p>
        <h3>Example</h3>
        <pre><code>{`16 random bytes = 128 bits
hex          -> 1f3c...  (32 chars)
Base64URL    -> Hzx...   (~22 chars, URL-safe)
alphanumeric -> a7Kp...  (no + / = to escape)`}</code></pre>
        <p>
          Base64URL swaps <code>+ /</code> for <code>- _</code> and drops padding,
          so a token drops straight into a URL without percent-encoding. Hex is
          longer but unambiguous and case-insensitive.
        </p>
        <h3>How many bits</h3>
        <p>
          For anything guard-worthy, 128 bits (16 bytes) is a sensible floor and
          256 bits is generous. Resist the urge to shorten a token to make a URL
          prettier; every bit you cut halves the effort to guess it. If you need a
          collision-resistant id rather than a secret, a{' '}
          <a href="/tools/uuid-generator">UUID</a> is often the better fit.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can two secure tokens collide?</strong> At 128 bits the odds are
          negligible for any realistic volume. Collisions become a concern only
          with very short tokens or a weak source.
        </p>
        <p>
          <strong>Is a UUIDv4 good enough as a token?</strong> It has 122 random
          bits, which is fine for uniqueness and acceptable as a secret, though a
          purpose-built token lets you choose length and encoding deliberately.
        </p>
      </>
    ),
  },

  'base32': {
    body: (
      <>
        <h2>Base32 and why it exists next to Base64</h2>
        <p>
          Base32 encodes binary data using 32 characters: the uppercase letters A
          through Z and the digits 2 through 7. It trades density for legibility.
          Where Base64 packs 3 bytes into 4 characters, Base32 packs 5 bytes into 8
          characters, so output is larger, but it survives case-insensitive
          handling and avoids digits that look like letters.
        </p>
        <h3>The TOTP connection</h3>
        <p>
          Base32 is the standard encoding for TOTP secrets, the shared keys behind
          authenticator apps. When you set up two-factor auth and see a string like{' '}
          <code>JBSWY3DPEHPK3PXP</code>, that is the raw secret in Base32. It was
          chosen because people sometimes type these by hand, and Base32 omits the
          easily-confused <code>0</code>, <code>1</code>, and <code>8</code> and is
          not case-sensitive.
        </p>
        <h3>Example</h3>
        <pre><code>{`"foob" (4 bytes)
-> MZXW6YQ=  (8 chars with = padding)

"Hi" (2 bytes)
-> JBQQ====  (padding fills the group)`}</code></pre>
        <p>
          The trailing <code>=</code> characters pad the final 8-character block
          when the input is not a multiple of 5 bytes. Many TOTP implementations
          strip the padding, so a decoder should tolerate its absence.
        </p>
        <h3>Common mistakes</h3>
        <p>
          Confusing RFC 4648 Base32 with the Base32hex or Crockford variants
          produces garbage, since they use different alphabets. Feeding lowercase
          input to a strict decoder can fail unless it normalizes case first.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why not just use Base64 for TOTP secrets?</strong> Base64 is
          case-sensitive and includes symbols that are awkward to read aloud or
          type. Base32 was the pragmatic choice for human-handled keys.
        </p>
        <p>
          <strong>My authenticator rejects the secret, why?</strong> Often a stray
          space, a lowercase letter a strict app will not accept, or a character
          outside the A-Z/2-7 set that was pasted in by accident.
        </p>
      </>
    ),
  },

  'jwt-verify': {
    body: (
      <>
        <h2>Checking a JWT signature, not just reading it</h2>
        <p>
          Decoding a JWT shows its claims; verifying proves those claims are
          trustworthy. An HS256/384/512 token is signed with HMAC using a shared
          secret. Verification recomputes the HMAC over{' '}
          <code>header.payload</code> with your secret and checks it matches the
          signature segment. If it matches, the token was issued by someone holding
          that secret and has not been altered.
        </p>
        <h3>The alg confusion trap</h3>
        <p>
          A notorious JWT vulnerability is trusting the <code>alg</code> field in
          the header. If a verifier blindly honors it, an attacker can set{' '}
          <code>alg</code> to <code>none</code> and strip the signature, or switch
          an RS256 token to HS256 and sign it with the public key as if it were an
          HMAC secret. A correct verifier fixes the expected algorithm in advance
          rather than letting the token dictate it.
        </p>
        <h3>Example</h3>
        <pre><code>{`signing input = base64url(header) + "." + base64url(payload)
expected = HMAC-SHA256(secret, signing input)
valid = constant_time_equal(expected, token.signature)`}</code></pre>
        <p>
          Note this covers only the HS family. RS256 and ES256 tokens are verified
          with a public key, not a shared secret, so a secret-based check does not
          apply to them.
        </p>
        <h3>Signature valid is not the end</h3>
        <p>
          A matching signature still leaves the <code>exp</code>,{' '}
          <code>nbf</code>, issuer, and audience claims to check. A token can be
          perfectly signed and long expired. Pair this with the{' '}
          <a href="/tools/jwt-expiry-checker">expiry checker</a> and read raw
          claims with the <a href="/tools/jwt-decoder">decoder</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my valid token fail verification here?</strong> Usually
          the secret differs (a trailing newline or wrong encoding), or the token
          uses RS256, which needs a public key rather than a shared secret.
        </p>
        <p>
          <strong>Is pasting my production secret safe?</strong> A local verifier
          keeps it in the browser, but a live signing secret is as sensitive as a
          private key. Prefer test secrets when experimenting.
        </p>
      </>
    ),
  },

  'jwt-expiry-checker': {
    body: (
      <>
        <h2>Is this token still valid in time?</h2>
        <p>
          Even a correctly signed JWT becomes useless once its lifetime ends. The
          expiry checker reads the time-based claims from the payload and compares
          them to now, telling you whether the token is active and how long until
          it dies. It does not touch the signature; it only interprets the
          timestamps the token carries.
        </p>
        <h3>The claims that control timing</h3>
        <p>
          Three claims matter. <code>exp</code> is the expiration time, after which
          the token must be rejected. <code>nbf</code> (not-before) marks the
          earliest time the token is valid, so a token can be legitimately rejected
          for being too early. <code>iat</code> (issued-at) records when it was
          minted. All three are Unix timestamps in seconds, not milliseconds.
        </p>
        <h3>Example</h3>
        <pre><code>{`iat = 1700000000  issued
nbf = 1700000000  valid from
exp = 1700003600  expires (1 hour later)

now = 1700002000  -> active, 26m40s remaining
now = 1700005000  -> expired 23m20s ago`}</code></pre>
        <p>
          To turn any of these raw numbers into a human date, the{' '}
          <a href="/tools/unix-timestamp-converter">timestamp converter</a> does
          the arithmetic for you.
        </p>
        <h3>Clock skew and short windows</h3>
        <p>
          Servers often allow a small leeway (a minute or two) when checking{' '}
          <code>exp</code> and <code>nbf</code> because client and server clocks
          drift. A token that looks barely expired to you may still be accepted
          within that grace window, and vice versa. Short-lived tokens paired with
          refresh tokens are the usual pattern for limiting exposure if one leaks.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>My token has no exp, when does it expire?</strong> Never, on its
          own. A token without <code>exp</code> relies entirely on server-side
          revocation, which is a risk worth flagging.
        </p>
        <p>
          <strong>Why does the server reject a token that looks unexpired?</strong>{' '}
          The server may enforce a shorter effective lifetime, a different clock, or
          revocation that the raw timestamps cannot reveal.
        </p>
      </>
    ),
  },

  'jwk-to-pem': {
    body: (
      <>
        <h2>Two formats for the same key</h2>
        <p>
          A JWK is a JSON object describing a cryptographic key, common in OAuth and
          OpenID Connect where a server publishes its keys at a JWKS endpoint. PEM
          is the older Base64-and-headers format most libraries and command-line
          tools expect. Converting JWK to PEM lets you take a key fetched from a
          JWKS URL and feed it to tooling that only speaks PEM.
        </p>
        <h3>What actually gets converted</h3>
        <p>
          The conversion is a repackaging, not a cryptographic transform. For an RSA
          key, the JWK fields <code>n</code> (modulus) and <code>e</code> (exponent)
          are Base64URL-decoded and re-encoded as DER inside a PEM envelope. For an
          EC key, the curve and the <code>x</code>/<code>y</code> coordinates are
          mapped into the equivalent structure. No key material changes; only the
          serialization does.
        </p>
        <h3>Example</h3>
        <pre><code>{`{
  "kty": "RSA",
  "n": "0vx7agoebGcQ...",
  "e": "AQAB",
  "kid": "2024-key"
}

-> -----BEGIN PUBLIC KEY-----
   MIIBIjANBgkqhkiG9w0BAQEF...
   -----END PUBLIC KEY-----`}</code></pre>
        <p>
          <code>AQAB</code> is the famous 65537 public exponent, which decodes to
          the bytes <code>01 00 01</code>. The resulting PEM can be inspected
          structurally with the <a href="/tools/asn1-parser">ASN.1 parser</a>.
        </p>
        <h3>Public and private pieces</h3>
        <p>
          A public JWK has only <code>n</code> and <code>e</code> (or the curve
          point). A private JWK adds <code>d</code> and, for RSA, the prime factors{' '}
          <code>p</code>, <code>q</code>, and the CRT values. If those fields are
          present, the PEM you produce is a private key and must be handled as a
          secret, not shared like the public half.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Which PEM header will I get?</strong> A public key yields a{' '}
          <code>PUBLIC KEY</code> block; a private key yields a{' '}
          <code>PRIVATE KEY</code> block. The header reflects whether private fields
          were present in the JWK.
        </p>
        <p>
          <strong>Does the kid matter for conversion?</strong> No. The key id is
          just a label for selecting the right key from a set; it is not part of the
          math and is dropped in the PEM.
        </p>
      </>
    ),
  },

  'protobuf-decoder': {
    body: (
      <>
        <h2>Reading protobuf without the schema</h2>
        <p>
          Protocol Buffers serialize structured data into a compact binary form.
          Normally you need the <code>.proto</code> definition to interpret it, but
          the wire format is self-describing enough to decode partially without one.
          Each field is encoded as a tag (a field number plus a wire type) followed
          by its value, so a raw decoder can walk the bytes and reconstruct the
          shape even if it cannot recover the original field names.
        </p>
        <h3>How the wire format is laid out</h3>
        <p>
          Every field starts with a varint key. The low 3 bits are the wire type (0
          varint, 1 fixed64, 2 length-delimited, 5 fixed32) and the rest is the
          field number. Length-delimited fields (type 2) hold strings, bytes, or
          nested messages, which is why a raw decoder often cannot tell a string
          from a sub-message without guessing.
        </p>
        <h3>Example</h3>
        <pre><code>{`bytes:  08 96 01 12 03 61 62 63

08    -> field 1, wire type 0 (varint)
96 01 -> value 150
12    -> field 2, wire type 2 (length-delimited)
03    -> length 3
61 62 63 -> "abc"`}</code></pre>
        <p>
          Field 1 is the integer 150 and field 2 is the string <code>abc</code>.
          Without the schema you learn the numbers and types but not that field 1
          was named, say, <code>user_id</code>.
        </p>
        <h3>The ambiguities to expect</h3>
        <p>
          A varint could be an int32, int64, bool, or an enum; the decoder cannot
          know which. Signed integers using zigzag encoding look like large unsigned
          values unless you decode them as sint. A length-delimited blob might be a
          valid nested message or just raw bytes that happen to parse, so treat
          inferred nesting as a best guess.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why do my negative numbers look huge?</strong> Plain int32/int64
          encode negatives as very large varints. Fields declared as sint use zigzag
          encoding; decoding with the wrong interpretation produces the mismatch.
        </p>
        <p>
          <strong>Can it recover field names?</strong> No. Names live only in the{' '}
          <code>.proto</code> file and are never present on the wire. You get field
          numbers and types.
        </p>
      </>
    ),
  },

  'asn1-parser': {
    body: (
      <>
        <h2>Unpacking DER structures</h2>
        <p>
          ASN.1 is the grammar used to describe the contents of certificates, keys,
          and many PKI objects; DER is the strict binary encoding of that grammar.
          A parser decodes the bytes into a tree of typed nodes so you can see the
          structure of an X.509 certificate or a private key instead of staring at
          Base64. This is how you confirm what is actually inside a PEM file.
        </p>
        <h3>Tag, length, value</h3>
        <p>
          DER is built from TLV triples: a tag byte naming the type, a length, then
          the value. Constructed types like SEQUENCE and SET contain nested TLVs,
          which is how the tree forms. Primitive types include INTEGER, OBJECT
          IDENTIFIER (used for algorithm names), UTCTime, and the various string
          types. The parser recurses into constructed nodes and stops at primitives.
        </p>
        <h3>Example</h3>
        <pre><code>{`30 13             SEQUENCE (19 bytes)
  06 03 55 04 03    OBJECT IDENTIFIER 2.5.4.3 (commonName)
  13 0C ...         PrintableString "example.com"`}</code></pre>
        <p>
          The OID <code>2.5.4.3</code> is a well-known identifier for the common
          name attribute. Certificates and keys are full of these OIDs naming
          algorithms, extensions, and attributes. A key converted from a{' '}
          <a href="/tools/jwk-to-pem">JWK</a> or produced by the{' '}
          <a href="/tools/rsa-keygen">RSA generator</a> decodes cleanly here.
        </p>
        <h3>Where parsing goes wrong</h3>
        <p>
          Confusing DER with the related BER encoding matters because DER forbids
          the indefinite-length form BER allows. A truncated file or one that still
          has its PEM header lines will fail; strip the <code>-----BEGIN-----</code>
          wrapper and Base64-decode to raw DER first. Oversized length bytes often
          signal a corrupted copy.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What is an OID?</strong> A globally registered dotted-number
          identifier, like <code>1.2.840.113549.1.1.11</code> for sha256WithRSA. The
          parser shows the number; a lookup maps it to a human name.
        </p>
        <p>
          <strong>Why are some integers so long?</strong> An RSA modulus is a 2048-
          or 4096-bit number, so it appears as a very long INTEGER. A leading{' '}
          <code>00</code> byte is normal padding to keep it positive.
        </p>
      </>
    ),
  },

  'webauthn-tester': {
    body: (
      <>
        <h2>Trying out passkeys in the browser</h2>
        <p>
          WebAuthn is the browser API behind passkeys and hardware security keys. A
          tester checks whether the current browser and device support it, then runs
          a registration ceremony so you can watch the full flow: the prompt, the
          authenticator interaction, and the credential that comes back. It is the
          fastest way to confirm an environment before wiring WebAuthn into a real
          login.
        </p>
        <h3>What the ceremony actually does</h3>
        <p>
          During registration the server sends a random challenge. The authenticator
          (a platform TPM, Touch ID, or a USB key) generates a new keypair, keeps the
          private key sealed in hardware, and returns the public key plus an
          attestation signed over the challenge. The private key never leaves the
          device, which is what makes passkeys phishing-resistant: there is no shared
          secret to steal and nothing to type.
        </p>
        <h3>Example</h3>
        <pre><code>{`navigator.credentials.create({
  publicKey: {
    challenge: <random bytes from server>,
    rp: { name: "DevKit", id: "devkit.app" },
    user: { id, name, displayName },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }]
  }
})`}</code></pre>
        <p>
          The <code>alg: -7</code> value requests ES256, an elliptic-curve
          signature. The returned credential id and public key are what a server
          stores to recognize the user on later logins.
        </p>
        <h3>The origin binding gotcha</h3>
        <p>
          A credential is bound to the relying-party id, which must match the
          origin&apos;s domain. That binding is exactly why passkeys resist phishing:
          a credential made for your real domain will not activate on a lookalike
          site. It also means WebAuthn requires a secure context, so it only works
          over HTTPS or on localhost during development.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does the website ever see my fingerprint?</strong> No. Biometrics
          stay on the device and only unlock the local private key. The server
          receives public-key data and signatures, never the biometric itself.
        </p>
        <p>
          <strong>Why does registration fail on my test page?</strong> Common causes
          are an insecure (non-HTTPS) origin, a relying-party id that does not match
          the domain, or a browser without a usable authenticator available.
        </p>
      </>
    ),
  },

  'http-header-analyzer': {
    body: (
      <>
        <h2>Making sense of response headers</h2>
        <p>
          HTTP response headers control caching, content type, cookies, and a whole
          layer of browser security that is invisible until something goes wrong. An
          analyzer takes a pasted block of headers, explains what each one does, and
          flags which security headers are absent, turning a wall of key-value lines
          into an actionable checklist.
        </p>
        <h3>The security headers worth checking</h3>
        <p>
          A handful of headers do heavy lifting.{' '}
          <code>Strict-Transport-Security</code> forces HTTPS on future visits.{' '}
          <code>Content-Security-Policy</code> limits where scripts and other
          resources may load from, the main defense against XSS (build one with the{' '}
          <a href="/tools/csp-header-builder">CSP builder</a>).{' '}
          <code>X-Content-Type-Options: nosniff</code> stops the browser from
          second-guessing content types, and <code>X-Frame-Options</code> or a CSP{' '}
          <code>frame-ancestors</code> directive blocks clickjacking.
        </p>
        <h3>Example</h3>
        <pre><code>{`HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000
cache-control: public, max-age=3600
x-content-type-options: nosniff
# missing: content-security-policy
# missing: x-frame-options`}</code></pre>
        <p>
          Here HSTS and nosniff are present, but the absence of a CSP leaves the
          page more exposed to injected scripts, which an analyzer would highlight.
        </p>
        <h3>Reading the subtle ones</h3>
        <p>
          <code>Cache-Control</code> interactions trip people up: a{' '}
          <code>no-cache</code> value still stores the response but revalidates it,
          while <code>no-store</code> forbids storing at all. A{' '}
          <code>Set-Cookie</code> without <code>HttpOnly</code> and{' '}
          <code>Secure</code> flags is a frequent, quietly dangerous finding.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Are the X- headers still needed with a CSP?</strong> A modern CSP
          can replace <code>X-Frame-Options</code> via <code>frame-ancestors</code>,
          but keeping the older header helps for browsers or crawlers that lag.
        </p>
        <p>
          <strong>Why does my HSTS not take effect?</strong> HSTS is only honored
          over HTTPS and after the first successful secure response. Served over
          plain HTTP, the header is ignored.
        </p>
      </>
    ),
  },

  'cors-explainer': {
    body: (
      <>
        <h2>Why the browser blocks cross-origin calls</h2>
        <p>
          The same-origin policy stops a page on one origin from reading responses
          from another. CORS is the controlled exception: the server opts in by
          returning headers that tell the browser which other origins may read its
          responses. A CORS generator helps you produce those response headers
          correctly, because getting them subtly wrong is the usual cause of the
          dreaded blocked-by-CORS error.
        </p>
        <h3>Simple vs preflighted requests</h3>
        <p>
          Plain GETs and basic POSTs go straight through, and the browser just
          checks the response headers. Anything with a custom header, a{' '}
          <code>PUT</code>/<code>DELETE</code>, or a JSON content type triggers a
          preflight: the browser first sends an <code>OPTIONS</code> request asking
          whether the real request is allowed. Forgetting to answer that preflight is
          why a request that works in curl fails in the browser.
        </p>
        <h3>Example</h3>
        <pre><code>{`Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 600`}</code></pre>
        <p>
          <code>Max-Age</code> lets the browser cache the preflight result so it is
          not repeated on every call.
        </p>
        <h3>The wildcard and credentials trap</h3>
        <p>
          You cannot combine <code>Access-Control-Allow-Origin: *</code> with{' '}
          <code>Allow-Credentials: true</code>. If the request sends cookies or an
          auth header, the browser requires an explicit origin, not a wildcard, and
          will reject the response otherwise. Echoing back the request origin after
          validating it against an allowlist is the safe pattern; blindly reflecting
          any origin effectively disables the protection.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>CORS blocked my request but the server returned 200, why?</strong>{' '}
          The server ran the request fine; the browser then refused to expose the
          response to your script because the headers did not permit your origin.
        </p>
        <p>
          <strong>Does CORS protect my API from attackers?</strong> No. It is a
          browser enforcement, not server authorization. Tools outside the browser
          ignore it entirely, so you still need real auth.
        </p>
      </>
    ),
  },

  'csp-header-builder': {
    body: (
      <>
        <h2>Constraining what a page can load</h2>
        <p>
          A Content-Security-Policy tells the browser which sources of scripts,
          styles, images, and other resources are allowed, and blocks everything
          else. Done well, it is the strongest single defense against cross-site
          scripting, because even if an attacker injects a script tag, the browser
          refuses to run code from a source your policy did not approve.
        </p>
        <h3>Directives, source lists, and nonces</h3>
        <p>
          A policy is a set of directives like <code>script-src</code>,{' '}
          <code>style-src</code>, and <code>default-src</code> (the fallback), each
          with a source list. Sources can be origins, the keyword{' '}
          <code>self</code>, a <code>nonce-</code> value tying a specific inline
          script to the policy, or a hash of the script&apos;s contents. Nonces and
          hashes are how you keep necessary inline scripts without opening the door
          to injected ones.
        </p>
        <h3>Example</h3>
        <pre><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-r4nd0m';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  frame-ancestors 'none'`}</code></pre>
        <p>
          Here scripts run only from the same origin or when they carry the matching
          nonce, and <code>frame-ancestors 'none'</code> blocks the page from being
          framed, covering what <code>X-Frame-Options</code> used to.
        </p>
        <h3>The unsafe-inline problem</h3>
        <p>
          Adding <code>'unsafe-inline'</code> to <code>script-src</code> is the
          quickest way to make a strict CSP work, and it also guts the protection,
          since injected inline scripts are exactly what CSP exists to stop. Roll out
          with <code>Content-Security-Policy-Report-Only</code> first so violations
          are reported but not enforced, then tighten. Verify the final header lands
          with the <a href="/tools/http-header-analyzer">header analyzer</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>My styles broke after adding a CSP, why?</strong> A strict policy
          blocks inline <code>style</code> attributes and tags. Move styles to files,
          or allow them with a nonce or hash rather than reaching for{' '}
          <code>unsafe-inline</code>.
        </p>
        <p>
          <strong>Should I use default-src as a catch-all?</strong> Yes, set a
          restrictive <code>default-src</code> and then loosen specific directives
          only as needed, rather than listing every directive from scratch.
        </p>
      </>
    ),
  },

  'htaccess-generator': {
    body: (
      <>
        <h2>Apache rules without memorizing the syntax</h2>
        <p>
          An <code>.htaccess</code> file applies Apache configuration at the
          directory level: redirects, rewrites, compression, caching, and security
          tweaks, all without touching the main server config. A generator assembles
          the right directives for common goals so you avoid the fiddly{' '}
          <code>mod_rewrite</code> syntax that is easy to get subtly wrong.
        </p>
        <h3>The usual recipes</h3>
        <p>
          The frequent requests are forcing HTTPS, canonicalizing between the{' '}
          <code>www</code> and bare domain, enabling gzip through{' '}
          <code>mod_deflate</code>, setting far-future cache headers on static assets
          via <code>mod_expires</code>, and adding security headers. Each is a few
          lines, but the order and the rewrite conditions matter.
        </p>
        <h3>Example</h3>
        <pre><code>{`RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Cache static assets for a year
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
</IfModule>`}</code></pre>
        <p>
          The <code>R=301</code> flag makes the HTTPS redirect permanent, and{' '}
          <code>L</code> stops further rules from running on that request.
        </p>
        <h3>Why 301s are a one-way door</h3>
        <p>
          A 301 is a permanent redirect, and browsers cache it aggressively. If you
          set up an HTTPS or domain redirect with a mistake, visitors can keep
          hitting the cached redirect even after you fix the file. Test with a 302
          (temporary) first, then switch to 301 once the behavior is confirmed. Note
          that <code>.htaccess</code> only works where <code>AllowOverride</code>
          permits it, and it adds a small per-request cost compared to main config.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>My redirect loops forever, why?</strong> Usually the HTTPS
          condition is wrong behind a proxy or load balancer, where Apache sees HTTP
          internally. Check <code>X-Forwarded-Proto</code> instead of{' '}
          <code>%{'{'}HTTPS{'}'}</code> in that setup.
        </p>
        <p>
          <strong>Nothing happens when I edit the file, why?</strong> Either{' '}
          <code>AllowOverride</code> is set to None for that directory, or the
          required module (like <code>mod_rewrite</code>) is not enabled.
        </p>
      </>
    ),
  },

  'uuid-inspector': {
    body: (
      <>
        <h2>Decoding a UUID you were handed</h2>
        <p>
          Not every UUID is the random kind. An inspector validates the format, then
          reads the version and variant bits to tell you how it was generated, and
          for time-based versions it can extract the embedded timestamp. That is
          useful when debugging: the version alone tells you whether an id is random,
          time-ordered, or derived from a name.
        </p>
        <h3>Where the version and variant live</h3>
        <p>
          In the canonical form, the first digit of the third group is the version,
          and the first bits of the fourth group encode the variant. Version 4 is
          random, version 1 is time-and-MAC based, version 3 and 5 are namespace
          hashes (MD5 and SHA-1 respectively), and newer version 7 is time-ordered
          and sortable. The variant for standard UUIDs makes that fourth-group digit
          one of <code>8</code>, <code>9</code>, <code>a</code>, or <code>b</code>.
        </p>
        <h3>Example</h3>
        <pre><code>{`c232ab00-9414-11ec-b3c8-9e6bdeced846
         ^              ^
       version 1    variant (8/9/a/b)

v1 timestamp -> 2022-02-22 19:22:22 UTC`}</code></pre>
        <p>
          A version-1 UUID packs a 60-bit timestamp counting 100-nanosecond
          intervals since 15 October 1582, which the inspector converts into a
          normal date. Random v4 values carry no such information. To mint new ones,
          use the <a href="/tools/uuid-generator">UUID generator</a>.
        </p>
        <h3>Privacy note on v1</h3>
        <p>
          Version 1 historically embeds the generating machine&apos;s MAC address and
          a timestamp, which can leak when and roughly where an id was created. If
          you see v1 UUIDs in a public API, that exposure is worth noting; random v4
          or v7 avoids it.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is the nil UUID valid?</strong> The all-zero UUID is a defined
          special value, not a bug. It typically means unset or none rather than a
          real generated id.
        </p>
        <p>
          <strong>Can I get a creation time from a v4?</strong> No. v4 is pure
          randomness with no timestamp. Only v1, v6, and v7 carry extractable time.
        </p>
      </>
    ),
  },

  'file-to-base64': {
    body: (
      <>
        <h2>Turning a file into a data URI</h2>
        <p>
          Encoding a file to Base64 lets you embed it directly inside text: a data
          URI you can drop into CSS, an <code>img</code> <code>src</code>, or a JSON
          field. The browser reads the file locally and produces a string that
          carries both a MIME type and the file&apos;s bytes, so no separate hosting
          or upload is involved.
        </p>
        <h3>Anatomy of a data URI</h3>
        <p>
          A data URI has a fixed shape:{' '}
          <code>data:[mediatype];base64,[data]</code>. The media type (like{' '}
          <code>image/png</code>) tells the consumer how to interpret the bytes, and
          everything after the comma is the Base64 payload. Get the media type wrong
          and the browser may refuse to render it even though the bytes are correct.
        </p>
        <h3>Example</h3>
        <pre><code>{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...

<img src="data:image/png;base64,iVBOR..." alt="logo" />`}</code></pre>
        <p>
          The same string works in a stylesheet as a background image, which is handy
          for tiny icons that would otherwise cost an extra request. For the reverse
          direction and more on the encoding itself, see the{' '}
          <a href="/tools/base64-encode-decode">Base64 encoder</a>.
        </p>
        <h3>When inlining is the wrong call</h3>
        <p>
          Base64 inflates size by about a third, and inlined assets cannot be cached
          separately from the document, so a large image embedded this way is
          re-downloaded with every page load. Data URIs make sense for small,
          rarely-changing assets. For anything substantial, a normal file reference
          wins on both bandwidth and caching.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does the file leave my machine?</strong> With a browser-based
          converter the bytes are read and encoded locally, so nothing is uploaded.
          That matters when the file is private.
        </p>
        <p>
          <strong>Why is my data URI image not showing?</strong> Usually a wrong or
          missing media type, or whitespace and line breaks that crept into the
          Base64 string and need stripping.
        </p>
      </>
    ),
  },

  'exif-stripper': {
    body: (
      <>
        <h2>Removing the hidden data in photos</h2>
        <p>
          Image files carry more than pixels. EXIF metadata, written by cameras and
          phones, records the capture timestamp, camera model, exposure settings,
          and often precise GPS coordinates. Stripping EXIF rewrites the image
          without that block, so you can share a photo without quietly disclosing
          where and when it was taken.
        </p>
        <h3>Why GPS is the real concern</h3>
        <p>
          Of all EXIF fields, geolocation is the one that bites. A photo posted from
          home can embed latitude and longitude accurate to a few meters. Many social
          platforms strip metadata on upload, but plenty of channels do not: email
          attachments, direct file shares, and some chat apps pass the original bytes
          straight through, GPS and all.
        </p>
        <h3>Example</h3>
        <pre><code>{`Before:
  DateTimeOriginal: 2024:03:12 14:08:51
  Make/Model: Apple iPhone 15
  GPSLatitude:  37.7749 N
  GPSLongitude: 122.4194 W

After:
  (no EXIF block; pixels unchanged)`}</code></pre>
        <p>
          Stripping metadata does not touch the image data itself, so the photo looks
          identical. Only the descriptive fields are gone.
        </p>
        <h3>What stripping does and does not cover</h3>
        <p>
          Removing EXIF handles the standard metadata block, but some images also
          carry XMP or IPTC data, and formats differ: JPEG and TIFF are the usual
          carriers, while PNG rarely holds GPS. Note too that metadata is not the
          only leak; the visible contents of a photo can reveal location on their
          own, which no stripper can fix. Doing this locally keeps the original,
          GPS-bearing image from being uploaded anywhere in the process.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does stripping EXIF reduce image quality?</strong> No. The pixel
          data is left alone; only the metadata segment is removed, so there is no
          recompression and no visible change.
        </p>
        <p>
          <strong>Will it also remove the thumbnail?</strong> EXIF often embeds a
          small preview thumbnail, which is removed along with the rest of the block.
          That is good, since an un-stripped thumbnail can retain old content.
        </p>
      </>
    ),
  },

  'dockerfile-linter': {
    body: (
      <>
        <h2>Catching Dockerfile mistakes early</h2>
        <p>
          A Dockerfile linter scans your build instructions for patterns that lead to
          bloated images, broken caching, or security weaknesses. It encodes the
          lessons teams usually learn the hard way, like why a floating tag causes
          irreproducible builds, so you fix them before the image ships rather than
          after an incident.
        </p>
        <h3>The issues worth fixing</h3>
        <p>
          Unpinned base image tags such as <code>node:latest</code> make builds
          non-reproducible, since <code>latest</code> drifts over time. Running as
          root is the default and a real risk; a compromised process then has root in
          the container. Combining <code>apt-get update</code> and{' '}
          <code>install</code> in separate layers lets a stale cached update serve old
          package lists. Copying the whole context before installing dependencies
          busts the layer cache on every source change.
        </p>
        <h3>Example</h3>
        <pre><code>{`# flagged
FROM node:latest
COPY . .
RUN npm install

# improved
FROM node:20.11-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
USER node`}</code></pre>
        <p>
          Pinning the tag, copying the manifest before the source so dependency
          layers cache, using <code>npm ci</code> for reproducible installs, and
          dropping to a non-root <code>USER</code> address the common findings at
          once.
        </p>
        <h3>Caching and image size</h3>
        <p>
          Docker caches each layer, so instruction order is not cosmetic: put the
          things that change rarely (dependency installs) before the things that
          change constantly (your source). A multi-stage build keeps compilers and
          dev dependencies out of the final image, often cutting its size
          dramatically. The linter nudges toward both.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why avoid latest if it always pulls the newest?</strong> Because
          newest is a moving target. A build that passed today can fail or behave
          differently tomorrow when <code>latest</code> points somewhere new. Pinning
          makes builds repeatable.
        </p>
        <p>
          <strong>Is running as root really a problem inside a container?</strong>{' '}
          Containers are not a hard security boundary. Combined with a kernel or
          runtime escape, root in the container is a meaningful step toward root on
          the host, so dropping privileges is cheap insurance.
        </p>
      </>
    ),
  },
}
