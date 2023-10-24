import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(!req.query.id) throw "Errooooooooooo";
    const aluno = await prisma.report.delete({
        where: {
          id: req.query.id as string
        }
    });
    res.json({ s: true  });
  } catch (e) {
    console.log(e);
    res.json({ s: false });
  }
}
