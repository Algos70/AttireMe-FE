import { getCookie } from './cookies';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadToImgBB = async (file: File): Promise<string> => {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API key is not configured');
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to ImgBB');
    }

    const data = await response.json();
    console.log('ImgBB upload response:', data);
    
    if (data.success) {
      // Prefer medium.url, fallback to url
      return data.data.medium?.url || data.data.url;
    } else {
      throw new Error(data.error?.message || 'Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw error;
  }
}; 