import { useState, useEffect } from 'react';
import { listPublicFiles, searchPublicFiles, getPublicFileUrl, isFolder } from '../services/publicDrive';
import { FolderIcon, DocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const PublicDriveExplorer = ({ rootFolderId }) => {
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
      const fileList = await listPublicFiles(currentFolder);
      console.log('Files loaded:', fileList);
      setFiles(fileList);
    } catch (error) {
      console.error('Error loading files:', error);
      setError(`Error cargando archivos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadFiles();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchPublicFiles(currentFolder, searchTerm);
      setFiles(results);
    } catch (error) {
      console.error('Error searching files:', error);
      setError(`Error en la búsqueda: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
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

  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleFileClick = (file) => {
    if (isFolder(file)) {
      handleFolderClick(file);
    } else {
      // Open file in new tab
      window.open(getPublicFileUrl(file.id), '_blank');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Apuntes Universitarios</h2>
          <p className="text-gray-600">Explora y descarga los apuntes organizados por carrera</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar archivos y carpetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Buscar
          </button>
          {searchTerm && (
            <button
              onClick={() => {setSearchTerm(''); loadFiles();}}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => handleBreadcrumbClick(-1)}
              className="text-blue-600 hover:underline font-medium"
            >
              📚 Inicio
            </button>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.id} className="flex items-center gap-2">
                <span className="text-gray-400">›</span>
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="text-blue-600 hover:underline"
                >
                  {crumb.name}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadFiles}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Cargando archivos...</span>
          </div>
        )}

        {/* Files Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron archivos</p>
                <p className="text-gray-400 text-sm mt-2">
                  {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Esta carpeta está vacía'}
                </p>
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {isFolder(file) ? (
                      <div className="flex-shrink-0">
                        <FolderIcon className="w-8 h-8 text-blue-500" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <DocumentIcon className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    
                    {!isFolder(file) && (
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {file.name}
                  </h3>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    {file.size && <div>{formatFileSize(file.size)}</div>}
                    {file.modifiedTime && <div>{formatDate(file.modifiedTime)}</div>}
                    <div className="text-blue-600 font-medium">
                      {isFolder(file) ? 'Abrir carpeta' : 'Ver archivo'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDriveExplorer;