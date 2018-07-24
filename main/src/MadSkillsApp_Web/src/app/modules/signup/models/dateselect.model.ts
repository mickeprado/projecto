export class DateMonthModel{
  month: number
  name: string

  getdaysinmonth(year) {
    return new Date(year, this.month, 0).getDate();
  }
}
export class DateModel {
  day: number
  year: number
  month: DateMonthModel
}
