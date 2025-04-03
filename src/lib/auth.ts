import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { getMongoClient } from "@/db/connect";

export const auth = betterAuth({
  database: mongodbAdapter(await getMongoClient()),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
});
