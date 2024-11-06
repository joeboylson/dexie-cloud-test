import { useLiveQuery, useObservable } from "dexie-react-hooks";
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
    });
  };

  const addMemberToRealm = () => {
    if (isEmpty(realmId) || isEmpty(email)) return alert("nope");

    db.members.add({
      realmId,
      email,
    });
  };

  const realms = useLiveQuery(() => db.realms.toArray());
  const members = useLiveQuery(() => db.members.toArray());

  const invites = useObservable(db.cloud.invites);

  return (
    <AuthenticatedWrapper>
      <h1>V5</h1>
      <div>
        <button onClick={makeANewRealm}>MAKE A NEW REALM</button>

        <hr />

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

        <hr />
        <h3>REALMS</h3>
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

        <hr />
        <h3>MEMBERS</h3>

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

        <hr />
        <h3>INVITES</h3>

        {invites?.map((i) => (
          <div>
            <p>{JSON.stringify(i)}</p>
            <p>Invited By: {i.invitedDate?.toLocaleTimeString()}</p>
            <button onClick={() => i.accept()}>ACCEPT</button>
            <br />
            <br />
          </div>
        ))}
      </div>
    </AuthenticatedWrapper>
  );
}
