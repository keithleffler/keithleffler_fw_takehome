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
    let page = 1
    const url = `${this.baseUrl}/${this.apiRoot}/projects/${this.projectId}/tasks`;
    let tasks:unknown[] = []
    let xTotalPages = 1
    try {
      while (page <= xTotalPages) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            page: (page++).toString(10)
          }
        });
        xTotalPages = response.headers['x-total-pages']
        tasks = [...tasks, ...response.data]
      }
      return tasks
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error
    }
  }

}
