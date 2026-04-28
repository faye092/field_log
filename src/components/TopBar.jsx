import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function TopBar({backTo, backLabel}) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = [
    {label:'Dashboard', path:'/'},
    {label:'Projects', path:'/projects'},
    {label:'Reports', path:'/reports'},
  ]
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
        <div style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor:'pointer'
        }} onClick={() => navigate('/')}>
          <div style={{
            width:'26px',
            height:'26px',
            background:'rgba(255,255,255,0.12)',
            borderRadius:'6px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }} >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="5" width="10" height="2" rx="1" fill="#6EE7B7"/>
              <rect x="4" y="2" width="2" height="8" rx="1" fill="#6EE7B7"/>
            </svg>
          </div>
          FieldLog
        </div>
        {/* back button */}
        {backTo ? (
          <div
            onClick={() => navigate(backTo)}
            style={{
              display:'flex',
              alignItems:'center',
              gap:'5px',
              color:'rgba(255,255,255,0.85)',
              fontSize:'14px',
              cursor:'pointer',
            }}
          >
            ← {backLabel}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '4px' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const isHovered = hoveredItem === item.label
              return (
                <div 
                  key={item.label} 
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    color: isActive || isHovered ? '#fff' :'rgba(255,255,255,0.45)',
                    fontSize:'14px',
                    padding:'7px 14px',
                    borderRadius:'6px',
                    background: isActive ? 'rgba(255,255,255,0.1)' : 
                                isHovered ? 'rgba(255,255,255,0.06)' :
                                'transparent',
                    cursor:'pointer',
                    transition: 'all 0.15s ease',
                    fontWeight: isActive ? '600' :'400'
                }}>
                  {item.label}
              </div>
              )
            })}
          </div>
        )}
      </div>
       <div style={{
        width:'28px',
        height: '28px',
        borderRadius:'50%',
        background:'rgba(255,255,255,0.15)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'#fff',
        fontSize:'11px',
        fontWeight:'500'
       }}>
        FA
       </div>
    </div>
  )
}

export default TopBar