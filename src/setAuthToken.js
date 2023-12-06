import axios from 'axios';
 export default function setAuthToken(token){
//    if (token) {
//        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//    }
//    else
//     delete axios.defaults.headers.common["Authorization"];
try {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    // Handle errors here, for example, log them or trigger some specific action
    console.error('Error setting authentication token:', error);
    throw error; // Rethrow the error to let the caller know that an error occurred
  }
}

