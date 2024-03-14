import prisma from "@/app/libs/prisma";

export async function DELETE(request, { params: { id } }) {
  const deleteNote = await prisma.todo.delete({
    where: {
      id
    },
  });
  console.log({deleteNote})
  return Response.json({ status: 200 });
}
