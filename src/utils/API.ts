import prisma from "@/lib/prisma";
import { GetEmployees } from "./APIType";

const getEmployees = async () => {
  try {
    const employees = (await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })) as GetEmployees[];

    return employees;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const API = {
  getEmployees,
};

export default API;
