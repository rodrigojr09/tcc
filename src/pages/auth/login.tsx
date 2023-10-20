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
    if(rm.length !== 5) return setError("Seu RM está invalido");
    signIn("credentials", { rm,password,callbackUrl: "/aluno",redirect: true });
  }
  return  <>
      <style jsx>{style}</style>
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

const style = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

body{
margin: 0;
font-family: 'Noto Sans', sans-serif;
}

body * {
    box-sizing: border-box;
}



.main-login{
    width: 100vw;
    height: 100vh;
    background: #202020;
    display: flex;
    justify-content: center;
    align-items: center;
}


.left-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: column;
}

.left-login > h1{
    color: #fff;
    font-size:30pt;
}

.left-login-image{
    width: 35vw;
}

.right-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-login{
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

.card-login > h1 {
    color:#fff;
    font-weight: 800;
    margin:0;
}

.textfield{
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin:10px 0px;
}

.textfield > input{
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

.textfield > label {
    color:#fff;
    margin-bottom: 10px;
}

::placeholder{
    color:rgb(255, 255, 255);
}

.btn-login{
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

a{
    color: #DB0000;
    text-decoration: none;
}

.left-login {
    text-align: center;

}

@media only screen and (max-width: 950px){
    .card-login{
        width: 85%;
    }
    .main-login{
        flex-direction: column;
    }
    .left-login{
        display: none;
    }

    .left-login{
        width: 100%;
        height: auto;
    }

    .right-login{
        width: 100%;
        height: auto;
    }
    .left-login-image{
        width: 50vw;
    }
    .card-login{
        width: 90%;
    }
}

@media only screen and (max-width: 600px){
    .main-login{
        flex-direction: column;
    }
    .left-login{
        display: none;
    }

    .left-login{
        width: 100%;
        height: auto;
    }

    .right-login{
        width: 100%;
        height: auto;
    }
    .left-login-image{
        width: 50vw;
    }
    .card-login{
        width: 90%;
    }

}
`