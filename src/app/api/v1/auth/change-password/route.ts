import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
  const { email, password } = await request.json();

  try {
    const hashedPassword = await hash(password, 10);

    const exist = await prisma.employee.findUnique({
      where: {
        email,
      },
    });

    if (!exist) {
      return NextResponse.json({
        message: `User with email ${email} does not exist`,
        status: false,
      });
    }

    await prisma.employee.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: `User Password has been updated successfully`,
      status: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error updating password: ${error}`,
      status: false,
    });
  }
};
