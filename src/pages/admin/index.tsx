import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "../../utils/types";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/Card";
import Classroom1 from '../../styles/assets/Classroom1.png';
import students from '../../styles/assets/students.svg';
import Image from "next/image";

const sessions = {
  salas: {
    title: "Salas",
    array: new Array<any>(),
  },
};

export default function AdminIndex() {
  const { data, status } = useSession();
  const [session, setSession] = useState<{ title: string } | undefined>();
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
          sessions.salas.array = result.salas;
        }
      });
  }, [status]);
  const user = data?.user as User;
  const router = useRouter();
  console.log(session);
  if (user && user.permission < 2) router.push("/");
  if (status !== "loading" && user && user.permission > 1)
    return <>
      <div className="admin">
        <div className="admin-home">
          <div className="admin-left">
            <div className="admin-card">
              <div className="admin-icon">
                <Image src={students} height={166.66} alt="students.svg" width={250}  />
              </div>
              <div className="content">
                <h3>Alunos</h3>
                <p>
                  Aqui você consegue editar, adicionar e remover os alunos
                  cadastrados no banco de dados
                </p>
              </div>
              <a href="/admin/reportes" className="entrar_button">Entrar</a>
            </div>
          </div>
          <div className="admin-right">
            <div className="admin-card">
              <div className="admin-icon">
                <Image src={Classroom1} height={166.66} alt="Classroom1.png" width={250} />
              </div>
              <div className="content">
                <h4>Reportes</h4>
                <p>Aqui você consegue responder, remover e exibir os reportes registrados no sistema</p>
              </div>
              <a href="/admin/reportes" className="entrar_button">Entrar</a>
            </div>
          </div>
        </div>
      </div>
    </>
}
