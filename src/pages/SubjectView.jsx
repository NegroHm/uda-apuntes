import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRightIcon, FolderIcon, ArrowLeftIcon, DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline'

const subjectData = {
  informatica: {
    title: 'Lic. en Informática y Desarrollo de Software',
    years: {
      '1': {
        name: '1° AÑO',
        subjects: [
          { id: 1, name: 'Matemática I', files: 12, lastUpdate: '2024-01-15' },
          { id: 2, name: 'Programación I', files: 18, lastUpdate: '2024-01-20' },
          { id: 3, name: 'Inglés Técnico I', files: 8, lastUpdate: '2024-01-10' },
          { id: 4, name: 'Introducción a la Informática', files: 15, lastUpdate: '2024-01-18' },
          { id: 5, name: 'Lógica y Estructuras Discretas', files: 10, lastUpdate: '2024-01-12' },
          { id: 6, name: 'Arquitectura de Computadores', files: 14, lastUpdate: '2024-01-22' },
          { id: 7, name: 'Sistemas Operativos I', files: 11, lastUpdate: '2024-01-16' },
          { id: 8, name: 'Metodología de la Investigación', files: 7, lastUpdate: '2024-01-14' }
        ]
      },
      '2': {
        name: '2° AÑO', 
        subjects: [
          { id: 1, name: 'Matemática II', files: 13, lastUpdate: '2024-01-25' },
          { id: 2, name: 'Programación II', files: 20, lastUpdate: '2024-01-28' },
          { id: 3, name: 'Base de Datos I', files: 16, lastUpdate: '2024-01-24' },
          { id: 4, name: 'Algoritmos y Estructuras de Datos', files: 19, lastUpdate: '2024-01-26' },
          { id: 5, name: 'Redes de Computadoras I', files: 12, lastUpdate: '2024-01-23' },
          { id: 6, name: 'Ingeniería de Software I', files: 17, lastUpdate: '2024-01-27' },
          { id: 7, name: 'Sistemas Operativos II', files: 14, lastUpdate: '2024-01-21' },
          { id: 8, name: 'Estadística', files: 9, lastUpdate: '2024-01-19' },
          { id: 9, name: 'Inglés Técnico II', files: 8, lastUpdate: '2024-01-17' }
        ]
      }
    }
  },
  psicologia: {
    title: 'Licenciatura Psicología',
    years: {
      '1': {
        name: '1° AÑO',
        subjects: [
          { id: 1, name: 'Psicología General', files: 15, lastUpdate: '2024-01-15' },
          { id: 2, name: 'Biología', files: 12, lastUpdate: '2024-01-18' },
          { id: 3, name: 'Filosofía', files: 10, lastUpdate: '2024-01-12' },
          { id: 4, name: 'Antropología', files: 11, lastUpdate: '2024-01-16' },
          { id: 5, name: 'Sociología', files: 9, lastUpdate: '2024-01-14' },
          { id: 6, name: 'Metodología de la Investigación', files: 8, lastUpdate: '2024-01-20' }
        ]
      }
    }
  }
}

const SubjectView = () => {
  const { programId, yearId } = useParams()
  const programData = subjectData[programId]
  const yearData = programData?.years[yearId]

  if (!programData || !yearData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Año no encontrado</h2>
          <Link 
            to={`/program/${programId}`} 
            className="text-primary hover:text-secondary transition-colors"
          >
            Volver a la carrera
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
          <Link to={`/program/${programId}`} className="hover:text-primary transition-colors">
            {programData.title}
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{yearData.name}</span>
        </nav>

        <div className="mb-8">
          <Link
            to={`/program/${programId}`}
            className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            VOLVER A AÑOS
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {yearData.name}
          </h1>
          <p className="text-lg text-gray-600">
            {programData.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {yearData.subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-3">
                    <FolderIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{subject.files} archivos disponibles</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">Actualizado: {subject.lastUpdate}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Ver apuntes
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Información del año académico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {yearData.subjects.length}
              </div>
              <div className="text-gray-600">Materias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {yearData.subjects.reduce((sum, subject) => sum + subject.files, 0)}
              </div>
              <div className="text-gray-600">Archivos totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-gray-600">Completitud</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Nota:</strong> Los apuntes están organizados por materia. 
              Cada materia contiene recursos actualizados y material de estudio 
              contribuido por estudiantes y profesores.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectView