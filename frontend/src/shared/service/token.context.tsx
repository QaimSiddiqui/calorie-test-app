import {
  useState,
  useCallback,
  useMemo,
  useContext,
  createContext,
} from 'react';

import jwtDecode, { JwtPayload } from 'jwt-decode';

import { TokensType } from 'shared/types/auth';
import {
  ACCESS_EXPIRY_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_EXPIRY_KEY,
  REFRESH_TOKEN_KEY,
} from '../config';

interface JwtPayloadType extends JwtPayload {
  role: string;
}
export type ThemeContextType = {
  tokens: TokensType | null;
  saveTokens: (tokens: TokensType | null) => void;
  decodedToken: JwtPayloadType | null;
};
const TokenContext = createContext<ThemeContextType>({
  tokens: null,
  saveTokens: (tokens: TokensType | null) => {},
  decodedToken: null,
});
interface TokenProviderProps {
  children: React.ReactNode;
}
const getInitialTokens = () => {
  return {
    access: {
      token: localStorage.getItem(ACCESS_TOKEN_KEY),
      expires: localStorage.getItem(ACCESS_EXPIRY_KEY),
    },
    refresh: {
      token: localStorage.getItem(REFRESH_TOKEN_KEY),
      expires: localStorage.getItem(REFRESH_EXPIRY_KEY),
    },
  };
};
const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ACCESS_EXPIRY_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_EXPIRY_KEY);
};
export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [tokens, setTokens] = useState<TokensType | null>(getInitialTokens);

  const saveTokens = useCallback(
    (tokensData: TokensType | null) => {
      if (tokensData) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokensData?.access?.token || '');
        localStorage.setItem(
          REFRESH_TOKEN_KEY,
          tokensData?.refresh?.token || '',
        );
        localStorage.setItem(
          ACCESS_EXPIRY_KEY,
          tokensData?.access?.expires || '',
        );
        localStorage.setItem(
          REFRESH_EXPIRY_KEY,
          tokensData?.refresh?.expires || '',
        );
        setTokens(tokensData);
      } else {
        resetTokens();
        setTokens(null);
      }
    },
    [setTokens],
  );
  const decodedToken = useMemo(() => {
    try {
      return jwtDecode<JwtPayloadType>(tokens?.access?.token || '');
    } catch (error) {
      return null;
    }
  }, [tokens]);

  return (
    <TokenContext.Provider value={{ tokens, saveTokens, decodedToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
