import axios from 'axios';

const postFile = async (file: File, accessToken: string) => {
  const formData = new FormData();
  formData.append('files', file);

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

export default postFile;
