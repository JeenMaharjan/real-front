import axios from 'axios';

export const uploadProperty = async (propertyData , token) => {

    try {
        
        const response = await axios.post(
            '/api/upload-property',
            propertyData, // Provide an object with the data you want to send in the request body
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


export const allProperties= async () => {
  try {
      const response = await axios.get('/api/all-properties');

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};


export const property= async (slug) => {
  try {
      const response = await axios.get(`/api/property/${slug}`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};

export const otherProperty= async (slug) => {
  try {
      const response = await axios.get(`/api/otherproperty/${slug}`);

     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};


export const updateProperty = async (slug , propertyData , token) => {

  try {
      
      const response = await axios.put(
          `/api/update-property/${slug}`,
          propertyData, // Provide an object with the data you want to send in the request body
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


export const deleteProperty = async(id, token) => {


  try {
      const response = await axios.delete(`/api/delete-property/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      return error.response.data;
  }

}

export const deleteSinglePropertyImage = async (slug , images) => {

  try {
      
      const response = await axios.put(
          `/api/delete-property-photo/${slug}`,
          { images }, // Provide an object with the data you want to send in the request body
      
        );
     
      return response.data;
  } catch (error) {
     
      console.error(error);
      
  }
};


export const getProducts = async(sort, order, page , perPage) =>
  await axios.post(`/api/products`, {
      sort,
      order,
      page,
    perPage
  });

  export const getSoldProducts = async(sort, order, page , perPage) =>
    await axios.post(`/api/productssold`, {
        sort,
        order,
        page,
        perPage
    });
  
  
    export const getPropertyCount= async () => {
      try {
          const response = await axios.get(`/api/properties/count`);
    
         
          return response.data;
      } catch (error) {
         
          console.error(error);
          
      }
    };
    

