import axios from 'axios';

export const getAllPhotoCategory = async () => {
    try {
        const response = await axios.get('/api/get-photo-categories');

       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const AllPhotoCategory = async () => {
  try {
      const response = await axios.get('/api/all-photo-categories');

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};


export const getSinglePhoto = async (slug) => {
  try {
      const response = await axios.get(`/api/get-single-photo/${slug}`);
      
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};



export const getAllPhotos= async () => {
  try {
      const response = await axios.get('/api/get-all-photos');

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};



export const saveBannerPhoto = async (bannerImage ,slug, token) => {

    try {
        
        const response = await axios.post(
            `/api/save-banner-photo/`,
            { bannerImage, slug }, // Provide an object with the data you want to send in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};




export const deleteSingleImage = async (slug , images, token) => {

  try {
      
      const response = await axios.put(
          '/api/delete-photo',
          { images, slug }, // Provide an object with the data you want to send in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};



export const saveLandscapePhoto = async (landscapeImages ,slug, token) => {

    try {
        
        const response = await axios.post(
            '/api/save-landscape-photo',
            { landscapeImages, slug }, // Provide an object with the data you want to send in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const savePhoto = async (images ,slug, token) => {

    try {
        
        const response = await axios.post(
            '/api/save-photo',
            { images, slug }, // Provide an object with the data you want to send in the request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const removeImage = async (image) => {
    try {
        const response = await axios.post('/api/project/remove-image', {image});

       
        return response.data;
    } catch (error) {
       
        console.error(error);
        
    }
};

export const uploadPhoto = async (files , slug) => {
    const fileArray = Array.from(files);
   
    const formData = new FormData();
  

    fileArray.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
    });


  

    try {
    const response = await axios.post(`/api/project/upload-image/${slug}`, formData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          
          // Include slug in the request body
    });
        return response.data;
    } catch (error) {
        console.error(error);
        // Handle error appropriately
        throw error;
    }
};