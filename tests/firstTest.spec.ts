import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Tables & Data').click()
    })
    
    test('the first test', async ({page}) => {
        await page.getByText('Smart Table').click()
    })
    
    test('Navigate to Datepicker page', async ({page}) => {
        await page.getByText('Tree Grid').click()
    })
})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    
    test('the first test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('Navigate to Datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})