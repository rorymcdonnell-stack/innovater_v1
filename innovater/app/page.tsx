'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#172749', fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>
            Innovate<span style={{ color: '#F18B01' }}>R</span>
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(255,255,255,0.1)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
            v1 · Demo
          </span>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
          Glanbia &nbsp;·&nbsp; I&A Intelligence Engine
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 2.5rem 3.5rem', maxWidth: '900px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-200px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(241,139,1,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20px', right: '-120px', width: '340px', height: '340px', borderRadius: '50%', border: '1px solid rgba(255,200,45,0.08)', pointerEvents: 'none' }} />
        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#F18B01', marginBottom: '1.25rem' }}>
          Idea &nbsp;→&nbsp; Profit
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '700', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 1.25rem 0' }}>
          From first spark to<br />
          <span style={{ color: '#FFC82D' }}>commercial confidence.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: '600px', margin: '0 0 1rem 0' }}>
          InnovateR connects the full innovation journey — science-backed concept creation to data-driven commercial sizing — in a single AI-powered platform built for Glanbia.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: '580px', margin: '0 0 3rem 0' }}>
          Create and approve concepts in ConceptR. Export and size them in SizeR. Two phases. One platform. Idea to profit.
        </p>
      </section>

      {/* Two Phase Bridge */}
      <section style={{ padding: '0 2.5rem 3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Phase 1 — ConceptR */}
          <div style={{ padding: '2.5rem', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' as const }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#98BAC3', marginBottom: '0.5rem' }}>
              Phase 01 &nbsp;·&nbsp; Idea
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
              Concept<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
              Transform consumer insight and science into structured, investment-ready product concepts.
            </p>

            <div style={{ flex: 1, marginBottom: '2rem' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#98BAC3', marginBottom: '1rem' }}>What you get</div>
              {[
                '5Ws strategic brief',
                'Ingredient & nutrition panel',
                'Claims & RTBs',
                'Science confidence score',
                'Risk flags',
                'Export-ready concept PDF',
              ].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#98BAC3', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', lineHeight: 1.4 }}>{o}</span>
                </div>
              ))}
            </div>

            <a href="https://conceptr-acx1spv1i-rory-mc-donnell-s-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '15px', fontWeight: '700', color: '#172749',
              padding: '14px 28px', borderRadius: '10px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #98BAC3, #7aa8b3)',
              alignSelf: 'flex-start' as const,
            }}>
              Launch ConceptR ↗
            </a>
          </div>

          {/* Arrow bridge */}
          <div style={{ padding: '0 2rem', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '100px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', textAlign: 'center' as const, lineHeight: 1.6 }}>Export<br />PDF</div>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(241,139,1,0.2), #F18B01)' }} />
            <div style={{ fontSize: '22px', color: '#FFC82D' }}>→</div>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, #FFC82D, rgba(255,200,45,0.2))' }} />
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', textAlign: 'center' as const, lineHeight: 1.6 }}>Upload<br />to SizeR</div>
          </div>

          {/* Phase 2 — SizeR */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' as const }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#FFC82D', marginBottom: '0.5rem' }}>
              Phase 02 &nbsp;·&nbsp; Profit
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
              Size<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
              Upload an approved ConceptR PDF and size the commercial opportunity against real CODA category data.
            </p>

            <div style={{ flex: 1, marginBottom: '2rem' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#FFC82D', marginBottom: '1rem' }}>What you get</div>
              {[
                'TAM / SAM / SOM waterfall',
                '3-scenario P&L model',
                'Margin & payback analysis',
                'Commercial confidence score',
                'Go / Watch / Hold recommendation',
              ].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFC82D', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff', lineHeight: 1.4 }}>{o}</span>
                </div>
              ))}
            </div>

            <Link href="/sizer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '15px', fontWeight: '700', color: '#172749',
              padding: '14px 28px', borderRadius: '10px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #F18B01, #FFC82D)',
              alignSelf: 'flex-start' as const,
            }}>
              Launch SizeR →
            </Link>
          </div>
        </div>
      </section>

      {/* Integration logos */}
      <section style={{ padding: '0 2.5rem 4rem' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', marginBottom: '2rem', textAlign: 'center' as const }}>
          Built by Glanbia &nbsp;·&nbsp; Powered by
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap' as const }}>
          {[
            { src: '/glanbia.png', alt: 'Glanbia' },
            { src: '/anthropic.png', alt: 'Anthropic' },
            { src: '/consensus.png', alt: 'Consensus' },
            { src: '/bloomfire.png', alt: 'Bloomfire' },
            { src: '/niq.png', alt: 'NIQ' },
            { src: '/azure.png', alt: 'Azure' },
          ].map(logo => (
            <div key={logo.alt} style={{ opacity: 0.55, filter: 'brightness(0) invert(1)' }}>
              <img src={logo.src} alt={logo.alt} style={{ height: '26px', width: 'auto', objectFit: 'contain' as const }} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          Glanbia &nbsp;·&nbsp; Insights & Analytics &nbsp;·&nbsp; Internal platform — not for external distribution
        </div>
        <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', padding: '4px 10px', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}>
          InnovateR v1
        </div>
      </footer>
    </div>
  )
}
