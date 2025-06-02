export interface RandomPasswordQueryParams {
  length?: number;
  exclude_numbers?: boolean;
  exclude_special_chars?: boolean;
}

export interface RandomPasswordResponse {
  random_password: string;
}
