import React from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/Logo.png" 
                  alt="APUNTES UDA" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">APUNTES UDA</h3>
                <p className="text-gray-300 dark:text-gray-400 text-sm font-medium">Por y para los estudiantes</p>
              </div>
            </div>
            
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
              Plataforma colaborativa de apuntes universitarios diseñada para mejorar 
              la experiencia de estudio y facilitar el acceso a material académico de calidad.
            </p>
            
            <div className="flex items-center space-x-3 bg-gray-800 dark:bg-gray-900 px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-600">
              <HeartIcon className="h-5 w-5 text-red-400" />
              <span className="text-gray-200 dark:text-gray-300 font-medium">Hecho con amor para la comunidad estudiantil</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 dark:text-gray-400 hover:text-blue-300 dark:hover:text-blue-400 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>🏠</span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-gray-300 dark:text-gray-400 hover:text-blue-300 dark:hover:text-blue-400 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>ℹ️</span>
                  Información
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 dark:text-gray-400 hover:text-blue-300 dark:hover:text-blue-400 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>📞</span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 dark:text-gray-500 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} APUNTES UDA. Todos los derechos reservados @apuntesuda.com</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="mailto:apuntesUDA@gmail.com"
                className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                apuntesUDA@gmail.com
              </a>
              
              <a 
                href="https://www.instagram.com/apuntesuda/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@apuntesuda</span>
              </a>
              
              <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                <span>☕</span>
                <span>Apoyar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 dark:text-gray-600 text-xs mt-6">
          <p>
            Esta plataforma es un proyecto educativo sin fines de lucro. 
            Todo el contenido es proporcionado por la comunidad estudiantil.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer