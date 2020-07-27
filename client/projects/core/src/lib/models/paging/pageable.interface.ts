import { ISortable } from './sortable.interface';

export interface IPageable {
  getPageNumber(): number;
  getPageSize(): number;
  getSort(): ISortable;
  next(totalElements: number): IPageable;
  previous(totalElements: number): IPageable;
}
