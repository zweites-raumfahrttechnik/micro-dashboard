export interface SearchParams {
  pg: number;
  size: number;
  name?: string;
  user?: string;
  status?: number;
  startAt?: string;
  endAt?: string;
}

export interface SearchFormData extends Omit<SearchParams, 'pg' | 'size' | 'startAt' | 'endAt'> {
  createAt?: string[];
}
