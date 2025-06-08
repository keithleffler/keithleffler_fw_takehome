import { Api } from './api_v3';
import axios from 'axios';

/*
  TasksAPI is a wrapper for the Fieldwire API tasks endpoint.  Discovering the 'page'
  parameter was a lucky guess, made easier with the included Bruno collection.

  deleteTask seems to mark project tasks as deleted, but doesn't fully delete them.
  This is OK for a small exercise.  Many runs of an automated test suite could generate
  a very large number of tasks.  Good practice would be to fully delete tasks created during
  testing, especially if a project is used repeatedly during testing.
 */

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
    let page = 0
    let tasks:unknown[] = []
    const url = `${this.baseUrl}${this.apiRoot}/projects/${this.projectId}/tasks`;
    let xCurrentPage = 0
    let xTotalPages = 1
    try {
      while (xCurrentPage < xTotalPages) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: ++page
          }
        });
        xTotalPages = response.headers['x-total-pages']
        xCurrentPage = response.headers['x-current-page']
        tasks = [...tasks, ...response.data]
      }
      return tasks
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error
    }
  }

}
