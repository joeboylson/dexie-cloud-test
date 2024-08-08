import Header from "../Header";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { IsAuthenticated } from "@shared/types";

interface UserContextType {
  authenticatedUser?: IsAuthenticated;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
});

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { authenticatedUser } = useAuthenticatedUser();

  return (
    <UserContext.Provider value={{ authenticatedUser }}>
      <Header />
      {children}
    </UserContext.Provider>
  );
}
