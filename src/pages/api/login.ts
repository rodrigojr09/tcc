import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";
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
    const {Usuario,Senha} = req.body;
    console.log(req.body)
    signIn("credentials", { Usuario,Senha,callbackUrl: "/",redirect: true })
}

