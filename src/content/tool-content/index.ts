import type { ReactNode } from 'react'
import { batch1 } from './batch1'
import { batch2 } from './batch2'
import { batch3 } from './batch3'
import { batch4 } from './batch4'
import { batch5 } from './batch5'
import { batch6 } from './batch6'
import { batch7 } from './batch7'
import { batch8 } from './batch8'
import { batch9 } from './batch9'

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
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
  ...batch9,
}
