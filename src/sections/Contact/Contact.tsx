import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { Button } from '../../components/Button/Button'
import { profileData } from '../../data/profile'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState(
    'This form is a front-end demo and is not connected to an email backend. Use the direct email link or copy button above.',
  )

  useEffect(() => {
    if (!sectionRef.current) return
    return animateSectionReveals(sectionRef.current)
  }, [])

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profileData.email)
      } else {
        const input = document.createElement('input')
        input.value = profileData.email
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatusMessage(
      'No message was sent: this form is a front-end demo without an email backend. Please email wenesbenedict@gmail.com directly.',
    )
    e.currentTarget.reset()
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      className="relative z-10 overflow-hidden border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-primary)] py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="halftone-corner-cyan pointer-events-none absolute -right-20 -bottom-28 h-80 w-80 opacity-20"
      />

      <div className="lab-container relative z-10">
        <div data-reveal className="max-w-4xl">
          <p className="font-mono-tech mb-3 flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            <span className="text-[var(--accent-red)]">06</span>
            <span>//</span>
            <span>End of transmission</span>
          </p>

          <h2
            id="contact-title"
            data-cursor="glitch"
            className="glitch-hover font-display w-fit text-[clamp(2.8rem,8vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.06em] text-[var(--text-primary)]"
          >
            LET&apos;S BUILD <br />
            SOMETHING <span className="text-[var(--accent-cyan)]">REAL</span>
            <span className="text-[var(--accent-red)]">.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Open to internships, software engineering roles, and collaborative AI/ML or computer vision builds.
          </p>
        </div>

        {/* Interactive Channel Strip */}
        <div
          data-reveal
          className="mt-12 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]"
        >
          {/* Email Row with Copy Action */}
          <div className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center">
            <a
              href={`mailto:${profileData.email}`}
              data-cursor="open"
              className="group flex flex-wrap items-baseline gap-4 sm:gap-10"
            >
              <span className="font-mono-tech w-20 text-xs uppercase tracking-[0.1em] text-[var(--text-quiet)]">
                Email
              </span>
              <span className="font-display text-xl font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-cyan)] sm:text-2xl">
                {profileData.email}
              </span>
            </a>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-cursor="copy"
                onClick={handleCopyEmail}
                className="font-mono-tech inline-flex items-center gap-2 border border-[var(--border-subtle)] px-3.5 py-2 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[var(--accent-cyan)]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GitHub & LinkedIn Rows */}
          {[
            {
              label: 'GitHub',
              value: profileData.githubHandle,
              href: profileData.githubUrl,
            },
            {
              label: 'LinkedIn',
              value: profileData.linkedinHandle,
              href: profileData.linkedinUrl,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-[var(--accent-cyan)]"
            >
              <div className="flex flex-wrap items-baseline gap-4 sm:gap-10">
                <span className="font-mono-tech w-20 text-xs uppercase tracking-[0.1em] text-[var(--text-quiet)]">
                  {item.label}
                </span>
                <span className="font-display text-xl font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-cyan)] sm:text-2xl">
                  {item.value}
                </span>
              </div>
              <ArrowUpRight
                size={20}
                className="shrink-0 text-[var(--accent-red)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>

        {/* Toggleable Front-end Demo Composer */}
        <div data-reveal className="mt-8">
          <button
            type="button"
            onClick={() => setComposerOpen((prev) => !prev)}
            className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)] underline decoration-[var(--accent-red)] underline-offset-4 transition-colors hover:text-[var(--accent-cyan)]"
          >
            {composerOpen ? 'Hide message composer ↑' : 'Open front-end message composer ↓'}
          </button>

          {composerOpen && (
            <div className="mt-6 max-w-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8">
              <p className="font-mono-tech mb-4 text-[0.6rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
                FRONT-END DEMO COMPOSER // NO EMAIL BACKEND
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold text-[#b8b6bf]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full border border-[rgba(245,242,234,0.12)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-quiet)] focus:border-[var(--accent-cyan)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold text-[#b8b6bf]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full border border-[rgba(245,242,234,0.12)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-quiet)] focus:border-[var(--accent-cyan)] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-semibold text-[#b8b6bf]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Write your message..."
                    required
                    className="min-h-[104px] w-full resize-y border border-[rgba(245,242,234,0.12)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-quiet)] focus:border-[var(--accent-cyan)] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" className="w-full justify-between">
                    Prepare message
                  </Button>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs leading-relaxed text-[var(--text-secondary)] sm:col-span-2"
                >
                  {statusMessage}
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
