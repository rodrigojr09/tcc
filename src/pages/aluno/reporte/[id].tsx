import { Report, Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminReportes() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const [reporte, setReporte] = useState<Report|undefined>();
  const [aluno, setAluno] = useState<Users|undefined>();
  if (status === "unauthenticated") router.push("/auth/login");
  if(router.query.id && !reporte){
      fetch("/api/db/reportes/"+router.query.id+"/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((req) => req.json())
        .then(async (res) => {
          setReporte(res.reporte);
        });
  }
  function resposta(type:String){
    console.log(reporte)
    fetch("/api/db/reportes/"+reporte?.cod+"/resposta?type="+type, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((req) => req.json())
        .then(async (res) => {
          router.reload()
        });
  }
  if(reporte) return (
    <div className="responder">
        <div className="card-info">
                <h1>Informações</h1>
        <div className="info">
            <label>Status do Reporte: {reporte.status}</label>
            <label>Aluno: {user?.nome}</label>
            <label>RM: {user?.rm}</label>
            <label>Local: {reporte.sala}</label>
            <label>Tipo: {reporte.type}</label>
            <label>Descrição:</label> 
            <textarea className="no-resize" readOnly={true} value={reporte.motivo}></textarea>
        </div>
        </div>
    </div>
  );
  else return <div className="responder">Não encontrado!</div>
}