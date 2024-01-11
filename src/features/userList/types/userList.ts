export interface FetchUserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: FetchUserListResponseItem[];
  support: Support;
}

export interface FetchUserListResponseItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}
