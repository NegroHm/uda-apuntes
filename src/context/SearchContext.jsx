import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const searchData = [
    { id: 'informatica-1-1', title: 'Matemática I', program: 'Informática', year: '1° AÑO', type: 'subject' },
    { id: 'informatica-1-2', title: 'Programación I', program: 'Informática', year: '1° AÑO', type: 'subject' },
    { id: 'informatica-1-3', title: 'Inglés Técnico I', program: 'Informática', year: '1° AÑO', type: 'subject' },
    { id: 'informatica-2-1', title: 'Matemática II', program: 'Informática', year: '2° AÑO', type: 'subject' },
    { id: 'informatica-2-2', title: 'Programación II', program: 'Informática', year: '2° AÑO', type: 'subject' },
    { id: 'informatica-2-3', title: 'Base de Datos I', program: 'Informática', year: '2° AÑO', type: 'subject' },
    { id: 'psicologia-1-1', title: 'Psicología General', program: 'Psicología', year: '1° AÑO', type: 'subject' },
    { id: 'psicologia-1-2', title: 'Biología', program: 'Psicología', year: '1° AÑO', type: 'subject' },
    { id: 'informatica', title: 'Lic. en Informática y Desarrollo de Software', program: 'Informática', type: 'program' },
    { id: 'psicologia', title: 'Licenciatura Psicología', program: 'Psicología', type: 'program' },
    { id: 'diseno', title: 'Licenciatura en Diseño Gráfico', program: 'Diseño Gráfico', type: 'program' },
    { id: 'marketing', title: 'Licenciatura en Marketing', program: 'Marketing', type: 'program' },
    { id: 'turismo', title: 'Lic. en Turismo y Hotelería', program: 'Turismo y Hotelería', type: 'program' }
  ]

  const performSearch = (query) => {
    setIsSearching(true)
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setTimeout(() => {
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.program.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 300)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const value = {
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}