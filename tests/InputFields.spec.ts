import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  
  await page.goto('/')

  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByText('PET TYPES').click()

})


test.describe('Assignment 1 - Input fields', () => {

test('Update pet type', async ({ page }) => {

  test.slow()
  const TableTitle = page.locator('h2', { hasText: 'Pet Types' }) //locator for <h2 element
  //locator for <h2 element
  const EditPetTypeHeading = page.locator('h2', { hasText: 'Edit Pet Type' })
  const EditPetTypeTextBox = page.locator('#name').first() //locator for the textbox to edit pet type name
  //locator for the textbox to edit pet type name
  const FirstRecordEditButton = page.locator('table').locator('tr').getByRole('button', { hasText: 'Edit' }).first()
  const UpdateRecordButton = page.getByRole('button', { name: 'Update' })
  const FirstPetNameRecord = await page.locator('table').locator('tr td input').first().inputValue()

  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  await expect(TableTitle).toHaveText('Pet Types') //assert the text in <h2 is Pet Types


  //3. Click on "Edit" button for the "cat" pet type
  await FirstRecordEditButton.click() //click on the first row of the table
  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
  //4. Add assertion of the "Edit Pet Type" text displayed
  await expect(EditPetTypeHeading).toHaveText('Edit Pet Type') //assert the text in <h2 is Edit Pet Type

  //5. Change the pet type name from "cat" to "rabbit" and click "Update" button

  await EditPetTypeTextBox.fill('rabbit') //fill the textbox with new pet type name
  await UpdateRecordButton.click()
  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes')

  //This test sometimes fails and sometimes passes 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
  expect(FirstPetNameRecord).toEqual('rabbit')

  // 7. Click on "Edit" button for the same "rabbit" pet type
  await FirstRecordEditButton.click()

  // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
  await EditPetTypeTextBox.fill('cat')
  await UpdateRecordButton.click()

  // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
  await expect(EditPetTypeTextBox).toHaveValue('cat')
})


test('Cancel pet type update', async ({ page }) => {

  test.slow()
  const TableTitle = page.locator('h2', { hasText: 'Pet Types' }) //locator for <h2 element
  const DogPetTypeRow = await page.locator('table tr').nth(2)
  const DogPetRowTextBox = await page.locator('#name')
  const UpdateRecordButton2 = page.getByRole('button', { name: 'Update' })


  // 1. Select the PET TYPES menu item in the navigation bar 
  // This is done under Before Each

  // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  await expect(TableTitle).toHaveText('Pet Types') //assert the text in <h2 is Pet Types

  // 3. Click on "Edit" button for the "dog" pet type
  await DogPetTypeRow.getByRole('button', { name: 'Edit' }).click()

  // 4. Type the new pet type name "moose"
  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
  await DogPetRowTextBox.fill('moose')


  // 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
  const DogPetRowInputValue = await page.getByRole('textbox').inputValue()
  await expect(DogPetRowInputValue).toEqual('moose')

  // 6. Click on "Cancel" button
  await page.getByRole('button', { name: 'Cancel' }).click()

  // 7. Add the assertion the value "dog" is still displayed in the list of pet types
  await expect(DogPetTypeRow.getByRole('textbox')).toHaveValue('dog')
})



test('Validation of Pet type name', async ({ page }) => {
  test.slow()
const TableTitle = page.locator('h2', { hasText: 'Pet Types' }) //locator for <h2 element
const LizardPetTypeRow = await page.locator('table tr').nth(3)
const LizardPetRowTextBox = await page.locator('#name')

// 1. Select the PET TYPES menu item in the navigation bar
//already done in previous tests
// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
//already done in previous tests

// 3. Click on "Edit" button for the "lizard" pet type
LizardPetTypeRow.getByRole('button', { name: 'Edit' }).click()

// 4. On the Edit Pet Type page, clear the input field
await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
await LizardPetRowTextBox.clear()

// 5. Add the assertion for the "Name is required" message below the input field
await expect(page.locator('form')).toContainText('Name is required')
// 6. Click on "Update" button
await page.getByRole('button', {name: 'Update'}).click()

// 7. Add assertion that "Edit Pet Type" page is still displayed
 const EditPetTypeHeading2 = page.locator('h2', { hasText: 'Edit Pet Type' })
 await expect(EditPetTypeHeading2).toBeVisible
// 8. Click on the "Cancel" button
await page.getByRole('button', {name: 'Cancel'}).click()
// 9. Add assertion that "Pet Types" page is displayed

 await expect(TableTitle).toBeVisible
})

})