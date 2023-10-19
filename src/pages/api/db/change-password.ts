import { AES } from "crypto-js";
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
  try {
    const body = req.body;
    const user = await prisma.users.findFirst({where:{rm:body.user}});
    if(user){
        const updated = await prisma.users.update({
            where: { rm: body.user },
            data: { password: body.senha }
        });
        if(updated) return res.json({s: true})
    }
  }catch(e){
      console.log(e)
    res.json({s:false})
  }
}
