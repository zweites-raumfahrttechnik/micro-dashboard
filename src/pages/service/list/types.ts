export interface SearchParams {
  pg: number;
  size: number;
  name?: string;
  user?: string;
  startAt?: string;
  endAt?: string;
}

export interface SearchFormData extends Omit<SearchParams, 'pg' | 'size' | 'startAt' | 'endAt'> {
  createAt?: string[];
}
