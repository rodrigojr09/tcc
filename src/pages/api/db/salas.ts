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
    const salas = await prisma.salas.findMany()
    res.json({s:true,salas});
  }catch(e){
      console.log(e)
    res.json({s:false})
  }
}
