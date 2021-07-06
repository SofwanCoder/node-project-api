export interface DataQuery {
  per_page: string;
  page: string;
  search?: string;
}

export interface RequestUser {
  id: string;
  clearance: number;
  token: string;
}
