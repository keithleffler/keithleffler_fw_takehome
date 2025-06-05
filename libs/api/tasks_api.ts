import { Api } from './api_v3';
import axios from 'axios';
import { JSONPath } from 'jsonpath-plus';

export class TasksApi extends Api {
  constructor (baseUrl: string, private projectId:string) {
    super(baseUrl);
  }
  getTasks = async ():Promise<any> => {
    const token = this.accessToken;
    try {
      const url = `${this.baseUrl}/${this.apiRoot}/projects/${this.projectId}/tasks`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
