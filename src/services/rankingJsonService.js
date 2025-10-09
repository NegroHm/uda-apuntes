// Servicio simplificado para cargar ranking desde JSON estático
// Solo carga datos, no realiza ningún análisis

const RANKING_JSON_URL = '/ranking-data.json' // Archivo estático en public/

// Solo funciones de carga, sin análisis

export const RankingJsonService = {
  
  // Cargar datos directamente desde archivo JSON estático - SIN ANÁLISIS
  async loadRankingData() {
    try {
      console.log('📄 Cargando ranking desde JSON estático...')
      const response = await fetch(RANKING_JSON_URL)
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ Ranking cargado exitosamente')
      
      return data
    } catch (error) {
      console.error('❌ Error cargando ranking:', error)
      throw error
    }
  },
  
  // Función principal - solo carga el JSON estático
  async getRankingData() {
    return await this.loadRankingData()
  }
}

export default RankingJsonService