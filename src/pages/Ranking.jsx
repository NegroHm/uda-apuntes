import React, { useState, useEffect } from 'react'
import { TrophyIcon, DocumentIcon, PhotoIcon, PresentationChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { listPublicFiles as listFiles } from '../services/publicDrive'
import RankingCacheService from '../services/rankingCache'

// Componente optimizado que utiliza caché para evitar recarga constante del ranking

// Filter folders that start with specific career prefixes
const isCareerFolder = (folderName) => {
  const name = folderName.trim() // Remove any leading/trailing spaces
  
  // Exact prefixes that career folders start with
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
  
  // Check if folder name starts with any of the career prefixes
  return careerPrefixes.some(prefix => name.startsWith(prefix))
}

const getCareerIcon = (folderName) => {
  const name = folderName.toLowerCase()
  
  // Match specific prefixes and career types
  if (name.startsWith('medicina')) return '⚕️'
  if (name.startsWith('contador')) return '🧮'
  if (name.startsWith('abogacía')) return '⚖️'
  if (name.startsWith('traductor')) return '🗣️'
  if (name.startsWith('sommelier')) return '🍷'
  if (name.startsWith('escribania')) return '📜'
  if (name.startsWith('maestría')) return '🎓'
  if (name.startsWith('prof')) return '👩‍🏫'
  if (name.startsWith('tecnicatura') || name.startsWith('tec')) return '🔧'
  
  // Lic. prefix - check specific career types
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
    return '🎓' // Default for other Lic. careers
  }
  
  return '🎓' // Default icon for careers not specifically matched
}

const getCareerColor = (index) => {
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-orange-500',
    'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500', 'bg-cyan-500',
    'bg-lime-500', 'bg-emerald-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-rose-500'
  ]
  return colors[index % colors.length]
}

const MAIN_FOLDER_ID = '1oOYF9Od5NeSErp7lokq95pQ37voukBvu'

