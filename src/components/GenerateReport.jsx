import { useNavigate } from 'react-router-dom'

function GenerateReport({ changes, projectName }) {
  const navigate = useNavigate()

  const lastWeek = Math.max(...changes.map(c => c.week))

  const statusConfig = {
    'in-review': { color: '#4A3878', label: 'In review' },
    'approved': { color: '#1B4332', label: 'Approved' },
  }

  return (
    <div style={{
      background: 'linear-gradient(160deg, #E4F2EB 0%, #EFF8F3 100%)',
      borderRadius: '14px',
      border: '0.5px solid rgba(27,67,50,0.16)',
      overflow: 'hidden',
    }}>

      {/* Top：Title + pills */}
      <div style={{
        padding: '16px 20px 13px',
        borderBottom: '0.5px solid rgba(27,67,50,0.09)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          marginBottom: '6px',
        }}>
          {/* Sparkle icon */}
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: '#1B4332',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v2M6 9v2M1 6h2M9 6h2M2.5 2.5l1.5 1.5M8 8l1.5 1.5M8 4L9.5 2.5M2.5 9.5L4 8"
                stroke="#6EE7B7"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1B4332',
              marginBottom: '3px',
            }}>
              Generate site report
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(27,67,50,0.5)',
              lineHeight: '1.5',
            }}>
              Turn all changes into a formal report for architects and clients.
            </div>
          </div>
        </div>

        {/* Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingLeft: '38px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '500',
            color: '#1B4332',
            background: 'rgba(27,67,50,0.08)',
            border: '0.5px solid rgba(27,67,50,0.14)',
            padding: '2px 9px',
            borderRadius: '20px',
          }}>
            {changes.length} changes
          </div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(27,67,50,0.5)',
            background: 'rgba(27,67,50,0.05)',
            border: '0.5px solid rgba(27,67,50,0.1)',
            padding: '2px 9px',
            borderRadius: '20px',
          }}>
            Last updated · W{lastWeek}
          </div>
        </div>
      </div>

      {/* Changes list */}
      {changes.map((change, index) => (
        <div key={index} style={{
          padding: '8px 20px',
          borderTop: '0.5px solid rgba(27,67,50,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontSize: '11px',
            color: 'rgba(27,67,50,0.55)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#1B4332',
              opacity: 0.4,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '10px',
              color: 'rgba(27,67,50,0.35)',
              fontWeight: '500',
            }}>
              W{change.week}
            </span>
            {change.title}
          </div>
          <div style={{
            fontSize: '11px',
            color: statusConfig[change.status]?.color,
          }}>
            {statusConfig[change.status]?.label}
          </div>
        </div>
      ))}

      {/* bottom: hints + botton */}
      <div style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
      }}>
        <div style={{
          fontSize: '11px',
          color: 'rgba(0,0,0,0.28)',
          textAlign: 'center',
          lineHeight: '1.55',
        }}>
          All {changes.length} changes will be included. You can regenerate at any time as new changes are added.
        </div>
        <button
          onClick={() => navigate(`/report/${encodeURIComponent(projectName)}`)}
          style={{
            width: '100%',
            background: '#1B4332',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '500',
            padding: '13px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M9.8 4.2l1.4-1.4M2.8 11.2l1.4-1.4"
              stroke="#fff"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Generate site report
        </button>
      </div>

    </div>
  )
}

export default GenerateReport