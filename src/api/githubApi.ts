
import axios from 'axios';

const baseURL = 'https://api.github.com/repos/facebook/react';

const bearerToken = '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';

export const githubApi = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
   }
});