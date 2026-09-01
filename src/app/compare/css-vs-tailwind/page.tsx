import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CSS vs Tailwind CSS — Styling Approaches Compared | DevKit',
  description: 'Compare vanilla CSS and Tailwind CSS: workflow, bundle size, maintainability, and when to use each approach.',
  alternates: { canonical: '/compare/css-vs-tailwind/' },
  keywords: 'css vs tailwind, tailwind css comparison, utility css vs vanilla css',
}

export default function CssVsTailwind() {
  return (
    <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert max-w-none">
      <h1>CSS vs Tailwind CSS</h1>
      <p className="lead">Traditional stylesheets versus utility-first composition.</p>

      <div className="overflow-x-auto not-prose">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr><th className="p-3 text-left">Aspect</th><th className="p-3 text-left">Vanilla CSS</th><th className="p-3 text-left">Tailwind CSS</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Approach</td><td className="p-3">Semantic class names (.card, .btn)</td><td className="p-3">Utility classes (flex, p-4, text-lg)</td></tr>
            <tr><td className="p-3 font-medium">File switching</td><td className="p-3">HTML + separate CSS file</td><td className="p-3">Styles inline with markup</td></tr>
            <tr><td className="p-3 font-medium">Bundle size</td><td className="p-3">Grows with project</td><td className="p-3">Fixed (purged unused classes)</td></tr>
            <tr><td className="p-3 font-medium">Naming</td><td className="p-3">You decide (BEM, SMACSS, etc)</td><td className="p-3">Predefined utility names</td></tr>
            <tr><td className="p-3 font-medium">Customization</td><td className="p-3">Unlimited freedom</td><td className="p-3">Via tailwind.config.js</td></tr>
            <tr><td className="p-3 font-medium">Responsive</td><td className="p-3">@media queries</td><td className="p-3">Prefix (sm:, md:, lg:)</td></tr>
            <tr><td className="p-3 font-medium">Dark mode</td><td className="p-3">prefers-color-scheme</td><td className="p-3">dark: prefix</td></tr>
            <tr><td className="p-3 font-medium">Reusability</td><td className="p-3">Classes/components</td><td className="p-3">@apply or component extraction</td></tr>
            <tr><td className="p-3 font-medium">Learning curve</td><td className="p-3">CSS knowledge required</td><td className="p-3">CSS knowledge + class memorization</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Choose vanilla CSS when</h2>
      <ul>
        <li>Small projects without build tools</li>
        <li>You need full creative control</li>
        <li>Team prefers semantic HTML</li>
        <li>Complex animations and custom properties</li>
        <li>Working without a bundler/framework</li>
      </ul>

      <h2>Choose Tailwind when</h2>
      <ul>
        <li>Rapid prototyping and iteration</li>
        <li>Consistent design system enforcement</li>
        <li>Component-based frameworks (React, Vue)</li>
        <li>Teams that want to avoid CSS naming debates</li>
        <li>When you want predictable, small CSS bundles</li>
      </ul>

      <h2>Bottom line</h2>
      <p>Tailwind is a productivity multiplier for component-based apps. Vanilla CSS gives maximum control for unique designs. Many projects use both — Tailwind for layout/spacing, custom CSS for animations. Convert between them with our <Link href="/tools/tailwind-to-css" className="text-blue-600">Tailwind to CSS Converter</Link>.</p>
    </div>
  )
}
