import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspace — Multi-Tool Tabs | DevKit',
  description: 'Open multiple DevKit tools in tabs and work across them in a single workspace.',
  alternates: { canonical: '/workspace/' },
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return children
}
