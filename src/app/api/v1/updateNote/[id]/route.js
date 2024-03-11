import prisma from "@/app/libs/prisma";

export const revalidate = 1;

export async function POST(request, { params: { id } }) {
  const body = await request.json();
  const { title, content } = body.data;

  try {
    const noteUpdate = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title: title,
        content: content,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200 });
}
