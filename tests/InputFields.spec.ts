import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  await page.getByText('PET TYPES').click()
  
})

test('Update pet type', async ({page}) => {
const tabletitle = await page.locator('h2', {hasText: 'Pet Types' }) //locator for <h2 element
const editpettypeheading =await page.locator('h2', {hasText: 'Edit Pet Type' })
const editpettypetextbox = await page.locator('#name') //locator for the textbox to edit pet type name


//STEP 2
await expect(tabletitle).toHaveText('Pet Types') //assert the text in <h2 is Pet Types

//For locating the Edit button that is in the same row as cat, I have tried below page locator and it did not work:
// await page.getByRole('table').locator('tr', {hasText: 'cat'}).getByRole('button', {hasText: 'Edit' }).click() 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STEP 3
await page.locator('table').locator('tr').getByRole('button', {hasText: 'Edit' }).first().click() //click on the first row of the table

//STEP 4
await expect(editpettypeheading).toHaveText('Edit Pet Type') //assert the text in <h2 is Edit Pet Type

//STEP 5
await expect(editpettypetextbox).toHaveValue('cat') //I have found this in one of your videos in slack to resolve the input issue
await editpettypetextbox.fill('rabbit') //fill the textbox with new pet type name

//step 6


})
