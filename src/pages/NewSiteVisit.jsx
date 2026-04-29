import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

const FLOORS = ['Basement', 'Ground Floor', 'Level 1', 'Level 2', 'Level 3', 'Roof']
const ROOMS = ['Kitchen', 'Living Room', 'Bathroom', 'Bedroom', 'Stairwell', 'Corridor', 'Office', 'Storage']

function NewSiteVisit() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const projectName = params.get('project') || ''

  const [raisedBy, setRaisedBy] = useState('Architect')
  const [expandedId, setExpandedId] = useState(1)
  const [issues, setIssues] = useState([
    {
      id: 1,
      floor: '',
      room: '',
      what: '',
      reason: '',
      plan: '',
      cost: 'no-change',
      costAmount: '',
    }
  ])

  const initiators = ['Architect', 'Contractor', 'Client']

  const updateIssue = (id, field, value) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, [field]: value } : issue
    ))
  }

  const addIssue = () => {
    const newId = issues.length + 1
    setIssues([...issues, {
      id: newId,
      floor: '',
      room: '',
      what: '',
      reason: '',
      plan: '',
      cost: 'no-change',
      costAmount: '',
    }])
    setExpandedId(newId)
  }

  const removeIssue = (id) => {
    if (issues.length === 1) return
    setIssues(issues.filter(issue => issue.id !== id))
    setExpandedId(issues[0].id)
  }

  const fieldLabel = {
    fontSize: '10px',
    color: 'rgba(0,0,0,0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  }

  const fieldValue = {
    fontSize: '13px',
    color: '#111',
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'inherit',
    resize: 'none',
    lineHeight: '1.55',
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar backTo={`/project/${encodeURIComponent(projectName)}`} backLabel="Project" />
      <div style={{
        padding: '24px',
        background: 'linear-gradient(180deg, #EEF1EC 0%, #F4F6F2 60px)',
        minHeight: 'calc(100vh - 60px)',
        maxWidth: '860px',
        margin: '0 auto',
      }}>

        {/* Step header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
        }}>
          <div style={{
            width: '22px', height: '22px',
            borderRadius: '50%',
            background: '#1B4332',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            1
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1B4332' }}>
            Context
          </div>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.07)' }} />
        </div>

        {/* Step 1 card */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '0.5px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          {/* Project */}
          <div style={{ padding: '12px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.045)' }}>
            <div style={{
              fontSize: '10px',
              color: 'rgba(0,0,0,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Project
            </div>
            <div style={{
              fontSize: '14px',
              color: '#111',
              fontWeight: '500',
            }}>
              {projectName || 'No project selected'}
            </div>
          </div>

          {/* Raised by */}
          <div style={{ padding: '12px 16px' }}>
            <div style={{
              fontSize: '10px',
              color: 'rgba(0,0,0,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}>
              Raised by
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {initiators.map(initiator => (
                <button
                  key={initiator}
                  onClick={() => setRaisedBy(initiator)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: '10px',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                    fontSize: '14px',
                    fontWeight: raisedBy === initiator ? '500' : '400',
                    color: raisedBy === initiator ? '#fff' : 'rgba(0,0,0,0.35)',
                    background: raisedBy === initiator ? '#1B4332' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {initiator}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Issues */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#1B4332', color: '#fff',
            fontSize: '12px', fontWeight: '500',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>2</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1B4332' }}>Issues on site</div>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.07)' }} />
        </div>

        {issues.map((issue, index) => {
          const isExpanded = expandedId === issue.id

          return (
            <div key={issue.id} style={{
              background: '#fff',
              borderRadius: '12px',
              border: `0.5px solid ${isExpanded ? 'rgba(27,67,50,0.15)' : 'rgba(0,0,0,0.06)'}`,
              overflow: 'hidden',
              marginBottom: '10px',
            }}>
              {/* Issue header - 点击折叠/展开 */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isExpanded ? '#F4FAF7' : '#fff',
                  borderBottom: isExpanded ? '0.5px solid rgba(27,67,50,0.08)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* 完成状态图标 */}
                  {!isExpanded && issue.what ? (
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: '#1B4332',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : null}

                  {/* Issue badge */}
                  <div style={{
                    background: isExpanded ? '#1B4332' : 'rgba(27,67,50,0.1)',
                    color: isExpanded ? '#fff' : '#1B4332',
                    fontSize: '12px', fontWeight: '500',
                    padding: '2px 9px', borderRadius: '20px',
                  }}>
                    Issue {index + 1}
                  </div>

                  {/* 折叠时显示摘要 */}
                  {!isExpanded && (
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.35)' }}>
                      {[issue.room, issue.floor, issue.what].filter(Boolean).join(' · ') || 'No details yet'}
                    </div>
                  )}

                  {/* cost tag折叠时显示 */}
                  {!isExpanded && issue.cost === 'increase' && issue.costAmount && (
                    <div style={{
                      fontSize: '11px', fontWeight: '500',
                      color: '#7A5518',
                      background: 'rgba(138,99,32,0.08)',
                      border: '0.5px solid rgba(138,99,32,0.15)',
                      padding: '1px 7px', borderRadius: '20px',
                    }}>
                      +€{issue.costAmount}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* 删除按钮 */}
                  {issues.length > 1 && (
                    <div
                      onClick={(e) => { e.stopPropagation(); removeIssue(issue.id) }}
                      style={{
                        fontSize: '11px', color: 'rgba(0,0,0,0.25)',
                        padding: '2px 8px', borderRadius: '4px',
                        border: '0.5px solid rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </div>
                  )}
                  {/* 展开/折叠箭头 */}
                  <div style={{
                    fontSize: '12px', color: 'rgba(0,0,0,0.25)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                  }}>
                    ▾
                  </div>
                </div>
              </div>

              {/* Issue body - 展开时显示 */}
              {isExpanded && (
                <div>
                  {/* Floor + Room */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
                  }}>
                    <div style={{ padding: '10px 16px', borderRight: '0.5px solid rgba(0,0,0,0.5)' }}>
                      <div style={fieldLabel}>Floor <span style={{ color: 'rgba(0,0,0,0.5)' }}>optional</span></div>
                      <select
                        value={issue.floor}
                        onChange={e => updateIssue(issue.id, 'floor', e.target.value)}
                        style={{ ...fieldValue, color: issue.floor ? '#111' : 'rgba(0,0,0,0.5)' }}
                      >
                        <option value="">Select</option>
                        {FLOORS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div style={{ padding: '10px 16px' }}>
                      <div style={fieldLabel}>Room / Area <span style={{ color: 'rgba(0,0,0,0.045)' }}>optional</span></div>
                      <select
                        value={issue.room}
                        onChange={e => updateIssue(issue.id, 'room', e.target.value)}
                        style={{ ...fieldValue, color: issue.room ? '#111' : 'rgba(0,0,0,0.5)' }}
                      >
                        <option value="">Select</option>
                        {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* What happened */}
                  <div style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.045)' }}>
                    <div style={fieldLabel}>What needs to change</div>
                    <textarea
                      rows={2}
                      placeholder="Describe the change required…"
                      value={issue.what}
                      onChange={e => updateIssue(issue.id, 'what', e.target.value)}
                      style={fieldValue}
                    />
                  </div>

                  {/* Reason */}
                  <div style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.045)' }}>
                    <div style={fieldLabel}>Reason</div>
                    <textarea
                      rows={2}
                      placeholder="What caused this?"
                      value={issue.reason}
                      onChange={e => updateIssue(issue.id, 'reason', e.target.value)}
                      style={fieldValue}
                    />
                  </div>

                  {/* Alternative plan */}
                  <div style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.045)' }}>
                    <div style={fieldLabel}>Alternative plan</div>
                    <textarea
                      rows={2}
                      placeholder="Proposed solution or workaround…"
                      value={issue.plan}
                      onChange={e => updateIssue(issue.id, 'plan', e.target.value)}
                      style={fieldValue}
                    />
                  </div>

                  {/* Cost impact */}
                  <div style={{ padding: '10px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.045)' }}>
                    <div style={fieldLabel}>Cost impact</div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                      {['no-change', 'increase', 'decrease'].map(type => (
                        <button
                          key={type}
                          onClick={() => updateIssue(issue.id, 'cost', type)}
                          style={{
                            flex: 1, padding: '7px 0',
                            borderRadius: '6px',
                            border: '0.5px solid rgba(0,0,0,0.08)',
                            fontSize: '14px',
                            fontWeight: issue.cost === type ? '500' : '400',
                            color: issue.cost === type
                              ? type === 'no-change' ? 'rgba(0,0,0,0.5)' : '#7A5518'
                              : 'rgba(0,0,0,0.32)',
                            background: issue.cost === type
                              ? type === 'no-change' ? 'rgba(0,0,0,0.04)' : 'rgba(138,99,32,0.09)'
                              : 'transparent',
                            cursor: 'pointer',
                          }}
                        >
                          {type === 'no-change' ? 'No change' : type === 'increase' ? 'Increase' : 'Decrease'}
                        </button>
                      ))}
                    </div>
                    {issue.cost !== 'no-change' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#7A5518', fontWeight: '500' }}>
                          {issue.cost === 'increase' ? '+' : '-'}€
                        </span>
                        <input
                          type="number"
                          placeholder="0"
                          value={issue.costAmount}
                          onChange={e => updateIssue(issue.id, 'costAmount', e.target.value)}
                          style={{
                            ...fieldValue,
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#7A5518',
                            width: '120px',
                          }}
                        />
                        <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)' }}>
                          Estimated · subject to confirmation
                        </span>
                      </div>
                    )}
                    {issue.cost === 'no-change' && (
                      <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>No cost impact</div>
                    )}
                  </div>

                  {/* Add photo */}
                  <div style={{
                    padding: '10px 16px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      background: '#F2F3F1',
                      border: '0.5px solid rgba(0,0,0,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="4" width="14" height="10" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2"/>
                        <circle cx="8" cy="9" r="2.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2"/>
                        <path d="M5 4l1-2h4l1 2" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>Add photo</div>
                      <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', marginTop: '1px' }}>
                        Optional · helps document the issue
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Add another issue */}
        <div
          onClick={addIssue}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '7px', padding: '13px',
            background: '#fff', borderRadius: '12px',
            border: '0.5px dashed rgba(27,67,50,0.22)',
            color: '#1B4332', fontSize: '14px', fontWeight: '500',
            cursor: 'pointer', marginBottom: '20px',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add another issue · e.g. new room or problem
        </div>

        {/* Step 3: Cost summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#1B4332', color: '#fff',
            fontSize: '12px', fontWeight: '500',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>3</div>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1B4332' }}>Cost summary</div>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.07)' }} />
        </div>

        <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '0.5px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
        marginBottom: '12px',
        }}>
        {/* 每个issue的cost */}
        {issues.map((issue, index) => {
            const hasCost = issue.cost !== 'no-change' && issue.costAmount
            const costLabel = hasCost
            ? `${issue.cost === 'increase' ? '+' : '-'}€${issue.costAmount}`
            : 'No change'

            return (
            <div key={issue.id} style={{
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '0.5px solid rgba(0,0,0,0.045)',
            }}>
                <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '12px', color: 'rgba(0,0,0,0.55)',
                }}>
                <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.2)', flexShrink: 0,
                }} />
                Issue {index + 1}
                {issue.room && ` · ${issue.room}`}
                {issue.what && ` · ${issue.what.slice(0, 30)}${issue.what.length > 30 ? '...' : ''}`}
                </div>
                <div style={{
                fontSize: '12px',
                fontWeight: hasCost ? '500' : '400',
                color: hasCost ? '#7A5518' : 'rgba(0,0,0,0.3)',
                }}>
                {costLabel}
                </div>
            </div>
            )
        })}

        {/* Total */}
        <div style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#111' }}>
                Total estimated impact
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.5)', marginTop: '2px' }}>
                Estimated · subject to confirmation
            </div>
            </div>
            <div style={{
            fontSize: '16px',
            fontWeight: '500',
            color: (() => {
                const total = issues.reduce((sum, issue) => {
                if (issue.cost === 'increase' && issue.costAmount) return sum + Number(issue.costAmount)
                if (issue.cost === 'decrease' && issue.costAmount) return sum - Number(issue.costAmount)
                return sum
                }, 0)
                return total > 0 ? '#7A5518' : total < 0 ? '#1B4332' : 'rgba(0,0,0,0.3)'
            })(),
            }}>
            {(() => {
                const total = issues.reduce((sum, issue) => {
                if (issue.cost === 'increase' && issue.costAmount) return sum + Number(issue.costAmount)
                if (issue.cost === 'decrease' && issue.costAmount) return sum - Number(issue.costAmount)
                return sum
                }, 0)
                if (total === 0) return 'No cost impact'
                return `${total > 0 ? '+' : '-'}€${Math.abs(total).toLocaleString()}`
            })()}
            </div>
        </div>
        </div>

        {/* 提示文字 */}
        <div style={{
        background: 'rgba(27,67,50,0.04)',
        border: '0.5px solid rgba(27,67,50,0.1)',
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        marginBottom: '16px',
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '1px', opacity: 0.4 }}>
            <circle cx="7" cy="7" r="5.5" stroke="#1B4332" strokeWidth="1.2"/>
            <path d="M7 6v4M7 4.5v.5" stroke="#1B4332" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <div style={{ fontSize: '12px', color: 'rgba(27,67,50,0.55)', lineHeight: '1.55' }}>
            Changes are saved to the project. You can continue adding more after submission.{' '}
            <span style={{ fontWeight: '500', color: '#1B4332' }}>
            Generate a formal site report anytime from the project page.
            </span>
        </div>
        </div>

        {/* 底部按钮 */}
        <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        paddingBottom: '24px',
        }}>
        <button style={{
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(0,0,0,0.05)',
            color: 'rgba(0,0,0,0.38)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
        }}>
            Save draft
        </button>
        <button style={{
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: '#1B4332',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
        }}>
            Submit changes
        </button>
        </div>

      </div>
    </div>
  )
}

export default NewSiteVisit