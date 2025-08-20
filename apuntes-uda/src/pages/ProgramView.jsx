import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRightIcon, FolderIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const programData = {
  informatica: {
    title: 'Lic. en Informática y Desarrollo de Software',
    years: [
      { id: '1', name: '1° AÑO', subjects: 8 },
      { id: '2', name: '2° AÑO', subjects: 9 },
      { id: '3', name: '3° AÑO', subjects: 10 },
      { id: '4', name: '4° AÑO', subjects: 7 }
    ]
  },
  psicologia: {
    title: 'Licenciatura Psicología',
    years: [
      { id: '1', name: '1° AÑO', subjects: 6 },
      { id: '2', name: '2° AÑO', subjects: 7 },
      { id: '3', name: '3° AÑO', subjects: 8 },
      { id: '4', name: '4° AÑO', subjects: 6 }
    ]
  },
  diseno: {
    title: 'Licenciatura en Diseño Gráfico',
    years: [
      { id: '1', name: '1° AÑO', subjects: 7 },
      { id: '2', name: '2° AÑO', subjects: 8 },
      { id: '3', name: '3° AÑO', subjects: 9 },
      { id: '4', name: '4° AÑO', subjects: 5 }
    ]
  },
  marketing: {
    title: 'Licenciatura en Marketing',
    years: [
      { id: '1', name: '1° AÑO', subjects: 6 },
      { id: '2', name: '2° AÑO', subjects: 7 },
      { id: '3', name: '3° AÑO', subjects: 8 },
      { id: '4', name: '4° AÑO', subjects: 6 }
    ]
  },
  turismo: {
    title: 'Lic. en Turismo y Hotelería',
    years: [
      { id: '1', name: '1° AÑO', subjects: 7 },
      { id: '2', name: '2° AÑO', subjects: 8 },
      { id: '3', name: '3° AÑO', subjects: 7 },
      { id: '4', name: '4° AÑO', subjects: 6 }
    ]
  }
}

const ProgramView = () => {
  const { programId } = useParams()
  const program = programData[programId]

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Programa no encontrado</h2>
          <Link 
            to="/" 
            className="text-primary hover:text-secondary transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{program.title}</span>
        </nav>

        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {program.title}
          </h1>
          <p className="text-lg text-gray-600">
            Selecciona el año académico para ver los apuntes disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {program.years.map((year) => (
            <Link
              key={year.id}
              to={`/program/${programId}/year/${year.id}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <FolderIcon className="h-12 w-12 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {year.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {year.subjects} materias disponibles
                </p>
                
                <div className="flex items-center justify-center text-primary group-hover:text-secondary transition-colors">
                  <span className="text-sm font-medium">Ver materias</span>
                  <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sobre esta carrera
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Aquí encontrarás todos los apuntes organizados por año académico. 
            Cada año contiene las materias correspondientes con sus respectivos 
            materiales de estudio, apuntes y recursos complementarios.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Total de años: {program.years.length}
            </div>
            <div className="text-sm text-gray-500">
              Total de materias: {program.years.reduce((sum, year) => sum + year.subjects, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramView