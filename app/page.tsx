"use client";
import { UserContext } from "@/contexts/UserProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { me, isLoading, handleLogout } = useContext(UserContext);

  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !me) {
      router.push("/login");
    }
  }, [me, isLoading, router]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Home Page
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
