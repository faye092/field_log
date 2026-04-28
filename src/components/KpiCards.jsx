function KpiCard({ label, value, sub, color }) {
    return (
      <div style={{
        background: 'rbga(255,255,255,0.82)',
        borderRadius:'10px',
        padding:'14px 14px 14px 18px',
        border:'0.5px solid rgba(0, 0, 0, 0.12)',
        position:'relative',
        overflow:'hidden'
      }}>
        {/* Left color bar */}
        <div style={{
          position:'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: color,
        }} />
        
        <div style={{fontSize:'12px', color:'rgba(0,0,0,0.42)', marginBottom:'7px'}}>
          {label}
        </div>
        <div style={{fontSize:'24px', fontWeight:'500', color:'#1a1a1a', lineHeight:1}}>
          {value}
        </div>
        <div style={{fontSize:'12px', marginTop:'5px', color:color}}>
          {sub}
        </div>
      </div>
    )
}

export default KpiCard