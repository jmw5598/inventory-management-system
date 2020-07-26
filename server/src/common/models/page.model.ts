import { IPageable } from "./pageable.interface";

export class Page<T> {
  public elements: T[];
  public totalElements: number;
  public totalPages: number;
  public current: IPageable;
  public next: IPageable;
  public previous: IPageable;
}
