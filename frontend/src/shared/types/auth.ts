export interface AuthState {
  tokens: TokensType;
  user: UserType;
}

export interface TokensType {
  access: {
    token: string | null;
    expires: string | null;
  };
  refresh: {
    token: string | null;
    expires: string | null;
  };
}
export interface UserType {
  email: string;
  _id: string;
  isEmailVerified: boolean;
  name: string;
  role: string;
  dailyCaloriesLimit: number;
  monthlyMoneyLimit: number;
  avgCaloriesPerWeek: number;
}

export interface UsersListResponseType {
  limit: number;
  page: number;
  results: Array<UserType>;
  totalPages: number;
  totalResults: number;
}
