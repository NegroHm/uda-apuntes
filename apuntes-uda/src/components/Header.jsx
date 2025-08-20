import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearch } from '../context/SearchContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { performSearch } = useSearch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <img 
                src="/Logo.png" 
                alt="APUNTES UDA" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">APUNTES UDA</h1>
              <p className="text-sm text-gray-600 font-medium">Por y para los estudiantes</p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://cafecito.app/apuntesuda" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              ☕ Donar
            </a>
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              📚 Agrega tus apuntes
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar apuntes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            <nav className="flex space-x-1">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Inicio
              </Link>
              <Link 
                to="/information" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Información
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Contacto
              </Link>
            </nav>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200 animate-slide-in">
            <div className="pt-6">
              <form onSubmit={handleSearch} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Buscar apuntes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>

              {/* Mobile Action Buttons */}
              <div className="flex gap-3 mb-6">
                <a
                  href="https://cafecito.app/apuntesuda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  ☕ Donar
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  📚 Agrega apuntes
                </Link>
              </div>

              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  🏠 Inicio
                </Link>
                <Link
                  to="/information"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  ℹ️ Información
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  📞 Contacto
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header