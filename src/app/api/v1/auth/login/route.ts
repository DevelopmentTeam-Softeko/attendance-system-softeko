import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { JWT_SECRET } from "@/utils/constants";

const MAX_AGE = 60 * 60 * 24 * 30;

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({
      message: "Please provide email and password",
      status: false,
    });
  }

  try {
    const existEmployee = await prisma.employee.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!existEmployee) {
      return NextResponse.json({
        message: `Employee with email ${email} not found.`,
        status: false,
      });
    }
    const passwordMatch = await compare(password, existEmployee.password);

    if (!passwordMatch) {
      return NextResponse.json({
        message: "Password Incorrect.",
        status: false,
      });
    }

    cookies().set({
      name: "email",
      value: email,
      httpOnly: true,
      path: "/",
    });

    cookies().set({
      name: "employeeId",
      value: existEmployee.id.toString(),
      httpOnly: true,
      path: "/",
    });

    cookies().set({
      name: "ROLE",
      value: existEmployee.role,
      httpOnly: true,
      path: "/",
    });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: MAX_AGE });

    const serialized = serialize("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: MAX_AGE,
    });
    const employeeInfo = {
      name: existEmployee.name,
      email: existEmployee.email,
    };

    return new Response(
      JSON.stringify({
        employee: employeeInfo,
        message: "Authenticated",
        status: true,
      }),
      {
        headers: { "Set-Cookie": serialized },
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: error,
      status: 500,
      msg: "catch error",
    });
  }
};
