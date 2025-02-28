import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { employeeArray } from "../public/data";

const prisma = new PrismaClient();

export async function employeeSeeder(prisma: PrismaClient) {
  try {
    for (const employee of employeeArray) {
      const hashedPassword = await hash(employee.password, 10);
      await prisma.employee.create({
        data: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: "EMPLOYEE",
          password: hashedPassword,
        },
      });
    }
    console.log("User employee seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const main = async () => {
  try {
    await employeeSeeder(prisma);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
