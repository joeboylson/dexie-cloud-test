import "./index.css";
import { useCallback, useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";
import { useNavigate } from "react-router-dom";
import MinimalButton from "../MinimalButton";

export default function Header() {
  const { authenticatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    /**
     * TODO: do logout here
     */
    navigate("/login");
  }, []);

  return (
    <div id="components-header">
      <p>Header: {JSON.stringify(authenticatedUser)}</p>
      <MinimalButton onClick={handleLogout}>Logout</MinimalButton>
    </div>
  );
}
