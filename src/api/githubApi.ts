
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