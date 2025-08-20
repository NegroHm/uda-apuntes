import React from 'react'
import SecureDriveExplorer from '../components/SecureDriveExplorer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          {/* Logo prominente sin decoraciones */}
          <div className="mb-8">
            <img 
              src="/Logo.png" 
              alt="APUNTES UDA" 
              className="w-20 h-20 md:w-32 md:h-32 object-contain mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-gray-900">
            APUNTES UDA
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Accede a todos los apuntes universitarios organizados por carrera
          </p>
          
          {/* Status indicators - minimalist */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium text-sm">En línea</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-blue-700 font-medium text-sm">🔒 Seguro</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium text-sm">📚 Gratuito</span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://cafecito.app/apuntesuda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              ☕ Apoya el proyecto
            </a>
            <a
              href="mailto:apuntesUDA@gmail.com?subject=Quiero agregar mis apuntes&body=Hola! Me gustaría contribuir con mis apuntes a la plataforma."
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              📚 Contribuye con apuntes
            </a>
          </div>
        </div>

        {/* Secure Drive Explorer */}
        <div className="max-w-7xl mx-auto">
          <SecureDriveExplorer rootFolderId="1oOYF9Od5NeSErp7lokq95pQ37voukBvu" />
        </div>

        {/* Features Section - Minimalist */}
        <div className="mt-20 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📁</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Organizado</h3>
              <p className="text-gray-600 leading-relaxed">Archivos organizados por carrera, semestre y materia para fácil acceso</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rápido</h3>
              <p className="text-gray-600 leading-relaxed">Acceso instantáneo a todos los apuntes sin complicaciones ni registros</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Colaborativo</h3>
              <p className="text-gray-600 leading-relaxed">Por y para estudiantes. Una comunidad que comparte conocimiento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home