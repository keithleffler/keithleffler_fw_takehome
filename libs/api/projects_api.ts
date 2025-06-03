import { Api } from './api_v3';

export class ProjectApi extends Api {
  // getFromName(name:string):Promise<any> {
  //   const projects = this.getProjects()
  // }
  getProjects = async (token:string):Promise<any> => {
    return Promise.resolve([]);
  }

}
