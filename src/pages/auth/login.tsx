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
  function auth(){
    if(rm.length !== 5) setError("Seu RM está invalido");
    if(password.length < 8) setError("Senha incorreta ou invalida");
    signIn("credentials", { rm,password,callbackUrl: "/aluno",redirect: true });
  }
  return (
    <>
      <div className="main-login">
        <div className="left-login">
          <h1>
            Faça login no suporte <a href="https://www.eletromococa.com.br">ETEC</a>
          </h1>
          <Image src={LoginImage} width="0" alt="login_image.png" height={0} className="left-login-image" />
        </div>
        <div className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            {error && <p className="error">{error}</p>}
            <div className="textfield">
              <label htmlFor="Usuario">Registro de Matricula (RM):</label>
              <input type="text" minLength={5} maxLength={5} value={rm} onChange={e=>{
                setRM(e.target.value);
                setError(undefined);
              }} name="Usuario" placeholder="Seu RM" />
            </div>
            <div className="textfield">
              <label htmlFor="Senha">Senha:</label>
              <input type="password" value={password} onChange={e=>{
                setPassword(e.target.value)
                setError(undefined);
              }} name="Senha" placeholder="Senha" />
            </div>
            <button onClick={e=>auth()} className="btn-login">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}