import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by class value
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full) = same as by Attribute
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText("Using the Grid").click()
    
    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async({page}) => {
    //Nested locators via space
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //Nested locators one by one
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //Mixing resular locator with user-facing locator
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()

    //By Index
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async({page}) => {
    //Second argument for locator: hasText
    await page.locator('nb-card', {hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    //Second argument for locator: hasText
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    //locator's filter method
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    //2 consecutive filters: has checkbox + has Sign In button
    await page.locator('nb-card').filter({has:page.locator('.custom-checkbox')}).filter({hasText:'Sign In'})
        .getByRole('textbox', {name: "Email"}).click()

        //Go one level up ('..') using XPath (NOT RECOMMENDED)
        await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

//Reusing locators
test('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('p@$$w0rd')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input field value
    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill('test1@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test1@test.com')

    //get the value of an attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')

    //Generic assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})

