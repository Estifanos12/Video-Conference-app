"use client";

import { useRouter } from "next/navigation";

import { authClient, signOut } from "@/lib/auth-client";

import { Button } from "./ui/button";

export function User() {
  const session = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  console.log(session);

  return (
    <div>
      <h1 className="text-2xl font-bold">User</h1>
      <p>User: </p>
      <p>Email: </p>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
}
