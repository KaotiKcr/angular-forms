export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public fullTime: boolean,
    public paymentType: string,
    public primaryLanguage: string,
    public startDate: Date,
    public startTime: Date,
    public rate: number
    ) {}
}
