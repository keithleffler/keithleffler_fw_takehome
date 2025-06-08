import {test,expect} from '@playwright/test'
import {ProjectApi} from '@fieldwire/api';

test.describe('Projects API tests', () => {
  test('should return  a list of  projects', async ({request},testInfo) => {
    const baseUrl = testInfo.project.use.baseURL as string;
    const api = new ProjectApi(baseUrl)
    const projects = await api.getProjects()
    expect(projects.length).toBeGreaterThan(0)
  })
  test('should return a project by name',async({request},testInfo)=>{
    const baseUrl = testInfo.project.use.baseURL as string;
    const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string;
    const api = new ProjectApi(baseUrl)
    const project = await api.getByName(projectName)
    expect(project).toBeDefined()
  })

})
