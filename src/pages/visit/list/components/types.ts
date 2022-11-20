export interface GetServiceAccessParams {
  pg: number;
  size: number;
  name?: string;
  status?: string;
  userid?: string;
  visitor?: string;
}

export interface ServiceAccessFormData extends Omit<GetServiceAccessParams, 'pg' | 'size'> {
  createAt?: string[];
}
