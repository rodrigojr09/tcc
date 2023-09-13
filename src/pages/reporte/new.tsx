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
  if (status === "authenticated")
    return (
      <div className="h-screen">
        <div className="w-full h-full flex items-center justify-center">
            <div className="card-report">
              <h1>Reporte</h1>
              <div className="textfield">
                <label htmlFor="sala">
                  Escolha a sala que requer manutenção:
                </label>
                <select id="sala" className="text-black" name="sala">
                  {salas.map((sala:any) => <option onSelect={e=>setSelected(sala.id)}>{sala.nome}</option>)}
                </select>
                <br />
                <label htmlFor="tipo">
                  Nos diga o seu problema ou sugestão:
                </label>
                <select id="tipo" className="text-black" name="tipo">
                  <option onSelect={e=>setType("1")}>Problema</option>
                  <option onSelect={e=>setType("2")}>Sugestão</option>
                </select>
                <br />
                <label htmlFor="entrada">Insira o Motivo de reporte:</label>
                <textarea
                  onChange={e=>setMotivo(e.target.value)}
                  value={motivo}
                  className="no-resize"
                  style={{ height: 100, width: "100%" }}
                  defaultValue={""}
                />
              </div>
              <button className="btn-enviar" onClick={e=>enviar()}>enviar</button>
            </div>
          </div>
      </div>
    );
}
