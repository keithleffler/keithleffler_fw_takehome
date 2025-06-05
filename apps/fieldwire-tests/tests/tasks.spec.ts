import {v4 as uuidv4} from 'uuid';
import { test, expect } from '@playwright/test';
import { ProjectApi, TasksApi } from '../../../libs/api';
import { TaskPage } from '../../../libs/page-objects/projects/task_page';

test.describe('Tasks tests', () => {

  let projectId = ""
  let baseUrl: string;
  test.beforeEach( async ({ page },testInfo) => {
    baseUrl = testInfo.project.use.baseURL as string;

    const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string; // TODO: error handling if env doesn't exist,
    const projectApi = new ProjectApi(baseUrl);  //TODO: error handling if baseURL is not set
    projectId = await projectApi.getByName(projectName);
    const taskPage = new TaskPage(page, projectId)
    await taskPage.goto();
  })

  test('should create a new task',  async ({ page },testInfo) => {
    const taskPage = new TaskPage(page, projectId)

    const tasksApi = new TasksApi(baseUrl, projectId);
    const existingTasks = await tasksApi.getTasks();
    const id = uuidv4().substring(0,10)
    const taskName = `task ${id}`
    await taskPage.createNewTask(taskName)

    const currentTasks = await tasksApi.getTasks();
    expect(currentTasks.length).toBe(existingTasks.length + 1);
  });

  test('should reject negative hour values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very large hour values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
  test('should reject very small hours values',  ({ page }) => {
    expect.soft(true).toBe(true);
  });
});
