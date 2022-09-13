export interface Option {
  name: string;
  type: 'switch' | 'number';
  value: unknown;
  disabled?: boolean;
  change: (val: unknown) => void;
}
