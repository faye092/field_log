function TabBar({tabs, activeTab, onTabChange}) {
    return (
        <div style={{
            display:'flex',
            borderBottom:'0.5px solid rgba(0,0,0,0.07)',
            padding:'0 22px',
        }}>
            {tabs.map(tab => (
                <div 
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  style={{
                    fontSize:'14px',
                    fontWeight:activeTab === tab ? '500' :'400',
                    color:activeTab === tab ? '#1B4332' : 'rgba(0,0,0,0.32)',
                    padding:'12px 14px 10px',
                    borderBottom: activeTab === tab 
                      ? '2px solid #1B4332'
                      : '2px solid transparent',
                    marginBottom:'-0.5px',
                    cursor:'pointer',
                    transition:'all 0.15s ease'
                  }}
                >
                    {tab}
                </div>
            ))}
        </div>
    )
}

export default TabBar