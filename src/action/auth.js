import axios from "axios";

export const register = async(user) =>
    await axios.post(`/api/register`, user);

export const login = async(user) =>
    await axios.post(`/api/login`, user);


export const changePassword = async(values) =>
    await axios.post(`/api/changepassword`, values);

export const sendMessage = async(values) =>
    await axios.post(`/api/send-message`, values);

export const masterPassword = async (token , master) => {
      try {
          
          const response = await axios.put(`/api/masterpassword` ,master , {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
  
         
          return response.data;
      } catch (error) {
         
          console.error(error);
          
      }
  };
  

