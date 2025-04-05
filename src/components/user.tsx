"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";

export function User() {
  const session = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">User</h1>
      <p>User: {session.data?.user.name}</p>
      <p>Email: {session.data?.user.email}</p>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
}
