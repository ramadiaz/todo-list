import prisma from "@/app/libs/prisma";

export const revalidate = 1;

export async function POST(request) {

  const body = await request.json();

  const { userId, title, content, author } = body.data;
  console.log({ body });

  const createNotes = await prisma.Story.create({ 
    data: {
        userId,
        title,
        content,
        author
    } 
});

  if (!createNotes) return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}
