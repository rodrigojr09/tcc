import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { signIn, useSession } from "next-auth/react";
import EletroImg from '../../styles/assets/img/eletro.jpg'
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rm,setRM] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [error,setError] = useState<string|undefined>();
  const { status } = useSession();
  const router = useRouter();
  if(status === "authenticated") router.push("/")
  return (
    <>
      <div className="main-login">
      <div className="left-login">
        <h1>
          Faça login
          <br /> Entre em contato com o suporte
        </h1>
        <Image width={0} height={0} alt="Eletro" src={EletroImg} className="left-login-image" />
      </div>
      <form action={"/api/login"}  method="POST" className="right-login">
        <div className="card-login">
          <h1>LOGIN</h1>
          <div className="textfield">
            <label htmlFor="Usuario">Registro de Matricula (RM):</label>
            <input type="text" value={rm} onChange={e=>setRM(e.target.value)} maxLength={5} name="Usuario" placeholder="Seu RM" />
          </div>
          <div className="textfield">
            <label htmlFor="Senha">Senha:</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} name="Senha" placeholder="Senha" />
          </div>
          <button className="btn-login" type="submit">Login</button>
        </div>
      </form>
    </div>

    </>
  );
}