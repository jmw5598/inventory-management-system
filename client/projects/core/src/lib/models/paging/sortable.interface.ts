import { SortDirection } from './sort-direction.enum';

export interface ISortable {
  direction: string;
  column: string;
  getSortDirection(): SortDirection;
  getSortColumn(): string;
  asKeyValue(): { [key: string]: string };
}
