import { db } from "../db";

export function ResetDatabaseButton() {
  return (
    <button
      className="large-button"
      onClick={async () => {
        await db.delete();
      }}
    >
      Factory reset client
    </button>
  );
}
