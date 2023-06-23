import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, image } = body;

    if (!currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
