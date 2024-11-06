import { DBRealmMember } from "dexie-cloud-addon";
import { useObservable, usePermissions } from "dexie-react-hooks";
import { db, TodoList } from "../../db";
import { EditMemberAccess } from "./EditMemberAccess";

interface Props {
  member: DBRealmMember;
  todoList: TodoList;
}

export function EditMember({ member, todoList }: Props) {
  const can = usePermissions(db, "members", member);
  const globalRoles = useObservable(db.cloud.roles);
  const roleName = member.roles?.[0];
  const role = roleName ? globalRoles?.[roleName] : null;

  const memberAccess =
    member.userId === todoList.owner ? "owner" : roleName || "readonly";

  const memberAccessDisplayName =
    memberAccess === "owner" ? "Owner" : role?.displayName || memberAccess;
  return (
    <fieldset className="border p-1">
      {can.update("roles") ? (
        <EditMemberAccess
          todoList={todoList}
          member={member}
          access={memberAccess}
        />
      ) : (
        memberAccessDisplayName
      )}
    </fieldset>
  );
}
