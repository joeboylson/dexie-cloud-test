import "./index.css";
import { useCallback, useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";
import { useNavigate } from "react-router-dom";
import MinimalButton from "../MinimalButton";
import { db } from "../../utils";

export default function Header() {
  const { authenticatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    db.cloud.logout();
    navigate("/login");
  }, []);

  return (
    <div id="components-header">
      <p>{authenticatedUser?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
