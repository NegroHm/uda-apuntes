import { useState, useEffect } from 'react';
import { 
  listFiles, 
  searchFiles, 
  getPublicFileUrl, 
  isFolder, 
  formatFileSize, 
  formatDate
} from '../services/publicDrive';
import { ArrowTopRightOnSquareIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import FileIcon from './FileIcon';
import { SkeletonGrid } from './SkeletonLoader';

const SecureDriveExplorer = ({ rootFolderId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState(rootFolderId);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    loadFiles();
  }, [currentFolder]);

  const loadFiles = async () => {
    if (!currentFolder) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading files for folder:', currentFolder);
      const fileList = await listFiles(currentFolder);
      console.log('Files loaded:', fileList);
      setFiles(fileList);
    } catch (error) {
      console.error('Error loading files:', error);
      setError(error.message);
      
      // If it's a network error, check backend health
      if (error.message.includes('fetch')) {
        checkHealth();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim() || !backendHealthy) {
      loadFiles();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchFiles(currentFolder, searchTerm);
      setFiles(results);
    } catch (error) {
      console.error('Error searching files:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    if (!isFolder(folder)) return;
    
    setCurrentFolder(folder.id);
    setBreadcrumbs([...breadcrumbs, { id: folder.id, name: folder.name }]);
    setSearchTerm('');
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setCurrentFolder(rootFolderId);
      setBreadcrumbs([]);
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setBreadcrumbs(newBreadcrumbs);
      setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id);
    }
    setSearchTerm('');
  };

  const handleFileClick = (file) => {
    if (isFolder(file)) {
      handleFolderClick(file);
    } else {
      // Open file in new tab
      window.open(getPublicFileUrl(file.id), '_blank');
    }
  };

  const handleRetry = () => {
    if (!backendHealthy) {
      checkHealth();
    } else {
      loadFiles();
    }
  };

  // Backend health warning
  if (!backendHealthy) {
    return (
      <div className="w-full animate-fade-in">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 card-hover">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-100 rounded-full">
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-800 gradient-text">Servidor Backend Requerido</h3>
              <p className="text-yellow-700 mt-1">Para acceder a los archivos de forma segura, necesitas iniciar el servidor backend.</p>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">📋 Instrucciones:</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span>Abre una nueva terminal</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Ve al directorio: <code className="bg-gray-800 text-white px-2 py-1 rounded font-mono text-sm">cd server</code></span>
              </li>
              <li className="flex items-center gap-2">
                <span>Instala dependencias: <code className="bg-gray-800 text-white px-2 py-1 rounded font-mono text-sm">npm install</code></span>
              </li>
              <li className="flex items-center gap-2">
                <span>Inicia el servidor: <code className="bg-gray-800 text-white px-2 py-1 rounded font-mono text-sm">npm run dev</code></span>
              </li>
            </ol>
          </div>
          
          <button
            onClick={checkHealth}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Verificar conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 text-blue-600">📚</div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Apuntes Universitarios</h2>
              <p className="text-gray-600">Explora y descarga los apuntes organizados por carrera</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">Conexión segura</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="🔍 Buscar archivos y carpetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 md:px-5 py-3 md:py-4 pl-10 md:pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base md:text-lg mobile-search"
            />
            <MagnifyingGlassIcon className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            {searchTerm && (
              <button
                onClick={() => {setSearchTerm(''); loadFiles();}}
                className="flex-1 sm:flex-none px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100 animate-slide-in">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-lg">🏠</span>
                Inicio
              </button>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-2">
                  <span className="text-gray-400 text-xl">›</span>
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md max-w-[200px] truncate"
                    title={crumb.name}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 mb-8 animate-slide-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h4 className="font-bold text-red-800">Error de conexión</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Intentar de nuevo
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center py-12 mb-8">
              <div className="relative">
                <div className="animate-spin-slow rounded-full h-16 w-16 border-4 border-blue-100"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-700">Cargando archivos...</h3>
                <p className="text-gray-500">Esto puede tomar unos segundos</p>
              </div>
            </div>
            <SkeletonGrid count={8} />
          </div>
        )}

        {/* Files Grid */}
        {!loading && !error && (
          <div className="animate-fade-in">
            {files.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="inline-flex p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                    <span className="text-6xl">📂</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No se encontraron archivos</h3>
                  <p className="text-gray-500 text-lg">
                    {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Esta carpeta está vacía'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 mobile-card-spacing grid-responsive">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className="group bg-white rounded-lg p-4 md:p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="flex-shrink-0 p-2 md:p-3 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <FileIcon 
                          mimeType={file.mimeType} 
                          fileName={file.name} 
                          isFolder={isFolder(file)} 
                          size="w-6 h-6 md:w-8 md:h-8" 
                        />
                      </div>
                      {!isFolder(file) && (
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-300" />
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 text-base md:text-lg">
                      {file.name}
                    </h3>
                    
                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      {file.size && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"></span>
                          <span className="truncate">{formatFileSize(file.size)}</span>
                        </div>
                      )}
                      {file.modifiedTime && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full"></span>
                          <span className="truncate">{formatDate(file.modifiedTime)}</span>
                        </div>
                      )}
                      <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-200 group-hover:border-blue-200">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 group-hover:bg-blue-700 text-white rounded-lg text-xs md:text-sm font-medium transition-all duration-200">
                          {isFolder(file) ? (
                            <>
                              <span>📁</span>
                              <span className="hidden sm:inline">Abrir carpeta</span>
                              <span className="sm:hidden">Abrir</span>
                            </>
                          ) : (
                            <>
                              <span>📄</span>
                              <span className="hidden sm:inline">Ver archivo</span>
                              <span className="sm:hidden">Ver</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureDriveExplorer;