/** Small section heading: mono eyebrow over an uppercase title. */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title: string
}) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#9268f6]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.18em] text-white sm:text-3xl">
        {title}
      </h2>
    </div>
  )
}
