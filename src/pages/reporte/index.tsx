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
    }).then(async () => {
      router.push("/reporte/success")
    });
  }
  if (status === "authenticated") return <>
  <style jsx>
    {`
.center-report {
    height: 100vh;
    width: 100%;
    font-family: 'Noto Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
    background-color: #202020;
    margin-top: 0;
    padding: 0;
    box-sizing: border-box;
}

.center-report .card-report {
    height: 500px;
    width: 550px;
    display: flex;
    margin-top: 70px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 35px 30px 35px;
    background: #30303066;
    border-radius: 20px;
    box-shadow: 0px 10px 40px #00000056;
  }
  
  .center-report .no-resize {
    resize: none;
  }
  
  .center-report .card-report > h1 {
    color: #fff;
    font-weight: 800;
    font-size: large;
    margin: 0;
    margin-top: 20px;
  }
  
  .center-report select {
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 10px;
    padding: 15px;
    background: #717171;
    color: #fff;
    font-size: 13pt;
    box-shadow: 0px 10px 40px #00000056;
    outline: none;
    box-sizing: border-box;
  }
  
  .center-report .textfield {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 10px 0px;
  }
  
  .center-report .textfield > textarea {
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    background: #717171;
    color: #fff;
    font-size: 13pt;
    box-shadow: 0px 10px 40px #00000056;
    outline: none;
    box-sizing: border-box;
  }
  
  .center-report .textfield > label {
    color: #fff;
    margin-bottom: 10px;
  }
  
  .center-report .textfield > input ::placeholder {
    color: #ffffff94;
  }
  
  .center-report .btn-enviar {
    width: 100%;
    padding: 16px 0px;
    margin: 25px;
    border: none;
    border-radius: 8px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    color: #ffffff;
    background: #d80000;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #db00004e;
  }
  
  .center-report .textarea {
    width: 50px;
    height: 50px;
  }`}
  </style>
  <div className="center-report">
        <div className="card-report">
          <h1>Reporte</h1>
          <div className="textfield">
            <label htmlFor="sala">Escolha a sala que requer manutenção:</label>
            <input/>
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
  </>
}
