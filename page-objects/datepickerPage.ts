import {Page, expect} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{
    //private readonly page: Page

    constructor(page: Page){
        //this.page = page
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
        
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const startDate = await this.selectDateInCalendar(startDayFromToday)
        const endDate = await this.selectDateInCalendar(endDayFromToday)
        const rangeToAssert = `${startDate} - ${endDate}`

        await expect(calendarInputField).toHaveValue(rangeToAssert)
    }

    private async selectDateInCalendar(numberOfDaysFromToday: number){
        let date = new Date()    // today
        date.setDate(date.getDate() + numberOfDaysFromToday) // N days from today
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-Us', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-Us', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while(!calendarMonthandYear.includes(expectedMonthAndYear)){
            if(numberOfDaysFromToday>=0)
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            else
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]').click()
            calendarMonthandYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        const dayCell = this.page.locator('[class="day-cell ng-star-inserted"]')
        const rangeCell = this.page.locator('[class="range-cell day-cell ng-star-inserted"]')
        if(await dayCell.first().isVisible()){
            await dayCell.getByText(expectedDate, {exact: true}).click()
        } else {
            await rangeCell.getByText(expectedDate, {exact: true}).click()
        }

        return dateToAssert
    }
}
