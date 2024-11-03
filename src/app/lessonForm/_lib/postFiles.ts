import axios from 'axios';

const postFiles = async (formData: FormData, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(`/api/postFile`, formData, { headers });
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

export default postFiles;
