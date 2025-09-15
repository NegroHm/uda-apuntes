// Servicio para generar y gestionar el ranking de carreras en formato JSON
// Se actualiza cada lunes por la mañana analizando todas las carpetas de Google Drive

import { listPublicFiles as listFiles } from './publicDrive'

const RANKING_JSON_FILE = 'ranking-data.json'
const RANKING_JSON_URL = '/ranking-data.json' // Archivo estático en public/
const MAIN_FOLDER_ID = '1oOYF9Od5NeSErp7lokq95pQ37voukBvu'

// Filtrar carpetas que comienzan con prefijos específicos de carreras
const isCareerFolder = (folderName) => {
  const name = folderName.trim()
  
  const careerPrefixes = [
    'Lic.',
    'Prof',
    'Tecnicatura', 
    'Tec',
    'Medicina',
    'Maestría',
    'Escribania',
    'Contador',
    'Abogacía',
    'Traductor',
    'Sommelier'
  ]
  
  return careerPrefixes.some(prefix => name.startsWith(prefix))
}

// Obtener icono según el tipo de carrera
const getCareerIcon = (folderName) => {
  const name = folderName.toLowerCase()
  
  if (name.startsWith('medicina')) return '⚕️'
  if (name.startsWith('contador')) return '🧮'
  if (name.startsWith('abogacía')) return '⚖️'
  if (name.startsWith('traductor')) return '🗣️'
  if (name.startsWith('sommelier')) return '🍷'
  if (name.startsWith('escribania')) return '📜'
  if (name.startsWith('maestría')) return '🎓'
  if (name.startsWith('prof')) return '👩‍🏫'
  if (name.startsWith('tecnicatura') || name.startsWith('tec')) return '🔧'
  
  if (name.startsWith('lic.')) {
    if (name.includes('informática') || name.includes('informatica') || name.includes('software') || name.includes('sistemas')) return '💻'
    if (name.includes('psicología') || name.includes('psicologia')) return '🧠'
    if (name.includes('diseño') || name.includes('diseno') || name.includes('gráfico') || name.includes('grafico')) return '🎨'
    if (name.includes('marketing') || name.includes('mercadeo')) return '📈'
    if (name.includes('turismo') || name.includes('hotelería') || name.includes('hoteleria')) return '✈️'
    if (name.includes('administración') || name.includes('administracion') || name.includes('empresas')) return '💼'
    if (name.includes('comunicación') || name.includes('comunicacion') || name.includes('periodismo')) return '📺'
    if (name.includes('enfermería') || name.includes('enfermeria')) return '👩‍⚕️'
    if (name.includes('educación') || name.includes('educacion')) return '📚'
    return '🎓'
  }
  
  return '🎓'
}

// Calcular puntuación de archivo según tipo
const calculateFileScore = (file) => {
  const mimeType = file.mimeType
  const name = file.name.toLowerCase()
  
  // PDF = 3 puntos
  if (mimeType === 'application/pdf' || name.endsWith('.pdf')) {
    return 3
  }
  
  // Word = 2 puntos
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword' ||
      name.endsWith('.docx') || name.endsWith('.doc')) {
    return 2
  }
  
  // PowerPoint = 2 puntos
  if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      mimeType === 'application/vnd.ms-powerpoint' ||
      name.endsWith('.pptx') || name.endsWith('.ppt')) {
    return 2
  }
  
  // Imágenes = 1 punto
  if (mimeType?.startsWith('image/') || 
      name.endsWith('.jpg') || name.endsWith('.jpeg') || 
      name.endsWith('.png') || name.endsWith('.gif') || 
      name.endsWith('.webp')) {
    return 1
  }
  
  return 0
}

// Análisis recursivo completo de una carpeta
const analyzeCareerFolder = async (folderId, careerName, depth = 0) => {
  let totalFiles = 0
  let totalScore = 0
  let fileTypes = { pdf: 0, word: 0, images: 0, presentations: 0 }
  let foldersProcessed = 0
  
  const processFolder = async (currentFolderId, currentPath = '', currentDepth = 0) => {
    try {
      const indentation = '  '.repeat(currentDepth)
      console.log(`${indentation}📂 [${careerName}] Analizando: ${currentPath}`)
      
      const items = await listFiles(currentFolderId)
      
      const files = items.filter(item => item.mimeType !== 'application/vnd.google-apps.folder')
      const folders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder')
      
      console.log(`${indentation}   └── Encontrados ${files.length} archivos, ${folders.length} subcarpetas`)
      
      // Analizar archivos
      files.forEach(file => {
        totalFiles++
        const score = calculateFileScore(file)
        totalScore += score
        
        const mimeType = file.mimeType
        const name = file.name.toLowerCase()
        
        if (mimeType === 'application/pdf' || name.endsWith('.pdf')) {
          fileTypes.pdf++
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   mimeType === 'application/msword' ||
                   name.endsWith('.docx') || name.endsWith('.doc')) {
          fileTypes.word++
        } else if (mimeType?.startsWith('image/') || 
                   name.endsWith('.jpg') || name.endsWith('.jpeg') || 
                   name.endsWith('.png') || name.endsWith('.gif') || 
                   name.endsWith('.webp')) {
          fileTypes.images++
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                   mimeType === 'application/vnd.ms-powerpoint' ||
                   name.endsWith('.pptx') || name.endsWith('.ppt')) {
          fileTypes.presentations++
        }
      })
      
      // Procesar subcarpetas recursivamente
      for (const folder of folders) {
        const newPath = currentPath ? `${currentPath}/${folder.name}` : folder.name
        await processFolder(folder.id, newPath, currentDepth + 1)
        foldersProcessed++
      }
      
    } catch (error) {
      console.error(`❌ Error procesando carpeta ${currentPath}:`, error)
    }
  }
  
  console.log(`🔍 Iniciando análisis completo de: ${careerName}`)
  await processFolder(folderId, careerName, depth)
  
  console.log(`✅ Análisis completo para ${careerName}:`)
  console.log(`   📁 Carpetas procesadas: ${foldersProcessed}`)
  console.log(`   📄 Total archivos: ${totalFiles}`)
  console.log(`   🏆 Puntuación total: ${totalScore}`)
  
  return {
    totalFiles,
    totalScore,
    fileTypes,
    foldersProcessed
  }
}

