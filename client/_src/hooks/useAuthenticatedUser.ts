import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils";
import { UserLogin } from "dexie-cloud-addon";

export function useAuthenticatedUser() {
  const navigate = useNavigate();

  const [authenticatedUser, setAuthenticatedUser] = useState<UserLogin>();

  const getIsAuthenticated = useCallback(async () => {
    if (authenticatedUser) return;

    try {
      const currentUser = db.cloud.currentUser.getValue();
      if (!currentUser.accessToken) throw new Error("Invalid user");
      setAuthenticatedUser(currentUser);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }, [navigate, authenticatedUser]);

  useEffect(() => {
    getIsAuthenticated();
  }, [getIsAuthenticated]);

  return { authenticatedUser };
}
