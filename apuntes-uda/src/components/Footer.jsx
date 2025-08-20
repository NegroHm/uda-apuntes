import React from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M12 7L4 11v6c0 3.31 2.69 6 6 6s6-2.69 6-6v-6l-8-4z" fill="white"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">APUNTES UDA</h3>
                <p className="text-gray-400 text-sm">Por y para los estudiantes</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Plataforma colaborativa de apuntes universitarios diseñada para mejorar 
              la experiencia de estudio y facilitar el acceso a material académico de calidad.
            </p>
            
            <div className="flex items-center space-x-2 text-primary">
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm">Hecho con amor para la comunidad estudiantil</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-gray-300 hover:text-primary transition-colors">
                  Información
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
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