export const RankingJsonService = {
  
  // Generar el ranking completo analizando todas las carreras
  async generateRankingData() {
    console.log('🚀 Iniciando generación completa del ranking...')
    
    try {
      // Obtener carpetas de facultades
      const mainFolderFiles = await listFiles(MAIN_FOLDER_ID)
      const facultyFolders = mainFolderFiles.filter(file => 
        file.mimeType === 'application/vnd.google-apps.folder'
      )
      
      console.log('🏛️ Facultades encontradas:', facultyFolders.map(f => f.name))
      
      // Buscar carreras dentro de cada facultad
      const allCareerFolders = []
      
      for (const facultyFolder of facultyFolders) {
        try {
          console.log(`🔍 Buscando en facultad: ${facultyFolder.name}`)
          const facultyContents = await listFiles(facultyFolder.id)
          
          const careerFoldersInFaculty = facultyContents.filter(file => 
            file.mimeType === 'application/vnd.google-apps.folder' && 
            isCareerFolder(file.name)
          )
          
          if (careerFoldersInFaculty.length > 0) {
            console.log(`✅ ${careerFoldersInFaculty.length} carreras encontradas en ${facultyFolder.name}`)
            careerFoldersInFaculty.forEach(career => {
              career.facultyName = facultyFolder.name
            })
            allCareerFolders.push(...careerFoldersInFaculty)
          }
        } catch (error) {
          console.error(`Error en facultad ${facultyFolder.name}:`, error)
        }
      }
      
      console.log(`🎓 Total de carreras a analizar: ${allCareerFolders.length}`)
      
      if (allCareerFolders.length === 0) {
        throw new Error('No se encontraron carpetas de carreras')
      }
      
      // Analizar cada carrera
      const careerAnalysis = []
      
      for (const [index, careerFolder] of allCareerFolders.entries()) {
        try {
          console.log(`\n📊 Analizando carrera ${index + 1}/${allCareerFolders.length}: ${careerFolder.name}`)
          
          const stats = await analyzeCareerFolder(careerFolder.id, careerFolder.name)
          
          careerAnalysis.push({
            id: careerFolder.id,
            name: careerFolder.name,
            facultyName: careerFolder.facultyName,
            icon: getCareerIcon(careerFolder.name),
            ...stats
          })
          
          console.log(`✅ ${careerFolder.name} completada: ${stats.totalFiles} archivos, ${stats.totalScore} puntos`)
          
        } catch (error) {
          console.error(`❌ Error analizando ${careerFolder.name}:`, error)
          careerAnalysis.push({
            id: careerFolder.id,
            name: careerFolder.name,
            facultyName: careerFolder.facultyName,
            icon: getCareerIcon(careerFolder.name),
            totalFiles: 0,
            totalScore: 0,
            fileTypes: { pdf: 0, word: 0, images: 0, presentations: 0 },
            foldersProcessed: 0
          })
        }
      }
      
      // Ordenar por puntuación y crear ranking final
      const ranking = careerAnalysis
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((career, index) => ({
          ...career,
          rank: index + 1
        }))
      
      // Crear objeto final con metadatos
      const rankingData = {
        lastUpdate: new Date().toISOString(),
        totalCareers: ranking.length,
        topCareers: ranking.slice(0, 5),
        allCareers: ranking,
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.0',
          description: 'Ranking de carreras basado en cantidad y tipo de archivos académicos'
        }
      }
      
      console.log('\n🏆 RANKING GENERADO:')
      console.log('Top 5 carreras:')
      ranking.slice(0, 5).forEach((career, index) => {
        console.log(`${index + 1}. ${career.name} - ${career.totalScore} puntos (${career.totalFiles} archivos)`)
      })
      
      return rankingData
      
    } catch (error) {
      console.error('❌ Error generando ranking:', error)
      throw error
    }
  },
  
  // Guardar datos en localStorage como JSON
  saveRankingJson(rankingData) {
    try {
      localStorage.setItem(RANKING_JSON_FILE, JSON.stringify(rankingData, null, 2))
      console.log('✅ Ranking JSON guardado exitosamente')
      return true
    } catch (error) {
      console.error('❌ Error guardando ranking JSON:', error)
      return false
    }
  },
  
  // Cargar datos desde archivo JSON estático
  async loadRankingJson() {
    try {
      // Primero intentar desde localStorage (para actualizaciones)
      const localData = localStorage.getItem(RANKING_JSON_FILE)
      if (localData) {
        const parsed = JSON.parse(localData)
        console.log('✅ Ranking JSON cargado desde localStorage')
        return parsed
      }

      // Si no hay datos locales, cargar desde archivo estático
      console.log('📄 Cargando ranking JSON desde archivo estático...')
      const response = await fetch(RANKING_JSON_URL)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ Ranking JSON cargado desde archivo estático')
      
      // Guardar en localStorage para futuras consultas
      localStorage.setItem(RANKING_JSON_FILE, JSON.stringify(data))
      
      return data
    } catch (error) {
      console.error('❌ Error cargando ranking JSON:', error)
      return null
    }
  },
  
  // Verificar si necesita actualización (lunes por la mañana)
  async shouldUpdateRanking() {
    const now = new Date()
    const isMonday = now.getDay() === 1
    const isAfter8AM = now.getHours() >= 8
    
    if (!isMonday || !isAfter8AM) {
      return false
    }
    
    const data = await this.loadRankingJson()
    if (!data || !data.lastUpdate) {
      return true
    }
    
    const lastUpdate = new Date(data.lastUpdate)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastUpdateStart = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate())
    
    return todayStart.getTime() !== lastUpdateStart.getTime()
  },
  
  // Actualizar ranking completo
  async updateRanking() {
    console.log('🔄 Iniciando actualización completa del ranking...')
    
    try {
      const rankingData = await this.generateRankingData()
      this.saveRankingJson(rankingData)
      
      console.log('✅ Ranking actualizado exitosamente')
      return rankingData
    } catch (error) {
      console.error('❌ Error actualizando ranking:', error)
      throw error
    }
  },
  
  // Obtener datos del ranking (siempre desde JSON, solo actualiza automáticamente los lunes)
  async getRankingData() {
    console.log('📊 Cargando datos de ranking...')
    const data = await this.loadRankingJson()
    
    if (!data) {
      throw new Error('No se pudieron cargar los datos del ranking')
    }
    
    return data
  }
}

export default RankingJsonService