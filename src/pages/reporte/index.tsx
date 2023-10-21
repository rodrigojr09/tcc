import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Sala } from "../../utils/types";

export default function ReporteNew() {
  const { status, data } = useSession();
  const router = useRouter();
  const [type, setType] = useState<"1" | "2">("1");
  const [motivo, setMotivo] = useState<string>("");
  const [submited,setSubmit] = useState<boolean>(false);
  const [sala, setSala] = useState<string>("");
  function enviar() {
    if(submited) return;
    setSubmit(true);
    if (motivo.length < 8){
      alert("[ELETRO] Motivo inserido é muito curto");
      setSubmit(false);
    }else{
      fetch("/api/report/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sala,
          motivo,
          type,
          user: (data?.user as any).rm,
        }),
      }).then(res=>res.json()).then(async res => {
        console.log(res)
        router.push("/reporte/success?id="+res.reporte.cod);
      });
    }
  }
  if (status === "authenticated")
    return (
      <>
        <div className="center-report">
          <div className="card-report">
            <h1>Reporte</h1>
            <div className="textfield">
              <label htmlFor="sala">
                Escolha a sala que requer manutenção:
              </label>
              <input value={sala} onChange={(e) => setSala(e.target.value)} />
              <br />
              <label htmlFor="tipo">Nos diga o seu problema ou sugestão:</label>
              <select id="tipo" name="tipo">
                <option onSelect={(e) => setType("1")}>Problema</option>
                <option onSelect={(e) => setType("2")}>Sugestão</option>
              </select>
              <br />
              <label htmlFor="entrada">Insira o Motivo de reporte:</label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="no-resize"
                style={{ height: "100px", width: "100%" }}
              ></textarea>
            </div>
            <button onClick={(e) => enviar()} className="btn-enviar">
              enviar
            </button>
          </div>
        </div>
      </>
    );
}
