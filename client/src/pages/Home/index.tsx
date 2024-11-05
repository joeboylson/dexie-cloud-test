import { useLiveQuery } from "dexie-react-hooks";
import AuthenticatedWrapper from "../../components/AuthenticatedWrapper";
import { db } from "../../utils";
import { useState } from "react";
import { isEmpty } from "lodash";

export default function Home() {
  const [realmId, setRealmId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const makeANewRealm = () => {
    const email = db.cloud.currentUser.getValue().email;
    db.realms.add({
      name: `${email}'s Realm`,
      represents: "Another realm",
    });
  };

  const addMemberToRealm = () => {
    if (isEmpty(realmId) || isEmpty(email)) return alert("nope");

    db.members.add({
      realmId,
      email,
      invite: true,
      permissions: {
        add: "*",
        manage: "*",
        update: "*",
      },
      roles: [],
    });
  };

  const realms = useLiveQuery(() => db.realms.toArray());
  const members = useLiveQuery(() => db.members.toArray());

  return (
    <AuthenticatedWrapper>
      <div>
        <button onClick={makeANewRealm}>MAKE A NEW REALM</button>
        <br />
        <br />
        <br />
        <input
          placeholder="RealmId"
          type="text"
          onChange={(e) => setRealmId(e.target.value)}
        />
        <input
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addMemberToRealm}>Add User to Realm</button>
        <br />
        <br />
        <br />
        {realms?.map((r) => (
          <div>
            <p>name: {r.name}</p>
            <p>owner: {r.owner}</p>
            <p>realmId: {r.realmId}</p>
            <button onClick={() => db.realms.delete(r.realmId)}>Delete</button>
            <br />
            <br />
          </div>
        ))}
        <br />
        <br />
        <br />
        {members?.map((m) => (
          <div>
            <p>name: {m.name}</p>
            <p>owner: {m.owner}</p>
            <p>realmId: {m.realmId}</p>
            <p>email: {m.email}</p>
            <p>Accepted?: {m.accepted ? "YES" : "NO"}</p>
            <button onClick={() => db.members.delete(m.realmId)}>Delete</button>
            <br />
            <br />
          </div>
        ))}
      </div>
    </AuthenticatedWrapper>
  );
}
