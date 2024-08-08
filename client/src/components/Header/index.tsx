import "./index.css";
import { useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";

export default function Header() {
  const { authenticatedUser } = useContext(UserContext);

  return (
    <div id="components-header">
      <p>Header</p>
      <p>{JSON.stringify(authenticatedUser)}</p>
    </div>
  );
}
