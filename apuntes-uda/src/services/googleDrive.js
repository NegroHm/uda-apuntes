// Configuration for Google Drive API
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

// Scopes required for Google Drive access
const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.file'
].join(' ');

/**
 * Generate Google OAuth URL for authentication
 */
export const getAuthUrl = () => {
  const authUrl = 'https://accounts.google.com/oauth/authorize';
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return `${authUrl}?${params.toString()}`;
};

/**
 * Exchange authorization code for access token
 */
export const getAccessToken = async (code) => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokens = await response.json();
    
    // Store tokens in localStorage for future use
    localStorage.setItem('google_tokens', JSON.stringify(tokens));
    
    return tokens;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

/**
 * Load stored tokens from localStorage
 */
export const loadStoredTokens = () => {
  try {
    const stored = localStorage.getItem('google_tokens');
    if (stored) {
      const tokens = JSON.parse(stored);
      return tokens;
    }
  } catch (error) {
    console.error('Error loading stored tokens:', error);
  }
  return null;
};

/**
 * Get valid access token (refresh if needed)
 */
const getValidAccessToken = async () => {
  const tokens = loadStoredTokens();
  if (!tokens) {
    throw new Error('No tokens found. Please authenticate first.');
  }

  // Check if token needs refresh
  if (tokens.expires_in && Date.now() > tokens.expires_in) {
    if (tokens.refresh_token) {
      return await refreshAccessToken(tokens.refresh_token);
    } else {
      throw new Error('Token expired and no refresh token available');
    }
  }

  return tokens.access_token;
};

/**
 * Refresh access token
 */
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const newTokens = await response.json();
    
    // Update stored tokens
    const existingTokens = loadStoredTokens();
    const updatedTokens = { ...existingTokens, ...newTokens };
    localStorage.setItem('google_tokens', JSON.stringify(updatedTokens));
    
    return newTokens.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

/**
 * List files in Google Drive
 */
export const listFiles = async (folderId = null, pageSize = 10) => {
  try {
    const accessToken = await getValidAccessToken();
    
    let query = "trashed=false";
    if (folderId) {
      query += ` and '${folderId}' in parents`;
    }
    
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('pageSize', pageSize.toString());
    url.searchParams.set('q', query);
    url.searchParams.set('fields', 'nextPageToken, files(id, name, mimeType, modifiedTime, size, parents)');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Search files in Google Drive
 */
export const searchFiles = async (searchTerm, mimeType = null) => {
  try {
    const accessToken = await getValidAccessToken();
    
    let query = `name contains '${searchTerm}' and trashed=false`;
    if (mimeType) {
      query += ` and mimeType='${mimeType}'`;
    }
    
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', query);
    url.searchParams.set('fields', 'files(id, name, mimeType, modifiedTime, size, parents)');
    url.searchParams.set('pageSize', '100');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error('Error searching files:', error);
    throw error;
  }
};

/**
 * Download file content from Google Drive
 */
export const downloadFile = async (fileId) => {
  try {
    const accessToken = await getValidAccessToken();
    
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

/**
 * Get file metadata
 */
export const getFileMetadata = async (fileId) => {
  try {
    const accessToken = await getValidAccessToken();
    
    const url = new URL(`https://www.googleapis.com/drive/v3/files/${fileId}`);
    url.searchParams.set('fields', 'id, name, mimeType, modifiedTime, size, parents, description');
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting file metadata:', error);
    throw error;
  }
};

/**
 * Create a new folder in Google Drive
 */
export const createFolder = async (name, parentId = null) => {
  try {
    const drive = initializeDrive();
    
    const fileMetadata = {
      name,
      mimeType: 'application/vnd.google-apps.folder'
    };
    
    if (parentId) {
      fileMetadata.parents = [parentId];
    }
    
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id, name'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

/**
 * Upload file to Google Drive
 */
export const uploadFile = async (file, name, parentId = null) => {
  try {
    const drive = initializeDrive();
    
    const fileMetadata = {
      name
    };
    
    if (parentId) {
      fileMetadata.parents = [parentId];
    }
    
    const media = {
      mimeType: file.type,
      body: file
    };
    
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const tokens = loadStoredTokens();
  return tokens && tokens.access_token;
};

/**
 * Logout user (clear stored tokens)
 */
export const logout = () => {
  localStorage.removeItem('google_tokens');
};