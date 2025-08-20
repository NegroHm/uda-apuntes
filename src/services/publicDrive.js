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
    
    console.log('Fetching from URL:', url.toString());
    
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
    console.log('API Response:', data);
    
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