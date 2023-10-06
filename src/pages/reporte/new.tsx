import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Sala } from "../../utils/types";

export default function ReporteNew() {
  const { status, data } = useSession();
  const router = useRouter();
  const [salas, setSalas] = useState<Sala[]>([]);
  const [type, setType] = useState<"1" | "2">("1");
  const [motivo, setMotivo] = useState<string>("");
  const [selected, setSelected] = useState<number>(0);
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
        }
      });
  }, [setSalas, setSelected, router, status]);
  function enviar() {
    if (motivo.length < 8)
      return alert("[ELETRO] Motivo inserido é muito curto");
    console.log(selected)
    fetch("/api/report/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sala: salas[selected].id,
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
            <label htmlFor="sala">Escolha a sala que requer manutenção:</label>
            <select id="sala" name="sala">
                { salas.map((a:any,i:number) => <option onChange={e=>setSelected(i)} key={a.id}>{a.nome}</option>) }
            </select>
            <br/>
            <label htmlFor="tipo">Nos diga o seu problema ou sugestão:</label>
            <select id="tipo" name="tipo">
                <option onSelect={e=>setMotivo("1")}>Problema</option>
                <option onSelect={e=>setMotivo("2")}>Sugestão</option>
            </select>
            <br/>
            <label htmlFor="entrada">Insira o Motivo de reporte:</label>
            <textarea value={motivo} onChange={e=>setMotivo(e.target.value)} className="no-resize" style={{height:"100px",width:"100%"}}></textarea> 
        </div>
        <button onClick={e=>enviar()} className="btn-enviar">enviar</button>
      </div>
    </div>
}
