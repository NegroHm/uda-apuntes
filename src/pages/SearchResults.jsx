import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import { MagnifyingGlassIcon, FolderIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const SearchResults = () => {
  const location = useLocation()
  const { searchResults, searchQuery, isSearching } = useSearch()
  const query = new URLSearchParams(location.search).get('q') || searchQuery

  const getResultLink = (result) => {
    if (result.type === 'program') {
      return `/program/${result.id}`
    }
    return '#'
  }

  const getResultIcon = (result) => {
    return result.type === 'program' ? AcademicCapIcon : FolderIcon
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Resultados de búsqueda
          </h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-300">
              Resultados para: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {isSearching ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Buscando...</span>
          </div>
        ) : (
          <div>
            {searchResults.length > 0 ? (
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Se encontraron {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                </p>
                
                <div className="space-y-4">
                  {searchResults.map((result) => {
                    const IconComponent = getResultIcon(result)
                    return (
                      <Link
                        key={result.id}
                        to={getResultLink(result)}
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {result.title}
                            </h3>
                            
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                              <span className="inline-flex items-center">
                                <span className="font-medium">{result.program}</span>
                              </span>
                              
                              {result.year && (
                                <span className="inline-flex items-center">
                                  <span>{result.year}</span>
                                </span>
                              )}
                              
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                {result.type === 'program' ? 'Carrera' : 'Materia'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron resultados
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  No encontramos resultados para "{query}". Intenta con otros términos de búsqueda.
                </p>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-2">Sugerencias:</p>
                  <ul className="space-y-1">
                    <li>• Verifica la ortografía</li>
                    <li>• Usa términos más generales</li>
                    <li>• Prueba con nombres de carreras o materias</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Buscar apuntes
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Usa la barra de búsqueda para encontrar apuntes, carreras y materias.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Si no encuentras los apuntes que necesitas, puedes ayudarnos a mejorar la plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium text-center"
            >
              Solicitar apuntes
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-center"
            >
              Explorar carreras
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults