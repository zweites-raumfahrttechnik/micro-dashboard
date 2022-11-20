export interface AddServiceAccessFormData {
  name: string;
  visitor: string;
  visited: string[];
}

export type DelServiceAccessFormData = Omit<AddServiceAccessFormData, 'name'>;
