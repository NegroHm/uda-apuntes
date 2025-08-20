import React from 'react'
import { Link } from 'react-router-dom'
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  CloudArrowDownIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Organización Académica',
    description: 'Apuntes organizados por carrera, año y materia para facilitar tu estudio.'
  },
  {
    icon: UserGroupIcon,
    title: 'Por y para Estudiantes',
    description: 'Plataforma creada por estudiantes universitarios para ayudar a otros estudiantes.'
  },
  {
    icon: BookOpenIcon,
    title: 'Contenido Actualizado',
    description: 'Material de estudio constantemente actualizado con las últimas versiones.'
  },
  {
    icon: CloudArrowDownIcon,
    title: 'Descarga Gratuita',
    description: 'Todos los apuntes están disponibles para descarga gratuita.'
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Búsqueda Avanzada',
    description: 'Encuentra rápidamente el contenido que necesitas con nuestro sistema de búsqueda.'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Responsive Design',
    description: 'Accede desde cualquier dispositivo: móvil, tablet o computadora.'
  }
]

const Information = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre APUNTES UDA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Herramienta diseñada para mejorar tu organización a la hora de estudiar
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
              APUNTES UDA nace de la necesidad de tener un espacio centralizado donde los estudiantes 
              puedan acceder fácilmente a apuntes, resúmenes y material de estudio de alta calidad, 
              organizados de manera intuitiva y accesible desde cualquier dispositivo.
            </p>
            <p className="text-gray-600 text-center">
              Creemos en la educación colaborativa y en el poder de compartir conocimiento 
              para mejorar el rendimiento académico de toda la comunidad estudiantil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ¿Cómo usar la plataforma?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Selecciona tu carrera</h3>
                <p className="text-gray-600 text-sm">
                  Elige tu programa académico desde la página principal
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Escoge el año</h3>
                <p className="text-gray-600 text-sm">
                  Navega por los años académicos disponibles
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accede a los apuntes</h3>
                <p className="text-gray-600 text-sm">
                  Descarga el material de la materia que necesites
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Quieres contribuir?
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Si tienes apuntes de calidad que quieras compartir con otros estudiantes, 
              o ideas para mejorar la plataforma, ¡nos encantaría escucharte!
            </p>
            <Link
              to="/contact"
              className="inline-flex px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information