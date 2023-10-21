import { Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminAlunos(){
    const {data,status} = useSession();
    const user = data?.user as Users | undefined;
    const [filter,setFilter] = useState<string>("")
    const router = useRouter();
    const [alunos,setAlunos] = useState<Users[]>([])
    if (status === "unauthenticated") router.push("/auth/login");
    useEffect(() => {
        fetch("/api/db/alunos", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        }).then(req => req.json()).then(async res => {
            console.log(res);
            setAlunos(res.alunos)
        });
    }, []);
    return (
        <div className="alunos">
            <div className="body">
                <div className="container">
                    <form>
                        <input value={filter} onChange={e=>setFilter(e.target.value)} className="input" type="text" placeholder="Digite o nome  do aluno?"/>
                        <button type="submit">Buscar</button>
                    </form>
                </div>
                <section>
                    {alunos
                    .filter((a,i)=> ((a.cpf.startsWith(filter) || a.cpf.endsWith(filter) || a.nome.toLowerCase().includes(filter.toLowerCase())) || (a.rm.startsWith(filter) || a.rm.endsWith(filter))))
                    //.filter((a,i) => (i<50))
                    .map(a=><details>
                        <summary> {a.nome} | {a.rm} | {a.cpf}</summary>
                        <input className="btn btn-primary" type="button" value="Editar" onClick={e=>router.push("/admin/alunos/"+a.rm+"/editar")} />
                        <input className="btn btn-primary" type="button" value="Exibir" onClick={e=>router.push("/admin/alunos/"+a.rm+"/exibir")} />
                        <input className="btn btn-primary" type="button" value="Deletar" onClick={e=>router.push("/admin/alunos/"+a.rm+"/deletar")} />
                    </details>)}
                </section> 
            </div>
        </div>
    );
}