import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    //1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
    await page.getByText('Veterinarians').click()
    await page.getByText('All').click()
})

test.describe('Assignment 2 - Checkboxes', () => {

     test('Validate selected specialties', async ({ page }) => {
        const specialtiesDropdown = page.locator('.selected-specialties')
        // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
        //Added to beforeEach above since it is called by all 3 tests in this assignment

        // 2. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians
        await expect(page.getByRole('heading')).toHaveText('Veterinarians')

        // 3. Select the veterinarian "Helen Leary" and click "Edit Vet" button
       await page.getByRole('row', { name: 'Helen Leary' }).getByRole('button', { name: 'Edit Vet' }).click()
        
        // you can use following instead:
        //await page.locator('table tr').filter({ hasText: 'Helen Leary' }).getByRole('button', { name: 'Edit Vet' }).click()

        // 4. Add assertion of the "Specialties" field. The value "radiology" is displayed
        await expect(specialtiesDropdown).toHaveText('radiology')

        // 5. Click on the "Specialties" drop-down menu
        await specialtiesDropdown.click()

        // 6. Add assertion that "radiology" specialty is checked
        await expect(page.getByRole('checkbox', { name: 'radiology' })).toBeChecked()

        // 7. Add assertion that "surgery" and "dentistry" specialties are unchecked
        await expect(page.getByRole('checkbox', { name: 'surgery' })).not.toBeChecked()
        await expect(page.getByRole('checkbox', { name: 'dentistry' })).not.toBeChecked()

        // 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality 
        await page.getByRole('checkbox', { name: 'surgery' }).check()
        await page.getByRole('checkbox', { name: 'radiology' }).uncheck()

        // 9. Add assertion of the "Specialties" field displayed value "surgery"
        await expect(specialtiesDropdown).toHaveText('surgery')

        // 10. Check the "dentistry" item specialty
        await page.getByRole('checkbox', { name: 'dentistry' }).check()

        // 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed
        await expect(specialtiesDropdown).toHaveText('surgery, dentistry')

    })

    test('Select all specialties', async ({ page }) => {
        const specialtiesDropdown = page.locator('.selected-specialties')
        // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
        //Added to beforeEach above since it is called by all 3 tests in this assignment

        // 2. Select the veterinarian "Rafael Ortega" and click "Edit Vet" button
        await page.getByRole('row', { name: 'Rafael Ortega' }).getByRole('button', { name: 'Edit Vet' }).click()

        // 3. Add assertion that "Specialties" field is displayed value "surgery"
        await expect(specialtiesDropdown).toHaveText('surgery')

        // 4. Click on the "Specialties" drop-down menu
        await specialtiesDropdown.click()

        // 5. Check all specialties from the list
        // 6. Add assertion that all specialties are checked
        for (const speciality of await page.getByRole('checkbox').all()) {
            await speciality.check()
            await expect(speciality).toBeChecked()
        }

        // 7. Add assertion that all checked specialities are displayed in the "Specialties" field
        await expect(specialtiesDropdown).toHaveText('surgery, radiology, dentistry')

    })

    test('Unselect all specialties', async ({ page }) => {
        const specialtiesDropdown = page.locator('.selected-specialties')

        // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
        //Added to beforeEach above since it is called by all 3 tests in this assignment

        // 2. Select the veterinarian "Linda Douglas" and click "Edit Vet" button
         await page.getByRole('row', { name: 'Linda Douglas' }).getByRole('button', { name: 'Edit Vet' }).click()

        // 3. Add assertion of the "Specialties" field displayed value "surgery, dentistry"
        await expect(specialtiesDropdown).toHaveText('dentistry, surgery')

        // 4. Click on the "Specialties" drop-down menu
        await specialtiesDropdown.click()

        // 5. Uncheck all specialties from the list
        // 6. Add assertion that all specialties are unchecked
        const allspeciality = await page.getByRole('checkbox') // all checkboxes on the page
        for (const speciality of await allspeciality.all()) {
            await speciality.uncheck()
            await expect(speciality).not.toBeChecked()
        }
        // 7. Add assertion that "Specialties" field is empty
        await expect(specialtiesDropdown).toBeEmpty()
    })

})
