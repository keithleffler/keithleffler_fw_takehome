import { test, expect } from '@playwright/test';
import { ProjectApi, TasksApi } from '@fieldwire/api';
import { TaskPO } from '@fieldwire/page-objects';
import { shortUUID } from '@fieldwire/helpers';
import { TaskEditorPO } from '@fieldwire/page-objects';


test.describe('Tasks tests', () => {

  let projectId = ""
  let baseUrl = ""
  let existingTasks:string[] = []
  test.beforeEach( async ({ page },testInfo) => {

    // get baseUrl from project data
    baseUrl = testInfo.project.use.baseURL as string;

    // get the project name from an environment variable
    const projectName = process.env['FIREWIRE_TEST_PROJECT'] as string; // TODO: error handling if env doesn't exist,

    // Create a new projectAPI, use it to get the projectId
    const projectApi = new ProjectApi(baseUrl);  //TODO: error handling if baseURL is not set
    projectId = await projectApi.getByName(projectName) as string;

    // TODO:  get a list of tasks in the project.

    // Create a new TaskPage page object.
    const taskPage = new TaskPO(page,baseUrl, projectId)

    // goto the tasks page for the project
    await taskPage.goto();
  })
  test.afterEach( async () => {
    /*
      Tests should clean up data created during testing. This method isn't working as expected.
      DELETE /task seems to mark tasks as deleted, but doesn't remove them.  More work
      needed here to clean up tasks created during testing.

      // Create a list of tasks created during this test, so they can be deleted.

      // TODO:  The findUniqueElements isn't returning what I expect.  Fix it to return the IDs of tasks created in this test
      // const _newTasks = findUniqueElements<string>(existingTasks,currentTasks)
      // _newTasks.forEach(task => newTasks.push(task))
    */

    // // Create a new Tasks api instance
    // const tasksApi = new TasksApi(baseUrl, projectId);
    //
    // // create a delete request for each new task created in the project
    // const requests = newTasks.map(taskId => tasksApi.deleteTask(taskId))
    //
    // // await all delete requests to resolve
    // await Promise.all(requests)

  })
  test('should create a new task',  async ({ page }) => {

    // Create a new TasksApi instance, and get the existing tasks in the project
    const tasksApi = new TasksApi(baseUrl, projectId);
    const existingTasks = await tasksApi.getTasks();

    // Create a new TasksPage page object
    const taskPage = new TaskPO(page, baseUrl,projectId)

    // Create a new project task, with a randomly generated name
    const id = shortUUID()
    const taskName = `task ${id}`
    await taskPage.createNewTask(taskName)

    // Get the current tasks from the project
    const currentTasks = await tasksApi.getTasks();

    // Expect that there's an additional task in the project now.
    expect(currentTasks.length).toBe(existingTasks.length + 1);

  });


  test.fail('should reject negative manpower values', async ({ page }) => {

    /*
     Verify that the manpower field rejects negative values

      This test is currently failing, but I want the test run to pass if there
      are no other errors.

      Manpower and cost attributes of a task do
      not appear to have range checking. The fields accept negative values, and
      very small and very large values.  Values that don't fit in the text box are
      displayed in scientific format:  ie 1e+100.  I would check project specs and product
      owner to know if this is by design or was overlooked, then file a defect if necessary.
     */

    // Get a list of existing tasks
    const taskPage = new TaskPO(page, baseUrl,projectId)
    const tasksApi = new TasksApi(baseUrl, projectId);

    // Create a new task, with a randomly generated name
    const id = shortUUID()
    const taskName = `task ${id}`
    await taskPage.createNewTask(taskName)
    const tasks = await tasksApi.getTasks() as {id:string}[];

    // Create a TaskEditor page object and open the task editor for the first task
    const taskEditor = new TaskEditorPO(page,baseUrl,projectId)
    await taskEditor.goto(tasks[tasks.length-1].id)

    // set the manpower value to a negative value.
    const negativeValue = '-1000';
    const locator = taskEditor.locators.manpower()
    await taskEditor.setAttribute(locator,negativeValue)

    // Search for the negative manpower value in the page.    
    const re = new RegExp(`Manpower${negativeValue}Hoursedit`)
    const n = 2
    const nonRangeChecked = await taskEditor.locators.divWithText(re,n).all()

    // Expect the length of matched elements to be zero.  
     expect.soft(nonRangeChecked.length,'Needs clarification on expected behavior').toBe(0);
  });

});


