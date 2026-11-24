import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('/')

  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByText('PET TYPES').click()

})


test.describe('Assignment 1 - Input fields', () => {

  test('Update pet type', async ({ page }) => {

    const editPetTypeHeading = page.getByRole('heading', { name: 'Edit Pet Type' })
    const petTypeNameInputField = page.locator('#name') //locator for the textbox to edit pet type name
    const firstRecordEditButton = page.getByRole('button', { name: 'Edit' }).first()
    const updateRecordButton = page.getByRole('button', { name: 'Update' })


    //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')

    //3. Click on "Edit" button for the "cat" pet type
    await firstRecordEditButton.click() //click on the first row of the table
    await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')

    //4. Add assertion of the "Edit Pet Type" text displayed
    await expect(editPetTypeHeading).toHaveText('Edit Pet Type') //assert the text in <h2 is Edit Pet Type

    //5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await expect(petTypeNameInputField).toHaveValue('cat')
    await petTypeNameInputField.fill('rabbit')
    await updateRecordButton.click()


    //6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    await expect(page.locator('[id="0"]')).toHaveValue('rabbit')

    // 7. Click on "Edit" button for the same "rabbit" pet type
    await firstRecordEditButton.click()

    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
    await petTypeNameInputField.fill('cat')
    await updateRecordButton.click()

    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(petTypeNameInputField).toHaveValue('cat')
  })


  test('Cancel pet type update', async ({ page }) => {

    const DogPetTypeRow = page.locator('table tr').nth(2)
    const petTypeNameInputField = page.locator('#name')

    // 1. Select the PET TYPES menu item in the navigation bar 
    //already called in before each

    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types') //assert the text in <h2 is Pet Types

    // 3. Click on "Edit" button for the "dog" pet type
    await DogPetTypeRow.getByRole('button', { name: 'Edit' }).click()

    // 4. Type the new pet type name "moose"
    await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
    await petTypeNameInputField.fill('moose')


    // 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
    await expect(page.getByRole('textbox')).toHaveValue('moose')

    // 6. Click on "Cancel" button
    await page.getByRole('button', { name: 'Cancel' }).click()

    // 7. Add the assertion the value "dog" is still displayed in the list of pet types
    await expect(DogPetTypeRow.getByRole('textbox')).toHaveValue('dog')
  })



  test('Validation of Pet type name', async ({ page }) => {

    const LizardPetTypeRow = page.locator('table tr').nth(3)
    const LizardPetRowTextBox = page.locator('#name')

    // 1. Select the PET TYPES menu item in the navigation bar
    //already called in before each

    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types') //assert the text in <h2 is Pet Types

    // 3. Click on "Edit" button for the "lizard" pet type
    await LizardPetTypeRow.getByRole('button', { name: 'Edit' }).click()

    // 4. On the Edit Pet Type page, clear the input field
    await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/**')
    await LizardPetRowTextBox.clear()

    // 5. Add the assertion for the "Name is required" message below the input field
    await expect(page.locator('.help-block')).toHaveText('Name is required')

    // 6. Click on "Update" button
    await page.getByRole('button', { name: 'Update' }).click()

    // 7. Add assertion that "Edit Pet Type" page is still displayed
    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type')

    // 8. Click on the "Cancel" button
    await page.getByRole('button', { name: 'Cancel' }).click()
    // 9. Add assertion that "Pet Types" page is displayed

    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')
  })

})