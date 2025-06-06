import { Api } from './api_v3';
import axios from 'axios';
import { JSONPath } from 'jsonpath-plus';
export class ProjectApi extends Api {

  /*
    This class is a wrapper for the projects API.
   */
  // TODO - get a schema defintion for a projects record, to avoid the errors with assigning to any.

  getProjects = async ():Promise<any> => {
    const token = this.accessToken;
    try {
      const url = `${this.baseUrl}/${this.apiRoot}/projects`;
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

  getByName = async (name: string):Promise<any> => {
    const projects = await this.getProjects();
    const result = JSONPath({
      path: `$[?(@.code=="${name}")].id`,
      json: projects

    });

    return result[0];
  }
}
