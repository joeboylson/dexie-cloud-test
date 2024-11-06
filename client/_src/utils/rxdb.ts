import Dexie, { type EntityTable } from "dexie";
import dexieCloud from "dexie-cloud-addon";

interface Objective {
  id: number;
  name: string;
}

const db = new Dexie("joeboylsontest", { addons: [dexieCloud] }) as Dexie & {
  objective: EntityTable<
    Objective,
    "id" // primary key "id" (for the typings only)
  >;
};

db.cloud.configure({
  databaseUrl: "https://zsejk50fe.dexie.cloud",
  requireAuth: false,
  customLoginGui: true,
});

// Schema declaration:
db.version(1).stores({
  friends: "@id, name, age", // primary key "id" (for the runtime!)
});

export type { Objective };
export { db };
