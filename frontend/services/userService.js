import axios from "axios";
const API_URL = "http://localhost:8000/api/users";

export const signup = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  

  export const login = async ({ email, password }) => {
    
    try{
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  
  }


  export const getUserProfile = async ({ token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/profile`, config);
      return data;
    } catch (error) {
      // Handle response error from the server
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        const message = error.response.data.message || 'An error occurred while fetching the profile';
        const status = error.response.status;
        console.error(`Error ${status}: ${message}`);
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received from the server');
        throw new Error('No response received from the server');
      } else {
        // Something went wrong in setting up the request
        console.error('Error', error.message);
        throw new Error(error.message);
      }
    }
  };


  export const updateProfile = async ({ token, userData }) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`${API_URL}/updateprofile`, userData, config);
      return data;
      
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  export const updateProfilePicture = async ({ token, formData }) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(`${API_URL}/updateprofileimage`, formData, config);
      return data;
      
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  export default { signup, login , getUserProfile, updateProfile, updateProfilePicture};