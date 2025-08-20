import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ComputerDesktopIcon, 
  UserGroupIcon, 
  PaintBrushIcon, 
  MegaphoneIcon, 
  BuildingOffice2Icon 
} from '@heroicons/react/24/outline'

const programs = [
  {
    id: 'informatica',
    title: 'Lic. en Informática y Desarrollo de Software',
    description: 'Carrera enfocada en desarrollo de software y tecnologías de la información',
    icon: ComputerDesktopIcon,
    color: 'bg-blue-500'
  },
  {
    id: 'psicologia',
    title: 'Licenciatura Psicología',
    description: 'Estudio del comportamiento humano y procesos mentales',
    icon: UserGroupIcon,
    color: 'bg-purple-500'
  },
  {
    id: 'diseno',
    title: 'Licenciatura en Diseño Gráfico',
    description: 'Creatividad visual y comunicación gráfica profesional',
    icon: PaintBrushIcon,
    color: 'bg-pink-500'
  },
  {
    id: 'marketing',
    title: 'Licenciatura en Marketing',
    description: 'Estrategias comerciales y comunicación empresarial',
    icon: MegaphoneIcon,
    color: 'bg-orange-500'
  },
  {
    id: 'turismo',
    title: 'Lic. en Turismo y Hotelería',
    description: 'Gestión turística y servicios de hospitalidad',
    icon: BuildingOffice2Icon,
    color: 'bg-green-500'
  }
]

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenido a APUNTES UDA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu plataforma de apuntes universitarios. Por y para los estudiantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program) => {
            const IconComponent = program.icon
            return (
              <Link
                key={program.id}
                to={`/program/${program.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${program.color} mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-primary group-hover:text-secondary transition-colors">
                    <span className="text-sm font-medium">Ver apuntes</span>
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas ayuda?
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestra plataforma para encontrar los apuntes que necesitas o ponte en contacto con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/information"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                Más información
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home