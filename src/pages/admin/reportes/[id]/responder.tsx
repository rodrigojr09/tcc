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
          setAluno(res.aluno);
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
            <label>Aluno: {aluno?.nome}</label>
            <label>RM: {aluno?.rm}</label>
            <label>Local: {reporte.sala}</label>
            <label>Tipo: {reporte.type}</label>
            <label>Descrição:</label> 
            <textarea className="no-resize" readOnly={true} value={reporte.motivo}></textarea>
        </div>
        <div className="buttons">
        <input className="btn btn-secundary" onClick={e=>resposta("Pendente")} type="button" value={"Pendente"} style={{backgroundColor: "transparent", border: "1px solid "+("yellow"), color: ("yellow"),boxShadow: "0px 10px 40px -12px "+("yellow")}} />
        <input className="btn btn-secundary" onClick={e=>resposta("Resolvido")} type="button" value={"Resolvido"} style={{backgroundColor: "transparent", border: "1px solid "+("lightgreen"), color: ("lightgreen"),boxShadow: "0px 10px 40px -12px "+("lightgreen")}} />
        <input className="btn btn-secundary" onClick={e=>resposta("Negado")} type="button" value={"Negar"} style={{backgroundColor: "transparent", border: "1px solid "+("red"), color: ("red"),boxShadow: "0px 10px 40px -12px "+("red")}} /></div>
        </div>
    </div>
  );
  else return <div className="responder">Não encontrado!</div>
}