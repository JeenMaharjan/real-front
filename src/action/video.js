import axios from 'axios';

export const submitVideoCategory = async (title , displayVideo , token) => {

    try {
        
        const response = await axios.post(
            '/api/save-video-category',
            { title, displayVideo }, // Provide an object with the data you want to send in the request body
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

export const submitPhotoCategory = async (title) => {

  try {
      
      const response = await axios.post(
          '/api/create-photo-category',
          { title }, // Provide an object with the data you want to send in the request body
         
        );
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const postVideo = async (slug , bannerImage , video , videoTitle , token) => {

  try {
      
      const response = await axios.post(
          '/api/save-indiviual-video',
          { slug , bannerImage , video , videoTitle }, // Provide an object with the data you want to send in the request body
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

export const deleteSingleLandscape = async (slug , landscapeImages, token) => {

  try {
      
      const response = await axios.put(
          '/api/delete-landscape-photo',
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

export const uploadBannerPhoto = async (files ,slug, token) => {
  const fileArray = Array.from(files);

const formData = new FormData();
fileArray.forEach((file, index) => {
  formData.append(`images[${index}]`, file);
});
console.log(formData)

  try {
      
      const response = await axios.post(`/api/upload-banner-photo/${slug}`, formData , {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};




export const AllVideoCategory = async () => {
  try {
      const response = await axios.get('/api/all-video-categories');

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const updateVideoCategory = async (slug , title , displayVideo ,pin , token) => {
  try {
      
    const response = await axios.put(
        `/api/update-indiviual-video/${slug}`,
        { title , displayVideo, pin }, // Provide an object with the data you want to send in the request body
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
}


export const updatePhotoCategory = async (slug , title , pin, token) => {
  try {
      
    const response = await axios.put(
        `/api/update-indiviual-Photo/${slug}`,
        { title , pin  }, // Provide an object with the data you want to send in the request body
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
}




export const deleteIndividualProject = async (slug , id , token) => {

  try {
      
    const response = await axios.delete('/api/delete-indiviual-video', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { slug, id },
    });
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const deleteVideoCategory = async ( id , token) => {

  try {
      
    const response = await axios.delete('/api/delete-video-category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    });
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};



export const deletePhotoCategory = async ( id , token) => {

  try {
      
    const response = await axios.delete('/api/delete-photo-category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    });
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};









export const getAllVideoCategory = async () => {
  try {
      const response = await axios.get('/api/get-video-categories');

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const getSingleVideoCategory = async (slug) => {
  try {
      const response = await axios.get(`/api/get-video-categories/${slug}`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const getSinglePhotoCategory = async (slug) => {
  try {
      const response = await axios.get(`/api/get-photo-categories/${slug}`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const getPhotoAggregate = async () => {
  try {
      const response = await axios.get(`/api/get-photo-aggregate`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const getVideoAggregate = async () => {
  try {
      const response = await axios.get(`/api/get-video-aggregate`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};




