import { Report, Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Reportes() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const router = useRouter();
  const [filter,setFilter] = useState<string>("")
  const [reportes,setReportes] = useState<Report[]|undefined>();
  if (status === "unauthenticated") router.push("/auth/login");
  if(user && !reportes){
    fetch("/api/db/reportes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user?.rm
      })
    }).then(req => req.json()).then(async res => {
        console.log(res);
        setReportes(res.reportes)
    });
  }
  return (<div className="reportes">
    <div className="body">
      <div className="container">
        <form>
          <input style={{color:"white",paddingLeft:"10px"}} type="text" value={filter} onChange={e=>setFilter(e.target.value)}  placeholder="Digite o numero do reporte:" />
          <a href="/reporte">NOVO</a>
        </form>
      </div>
      <section>
        {reportes && reportes.filter((a)=>filter===""?true:(a.cod.startsWith(filter) || a.cod.endsWith(filter))).map(a=> <details>
          <summary> {a.cod} | {a.sala} | {a.motivo}</summary>
          <input className="btn btn-primary" type="submit" value="Exibir" onClick={e=>router.push("/aluno/reporte/"+a.cod)} />
          <input className="btn btn-secundary" type="button" value={a.status} style={{backgroundColor: "transparent", border: "1px solid "+(
            a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
          ), color: (
            a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
          ),
          boxShadow: "0px 10px 40px -12px "+(
            a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
          )}} />
        </details>
        )}
      </section>
    </div></div>
  );
}
