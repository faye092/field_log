const PHASES = [
  'Site Setup',
  'Structure', 
  'Envelope',
  'MEP Installation',
  'Finishing',
  'Handover',
]

function Timeline({ currentWeek, totalWeeks, currentPhase }) {
  // calculate which phrase
  const currentPhaseIndex = PHASES.indexOf(currentPhase)
  const totalDots = PHASES.length + 1

  return (
    <div style={{ paddingTop: '32px', position: 'relative' }}>

      {/* W12 flag */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: `${(currentPhaseIndex + 0.5) / PHASES.length * 100}%`,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
      }}>
        <div style={{
          background: '#8A6320',
          color: '#fff',
          fontSize: '10px',
          fontWeight: '500',
          padding: '2px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
        }}>
          W{currentWeek} · now
        </div>
        <div style={{
          width: '2 px',
          height: '10px',
          background: 'rgba(138,99,32,0.4)',
        }} />
      </div>

      {/* progress track */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {Array.from({length:totalDots}).map((_, dotIndex) => {
          const dotDone = dotIndex <= currentPhaseIndex
          const dotActive = dotIndex === currentPhaseIndex + 1
          const barDone = dotIndex < currentPhaseIndex
          const barActive = dotIndex === currentPhaseIndex
          const isLastDot = dotIndex === totalDots - 1

          return (
            <div key={dotIndex} style={{ display: 'flex', alignItems: 'center', flex: isLastDot ? 0 : 1 }}>
              {/* point dot */}
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: dotDone ? '#1B4332' : dotActive ? '#8A6320' : 'rgba(0,0,0,0.2)',
                border: '2px solid #fff',
                flexShrink: 0,
                zIndex: 1,
                boxShadow: dotActive ? '0 0 0 3px rgba(138,99,32,0.15)' : 'none',
              }} />

              {/* the connection line */}
              {!isLastDot && (
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: barDone
                    ? '#2D6A4F'
                    : barActive
                    ? 'rgba(45,106,79,0.2)'
                    : 'rgba(0,0,0,0.06)',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* phrase label */}
      <div style={{ display: 'flex', marginTop: '8px' }}>
        {PHASES.map((phase, index) => {
          const isActive = index === currentPhaseIndex
          const isDone = index < currentPhaseIndex
          return (
            <div key={phase} style={{
              flex: 1,
              fontSize: '12px',
              textAlign: 'center',
              color: isActive
                ? '#1B4332'
                : isDone
                ? 'rgba(45,106,79,0.8)'
                : 'rgba(0,0,0,0.55)',
              fontWeight: isActive ? '500' : '400',
            }}>
              {phase}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Timeline