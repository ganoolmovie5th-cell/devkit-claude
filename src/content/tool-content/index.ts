import type { ReactNode } from 'react'
import { batch1 } from './batch1'
import { batch2 } from './batch2'
import { batch3 } from './batch3'
import { batch4 } from './batch4'

// Rich, unique editorial content per tool, keyed by slug. Tools without an
// entry fall back to the generic template in ToolContent.tsx. Each batch is a
// separate module so entries can be authored independently.
export type ToolArticle = {
  // Returns the body rendered inside a `prose` wrapper by ToolContent.
  body: ReactNode
}

export const toolContent: Record<string, ToolArticle> = {
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
}
