import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { signIn, useSession } from "next-auth/react";
import LoginImage from '../../styles/assets/eletro.png'
import Image from "next/image";

export default function Login() {
  const [rm,setRM] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const router = useRouter();
  const [error,setError] = useState<string|undefined>();
  useEffect(() => {
    const query = router.query;
    const erro = query.error;
    if(!erro) return;
    if(erro === "CredentialsSignin") setError("RM ou Senha Invalidos");
  }, [])
  const { status } = useSession();
  if(status === "authenticated") router.push("/")
  function auth(){
    if(rm.length !== 5) setError("Seu RM está invalido");
    if(password.length < 8) setError("Senha incorreta ou invalida");
    signIn("credentials", { rm,password,callbackUrl: "/aluno",redirect: true });
  }
  return  <>
      <style jsx>{`.main-login {
    width: 100vw;
    height: 100vh;
    background: #202020;
    display: flex;
    justify-content: center;
    align-items: center;
}


.main-login .left-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: column;
}

.main-login .left-login > h1{
    color: #fff;
    font-size:30pt;
}

.main-login .left-login-image{
    width: 35vw;
    height: 25vh;
}

.main-login .right-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-login .card-login {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    padding: 30px 35px;
    background: #30303066;
    border-radius: 20px;
    box-shadow: 0px 10px 40px #00000056;
}

.main-login .card-login > h1 {
    color:#fff;
    font-weight: 800;
    margin:0;
}

.main-login .textfield{
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin:10px 0px;
}

.main-login .textfield > input{
    width: 100%;
    border:none;
    border-radius: 10px;
    padding: 15px;
    background: #717171;
    color: #fff;
    font-size: 12pt;
    box-shadow: 0px 10px 40px #00000056;
    outline:none;
    box-sizing: border-box;
}

.main-login .textfield > label {
    color:#fff;
    margin-bottom: 10px;
}

.main-login ::placeholder{
    color:rgb(255, 255, 255);
}

.main-login .btn-login{
    width: 100%;
    padding: 16px 0px;
    margin:25px;
    border: none;
    border-radius: 8px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    color:#ffffff;
    background: #d80000;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #db00004e;
}

.main-login a{
    color: red;
    text-decoration: none;
}

.main-login .left-login {
    text-align: center;

}
`}</style>
      <div className="main-login">
        <div className="left-login">
          <h1>
            Faça login no suporte <a href="https://www.eletromococa.com.br">Eletro</a>
          </h1>
          <Image src={LoginImage} width={0} alt="login_image.png" height={0} className="left-login-image" />
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
}