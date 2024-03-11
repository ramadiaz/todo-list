import prisma from "@/app/libs/prisma";

export const revalidate = 1;

export async function GET(request, { params: {id} }) {

  let notes;
  try {
    notes = await prisma.note.findFirst({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200, body: notes });
}
