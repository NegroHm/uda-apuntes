// Secure Drive API Service - Uses backend API instead of direct Google API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005/api';

/**
 * Fetch wrapper with error handling
 */
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * List files in a folder using secure backend API
 */
export const listFiles = async (folderId = null, pageSize = 50) => {
  try {
    const endpoint = folderId 
      ? `${API_BASE_URL}/drive/files/${folderId}` 
      : `${API_BASE_URL}/drive/files`;
    
    const url = new URL(endpoint);
    if (pageSize) {
      url.searchParams.set('pageSize', pageSize.toString());
    }

    const data = await fetchWithErrorHandling(url.toString());
    return data.files || [];
  } catch (error) {
    console.error('Error fetching files:', error);
    throw new Error(`Error cargando archivos: ${error.message}`);
  }
};

/**
 * Search files in a folder using secure backend API
 */
export const searchFiles = async (folderId, searchTerm, pageSize = 50) => {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      throw new Error('El término de búsqueda debe tener al menos 2 caracteres');
    }

    const url = new URL(`${API_BASE_URL}/drive/search/${folderId}`);
    url.searchParams.set('q', searchTerm);
    if (pageSize) {
      url.searchParams.set('pageSize', pageSize.toString());
    }

    const data = await fetchWithErrorHandling(url.toString());
    return data.files || [];
  } catch (error) {
    console.error('Error searching files:', error);
    throw new Error(`Error en la búsqueda: ${error.message}`);
  }
};

/**
 * Get file metadata using secure backend API
 */
export const getFileMetadata = async (fileId) => {
  try {
    if (!fileId) {
      throw new Error('ID de archivo requerido');
    }

    const data = await fetchWithErrorHandling(`${API_BASE_URL}/drive/file/${fileId}/metadata`);
    return data;
  } catch (error) {
    console.error('Error fetching file metadata:', error);
    throw new Error(`Error obteniendo información del archivo: ${error.message}`);
  }
};

/**
 * Get public Google Drive view URL
 */
export const getPublicFileUrl = (fileId) => {
  return `https://drive.google.com/file/d/${fileId}/view`;
};

/**
 * Get direct download URL for public file
 */
export const getDirectDownloadUrl = (fileId) => {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/**
 * Check if file is a folder
 */
export const isFolder = (file) => {
  return file.mimeType === 'application/vnd.google-apps.folder' || file.isFolder === true;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === '0') return '-';
  
  const numBytes = parseInt(bytes);
  if (isNaN(numBytes)) return '-';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(numBytes) / Math.log(1024));
  
  if (i === 0) return `${numBytes} ${sizes[i]}`;
  return `${(numBytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Health check for backend API
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};