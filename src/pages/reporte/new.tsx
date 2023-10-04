import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function ReporteNew() {
  const { status, data } = useSession();
  const router = useRouter();
  const [salas, setSalas] = useState<any>([]);
  const [type, setType] = useState<"1" | "2">("1");
  const [motivo, setMotivo] = useState<string>("");
  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    if (status === "unauthenticated")
      router.push("/auth/login?redirect=/reporte/new");
    fetch("/api/db/salas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (e) => e.json())
      .then(async (result) => {
        console.log(result);
        if (result.s) {
          setSalas(result.salas);
          setSelected(result.salas[0].id);
        }
      });
  }, [setSalas, setSelected, router, status]);
  function enviar() {
    if (motivo.length < 8)
      return alert("[ELETRO] Motivo inserido é muito curto");
    fetch("/api/report/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sala: selected,
        motivo,
        type,
        user: (data?.user as any).rm,
      }),
    });
  }
  if (status === "authenticated") return <div className="center-report">
        <div className="card-report">
          <h1>Reporte</h1>
          <div className="textfield">
            <label htmlFor="tipo">Escolha a sala que requer manutenção:</label>
            <select id="tipo" name="tipo">
                <option value="sala1">Sala 1</option>
                <option value="sala2">Sala 2</option>
                <option value="sala3">Sala 3</option>
            </select>
            <br/>
            <label htmlFor="tipo">Nos diga o seu problema ou sugestão:</label>
            <select id="tipo" name="tipo">
                <option value="problema">Problema</option>
                <option value="sugestao">Sugestão</option>
            </select>
            <br/>
            <label htmlFor="entrada">Insira o Motivo de reporte:</label>
            <textarea className="no-resize" style={{height:"100px",width:"100%"}}></textarea> 
        </div>
        <button className="btn-enviar">enviar</button>
      </div>
    </div>
}
