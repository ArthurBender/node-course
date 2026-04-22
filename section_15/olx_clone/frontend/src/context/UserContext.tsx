import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import type { UserToCreate, UserToLogin } from "../utils/types";

type UserContextType = {
  register: (user: UserToCreate) => void | Promise<void>,
  login: (user: UserToLogin) => void | Promise<void>,
  logout: () => void,
  authenticated: boolean
};

const UserContext = createContext<UserContextType>({
  register: () => {},
  login: () => {},
  logout: () => {},
  authenticated: false
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { register, login, logout, authenticated } = useAuth();

  return (
    <UserContext.Provider value={{ register, login, logout, authenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };