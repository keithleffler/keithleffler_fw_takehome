import { ProjectApi } from '@fieldwire/api';
import { TestInfo } from '@playwright/test';

export interface UrlData {
  baseUrl:string,
  projectId:string,
}
export const urlData = async(testInfo:TestInfo):Promise<UrlData> => {
  // get baseUrl from project data
  const baseUrl = testInfo.project.use.baseURL as string;

  // get the project name from an environment variable
  const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string; // TODO: error handling if env doesn't exist,

  // Create a new projectAPI, use it to get the projectId
  const projectApi = new ProjectApi(baseUrl);  //TODO: error handling if baseURL is not set
  const projectId = await projectApi.getByName(projectName);
  return {baseUrl,projectId}
}
