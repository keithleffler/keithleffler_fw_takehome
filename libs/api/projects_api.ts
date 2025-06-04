import { Api } from './api_v3';
import axios from 'axios';

export class ProjectApi extends Api {

  getProjects = async ():Promise<any> => {
    const token = this.accessToken;
    try {
      const response = await axios.get('https://api.example.com/endpoint', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
