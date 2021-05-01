import axios from 'axios';
export default axios.create({
  baseURL: process.env.VUE_APP_API || 'http://localhost:3000/'
})