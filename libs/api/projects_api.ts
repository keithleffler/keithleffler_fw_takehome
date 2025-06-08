import { Api } from './api_v3';
import axios from 'axios';
import { JSONPath } from 'jsonpath-plus';
export class ProjectApi extends Api {

  /*
    The ProjectApi class is a wrapper for the /api/v3/projects endpoint.

    This class helps allow direct access to a project, without using the
    UI to click on a project button.

    A test for creating a project could verfy the project data.  Once verified,
    the project data could be used as expected values for UI tests:
      1.  Was the expected data returned?
      2.  Does the UI handle the verified data correctly?

   */

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
