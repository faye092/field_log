import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const reportsData = {
  'Schwabing West Renovation': {
    projectName: 'Schwabing West Renovation',
    location: 'Munich, Germany',
    phase: 'MEP Installation Phase',
    projectRef: 'SWR-2026-01',
    currentWeek: 12,
    visitDate: '16 Apr 2026',
    preparedBy: 'Architect',
    parties: 'Architect · Contractor · Client',
    summary: 'During the site visit in Week 12, three changes were identified across the MEP Installation phase. A plumbing conflict was discovered in the kitchen requiring rerouting, and a handrail alignment discrepancy was noted in the stairwell. A previously agreed colour change has been approved with no cost impact. Coordination with the contractor is required before the plumbing rerouting can proceed.',
    changes: [
      {
        id: 1,
        title: 'Kitchen plumbing conflict',
        status: 'in-review',
        week: 12,
        location: 'Kitchen · L1',
        raisedBy: 'Contractor',
        cost: '+€2,000',
        what: 'Kitchen plumbing plan requires adjusting to fit around existing pipes found during MEP installation.',
        solution: 'Reroute plumbing through the adjacent wall space.',
      },
      {
        id: 2,
        title: 'Handrail colour change',
        status: 'approved',
        week: 10,
        location: 'Stairwell · L2',
        raisedBy: 'Architect',
        cost: null,
        what: 'Handrail colour updated to deep grey per client request to match facade.',
        solution: 'Change to deep grey. Black also acceptable as alternative. No cost impact.',
      },
      {
        id: 3,
        title: 'Handrail alignment discrepancy',
        status: 'in-review',
        week: 12,
        location: 'Stairwell · L2',
        raisedBy: 'Architect',
        cost: null,
        what: 'Handrail alignment at stairwell does not match approved drawings.',
        solution: 'Pending contractor clarification and proposed correction plan.',
      },
    ],
    nextActions: [
      { owner: 'Contractor', ref: '#1', text: 'Confirm rerouting plan and finalise cost estimate for kitchen plumbing conflict' },
      { owner: 'Architect', ref: '#1', text: 'Notify client of estimated cost increase +€2,000 pending confirmation' },
      { owner: 'Contractor', ref: '#3', text: 'Provide correction plan for handrail alignment discrepancy at stairwell Level 2' },
    ],
  },

  'Neumann Office Fit-out': {
    projectName: 'Neumann Office Fit-out',
    location: 'Munich, Germany',
    phase: 'Structure Phase',
    projectRef: 'NOF-2026-01',
    currentWeek: 6,
    visitDate: '10 Apr 2026',
    preparedBy: 'Architect',
    parties: 'Architect · Contractor · Client',
    summary: 'During the site visit in Week 6, one structural alignment issue was identified. The project remains on track with no cost impact recorded to date.',
    changes: [
        {
        id: 1,
        title: 'Column alignment check',
        status: 'approved',
        week: 5,
        location: 'Ground Floor',
        raisedBy: 'Architect',
        cost: null,
        what: 'Minor column alignment deviation noted during structural inspection.',
        solution: 'Adjustment made on site, within tolerance. No further action required.',
        },
    ],
    nextActions: [
        { owner: 'Architect', ref: '#1', text: 'Confirm alignment sign-off with structural engineer' },
    ],
    },
    'Giesing Residential Block': {
    projectName: 'Giesing Residential Block',
    location: 'Munich, Germany',
    phase: 'Finishing Phase',
    projectRef: 'GRB-2025-01',
    currentWeek: 18,
    visitDate: '5 Apr 2026',
    preparedBy: 'Architect',
    parties: 'Architect · Contractor · Client',
    summary: 'During the site visit in Week 18, two changes were identified in the finishing phase. A floor material upgrade was requested by the client, and a window specification change was approved with no cost impact.',
    changes: [
        {
        id: 1,
        title: 'Floor material upgrade',
        status: 'in-review',
        week: 17,
        location: 'Level 1 · Living Room',
        raisedBy: 'Client',
        cost: '+€5,000',
        what: 'Client requested upgrade from standard to premium floor material.',
        solution: 'Pending cost confirmation from contractor before proceeding.',
        },
        {
        id: 2,
        title: 'Window spec change',
        status: 'approved',
        week: 15,
        location: 'Level 2 · Bedroom',
        raisedBy: 'Architect',
        cost: null,
        what: 'Window specification updated to match revised facade design.',
        solution: 'Updated spec sent to contractor. No cost impact.',
        },
    ],
    nextActions: [
        { owner: 'Contractor', ref: '#1', text: 'Provide cost estimate for floor material upgrade' },
        { owner: 'Architect', ref: '#1', text: 'Notify client of cost estimate once received' },
    ],
    },
}

function ReportPreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const report = reportsData[decodeURIComponent(id)]

  if (!report) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <TopBar />
        <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.4)' }}>
          Report not found
        </div>
      </div>
    )
  }

  const totalCost = report.changes
    .filter(c => c.cost)
    .reduce((sum, c) => {
      const num = parseInt(c.cost.replace(/[^0-9]/g, ''))
      return sum + (c.cost.includes('+') ? num : -num)
    }, 0)

  const inReview = report.changes.filter(c => c.status === 'in-review').length
  const approved = report.changes.filter(c => c.status === 'approved').length

  const statusConfig = {
    'in-review': { color: '#4A3878', bg: 'rgba(70,55,110,0.07)', border: 'rgba(70,55,110,0.12)', label: 'In review' },
    'approved': { color: '#1B4332', bg: 'rgba(27,67,50,0.07)', border: 'rgba(27,67,50,0.12)', label: 'Approved' },
  }

  const sectionTitle = (text) => (
    <div style={{
      fontSize: '14px', fontWeight: '500',
      color: 'rgba(0,0,0,0.5)',
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      marginBottom: '14px',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      {text}
      <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar
        backTo={`/project/${encodeURIComponent(report.projectName)}`}
        backLabel="Project"
      />
      <div style={{
        padding: '24px',
        background: 'linear-gradient(180deg, #EEF1EC 0%, #F4F6F2 80px)',
        minHeight: 'calc(100vh - 60px)',
        maxHeight:'900px',
        margin:'0 auto',
      }}>

        {/* Report Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #3A7A5C 100%)',
          borderRadius: '14px',
          padding: '24px 28px',
          marginBottom: '14px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div>
              <div style={{
                fontSize: '12px', fontWeight: '500',
                color: 'rgba(110,231,183,0.7)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '6px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6EE7B7' }} />
                Site Report
              </div>
              <div style={{ fontSize: '20px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                {report.projectName}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                {report.location} · {report.phase}
              </div>
              <div style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', gap: '5px',
                marginTop: '4px',
              }}>
                <div style={{ width: '6px', height: '5px', borderRadius: '50%', background: '#6EE7B7', opacity: 0.6 }} />
                Week {report.currentWeek} · Generated just now
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '9px', color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                Project ref
              </div>
              <div style={{
                fontSize: '13px', fontWeight: '500',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'monospace',
              }}>
                {report.projectRef}
              </div>
            </div>
          </div>

          {/* Meta pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'Prepared by', value: report.preparedBy },
              { label: 'Site visit', value: `Week ${report.currentWeek} · ${report.visitDate}` },
              { label: 'Parties', value: report.parties },
            ].map(pill => (
              <div key={pill.label} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'rgba(255,255,255,0.1)',
                border: '0.5px solid rgba(255,255,255,0.15)',
                padding: '4px 10px', borderRadius: '20px',
              }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{pill.label}</div>
                <div style={{ fontSize: '11px', fontWeight: '500', color: '#fff' }}>{pill.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '20px 22px',
          marginBottom: '12px',
        }}>
          {sectionTitle('Summary')}
          <div style={{
            fontSize: '12px', fontWeight: '500',
            color: '#1B4332',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1B4332' }} />
            Key findings
          </div>
          <div style={{
            fontSize: '13px', color: '#2a2a2a',
            lineHeight: '1.75', marginBottom: '16px',
          }}>
            {report.summary}
          </div>

          {/* Cost highlight */}
          {totalCost>0 && (
            <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(138,99,32,0.05)',
            border: '0.5px solid rgba(138,99,32,0.14)',
            borderRadius: '10px', padding: '12px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: 'rgba(138,99,32,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v4M7 9v1" stroke="#8A6320" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="7" cy="7" r="5.5" stroke="#8A6320" strokeWidth="1.2"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(138,99,32,0.6)', marginBottom: '2px' }}>
                  Cost increase identified
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(138,99,32,0.4)' }}>
                  Pending contractor confirmation
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: '500', color: '#7A5518' }}>
                +€{totalCost.toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(138,99,32,0.5)', marginTop: '2px' }}>
                estimated
              </div>
            </div>
          </div>)}
        </div>

        {/* Changes */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '20px 22px',
          marginBottom: '12px',
        }}>
          {sectionTitle('Changes included')}
          {report.changes.map((change, index) => {
            const s = statusConfig[change.status]
            return (
              <div key={change.id} style={{
                paddingTop: index === 0 ? 0 : '18px',
                paddingBottom: '18px',
                borderTop: index === 0 ? 'none' : '0.5px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'space-between', marginBottom: '10px',
                }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', marginBottom: '3px' }}>
                      Change #{change.id}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>
                      {change.title}
                    </div>
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', padding: '3px 9px', borderRadius: '20px',
                    color: s.color, background: s.bg,
                    border: `0.5px solid ${s.border}`,
                    marginLeft: '12px', flexShrink: 0,
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.color }} />
                    {s.label}
                  </div>
                </div>

                {/* Fields */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
                  gap: '8px 12px', marginBottom: '12px',
                }}>
                  {[
                    { label: 'Week', value: `W${change.week}` },
                    { label: 'Location', value: change.location },
                    { label: 'Raised by', value: change.raisedBy },
                    { label: 'Cost', value: change.cost || 'No change', isCost: !!change.cost },
                  ].map(field => (
                    <div key={field.label}>
                      <div style={{
                        fontSize: '9px', color: 'rgba(0,0,0,0.35)',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '3px',
                      }}>
                        {field.label}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: field.isCost ? '#7A5518' : '#444',
                        fontWeight: field.isCost ? '500' : '400',
                      }}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  borderTop: '0.5px solid rgba(0,0,0,0.04)', paddingTop: '10px',
                }}>
                  {[
                    { label: 'What happened', value: change.what },
                    { label: 'Proposed solution', value: change.solution },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{
                        fontSize: '9px', color: 'rgba(0,0,0,0.35)',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '3px',
                      }}>
                        {row.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6' }}>
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Next actions */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '20px 22px',
          marginBottom: '12px',
        }}>
          {sectionTitle('Next actions')}
          {report.nextActions.map((action, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: index === 0 ? '0 0 10px' : '10px 0',
              borderTop: index === 0 ? 'none' : '0.5px solid rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'rgba(27,67,50,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: '500', color: '#1B4332',
                flexShrink: 0,
              }}>
                {index + 1}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: '500', color: '#1B4332',
                    background: 'rgba(27,67,50,0.07)',
                    border: '0.5px solid rgba(27,67,50,0.12)',
                    padding: '2px 8px', borderRadius: '4px',
                  }}>
                    {action.owner}
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>
                    · Change {action.ref}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#333', lineHeight: '1.55' }}>
                  {action.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report details */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          borderRadius: '14px',
          border: '0.5px solid rgba(0,0,0,0.07)',
          padding: '20px 22px',
          marginBottom: '12px',
        }}>
          {sectionTitle('Report details')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Total changes', value: report.changes.length, sub: `${inReview} in review · ${approved} approved` },
              { label: 'Cost impact', value: `+€${totalCost.toLocaleString()}`, sub: 'Estimated · subject to confirmation' },
              { label: 'Last site visit', value: `Week ${report.currentWeek}`, sub: report.visitDate },
            ].map(item => (
              <div key={item.label}>
                <div style={{
                  fontSize: '9px', color: 'rgba(0,0,0,0.35)',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  marginBottom: '4px',
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1B4332' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.28)', marginTop: '2px' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0 24px',
        }}>
          <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.25)' }}>
            Generated by FieldLog · {report.projectRef} · Week {report.currentWeek}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate(`/project/${encodeURIComponent(report.projectName)}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,0,0,0.05)',
                color: 'rgba(0,0,0,0.45)',
                fontSize: '13px', fontWeight: '500',
                padding: '11px 20px', borderRadius: '10px', border: 'none',
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: '#1B4332', color: '#fff',
              fontSize: '14px', fontWeight: '500',
              padding: '11px 20px', borderRadius: '10px', border: 'none',
              cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 7l3 3 3-3M2 11h10" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReportPreview