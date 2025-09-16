// Public Google Drive API service (no authentication required)
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

/**
 * List files in a public Google Drive folder using only API Key
 */
export const listPublicFiles = async (folderId) => {
  try {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', `'${folderId}' in parents and trashed=false`);
    url.searchParams.set('fields', 'files(id, name, mimeType, modifiedTime, size)');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('pageSize', '100');
    
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', response.status, errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
    }
    
    const data = await response.json();
    
    return data.files || [];
  } catch (error) {
    console.error('Error fetching public files:', error);
    throw error;
  }
};

/**
 * Search files in public Google Drive folder
 */
export const searchPublicFiles = async (folderId, searchTerm) => {
  try {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', `'${folderId}' in parents and name contains '${searchTerm}' and trashed=false`);
    url.searchParams.set('fields', 'files(id, name, mimeType, modifiedTime, size)');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('pageSize', '100');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error searching public files:', error);
    throw error;
  }
};

/**
 * Get public file download URL
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
  return file.mimeType === 'application/vnd.google-apps.folder';
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
 * Get file count for a folder
 */
export const getFolderFileCount = async (folderId) => {
  try {
    const files = await listPublicFiles(folderId);
    return files.length;
  } catch (error) {
    console.error('Error getting folder file count:', error);
    return 0;
  }
};