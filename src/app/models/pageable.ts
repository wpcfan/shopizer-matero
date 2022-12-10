export interface Pageable<T> {
  totalPages: number;
  recordsTotal: number;
  recordsFiltered: number;
  number: number;
  data: T[];
}
