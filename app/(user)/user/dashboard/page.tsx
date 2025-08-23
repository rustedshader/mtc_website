import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stackServerApp } from "@/stack";
import prisma from "@/lib/prisma";

const getUserData = async () => {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user) {
    throw new Error("User not found");
  }

  const userData = await prisma.registeredUsers.findUnique({
    where: { id: user.id },
  });

  return userData;
};

export default async function Dashboard() {
  await stackServerApp.getUser({ or: "redirect" });
  const userData = await getUserData();
  console.log(userData);
  return <></>;
}
