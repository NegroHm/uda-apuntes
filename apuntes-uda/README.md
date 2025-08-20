# APUNTES UDA 📚

> Por y para los estudiantes

Una plataforma moderna y responsiva de apuntes universitarios construida con React, diseñada para mejorar la organización y acceso al material de estudio.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para móvil, tablet y escritorio
- **Navegación Intuitiva**: Organización por carrera, año y materia
- **Búsqueda Avanzada**: Encuentra rápidamente el contenido que necesitas
- **Carga Rápida**: Optimizado con lazy loading y code splitting
- **SEO Optimizado**: Metadatos completos para mejor indexación
- **Accesible**: Diseño inclusivo siguiendo mejores prácticas

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **React Router** - Navegación SPA
- **Tailwind CSS** - Framework de estilos
- **Heroicons** - Iconos
- **Vite** - Build tool y desarrollo

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Footer.jsx      # Pie de página
│   └── LoadingSpinner.jsx
├── pages/              # Páginas principales
│   ├── Home.jsx        # Página de inicio
│   ├── ProgramView.jsx # Vista de carrera
│   ├── SubjectView.jsx # Vista de materias
│   ├── Information.jsx # Información
│   ├── Contact.jsx     # Contacto
│   └── SearchResults.jsx
├── context/            # Estado global
│   └── SearchContext.jsx
└── App.jsx             # Componente principal
```

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Diseño Responsivo

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Paleta de Colores

- **Primary**: #00B8D4 (Turquesa)
- **Secondary**: #0097A7 (Turquesa oscuro)
- **Accent**: #00ACC1 (Cian)

## 📈 Optimizaciones de Performance

- Lazy loading de componentes
- Code splitting por vendor
- Compresión de assets
- Optimización de imágenes
- Preconnect a Google Fonts

## 📞 Contacto

**Email**: apuntesUDA@gmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

---

*Hecho con ❤️ para la comunidad estudiantil*
