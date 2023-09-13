import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "../../utils/types";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/Card";

const sessions = {
    salas: {
        title: "Salas",
        array: new Array<any>()
    }
}

export default  function AdminIndex(){
    const { data,status } = useSession();
    const [session,setSession] = useState<{title:string}|undefined>();
    useEffect(() => {
        if(status === "unauthenticated") router.push("/auth/login?redirect=/reporte/new");
        fetch("/api/db/salas", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(async e => e.json())
          .then(async result => {
              console.log(result)
            if(result.s){
                sessions.salas.array = result.salas;
            }
        })
    }, [status])
    const user = data?.user as User;
    const router = useRouter();
    console.log(session)
    if(user && user.permission !== 3) router.push("/");
    if(status !== "loading" && user && user.permission === 3) return <div className="flex flex-col">
        <div className="flex space-x-10 w-1/2 justify-center px-12 text-center py-12 mx-auto">
            <AdminCard title="Salas" href="/admin/salas" description="Gerencia todas as salas\nPodendo deletar, editar e criar novas salas." />
            <AdminCard title="Alunos" href="/admin/alunos" description="Gerencia todas os alunos\nPodendo deletar, editar e registrar novos alunos." />
        </div>
        { session && 
        <div className="items-center flex flex-col border-white border mx-10">
            <h1 className="text-2xl">{session.title}</h1>
        </div> 
        }
    </div>
}