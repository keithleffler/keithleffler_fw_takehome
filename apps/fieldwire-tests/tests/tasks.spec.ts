import { test, expect } from '@playwright/test';
import { ProjectApi, TasksApi } from '@fieldwire/api';
import { TaskPage } from '@fieldwire/page-objects';
import { shortUUID } from '@fieldwire/helpers';
import { TaskEditor } from '@fieldwire/page-objects';


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
    projectId = await projectApi.getByName(projectName) as string;

    // Create a new TaskPage page object.
    const taskPage = new TaskPage(page,baseUrl, projectId)

    // goto the tasks page for the project
    await taskPage.goto();
  })
  test.afterEach( async () => {
    // Create a new Tasks api instance
    const tasksApi = new TasksApi(baseUrl, projectId);

    // create a delete request for each new task created in the project
    const requests = newTasks.map(taskId => tasksApi.deleteTask(taskId))

    // await all delete requests to resolve
    await Promise.all(requests)

  })
  test('should create a new task',  async ({ page }) => {

    // Create a new TasksApi instance, and get the existing tasks in the project
    const tasksApi = new TasksApi(baseUrl, projectId);
    const existingTasks = await tasksApi.getTasks();

    // Create a new TasksPage page object
    const taskPage = new TaskPage(page, baseUrl,projectId)

    // Create a new project task, with a randomly generated name
    const id = shortUUID()
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


  test('should reject negative manpower values', async ({ page }) => {
    // Get a list of existing tasks
    const taskPage = new TaskPage(page, baseUrl,projectId)
    // Create a new project task, with a randomly generated name
    const id = shortUUID()
    const taskName = `task ${id}`
    await taskPage.createNewTask(taskName)

    const negativeValue = '-1000';
    const tasksApi = new TasksApi(baseUrl, projectId);
    const tasks = await tasksApi.getTasks() as {id:string}[];

    // Create a TaskEditor page object and open the task editor for the first task
    const taskEditor = new TaskEditor(page,baseUrl,projectId)
    await taskEditor.goto(tasks[tasks.length-1].id)

    // click on the manpower attribute, set the value, and submit
    await taskEditor.locators.manpower().click()
    await taskEditor.locators.textBox().click()
    await taskEditor.locators.textBox().fill(negativeValue)
    await taskEditor.locators.submitButton().click()

    // Search for the negative manpower value in the page.    
    const re = new RegExp(`Manpower${negativeValue}Hoursedit`)
    const n = 2
    const nonRangeChecked = await taskEditor.locators.divWithText(re,n).all()

    // Expect the length of matched elements to be zero.  
     expect.soft(nonRangeChecked.length,'Needs clarification on expected behavior').toBe(0);
  });

});


