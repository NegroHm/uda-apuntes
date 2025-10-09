import React, { useState, useEffect } from 'react'
import { TrophyIcon, DocumentIcon, PhotoIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { RankingJsonService } from '../services/rankingJsonService'

const TopCareerWidget = () => {
  const [topCareers, setTopCareers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTopCareers = async () => {
      try {
        console.log('🏆 TopCareerWidget - Cargando top 3 carreras desde JSON')
        const rankingData = await RankingJsonService.getRankingData()
        
        if (rankingData && rankingData.topCareers && rankingData.topCareers.length > 0) {
          // Get top 3 careers from the ranking data
          setTopCareers(rankingData.topCareers.slice(0, 3))
          console.log('✅ Top 3 carreras cargadas:', rankingData.topCareers.slice(0, 3).map(c => c.name))
        }
      } catch (error) {
        console.error('❌ Error loading top careers:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTopCareers()
  }, [])

  const getRankEmoji = (index) => {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈' 
      case 2: return '🥉'
      default: return '🏆'
    }
  }

  const getRankText = (index) => {
    switch (index) {
      case 0: return '1er lugar'
      case 1: return '2do lugar'
      case 2: return '3er lugar'
      default: return `${index + 1}° lugar`
    }
  }

  if (loading || topCareers.length === 0) {
    return null // Don't show anything while loading or if no data
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Top 3 carreras con más apuntes
            </span>
          </div>
          <Link 
            to="/ranking" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline text-sm"
          >
            Ver ranking completo →
          </Link>
        </div>
      </div>

      {/* Rankings list */}
      <div className="p-4 pt-3 space-y-3">
        {topCareers.map((career, index) => (
          <div key={career.id} className="flex items-center justify-between">
            {/* Left side - Rank and career info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getRankEmoji(index)}</span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:inline">
                  {getRankText(index)}
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-lg flex-shrink-0">{career.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white truncate text-sm">
                  {career.name}
                </span>
              </div>
            </div>
            
            {/* Right side - Score and File count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 flex-shrink-0 text-right">
              <div className="font-medium">{career.totalScore} pts</div>
              <div className="text-xs">📁 {career.totalFiles?.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCareerWidget