import {test,expect} from '@playwright/test';
import { ProjectApi, TasksApi } from '@fieldwire/api';

test.describe('Tasks API tests', () => {
  test('should return a list of tasks in the project',async ({request},testInfo) => {
    const baseUrl = testInfo.project.use.baseURL as string;

    const projectApi = new ProjectApi(baseUrl)
    const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string;
    const projectId = await projectApi.getByName(projectName)
    const taskApi = new TasksApi(baseUrl,projectId)

    const tasks = await taskApi.getTasks()
    expect(tasks.length).toBeGreaterThan(0)
  })

})
