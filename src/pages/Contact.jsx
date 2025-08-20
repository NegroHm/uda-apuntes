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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas, sugerencias o quieres contribuir? ¡Nos encantaría escucharte!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">apuntesUDA@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Propósito</h3>
                      <p className="text-gray-600">Mejorar la experiencia de estudio universitario</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <HeartIcon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Contribuciones</h3>
                      <p className="text-gray-600">Apuntes, mejoras y sugerencias bienvenidas</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    ¿Cómo puedes ayudar?
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Compartiendo apuntes de alta calidad</li>
                    <li>• Reportando errores o enlaces rotos</li>
                    <li>• Sugiriendo mejoras a la plataforma</li>
                    <li>• Difundiendo la plataforma entre compañeros</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envíanos un mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                      <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                      <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
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

                <div className="mt-6 text-center text-sm text-gray-500">
                  Al enviar este formulario, se abrirá tu cliente de email por defecto
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Gracias por ser parte de la comunidad!
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
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