import React from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <p className="text-gray-300 text-sm font-medium">Por y para los estudiantes</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Plataforma colaborativa de apuntes universitarios diseñada para mejorar 
              la experiencia de estudio y facilitar el acceso a material académico de calidad.
            </p>
            
            <div className="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
              <HeartIcon className="h-5 w-5 text-red-400" />
              <span className="text-gray-200 font-medium">Hecho con amor para la comunidad estudiantil</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-300 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>🏠</span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-gray-300 hover:text-blue-300 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>ℹ️</span>
                  Información
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-300 transition-all duration-200 flex items-center gap-2 hover:translate-x-1">
                  <span>📞</span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Carreras</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/program/informatica" className="text-gray-300 hover:text-primary transition-colors">
                  Informática
                </Link>
              </li>
              <li>
                <Link to="/program/psicologia" className="text-gray-300 hover:text-primary transition-colors">
                  Psicología
                </Link>
              </li>
              <li>
                <Link to="/program/diseno" className="text-gray-300 hover:text-primary transition-colors">
                  Diseño Gráfico
                </Link>
              </li>
              <li>
                <Link to="/program/marketing" className="text-gray-300 hover:text-primary transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/program/turismo" className="text-gray-300 hover:text-primary transition-colors">
                  Turismo y Hotelería
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {new Date().getFullYear()} APUNTES UDA. Todos los derechos reservados @apuntesuda.com</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="mailto:apuntesUDA@gmail.com"
                className="text-gray-300 hover:text-primary transition-colors text-sm"
              >
                apuntesUDA@gmail.com
              </a>
              
              <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
                <span>☕</span>
                <span>Apoyar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs mt-6">
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