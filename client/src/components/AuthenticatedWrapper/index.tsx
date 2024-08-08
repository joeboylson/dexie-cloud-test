import "./index.css";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import Header from "../Header";
import { IsAuthenticated } from "@shared/types";

interface UserContextType {
  authenticatedUser?: IsAuthenticated;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
});

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { authenticatedUser } = useAuthenticatedUser();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <UserContext.Provider value={{ authenticatedUser }}>
      <div id="components-authenticatedwrapper">
        <div id="components-authenticatedwrapper-header">
          <Header />
        </div>

        <div id="components-authenticatedwrapper-page-wrapper">{children}</div>
      </div>
    </UserContext.Provider>
  );
}
