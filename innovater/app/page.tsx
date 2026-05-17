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
        <div style={{
          position: 'absolute', top: '-60px', right: '-200px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '1px solid rgba(241,139,1,0.1)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '20px', right: '-120px',
          width: '340px', height: '340px', borderRadius: '50%',
          border: '1px solid rgba(255,200,45,0.08)', pointerEvents: 'none'
        }} />

        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#F18B01', marginBottom: '1.25rem' }}>
          Idea &nbsp;→&nbsp; Profit
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '700', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', marginBottom: '1.25rem', margin: '0 0 1.25rem 0' }}>
          From first spark to<br />
          <span style={{ color: '#FFC82D' }}>commercial confidence.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: '400', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: '600px', margin: '0 0 1rem 0' }}>
          InnovateR connects the full innovation journey — science-backed concept creation to data-driven commercial sizing — in a single AI-powered platform built for Glanbia.
        </p>
        <p style={{ fontSize: '1rem', fontWeight: '400', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: '580px', margin: '0 0 3rem 0' }}>
          Create and approve concepts in ConceptR. Export and size them in SizeR. Two phases. One platform. Idea to profit.
        </p>
      </section>

      {/* Two Phase Bridge — these are the primary CTAs */}
      <section style={{ padding: '0 2.5rem 3.5rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>

          {/* Phase 1 — ConceptR */}
          <div style={{ padding: '2.5rem 2.5rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#98BAC3', marginBottom: '0.5rem' }}>
              Phase 01 &nbsp;·&nbsp; Idea
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
              Concept<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              Transform consumer insight and science into structured, investment-ready product concepts. Brief → Ingredients → Claims → RTBs → Science confidence score.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '2rem' }}>
              {['Anthropic AI', 'Consensus', 'Bloomfire'].map(c => (
                <span key={c} style={{ fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', border: '0.5px solid rgba(152,186,195,0.4)', color: '#98BAC3', background: 'rgba(152,186,195,0.08)', letterSpacing: '0.04em' }}>{c}</span>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem' }}>Outputs</div>
              {['5Ws strategic brief', 'Ingredient & nutrition panel', 'Claims & RTBs', 'Science confidence score', 'Risk flags', 'Export-ready concept PDF'].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#98BAC3', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{o}</span>
                </div>
              ))}
            </div>

            <a href="https://conceptr-acx1spv1i-rory-mc-donnell-s-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: '700', color: '#172749',
              padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #98BAC3, #7aa8b3)'
            }}>
              Launch ConceptR ↗
            </a>
          </div>

          {/* Arrow */}
          <div style={{ padding: '0 2rem', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', marginBottom: '0.5rem', textAlign: 'center' as const }}>Export<br />PDF</div>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(241,139,1,0.2), #F18B01)' }} />
            <div style={{ fontSize: '20px', color: '#FFC82D', lineHeight: 1 }}>→</div>
            <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, #FFC82D, rgba(255,200,45,0.2))' }} />
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', marginTop: '0.5rem', textAlign: 'center' as const }}>Upload<br />to SizeR</div>
          </div>

          {/* Phase 2 — SizeR */}
          <div style={{ padding: '2.5rem 2.5rem' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#FFC82D', marginBottom: '0.5rem' }}>
              Phase 02 &nbsp;·&nbsp; Profit
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
              Size<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              Upload an approved ConceptR PDF and size the commercial opportunity against real CODA category data. TAM/SAM/SOM → 3-scenario P&L → Go / Watch / Hold.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '2rem' }}>
              {['Anthropic AI', 'CODA / Nielsen IQ', 'Glanbia Financials'].map(c => (
                <span key={c} style={{ fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', border: '0.5px solid rgba(255,200,45,0.35)', color: '#FFC82D', background: 'rgba(255,200,45,0.07)', letterSpacing: '0.04em' }}>{c}</span>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem' }}>Outputs</div>
              {['TAM / SAM / SOM waterfall', '3-scenario P&L model', 'Margin & payback analysis', 'Commercial confidence score', 'Go / Watch / Hold recommendation'].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFC82D', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{o}</span>
                </div>
              ))}
            </div>

            <Link href="/sizer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: '700', color: '#172749',
              padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #F18B01, #FFC82D)'
            }}>
              Launch SizeR →
            </Link>
          </div>
        </div>
      </section>

      {/* Integration layer */}
      <section style={{ padding: '0 2.5rem 4rem' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>
          Integration Layer
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { phase: 'ConceptR', phaseColor: '#98BAC3', name: 'Anthropic AI', role: 'Core reasoning engine across both phases. Concept generation, evidence synthesis, commercial sizing.', status: 'Live', statusColor: '#B3D680' },
            { phase: 'ConceptR', phaseColor: '#98BAC3', name: 'Consensus', role: 'Peer-reviewed science citations. Validates RTBs and ingredient claims against published evidence.', status: 'Planned — v3', statusColor: 'rgba(255,255,255,0.3)' },
            { phase: 'ConceptR', phaseColor: '#98BAC3', name: 'Bloomfire', role: 'GPN knowledge base. Consumer research, trend reports, category intelligence surfaced at brief stage.', status: 'Planned — v3', statusColor: 'rgba(255,255,255,0.3)' },
            { phase: 'SizeR', phaseColor: '#FFC82D', name: 'CODA / Nielsen IQ', role: 'Category consumption data. NIQ, SPINS, Amazon, Costco — Glanbia\'s single source of truth for market sizing.', status: 'Route 1 — extract', statusColor: '#FFC82D' },
            { phase: 'SizeR', phaseColor: '#FFC82D', name: 'Glanbia Financials', role: 'COGS benchmarks, margin targets, trade spend parameters. Demo mode uses calibrated industry benchmarks.', status: 'Demo parameters', statusColor: 'rgba(255,255,255,0.3)' },
            { phase: 'Platform', phaseColor: 'rgba(255,255,255,0.25)', name: 'Azure + SSO', role: 'Production hosting with Azure AD single sign-on. Glanbia identity layer, data governance, and access control.', status: 'Planned — production', statusColor: 'rgba(255,255,255,0.3)' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#172749', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: item.phaseColor, marginBottom: '0.4rem' }}>{item.phase}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{item.role}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.statusColor, flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: '600', color: item.statusColor, letterSpacing: '0.06em' }}>{item.status}</span>
              </div>
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
