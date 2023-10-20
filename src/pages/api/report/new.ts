import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";
import { Report } from "@prisma/client";

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
  const body = req.body;
  try {
    const report: Report = {
      id: `${Math.floor(Math.random() * 2000)}`,
      motivo: body.motivo,
      user: body.user,
      type: body.type === "1" ? "Reclamação" : "Sugestão",
      sala: body.sala,
      status: "Pendente",
    };
    const reporte = await prisma.report.create({data: report});
    res.json({ s: true, reporte });
  } catch (e) {
    console.log(e);
    res.json({ s: false });
  }
}
