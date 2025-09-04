import React, { useState } from 'react'
import { 
  EnvelopeIcon, 
  UserIcon, 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:apuntesUDA@gmail.com?subject=Contacto desde la web - ${formData.name}&body=Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`
    window.location.href = mailtoLink
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ¿Tienes preguntas, sugerencias o quieres contribuir? ¡Nos encantaría escucharte!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Información de Contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">apuntesUDA@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Propósito</h3>
                      <p className="text-gray-600 dark:text-gray-300">Mejorar la experiencia de estudio universitario</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <HeartIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contribuciones</h3>
                      <p className="text-gray-600 dark:text-gray-300">Apuntes, mejoras y sugerencias bienvenidas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instagram</h3>
                      <a 
                        href="https://www.instagram.com/apuntesuda/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary transition-colors"
                      >
                        @apuntesuda
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    ¿Cómo puedes ayudar?
                  </h3>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li>• Compartiendo apuntes de alta calidad</li>
                    <li>• Reportando errores o enlaces rotos</li>
                    <li>• Sugiriendo mejoras a la plataforma</li>
                    <li>• Difundiendo la plataforma entre compañeros</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tu nombre"
                      />
                      <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="tu@email.com"
                      />
                      <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Cuéntanos cómo podemos ayudarte o cómo quieres contribuir..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span>Enviar mensaje</span>
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Al enviar este formulario, se abrirá tu cliente de email por defecto
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Gracias por ser parte de la comunidad!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              APUNTES UDA es posible gracias a estudiantes como tú que creen en el poder 
              de compartir conocimiento. Juntos construimos una mejor experiencia educativa 
              para toda la comunidad universitaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact