export interface SignUpResponse {
  id: string;
  token: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
