export interface SearchParams {
  pg: number;
  size: number;
  createBy?: string;
  type?: string;
  dataId?: string;
  configType?: string;
  status?: string;
  startAt?: string;
  endAt?: string;
}

export interface SearchFormData extends Omit<SearchParams, 'pg' | 'size' | 'startAt' | 'endAt'> {
  createAt?: string[];
}
