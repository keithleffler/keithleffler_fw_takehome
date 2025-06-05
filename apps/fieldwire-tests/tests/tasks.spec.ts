import {v4 as uuidv4} from 'uuid';
import { test, expect } from '@playwright/test';
import { ProjectApi, TasksApi } from '../../../libs/api';
import { TaskPage } from '../../../libs/page-objects/projects/task_page';
import { findUniqueElements } from '@fieldwire/helpers';


test.describe('Tasks tests', () => {

  let projectId = ""
  let baseUrl = ""
  const newTasks:string[] = []
  test.beforeEach( async ({ page },testInfo) => {

    // get baseUrl from project data
    baseUrl = testInfo.project.use.baseURL as string;

    // get the project name from an environment variable
    const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string; // TODO: error handling if env doesn't exist,

    // Create a new projectAPI, use it to get the projectId
    const projectApi = new ProjectApi(baseUrl);  //TODO: error handling if baseURL is not set
    projectId = await projectApi.getByName(projectName);

    // Create a new TaskPage page object.
    const taskPage = new TaskPage(page,baseUrl, projectId)

    // goto the tasks page for the project
    await taskPage.goto();
  })
  test.afterEach( async ({ page }) => {
    // Create a new Tasks api instance
    const tasksApi = new TasksApi(baseUrl, projectId);

    // create a delete request for each new task created in the project
    const requests = newTasks.map(taskId => tasksApi.deleteTask(taskId))

    // await all delete requests to resolve
    await Promise.all(requests)

  })
  test('should create a new task',  async ({ page },testInfo) => {

    // Create a new TasksApi instance, and get the existing tasks in the project
    const tasksApi = new TasksApi(baseUrl, projectId);
    const existingTasks = await tasksApi.getTasks();

    // Create a new TasksPage page object
    const taskPage = new TaskPage(page, baseUrl,projectId)

    // Create a new project task, with a randomly generated name
    const id = uuidv4().substring(0,10)
    const taskName = `task ${id}`
    await taskPage.createNewTask(taskName)

    // Get the current tasks from the project
    const currentTasks = await tasksApi.getTasks();

    // Expect that there's an additional task in the project now.
    expect(currentTasks.length).toBe(existingTasks.length + 1);

    // TODO:  The findUniqueElements isn't returning what I expect.  Fix it to return the IDs of tasks created in this test
    // const _newTasks = findUniqueElements<string>(existingTasks,currentTasks)
    // _newTasks.forEach(task => newTasks.push(task))

  });

  /*
    Exploratory testing shows that the task editor will accept negative values as
    well as very large and very small numbers. I'm not sure if this is by design.
    I was planning to write the tests for these, knowing that they would fail.  The
    point of the expect.soft is to show one way of dealing with known issues until they're fixed.
   */
  test('should reject negative manpower values',  ({ page }) => {
    expect.soft(true,'Needs clarification on expected behavior').toBe(false);
  });
  test('should reject very large manpower values',  ({ page }) => {
    expect.soft(true,'Needs clarification on expected behavior').toBe(false);
  });
  test('should reject very small manpower values',  ({ page }) => {

    expect.soft(true,'Needs clarification on expected behavior').toBe(false);
  });
});


