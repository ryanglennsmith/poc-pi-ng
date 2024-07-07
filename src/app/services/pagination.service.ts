import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  paginate = (data: any[]) => {
    const itemsPerPage = 20;
    const pages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
    });
    return paginatedData;
  };
  constructor() {}
}
