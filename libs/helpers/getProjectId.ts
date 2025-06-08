import { ProjectApi } from '@fieldwire/api';
import { TestInfo } from '@playwright/test';

// Get the project ID from the FIELDWIRE_TEST_PROJECT environment variable
export const getProjectId = async(testInfo:TestInfo):Promise<string> => {
  // get baseUrl from project data
  const baseUrl = testInfo.project.use.baseURL as string;

  // get the project name from an environment variable
  const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string; // TODO: error handling if env doesn't exist,

  // Create a new projectAPI, use it to get the projectId
  const projectApi = new ProjectApi(baseUrl);  //TODO: error handling if baseURL is not set
  const projectId = await projectApi.getByName(projectName) as string;
  return projectId
}
