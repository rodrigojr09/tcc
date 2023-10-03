import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { signIn, useSession } from "next-auth/react";
import LoginImage from '../../styles/assets/eletro.png'
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
            Faça login no suporte <a href="https://www.eletromococa.com.br">ETEC</a>
          </h1>
          <Image src={LoginImage} width="1182" alt="login_image.png" height={473} className="left-login-image" />
        </div>
        <div className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="textfield">
              <label htmlFor="Usuario">Registro de Matricula (RM):</label>
              <input type="text" maxLength={5} value={rm} onChange={e=>setRM(e.target.value)} name="Usuario" placeholder="Seu RM" />
            </div>
            <div className="textfield">
              <label htmlFor="Senha">Senha:</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} name="Senha" placeholder="Senha" />
            </div>
            <button className="btn-login">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}