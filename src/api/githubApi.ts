
import axios from 'axios';

const baseURL = 'https://api.github.com/repos/facebook/react';

export const githubApi = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'  
   }
});