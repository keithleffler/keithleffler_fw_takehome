import { Api } from './api_v3';
import axios from 'axios';

export class TasksApi extends Api {
  constructor (baseUrl: string, private projectId:string) {
    super(baseUrl);
  }

  deleteTask = async (taskId:string) => {
    const token = this.accessToken;
    try {
      const url = `${this.baseUrl}/${this.apiRoot}/projects/${this.projectId}/tasks/${taskId}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(`Error deleting task:${taskId}`, error);
    }
  }

  getTasks = async ():Promise<unknown[]> => {
    const token = this.accessToken;
    try {
      const url = `${this.baseUrl}/${this.apiRoot}/projects/${this.projectId}/tasks`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data as unknown[];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error
    }
  }

}
