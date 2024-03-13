import prisma from "@/app/libs/prisma";

export const revalidate = 1;

export async function GET(request, { params: {id} }) {

  let todos;
  try {
    todos = await prisma.todo.findMany({
      where: {
        userId: id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200, body: todos });
}
