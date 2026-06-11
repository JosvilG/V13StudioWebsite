import type { BlogBlock } from './blog'

/** Minimal Markdown → BlogBlock. "## heading" → h2; blank-line-separated text → p
 *  (single newlines become spaces). Other Markdown degrades to paragraph text. */
export function parseMarkdownToBlocks(md: string): BlogBlock[] {
  if (!md || !md.trim()) return []
  const chunks = md.replace(/\r\n/g, '\n').split(/\n{2,}/)
  const blocks: BlogBlock[] = []
  for (const raw of chunks) {
    const chunk = raw.trim()
    if (!chunk) continue
    const heading = /^#{1,6}\s+(.*)$/.exec(chunk)
    if (heading) blocks.push({ type: 'h2', text: heading[1].trim() })
    else blocks.push({ type: 'p', text: chunk.replace(/\s*\n\s*/g, ' ') })
  }
  return blocks
}
