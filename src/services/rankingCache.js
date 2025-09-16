// Ranking Cache Service - Updates every Monday morning
const CACHE_KEY = 'career_ranking_data'
const CACHE_VERSION_KEY = 'career_ranking_version'
const LAST_UPDATE_KEY = 'career_ranking_last_update'

export const RankingCacheService = {
  
  // Check if cache exists and is current
  isCacheValid() {
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
    const cachedData = localStorage.getItem(CACHE_KEY)
    
    if (!lastUpdate || !cachedData) {
      return false
    }
    
    const lastUpdateDate = new Date(lastUpdate)
    const now = new Date()
    
    // Check if it's been more than a week since last update
    const daysSinceUpdate = (now - lastUpdateDate) / (1000 * 60 * 60 * 24)
    
    // If more than 7 days, cache is invalid
    if (daysSinceUpdate > 7) {
      return false
    }
    
    // If it's Monday after 8 AM and we haven't updated today, cache is invalid
    if (now.getDay() === 1 && now.getHours() >= 8) { // Monday after 8 AM
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const lastUpdateStart = new Date(lastUpdateDate.getFullYear(), lastUpdateDate.getMonth(), lastUpdateDate.getDate())
      
      // If last update was not today, cache is invalid
      if (todayStart.getTime() !== lastUpdateStart.getTime()) {
        return false
      }
    }
    
    return true
  },

  // Get cached ranking data
  getCachedData() {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY)
      const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
      
      if (cachedData && lastUpdate) {
        return {
          data: JSON.parse(cachedData),
          lastUpdate: new Date(lastUpdate)
        }
      }
      return null
    } catch (error) {
      console.error('Error reading cached ranking data:', error)
      return null
    }
  },

  // Save ranking data to cache
  setCachedData(rankingData) {
    try {
      const now = new Date()
      localStorage.setItem(CACHE_KEY, JSON.stringify(rankingData))
      localStorage.setItem(LAST_UPDATE_KEY, now.toISOString())
      localStorage.setItem(CACHE_VERSION_KEY, '1.0')
      
      return true
    } catch (error) {
      console.error('Error caching ranking data:', error)
      return false
    }
  },

  // Clear cache (force refresh)
  clearCache() {
    try {
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(LAST_UPDATE_KEY)
      localStorage.removeItem(CACHE_VERSION_KEY)
      return true
    } catch (error) {
      console.error('Error clearing ranking cache:', error)
      return false
    }
  },

  // Get next Monday update time
  getNextMondayUpdate() {
    const now = new Date()
    const nextMonday = new Date(now)
    
    // Calculate days until next Monday (or today if it's Monday and before 8 AM)
    const daysUntilMonday = (1 + 7 - now.getDay()) % 7
    if (daysUntilMonday === 0 && now.getHours() >= 8) {
      // If it's Monday after 8 AM, next update is next Monday
      nextMonday.setDate(now.getDate() + 7)
    } else if (daysUntilMonday === 0) {
      // If it's Monday before 8 AM, update today
      nextMonday.setDate(now.getDate())
    } else {
      nextMonday.setDate(now.getDate() + daysUntilMonday)
    }
    
    nextMonday.setHours(8, 0, 0, 0) // 8:00 AM
    return nextMonday
  },

  // Check if it's time for Monday update (8 AM on Monday)
  shouldUpdateOnMonday() {
    const now = new Date()
    const isMonday = now.getDay() === 1
    const isAfter8AM = now.getHours() >= 8
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
    
    if (!isMonday || !isAfter8AM) {
      return false
    }
    
    if (!lastUpdate) {
      return true
    }
    
    const lastUpdateDate = new Date(lastUpdate)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastUpdateStart = new Date(lastUpdateDate.getFullYear(), lastUpdateDate.getMonth(), lastUpdateDate.getDate())
    
    // Update if we haven't updated today
    return todayStart.getTime() !== lastUpdateStart.getTime()
  },

  // Get cache status info
  getCacheInfo() {
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
    const cachedData = localStorage.getItem(CACHE_KEY)
    const nextMonday = this.getNextMondayUpdate()
    
    return {
      hasCache: !!cachedData,
      lastUpdate: lastUpdate ? new Date(lastUpdate) : null,
      nextUpdate: nextMonday,
      isValid: this.isCacheValid(),
      shouldUpdate: this.shouldUpdateOnMonday()
    }
  }
}

export default RankingCacheService