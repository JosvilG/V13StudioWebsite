import type { SheetProject } from '@/lib/content'

interface Labels {
  client: string
  role: string
  challenge: string
  result: string
  viewProject: string
}

/**
 * Detailed, scrollable breakdown of every project, shown below the carousel on
 * /work. Each entry renders all the fields the Sheet provides — full (untruncated)
 * description, optional image, client/role, challenge/result — degrading
 * gracefully when an optional field is absent.
 */
export function ProjectDetailList({
  projects,
  labels,
}: {
  projects: SheetProject[]
  labels: Labels
}) {
  return (
    <div className="space-y-14">
      {projects.map((p, i) => (
        <article
          key={p.id}
          className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* meta column */}
          <div>
            <span className="font-mono text-[11px] text-[#9a82d6]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3
              className="mt-3 text-3xl leading-tight text-white sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {p.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              {p.year ? <span>{p.year}</span> : null}
              {p.year && p.category ? <span className="h-1 w-1 rounded-full bg-white/30" /> : null}
              {p.category ? <span>{p.category}</span> : null}
            </div>

            {p.client || p.role ? (
              <dl className="mt-6 space-y-3">
                {p.client ? (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {labels.client}
                    </dt>
                    <dd className="mt-0.5 text-sm text-white/75">{p.client}</dd>
                  </div>
                ) : null}
                {p.role ? (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {labels.role}
                    </dt>
                    <dd className="mt-0.5 text-sm text-white/75">{p.role}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {p.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#9268f6] transition-opacity hover:opacity-80"
              >
                {labels.viewProject}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : null}
          </div>

          {/* content column */}
          <div>
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={p.title}
                className="mb-6 aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover"
              />
            ) : null}
            {p.description ? (
              <p className="text-base leading-relaxed text-white/70">{p.description}</p>
            ) : null}

            {p.challenge ? (
              <div className="mt-6 border-l-2 border-[#9268f6]/50 pl-5">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a82d6]">
                  {labels.challenge}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.challenge}</p>
              </div>
            ) : null}
            {p.result ? (
              <div className="mt-5 border-l-2 border-white/15 pl-5">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {labels.result}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.result}</p>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