const Ranking = () => {
  const [careerData, setCareerData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [careers, setCareers] = useState([])
  const [cacheInfo, setCacheInfo] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Manual refresh function
  const handleManualRefresh = async () => {
    if (isUpdating) return
    console.log('🔄 Manual refresh requested')
    await fetchAllCareerData(true)
  }

  const calculateFileScore = (file) => {
    const mimeType = file.mimeType
    const name = file.name.toLowerCase()
    
    // PDF files = 3 points
    if (mimeType === 'application/pdf' || name.endsWith('.pdf')) {
      return 3
    }
    
    // Word documents = 2 points
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimeType === 'application/msword' ||
        name.endsWith('.docx') || name.endsWith('.doc')) {
      return 2
    }
    
    // Images = 1 point
    if (mimeType?.startsWith('image/') || 
        name.endsWith('.jpg') || name.endsWith('.jpeg') || 
        name.endsWith('.png') || name.endsWith('.gif') || 
        name.endsWith('.webp')) {
      return 1
    }
    
    // PowerPoint presentations = 2 points
    if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        mimeType === 'application/vnd.ms-powerpoint' ||
        name.endsWith('.pptx') || name.endsWith('.ppt')) {
      return 2
    }
    
    return 0
  }

  // Complete analysis: Count ALL files recursively without limitations
  const getCompleteFileCount = async (folderId, path = '', depth = 0) => {
    let totalFiles = 0
    let totalScore = 0
    let fileTypes = { pdf: 0, word: 0, images: 0, presentations: 0 }
    let foldersProcessed = 0
    
    const processFolder = async (currentFolderId, currentPath = '', currentDepth = 0) => {
      try {
        const indentation = '  '.repeat(currentDepth)
        console.log(`${indentation}📂 [Depth ${currentDepth}] Analyzing: ${currentPath}`)
        
        const items = await listFiles(currentFolderId)
        
        // Process all files in current folder
        const files = items.filter(item => item.mimeType !== 'application/vnd.google-apps.folder')
        const folders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder')
        
        console.log(`${indentation}   └── Found ${files.length} files, ${folders.length} subfolders`)
        
        // Count and categorize files
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
        
        // Process ALL subfolders recursively
        for (const folder of folders) {
          const newPath = currentPath ? `${currentPath}/${folder.name}` : folder.name
          await processFolder(folder.id, newPath, currentDepth + 1)
          foldersProcessed++
        }
        
      } catch (error) {
        console.error(`❌ Error processing folder ${currentPath}:`, error)
      }
    }
    
    console.log(`🔍 Starting complete analysis of: ${path}`)
    await processFolder(folderId, path, depth)
    
    console.log(`✅ Analysis complete for ${path}:`)
    console.log(`   📁 Total folders processed: ${foldersProcessed}`)
    console.log(`   📄 Total files found: ${totalFiles}`)
    console.log(`   📊 Score breakdown:`)
    console.log(`      📕 PDFs: ${fileTypes.pdf} (${fileTypes.pdf * 3} pts)`)
    console.log(`      📘 Word: ${fileTypes.word} (${fileTypes.word * 2} pts)`)
    console.log(`      📙 PPT: ${fileTypes.presentations} (${fileTypes.presentations * 2} pts)`) 
    console.log(`      🖼️ Images: ${fileTypes.images} (${fileTypes.images * 1} pts)`)
    console.log(`   🏆 Total Score: ${totalScore} points`)
    
    return {
      totalFiles,
      totalScore,
      fileTypes,
      foldersProcessed
    }
  }

  const fetchCareerFiles = async (careerFolder) => {
    try {
      console.log('🔍 Complete analysis for:', careerFolder.name)
      return await getCompleteFileCount(careerFolder.id, careerFolder.name)
    } catch (error) {
      console.error(`Error fetching files for ${careerFolder.name}:`, error)
      return { totalFiles: 0, totalScore: 0, fileTypes: { pdf: 0, word: 0, images: 0, presentations: 0 } }
    }
  }

  const getAllFilesRecursively = async (folderId) => {
    try {
      const items = await listFiles(folderId)
      let allFiles = []
      
      for (const item of items) {
        if (item.mimeType === 'application/vnd.google-apps.folder') {
          const subFiles = await getAllFilesRecursively(item.id)
          allFiles = allFiles.concat(subFiles)
        } else {
          allFiles.push(item)
        }
      }
      
      return allFiles
    } catch (error) {
      console.error('Error fetching files recursively:', error)
      return []
    }
  }

  useEffect(() => {
    console.log('Ranking component mounted')
    
    const fetchAllCareerData = async (forceRefresh = false) => {
      setLoading(true)
      setError(null)
      
      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = RankingCacheService.getCachedData()
        if (cached && RankingCacheService.isCacheValid()) {
          console.log('✅ Using cached ranking data from:', cached.lastUpdate)
          setCareerData(cached.data)
          setLoading(false)
          setCacheInfo(RankingCacheService.getCacheInfo())
          return
        }
      }
      
      // If no valid cache or force refresh, fetch fresh data
      try {
        console.log('🔄 Fetching fresh ranking data...')
        setIsUpdating(true)
        console.log('Fetching main folder contents...')
        const mainFolderFiles = await listFiles(MAIN_FOLDER_ID)
        
        // Get all faculty folders (should be folders at root level)
        const facultyFolders = mainFolderFiles.filter(file => 
          file.mimeType === 'application/vnd.google-apps.folder'
        )
        
        console.log('📁 Faculty folders found:', facultyFolders.map(f => f.name))
        
        // Search inside each faculty folder for career folders
        const allCareerFolders = []
        
        for (const facultyFolder of facultyFolders) {
          try {
            console.log(`🔍 Searching inside faculty: ${facultyFolder.name}`)
            const facultyContents = await listFiles(facultyFolder.id)
            
            const careerFoldersInFaculty = facultyContents.filter(file => 
              file.mimeType === 'application/vnd.google-apps.folder' && 
              isCareerFolder(file.name)
            )
            
            if (careerFoldersInFaculty.length > 0) {
              console.log(`✅ Found ${careerFoldersInFaculty.length} careers in ${facultyFolder.name}:`, careerFoldersInFaculty.map(f => f.name))
              // Add faculty context to career folders
              careerFoldersInFaculty.forEach(career => {
                career.facultyName = facultyFolder.name
              })
              allCareerFolders.push(...careerFoldersInFaculty)
            } else {
              console.log(`❌ No career folders found in ${facultyFolder.name}`)
            }
          } catch (error) {
            console.error(`Error searching in faculty ${facultyFolder.name}:`, error)
          }
        }
        
        console.log('🎓 Total career folders found:', allCareerFolders.map(f => `${f.name} (in ${f.facultyName})`))
        setCareers(allCareerFolders)
        
        const careerFolders = allCareerFolders
        
        if (careerFolders.length === 0) {
          throw new Error('No se encontraron carpetas de carreras específicas en Google Drive')
        }
        
        // Process all careers in parallel for speed
        console.log('Processing careers in parallel...')
        const careerPromises = careerFolders.map(async (careerFolder, index) => {
          try {
            console.log(`Processing ${careerFolder.name}...`)
            const stats = await fetchCareerFiles(careerFolder)
            return {
              id: careerFolder.id,
              name: careerFolder.name,
              facultyName: careerFolder.facultyName,
              color: getCareerColor(index),
              icon: getCareerIcon(careerFolder.name),
              ...stats
            }
          } catch (careerError) {
            console.error(`Error fetching ${careerFolder.name}:`, careerError)
            return {
              id: careerFolder.id,
              name: careerFolder.name,
              facultyName: careerFolder.facultyName,
              color: getCareerColor(index),
              icon: getCareerIcon(careerFolder.name),
              totalFiles: 0,
              totalScore: 0,
              fileTypes: { pdf: 0, word: 0, images: 0, presentations: 0 }
            }
          }
        })
        
        // Wait for all careers to be processed
        const allCareerData = await Promise.all(careerPromises)
        
        // Sort by total score (descending) and take top 5
        const data = allCareerData
          .sort((a, b) => b.totalScore - a.totalScore)
          .slice(0, 5) // Limit to top 5 careers
        
        console.log('Career data loaded:', data)
        setCareerData(data)
        
        // Save to cache
        RankingCacheService.setCachedData(data)
        setCacheInfo(RankingCacheService.getCacheInfo())
        
      } catch (err) {
        console.error('Error fetching career data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
        setIsUpdating(false)
      }
    }

    // Check if it's Monday morning and we should auto-update
    const checkAndLoad = async () => {
      if (RankingCacheService.shouldUpdateOnMonday()) {
        console.log('🗓️ Monday morning auto-update triggered')
        await fetchAllCareerData(true)
        return
      }
      
      // If not Monday update, do normal load (which will check cache first)
      await fetchAllCareerData()
    }

    // Single initial load
    checkAndLoad()
    
    // Set up Monday morning check (check every 4 hours to avoid excessive checking)
    const mondayCheckInterval = setInterval(() => {
      if (RankingCacheService.shouldUpdateOnMonday()) {
        console.log('🗓️ Scheduled Monday update triggered')
        fetchAllCareerData(true)
      }
    }, 4 * 60 * 60 * 1000) // Every 4 hours
    
    return () => clearInterval(mondayCheckInterval)
  }, [])

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return `#${index + 1}`
    }
  }

  const getProgressColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <TrophyIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Error al Cargar Ranking
            </h1>
            <p className="text-red-600 dark:text-red-400 mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <TrophyIcon className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Ranking de Carreras
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Cargando datos desde Google Drive...
            </p>
          </div>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const maxScore = Math.max(...careerData.map(c => c.totalScore))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-30"></div>
            <TrophyIcon className="relative w-20 h-20 mx-auto text-yellow-500 mb-6 drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏆 Top 5 Carreras
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Las carreras con mayor cantidad de material académico disponible
          </p>
          
          {/* Cache Status and Manual Refresh */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            {cacheInfo && (
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-sm text-blue-800 dark:text-blue-200">
                <ClockIcon className="w-4 h-4" />
                {cacheInfo.lastUpdate ? (
                  <>Última actualización: {cacheInfo.lastUpdate.toLocaleDateString('es-ES', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}</>
                ) : 'Actualizando datos...'}
              </div>
            )}
            
            <button
              onClick={handleManualRefresh}
              disabled={isUpdating}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
            >
              <div className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`}>
                {isUpdating ? '⚡' : '🔄'}
              </div>
              {isUpdating ? 'Analizando...' : 'Actualizar Ahora'}
            </button>
          </div>
        </div>

        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Sistema de Ranking
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            Carreras que inician con: Lic., Prof, Tecnicatura, Tec, Medicina, Maestría, Escribania, Contador, Abogacía, Traductor, Sommelier
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <DocumentIcon className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">PDF = 3 pts</span>
            </div>
            <div className="flex items-center space-x-2">
              <DocumentIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Word = 2 pts</span>
            </div>
            <div className="flex items-center space-x-2">
              <PresentationChartBarIcon className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">PPT = 2 pts</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhotoIcon className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Imagen = 1 pt</span>
            </div>
          </div>
        </div>

        {/* Ranking Cards */}
        <div className="space-y-6">
          {careerData.map((career, index) => (
            <div key={career.id} className="group relative">
              {/* Animated Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                {/* Rank Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full text-white font-black text-xl shadow-xl transform rotate-12 ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :  
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-orange-600' :
                    'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}>
                    {getRankIcon(index)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 pt-16">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    
                    {/* Career Info */}
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl drop-shadow-lg">{career.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                          {career.name}
                        </h3>
                        <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                          🏛️ {career.facultyName}
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                          📁 {career.totalFiles.toLocaleString()} archivos académicos
                        </p>
                      </div>
                    </div>
                    
                    {/* Score Display */}
                    <div className="text-center lg:text-right">
                      <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                        {career.totalScore.toLocaleString()}
                      </div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                        PUNTOS TOTALES
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto lg:mx-0">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(career.totalScore / maxScore) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {Math.round((career.totalScore / maxScore) * 100)}% del máximo
                      </div>
                    </div>
                  </div>
                  
                  {/* File Type Breakdown */}
                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center border border-red-100 dark:border-red-800">
                      <DocumentIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {career.fileTypes.pdf.toLocaleString()}
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300 font-medium">PDFs</div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-100 dark:border-blue-800">
                      <DocumentIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {career.fileTypes.word.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Word</div>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center border border-orange-100 dark:border-orange-800">
                      <PresentationChartBarIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {career.fileTypes.presentations.toLocaleString()}
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">PPT</div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center border border-purple-100 dark:border-purple-800">
                      <PhotoIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {career.fileTypes.images.toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">Imágenes</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 opacity-10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400 to-purple-500 opacity-10 rounded-tr-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                🔄 Sistema de Actualización
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Los datos se actualizan automáticamente <strong>cada lunes a las 8:00 AM</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Análisis completo de todas las subcarpetas sin limitaciones
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                📊 Información de Cache
              </h3>
              {cacheInfo?.lastUpdate && (
                <>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Última actualización:</strong> {cacheInfo.lastUpdate.toLocaleDateString('es-ES', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Próxima actualización:</strong> {cacheInfo.nextUpdate?.toLocaleDateString('es-ES', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })} a las 8:00 AM
                  </p>
                </>
              )}
            </div>
          </div>
          
          {isUpdating && (
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  Actualizando datos del ranking... Esto puede tomar varios minutos.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ranking