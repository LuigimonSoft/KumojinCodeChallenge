export class Event
{
  public id!: number;
  public name!: string;
  public description!: string;
  public startDate!: string;
  public endDate!: string;

  constructor(name: string, description: string, startDate: string, endDate: string) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}