import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Tools Side by Side | DevKit',
  description: 'Run two DevKit developer tools side by side and compare their output in real time.',
  alternates: { canonical: '/compare-tools/' },
}

export default function CompareToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
