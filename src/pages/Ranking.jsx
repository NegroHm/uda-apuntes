import React, { useState, useEffect } from 'react'
import { TrophyIcon, DocumentIcon, PhotoIcon, PresentationChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'
import RankingJsonService from '../services/rankingJsonService'

// Componente optimizado que utiliza JSON para el ranking de carreras
// Los datos se actualizan cada lunes a las 08:00 automáticamente

// Las funciones de análisis ahora están en rankingJsonService.js

const Ranking = () => {
  const [rankingData, setRankingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Manual refresh function
  const handleManualRefresh = async () => {
    if (isUpdating) return
    console.log('🔄 Actualización manual solicitada')
    setIsUpdating(true)
    try {
      const newData = await RankingJsonService.updateRanking()
      setRankingData(newData)
    } catch (err) {
      console.error('Error en actualización manual:', err)
      setError(err.message)
    } finally {
      setIsUpdating(false)
    }
  }

  // Funciones de análisis movidas a RankingJsonService

  useEffect(() => {
    console.log('🏆 Ranking component mounted')
    
    const loadRankingData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Verificar si necesita actualización automática los lunes
        if (RankingJsonService.shouldUpdateRanking()) {
          console.log('🗓️ Actualización automática de lunes detectada')
          setIsUpdating(true)
          const newData = await RankingJsonService.updateRanking()
          setRankingData(newData)
          setIsUpdating(false)
        } else {
          // Cargar datos existentes o generar si no existen
          console.log('📊 Cargando datos de ranking existentes')
          const data = await RankingJsonService.getRankingData()
          setRankingData(data)
        }
      } catch (err) {
        console.error('❌ Error cargando ranking:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRankingData()
    
    // Verificar cada 4 horas si es lunes y necesita actualización
    const mondayCheckInterval = setInterval(() => {
      if (RankingJsonService.shouldUpdateRanking()) {
        console.log('🗓️ Actualización programada de lunes activada')
        loadRankingData()
      }
    }, 4 * 60 * 60 * 1000) // Cada 4 horas
    
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
              {isUpdating ? 'Generando ranking actualizado...' : 'Cargando datos del ranking...'}
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

  // Usar datos del JSON
  const careerData = rankingData?.topCareers || []
  const maxScore = careerData.length > 0 ? Math.max(...careerData.map(c => c.totalScore)) : 1

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
          
          {/* JSON Status and Manual Refresh */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            {rankingData && (
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-sm text-blue-800 dark:text-blue-200">
                <ClockIcon className="w-4 h-4" />
                Última actualización: {new Date(rankingData.lastUpdate).toLocaleDateString('es-ES', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
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
                📊 Información del Ranking
              </h3>
              {rankingData && (
                <>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Total de carreras analizadas:</strong> {rankingData.totalCareers}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Última actualización:</strong> {new Date(rankingData.lastUpdate).toLocaleDateString('es-ES', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Próxima actualización:</strong> Próximo lunes a las 8:00 AM
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
                  Generando ranking actualizado... Analizando todas las carpetas de carreras.
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