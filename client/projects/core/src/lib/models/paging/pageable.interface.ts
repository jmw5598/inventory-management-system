import { ISortable } from './sortable.interface';

export interface IPageable {
  page: number;
  size: number;
  sort: ISortable;
  getPageNumber(): number;
  getPageSize(): number;
  getSort(): ISortable;
  next(totalElements: number): IPageable;
  previous(totalElements: number): IPageable;
}
