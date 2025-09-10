import React from 'react'
import { TrophyIcon } from '@heroicons/react/24/outline'

const RankingTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <TrophyIcon className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Ranking de Carreras
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Página de ranking funcionando correctamente
          </p>
        </div>
      </div>
    </div>
  )
}

export default RankingTest