import { endOfDay, startOfDay } from 'date-fns';

export interface TableFilter {
  getFilter(): object;
}

export class DateFilter implements TableFilter {
  fromDate?: Date;
  toDate?: Date;

  public constructor(private readonly column: string) {}

  getFilter(): object {
    const filter: Record<string, string> = {};

    this.leanCloudFilter(filter);

    return filter;
  }

  private leanCloudFilter(filter: Record<string, string>) {
    if (this.fromDate && this.toDate) {
      filter[this.column] = `${startOfDay(this.fromDate).toUTCString()}, ${endOfDay(
        this.toDate
      ).toUTCString()}`;
    } else if (this.fromDate) {
      filter[this.column] = startOfDay(this.fromDate).toUTCString();
    } else if (this.toDate) {
      filter[this.column] = endOfDay(this.toDate).toUTCString();
    }
  }
}

export class TextFilter implements TableFilter {
  value: string;

  public constructor(private readonly column: string) {
    this.value = '';
  }

  getFilter(): object {
    const filter: Record<string, string> = {};

    filter[this.column] = this.value;

    return filter;
  }
}
