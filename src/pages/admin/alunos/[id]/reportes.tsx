import { Report, Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminReportes() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const [reportes, setReportes] = useState<Report[]|undefined>();
  if (status === "unauthenticated") router.push("/auth/login");
  if(router.query.id && !reportes){
    fetch("/api/db/reportes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: router.query.id
      })
    })
      .then((req) => req.json())
      .then(async (res) => {
        console.log(res);
        setReportes(res.reportes);
      });
}
  return (
    <div className="reportes">
      <div className="body">
        <div className="container">
          <form>
            <input
              className="input"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Digite o nome do local, o rm do usuario ou o codigo do reporte:"
            />
          </form>
        </div>
        <section>
          {reportes && reportes
            .filter(
              (a) =>
                a.sala.toLowerCase().startsWith(filter) || a.cod.toLowerCase().startsWith(filter) || a.user.toLowerCase().startsWith(filter)
            )
            .map((a) => (
              <details key={a.cod}>
                <summary>
                  {" "}
                  {a.cod} | {a.sala} | {a.user} | {a.motivo}
                </summary>

                <input
                  className="btn btn-primary"
                  type="button"
                  value="Deletar"
                  onClick={(e) =>
                    router.push("/admin/reportes/" + a.cod + "/deletar")
                  }
                />
                <input
                  className="btn btn-primary"
                  type="reset"
                  value="Responder"
                  onClick={(e) =>
                    router.push("/admin/reportes/" + a.cod + "/responder")
                  }
                />
                <input className="btn btn-secundary" type="button" value={a.status} style={{backgroundColor: "transparent", border: "1px solid "+(
                  a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
                ), color: (
                  a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
                ),
                boxShadow: "0px 10px 40px -12px "+(
                  a.status === "Pendente" && "yellow" || a.status === "Resolvido" && "lightgreen" || "red"
                )}} />
              </details>
            ))}
            {reportes && reportes.length === 0 && <p style={{padding: "1.4rem", textAlign: "center"}}>Nenhum reporte criado</p>}
        </section>
      </div>
    </div>
  );
}
