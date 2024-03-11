import prisma from "@/app/libs/prisma";

export async function DELETE(request, { params: { id } }) {
  const deleteNote = await prisma.note.delete({
    where: {
      id: id,
    },
  });
  console.log({deleteNote})
  return Response.json({ status: 200 });
}
