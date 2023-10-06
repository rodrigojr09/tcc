import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse,
){
    const body = req.body;
  try {
    console.log(body)
    const sala = await prisma.salas.findUnique({
        where: { id: body.sala }
    });
    const report = {
        motivo: body.motivo,
        user: body.user
    }
    if(body.type === "1") sala?.reclames.push(report);
    if(body.type === "2") sala?.sugestoes.push(report);
    const updated = await prisma.salas.update({
        where: {
            id: sala?.id
        },
        data: {
            reclames: sala?.reclames as any,
            sugestoes: sala?.sugestoes as any
        }
    })
    
    res.json({s:true, report});
  }catch(e){
    console.log(e)
    res.json({s:false})
  }
}

