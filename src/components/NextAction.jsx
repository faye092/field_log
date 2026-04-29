function NextAction({ text }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #3A7A5C 100%)',
      borderRadius: '10px',
      padding: '12px 16px',
    }}>

      {/* left icon */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 3v4.5M7 10v.5"
            stroke="#6EE7B7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '500',
          color: 'rgba(110,231,183,0.7)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '3px',
        }}>
          Next action
        </div>
        <div style={{
          fontSize: '13px',
          color: '#fff',
          fontWeight: '500',
        }}>
          {text}
        </div>
      </div>

      {/* right arrow */}
      <div style={{
        fontSize: '15px',
        color: 'rgba(255,255,255,0.3)',
        flexShrink: 0,
      }}>
        →
      </div>

    </div>
  )
}

export default NextAction