export interface NavItem {
  title: string;
  url?: string;
  label?: string;
  items?: NavItem[];
  newTab?: boolean;
}
