import { Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminAlunos(){
    const {data,status} = useSession();
    const user = data?.user as Users | undefined;
    const router = useRouter();
    const [aluno,setAluno] = useState<Users|undefined>();
    const [nome,setNome] = useState<string>("");
    const [curso,setCurso] = useState<string>("");
    const [turma,setTurma] = useState<string>("");
    const [serie,setSerie] = useState<string>("");
    const [permission,setPermission] = useState<string>("");
    if (status === "unauthenticated") router.push("/auth/login");
    if(router.query.id && !aluno){
        fetch("/api/db/alunos/"+router.query.id+"/get", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        }).then(req => req.json()).then(async res => {
            console.log(res);
            setAluno(res.aluno)
            setNome(res.aluno.nome)
        });
    }
    return (
        <>
        <div className="center-exibir">
          <div className="card-exibir">
            <h1>Reporte</h1>
            <div className="textfield">
              <label htmlFor="sala">
                Nome
              </label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} />
              <br />
              <label htmlFor="sala">
                Curso
              </label>
              <input value={curso} onChange={(e) => setCurso(e.target.value)} />
              <br/>
              <label htmlFor="sala">
                Nome
              </label>
              <input value={aluno?.nome} onChange={(e) => {aluno ? (aluno.nome = e.target.value as string, setAluno(aluno)) : ""}} />
              <br />
              <label htmlFor="entrada">Insira o Motivo de reporte:</label>
              <textarea
                value={"motivo"}
                onChange={(e) => (e.target.value)}
                className="no-resize"
                style={{ height: "100px", width: "100%" }}
              ></textarea>
            </div>
            <button onClick={(e) => ("a")} className="btn-enviar">
              Salvar
            </button>
          </div>
        </div>
      </>
    );
}