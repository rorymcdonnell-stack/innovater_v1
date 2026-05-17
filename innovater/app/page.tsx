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
          Glanbia Performance Nutrition &nbsp;·&nbsp; I&A Intelligence Engine
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 2.5rem 3.5rem', maxWidth: '900px', position: 'relative' }}>
        {/* Aura graphic device */}
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
        <p style={{ fontSize: '1rem', fontWeight: '400', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '540px', margin: '0 0 2.5rem 0' }}>
          InnovateR connects the full innovation journey — science-backed concept creation to data-driven commercial sizing — in a single AI-powered platform built for GPN.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/sizer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #F18B01, #FFC82D)',
            color: '#172749', fontWeight: '700', fontSize: '14px',
            padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
            letterSpacing: '0.01em'
          }}>
            Open SizeR →
          </Link>
          <a href="https://conceptr-acx1spv1i-rory-mc-donnell-s-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'transparent', color: '#98BAC3', fontWeight: '400', fontSize: '14px',
            padding: '12px 24px', borderRadius: '8px', textDecoration: 'none',
            border: '1px solid rgba(152,186,195,0.3)'
          }}>
            Open ConceptR ↗
          </a>
        </div>
      </section>

      {/* Two Phase Bridge */}
      <section style={{ padding: '0 2.5rem 3.5rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>

          {/* Phase 1 — ConceptR */}
          <div style={{ padding: '2rem 2rem', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#98BAC3', marginBottom: '0.5rem' }}>
              Phase 01 &nbsp;·&nbsp; Idea
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.75rem' }}>
              Concept<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
              Transform consumer insight and science into structured, investment-ready product concepts. Brief → Ingredients → Claims → RTBs → Science confidence score.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '1.5rem' }}>
              {['Anthropic AI', 'Consensus', 'Bloomfire'].map(c => (
                <span key={c} style={{ fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(152,186,195,0.4)', color: '#98BAC3', background: 'rgba(152,186,195,0.08)', letterSpacing: '0.04em' }}>{c}</span>
              ))}
            </div>
            <a href="https://conceptr-acx1spv1i-rory-mc-donnell-s-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: '600', color: '#98BAC3',
              padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
              border: '1px solid rgba(152,186,195,0.3)', background: 'rgba(152,186,195,0.06)'
            }}>
              Launch ConceptR ↗
            </a>

            {/* Output examples */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem' }}>Outputs</div>
              {['5Ws strategic brief', 'Ingredient & nutrition panel', 'Claims & RTBs', 'Science confidence score', 'Risk flags'].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#98BAC3', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, rgba(241,139,1,0.2), #F18B01)' }} />
            <div style={{ fontSize: '18px', color: '#FFC82D' }}>→</div>
            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #FFC82D, rgba(255,200,45,0.2))' }} />
          </div>

          {/* Phase 2 — SizeR */}
          <div style={{ padding: '2rem 2rem' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#FFC82D', marginBottom: '0.5rem' }}>
              Phase 02 &nbsp;·&nbsp; Profit
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.75rem' }}>
              Size<span style={{ color: '#F18B01' }}>R</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
              Size the commercial opportunity with real category data. TAM/SAM/SOM → 3-scenario P&L → Commercial confidence score → Go / Watch / Hold recommendation.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '1.5rem' }}>
              {['Anthropic AI', 'CODA / Nielsen IQ', 'Glanbia Financials'].map(c => (
                <span key={c} style={{ fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(255,200,45,0.35)', color: '#FFC82D', background: 'rgba(255,200,45,0.07)', letterSpacing: '0.04em' }}>{c}</span>
              ))}
            </div>
            <Link href="/sizer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: '600', color: '#FFC82D',
              padding: '8px 16px', borderRadius: '8px', textDecoration: 'none',
              border: '1px solid rgba(255,200,45,0.3)', background: 'rgba(255,200,45,0.07)'
            }}>
              Launch SizeR →
            </Link>

            {/* Output examples */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem' }}>Outputs</div>
              {['TAM / SAM / SOM waterfall', '3-scenario P&L model', 'Margin & payback analysis', 'Commercial confidence score', 'Go / Watch / Hold recommendation'].map(o => (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFC82D', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{o}</span>
                </div>
              ))}
            </div>
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
            { phase: 'SizeR', phaseColor: '#FFC82D', name: 'CODA / Nielsen IQ', role: 'Category consumption data. NIQ, SPINS, Amazon, Costco — GPN\'s single source of truth for market sizing.', status: 'Route 1 — extract', statusColor: '#FFC82D' },
            { phase: 'SizeR', phaseColor: '#FFC82D', name: 'Glanbia Financials', role: 'COGS benchmarks, margin targets, trade spend parameters. Demo mode uses calibrated industry benchmarks.', status: 'Demo parameters', statusColor: 'rgba(255,255,255,0.3)' },
            { phase: 'Platform', phaseColor: 'rgba(255,255,255,0.25)', name: 'Azure + SSO', role: 'Production hosting with Azure AD single sign-on. Glanbia identity layer, data governance, access control.', status: 'Planned — production', statusColor: 'rgba(255,255,255,0.3)' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#172749', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: item.phaseColor, marginBottom: '0.4rem' }}>{item.phase}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{item.role}</div>
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
          Glanbia Performance Nutrition &nbsp;·&nbsp; Insights & Analytics &nbsp;·&nbsp; Internal platform — not for external distribution
        </div>
        <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', padding: '4px 10px', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}>
          InnovateR v1
        </div>
      </footer>
    </div>
  )
}
