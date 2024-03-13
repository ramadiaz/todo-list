import prisma from "@/app/libs/prisma";

export async function POST(request, { params: { id } }) {
  const body = await request.json();
  console.log({body})
  const { completed } = body;

  try {
    const noteUpdate = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed
      },
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200 });
}
