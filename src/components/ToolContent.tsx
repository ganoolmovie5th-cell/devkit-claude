import { ToolMeta } from '@/tools/registry'

// Publisher content rendered beneath each tool. Turns an otherwise
// interactive-only screen into a page with real, indexable text so it
// carries genuine value for visitors (and satisfies ad-placement policy
// that ads must sit alongside meaningful content).

function categoryIntro(category: string, name: string): string {
  switch (category) {
    case 'Formatter':
      return `${name} cleans up messy input and returns readable, well-structured output. Paste your data, format it, and copy the result — everything runs in your browser, so nothing is uploaded.`
    case 'Encoder':
    case 'Decoder':
      return `${name} converts data between formats so it can travel safely through URLs, headers, or storage. Encoding and decoding both happen locally, which keeps sensitive values off any server.`
    case 'Converter':
      return `${name} translates data from one representation to another without changing its meaning. It is handy when two systems expect different formats and you need a quick, reliable bridge.`
    case 'Generator':
      return `${name} produces ready-to-use output from your settings. Adjust the options and the result updates immediately — copy it straight into your project.`
    case 'Tester':
      return `${name} lets you check input against a rule or expectation and see the outcome right away. It is built for quick feedback while you debug or verify data.`
    case 'Crypto':
      return `${name} produces cryptographic output from your input. All hashing runs client-side, so the values you enter never leave your device.`
    case 'Calculator':
      return `${name} works out the numbers for you and shows each part of the result, so you can double-check the math instead of doing it by hand.`
    case 'Reference':
      return `${name} is a quick lookup you can search and copy from. Keep it open in a tab whenever you need the answer without digging through documentation.`
    default:
      return `${name} is a free, browser-based utility. Enter your input, get the result instantly, and copy it — no signup, no upload, no tracking.`
  }
}

export default function ToolContent({ tool }: { tool: ToolMeta }) {
  const primaryKeyword = tool.keywords[0] ?? tool.name.toLowerCase()

  return (
    <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
      <h2>About {tool.name}</h2>
      <p>{categoryIntro(tool.category, tool.name)}</p>
      <p>
        {tool.description} Because {tool.name} runs entirely in your browser, it works offline after
        the first visit and is safe to use with private data such as API keys, tokens, and internal
        configuration — none of it is ever sent to a server.
      </p>

      <h2>How to use {tool.name}</h2>
      <ol>
        <li>Enter or paste your input into the field above.</li>
        <li>Adjust any available options to match what you need.</li>
        <li>Read the result, which updates as you type.</li>
        <li>Use the copy button to grab the output, or the share button to create a link.</li>
      </ol>

      <h2>Frequently asked questions</h2>
      <h3>Is {tool.name} free?</h3>
      <p>
        Yes. {tool.name} is completely free with no account required and no usage limits. It is
        supported by non-intrusive ads placed around this written content.
      </p>
      <h3>Is my data private?</h3>
      <p>
        Yes. All processing happens locally in your browser. Your input never leaves your device, so
        this tool is safe for sensitive or confidential data.
      </p>
      <h3>Do I need to install anything?</h3>
      <p>
        No. {tool.name} runs in any modern browser. It also works offline after your first visit and
        can be added to your home screen as an app.
      </p>
      <h3>Who is this tool for?</h3>
      <p>
        Anyone searching for a reliable {primaryKeyword}. Developers, students, and technical writers
        use it daily as part of their workflow.
      </p>
    </section>
  )
}
