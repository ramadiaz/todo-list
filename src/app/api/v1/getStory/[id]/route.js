import prisma from "@/app/libs/prisma";

export const revalidate = 1;

export async function GET(request, {params: {id}}) {

  let stories;
  try {
    stories = await prisma.story.findFirst({
        where: {
            id: id
        }
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: 200, body: stories });
}
