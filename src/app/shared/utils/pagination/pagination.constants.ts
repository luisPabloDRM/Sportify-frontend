import { PaginatedData, PaginationValues } from './pagination.models';

export const EMPTY_PAGINATED_RESPONSE: PaginatedData<any> = {
  meta: {
    total: 0,
    firstPage: 1,
    lastPage: 1,
    currentPage: 1,
  },
  data: [],
};

export const PAGINATION_COMMON_PROPERTIES: Array<keyof Omit<PaginationValues, 'filters'>> = [
  'size',
  'page',
  'sortField',
  'sortOrder',
];
