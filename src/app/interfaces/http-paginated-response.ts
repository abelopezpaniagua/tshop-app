import { HttpResponse } from './http-response';

export interface HttpPaginatedResponse extends HttpResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  firstPage: string | null;
  lastPage: string | null;
  nextPage: string | null;
  previousPage: string | null;
}
