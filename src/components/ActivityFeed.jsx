import { useState } from "react";
import WeekGroup from "./WeekGroup";
import TabBar from "./TabBar";

function ActivityFeed({activities}) {
    const [activeTab, setActiveTab] = useState('All activity')
    const tabs = ['All activity', 'Site visits', 'Changes']

    //Tab filter
    const filteredActivities = activities.filter(activity => {
        if(activeTab === 'All activity') return true
        if(activeTab === 'Site visits') return activity.type === 'visit'
        if(activeTab === 'Changes') return activity.type === 'change'
        return true
    })

    //Week group
    const groupedByWeek = filteredActivities.reduce((acc, activity) => {
        const week = activity.week
        if(!acc[week]) acc[week] = []
        acc[week].push(activity)
        return acc
    }, {})

    //week sorted reduce
    const sortedWeeks = Object.keys(groupedByWeek)
      .map(Number)
      .sort((a, b) => b - a)
    
    const maxWeek = Math.max(...activities.map(a => a.week))

    return (
        <div style={{
            background:'rgba(255,255,255,0.82)',
            borderRadius:'14px',
            border:'0.5px solid rgba(0,0,0,0.07)',
            overflow:'hidden',
        }}>
            <TabBar 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div style={{padding:'0 22px 8px'}}>
                {sortedWeeks.map(week => (
                    <WeekGroup 
                      key={week}
                      week={week}
                      activities={groupedByWeek[week]}
                      isCurrentWeek={week === maxWeek}
                    />
                ))}
            </div>
        </div>
    )
}

export default ActivityFeed