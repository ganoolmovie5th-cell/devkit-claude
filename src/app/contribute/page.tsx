import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contribute — Add Tools to DevKit | Open Source',
  description: 'Help build DevKit by contributing new tools, fixing bugs, improving docs, or suggesting features. Open source contribution guide.',
  alternates: { canonical: '/contribute/' },
}

export default function ContributePage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <h1>Contribute to DevKit</h1>
      <p>DevKit is open source. Anyone can contribute new tools, fix bugs, improve documentation, or suggest features.</p>

      <h2>Quick Start</h2>
      <ol>
        <li>Fork the repo: <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude" target="_blank" rel="noopener noreferrer">github.com/ganoolmovie5th-cell/dev-tools-claude</a></li>
        <li>Clone your fork locally</li>
        <li>Run <code>npm install</code> then <code>npm run dev</code></li>
        <li>Create a branch: <code>git checkout -b feat/my-new-tool</code></li>
        <li>Make changes, commit, push, and open a PR</li>
      </ol>

      <h2>Adding a New Tool</h2>
      <p>Each tool is a self-contained React component. Here is the structure:</p>

      <h3>1. Create the component</h3>
      <pre><code>{`// src/tools/MyNewTool.tsx
'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function MyNewTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const process = () => {
    // Your tool logic here (client-side only!)
    setOutput(input.toUpperCase())
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter input..."
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg"
      />
      <button onClick={process} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Process
      </button>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border rounded-lg">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}`}</code></pre>

      <h3>2. Register the tool</h3>
      <p>Add an entry to <code>src/tools/registry.ts</code>:</p>
      <pre><code>{`{ slug: 'my-new-tool', name: 'My New Tool', description: '...', category: 'Converter', keywords: ['...'] }`}</code></pre>

      <h3>3. Add to ToolRenderer</h3>
      <p>Add a dynamic import in <code>src/tools/ToolRenderer.tsx</code>:</p>
      <pre><code>{`'my-new-tool': dynamic(() => import('./MyNewTool')),`}</code></pre>

      <h3>4. Test locally</h3>
      <pre><code>{`npm run dev
# Visit http://localhost:3000/tools/my-new-tool`}</code></pre>

      <h2>Tool Guidelines</h2>
      <ul>
        <li><strong>Client-side only.</strong> No server calls for processing user data. Privacy is our core promise.</li>
        <li><strong>Minimal dependencies.</strong> Use browser APIs when possible. If a library is needed, keep it small.</li>
        <li><strong>Dark mode support.</strong> Use <code>dark:</code> Tailwind variants on all elements.</li>
        <li><strong>Responsive.</strong> Must work on mobile screens.</li>
        <li><strong>Copy button.</strong> Every output should have a copy button.</li>
        <li><strong>No external data for processing.</strong> External APIs only for reference data (like DNS lookup), never for user input processing.</li>
      </ul>

      <h2>Other Ways to Contribute</h2>
      <ul>
        <li><strong>Bug reports:</strong> <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude/issues/new?template=bug_report.md" target="_blank" rel="noopener noreferrer">Open a bug report</a></li>
        <li><strong>Feature suggestions:</strong> <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude/issues/new?title=Tool+Suggestion:+" target="_blank" rel="noopener noreferrer">Suggest a tool</a></li>
        <li><strong>Documentation:</strong> Fix typos, improve How-to guides, add examples</li>
        <li><strong>Translations:</strong> Help translate tool descriptions to other languages</li>
        <li><strong>Design:</strong> Improve UI/UX, accessibility, or visual design</li>
      </ul>

      <h2>Code of Conduct</h2>
      <p>Be respectful, constructive, and inclusive. We welcome contributors of all experience levels. There are no stupid questions — if something is unclear, it is a documentation bug.</p>

      <h2>Recognition</h2>
      <p>All contributors are credited in the changelog and will be listed on the About page once we set up a contributors section. Significant contributors get a shoutout on our social channels.</p>
    </div>
  )
}
