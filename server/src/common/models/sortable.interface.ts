import { SortDirection } from '../enums/sort-direction.enum';

export interface ISortable {
  getSortDirection(): SortDirection;
  getSortColumn(): string;
  asKeyValue(): { [key: string]: string };
}
