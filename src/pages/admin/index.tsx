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
    <style jsx>{`
.admin .admin-home{
    width: 100vw;
    height: 100vh;
    background: #202020;
    display: flex;
    justify-content: center;
    align-items: center;
}

.admin .admin-left{
    width: 450px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.admin .admin-right{
    width: 450px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.admin .card{
display: flex;
flex-direction: column;
justify-content: center;
width: 300px;
background-color: #30303066;
text-align: justify;
box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.389);
padding: 30px 35px;
border-radius: 20px;
height: 500px;
}

.admin .icon{
    margin-bottom: 20px;
}

.admin .admin-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    background-color: #30303066;
    text-align: justify;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.389);
    padding: 30px 35px;
    border-radius: 20px;
    height: 500px;
}
    
.admin .icon-class{
    margin-bottom: 20px;
}
.admin .icon img{
    width: 250px;
}
.admin .icon-class img{
    width: 250px;
}
.admin .content{
    height: 150px;
    overflow: hidden;
    position: relative;
}
.admin .content::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear linear-gradient(transparent, #3f3f3f);
}
.admin .content h3{
    text-align:center;
    margin-bottom: 15px;
    font-size: 20px;
    position: relative;
    color: #fff;
}
.admin .content h3::before{
    content: '';
    position: absolute;
    height: 2px;
    width: 68px;
    background-color:#d80000;
    bottom:2px;
    border-radius: 100px;
}
.admin .content h4{
    text-align:center;
    margin-bottom: 15px;
    font-size: 20px;
    position: relative;
    color: #fff;
}
.admin .content h4::before{
    content: '';
    position: absolute;
    height: 2px;
    width: 52px;
    background-color:#d80000;
    bottom:2px;
    border-radius: 100px;
}

.admin .content p{
    color: #fff;
    
}
.admin .entrar_button{
    border:none;
    padding: 10px;
    border-radius:2px;
    margin-top: 15px;
    background-color: #d80000;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
}
.admin .entrar_button:hover{
    background-color: transparent;
    color: #d80000;
    transition: all 0.2s ease-in-out;
}
.admin .card-active .content{
    height:auto;
}
.admin .card.active .content::before{
    visibility:hidden;
}
`}</style>
      <div className="admin">
        <div className="admin-home">
          <div className="admin-left">
            <div className="card">
              <div className="icon">
                <Image src={students} height={166.66} alt="students.svg" width={250}  />
              </div>
              <div className="content">
                <h3>Alunos</h3>
                <p>
                  Aqui você consegue editar, adicionar e remover os alunos
                  cadastrados no banco de dados
                </p>
              </div>
              <button className="entrar_button">Entrar</button>
            </div>
          </div>
          <div className="admin-right">
            <div className="admin-card">
              <div className="icon-class">
                <Image src={Classroom1} height={166.66} alt="Classroom1.png" width={250} />
              </div>
              <div className="content">
                <h4>Salas</h4>
                <p>
                  Aqui você consegue editar, adicionar e remover as salas
                  cadastrados no banco de dados
                </p>
              </div>
              <button className="entrar_button">Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
}
