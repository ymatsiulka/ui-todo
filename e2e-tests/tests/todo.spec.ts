import { test, expect, Page } from '@playwright/test';

const countSelector = 'div[class=left] > span';
const dndFooterSelector = '#dnd-footer';
const clearCompletedTodosButtonSelector = 'div[class=right] > button';
const getPageStatusActiveSelector = '#show-active-todo-btn';
const getPageStatusCompletedSelector = '#show-completed-todo-btn';
const getAllTodosInListSelector = `ul[title='ui-todo-list'] > li`;
const getListItemSelectorByTodoName = (todoName: string) => `ul[title='ui-todo-list'] > li:has-text("${todoName}") `; // Select <li> with the specific text
const getListItemDeleteButtonSelectorByTodoName = (todoName: string) => `ul[title='ui-todo-list'] > li:has-text("${todoName}") > button`; // Select <li> with the specific text
const getCheckboxSelectorByTodoName = (todoName: string) => `//div/label[text()="${todoName}"]`;
const inputSelector = "input[title='todo-input']";

const todoName1 = 'todoName1';
const todoName2 = 'todoName2';
const todoName3 = 'todoName3';

test.beforeEach(async ({ page }) => {
  await gotoInitialPage(page);
});

test('Title of application should be visible', async ({ page }) => {
  const todoHeading = page.locator('h1', { hasText: 'T O D O' });
  await expect(todoHeading).toBeVisible();
});

test('Todo should be added when input is on focus and pressed enter button', async ({ page }) => {
  const todoName = 'todoName';
  await createTodoAndVerify(page, todoName);
});

test('Created todo should be removed when button in todo-element is clicked', async ({ page }) => {
  const todoName = 'todoName2';
  await createTodoAndVerify(page, todoName);
  await removeTodoAndVerify(page, todoName);
});

test('Check todos number in all status on todo-list', async ({ page }) => {
  await createDefaultTodos(page);
  await checkTodoByName(page, todoName1);
  const counterElement = await page.locator(countSelector);
  await expect(counterElement).toHaveText('2 items left');
});

test('Check todos number in active status on todo-list', async ({ page }) => {
  await createDefaultTodos(page);

  await checkTodoByName(page, todoName1);
  const pageActiveStatusButton = await page.locator(getPageStatusActiveSelector);
  await pageActiveStatusButton.click({ force: true });
  const allTodos = await page.locator(getAllTodosInListSelector);
  await expect(allTodos).toHaveCount(2);
});

test('Check todos number in completed status on todo-list', async ({ page }) => {
  await createDefaultTodos(page);

  await checkTodoByName(page, todoName1);
  const pageCompletedStatusButton = await page.locator(getPageStatusCompletedSelector);
  await pageCompletedStatusButton.click({ force: true });
  const allTodos = await page.locator(getAllTodosInListSelector);
  await expect(allTodos).toHaveCount(1);
});

test('Clear completed todos and check todos number in 3 sections (All, Active, Completed)', async ({ page }) => {
  await createDefaultTodos(page);
  await checkTodoByName(page, todoName1);
  const clearCompletedTodosButton = await page.locator(clearCompletedTodosButtonSelector);
  await clearCompletedTodosButton.click({ force: true });
  await expectTodosInList(page, 2);

  const pageActiveStatusButton = await page.locator(getPageStatusActiveSelector);
  await pageActiveStatusButton.click({ force: true });
  await expectTodosInList(page, 2);

  const pageCompletedStatusButton = await page.locator(getPageStatusCompletedSelector);
  await pageCompletedStatusButton.click({ force: true });
  await expectTodosInList(page, 0);
});

test('Check that text is not appeared "Drag and drop to reorder list", when todo list with less than 1 item', async ({ page }) => {
  let dndFooterElement = await page.locator(dndFooterSelector);
  await expect(dndFooterElement).not.toHaveText('Drag and drop to reorder list');
  const todoName1 = 'todoName1';
  await createTodoAndVerify(page, todoName1);
  dndFooterElement = await page.locator(dndFooterSelector);
  await expect(dndFooterElement).not.toHaveText('Drag and drop to reorder list');
});

test('Check that text is appeared "Drag and drop to reorder list", when todo list with 2 or more items', async ({ page }) => {
  await createTodoAndVerify(page, todoName1);
  await createTodoAndVerify(page, todoName2);
  let dndFooterElement = await page.locator(dndFooterSelector);
  await expect(dndFooterElement).toHaveText('Drag and drop to reorder list');
  await createTodoAndVerify(page, todoName3);
  dndFooterElement = await page.locator(dndFooterSelector);
  await expect(dndFooterElement).toHaveText('Drag and drop to reorder list');
});

test('Check that drag and drop works correctly if second element place on first element', async ({ page }) => {
  await createTodoAndVerify(page, todoName1);
  await createTodoAndVerify(page, todoName2);
  const createdTodo1 = await page.locator(getListItemSelectorByTodoName(todoName1));
  const createdTodo2 = await page.locator(getListItemSelectorByTodoName(todoName2));
  createdTodo1.dragTo(createdTodo2);
  const items = page.locator(getAllTodosInListSelector);
  await expect(items.nth(0)).toHaveText(todoName1);
  await expect(items.nth(1)).toHaveText(todoName2);
});

const gotoInitialPage = async (page: Page) => {
  await page.goto('');
};

const createTodoAndVerify = async (page: Page, todoName: string) => {
  page.fill(inputSelector, todoName);
  page.press(inputSelector, 'Enter');
  const item = await page.locator(getListItemSelectorByTodoName(todoName));
  await expect(item).toBeVisible();
};

const checkTodoByName = async (page: Page, todoName: string) => {
  const item = await page.locator(getCheckboxSelectorByTodoName(todoName));
  await item.check();
};

const removeTodoAndVerify = async (page: Page, todoName: string) => {
  const created = await page.locator(getListItemSelectorByTodoName(todoName));
  created.hover();
  const button = await page.locator(getListItemDeleteButtonSelectorByTodoName(todoName));
  await expect(button).toBeVisible();
  button.click();
  await expect(created).not.toBeVisible();
};

const expectTodosInList = async (page: Page, count: number) => {
  const allTodos = await page.locator(getAllTodosInListSelector);
  await expect(allTodos).toHaveCount(count);
};

const createDefaultTodos = async (page: Page) => {
  await createTodoAndVerify(page, todoName1);
  await createTodoAndVerify(page, todoName2);
  await createTodoAndVerify(page, todoName3);
};
