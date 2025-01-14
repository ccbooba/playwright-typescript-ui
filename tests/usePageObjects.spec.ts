import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import { NavigationPage } from '../page-objects/navigationPage'
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
// import { DatepickerPage } from '../page-objects/datepickerPage' 

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async({page}) => {
    // const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutsPage()
    // await navigateTo.datepickerPage()
    // await navigateTo.smartTablePage()
    // await navigateTo.toastrPage()
    // await navigateTo.tooltipPage()
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized methods', async({page}) => {
    
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatepickerPage = new DatepickerPage(page)
    
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test3@test.com", "123!@#qweQWE", "Option 2")
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("John Smith", "john@test.com", true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(-40)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(-70,50)
})