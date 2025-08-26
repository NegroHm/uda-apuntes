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