import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LinkButton from '../components/Link';
import Navbar from '../components/Navbar'
import { User } from '../utils/types';
import HomeImage from '../styles/assets/home-img.svg';
import Image from 'next/image';
//import '../styles/home.css';

export default function Index() {
  const {data,status} = useSession();
  const user = data?.user as User | undefined; 
  return (<>
    <style jsx>
 {`
    .main-home .left-home{
        width: 50vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .main-home .left-home > h1{
        color: #fff;
        font-size:22pt;
    }

    .main-home .left-home-image{
        width: 35vw;
    }

    .main-home .right-home{
        width: 43vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: column;
    }

    .main-home .right-home > h1{
        font-size:25pt;
        color: #fff;
    }

    .main-home .btn-entrar{
        height: 50px;
        width: 220px;
        padding: 12px 0px;
        margin:25px;
        border: none;
        border-radius: 8px;
        outline: none;
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 3px;
        color:#fff;
        display: flex;
        justify-items: center;
        justify-content: center;
        background: #DB0000;
        cursor: pointer;
        box-shadow: 0px 10px 40px -12px #db00004e;
        transition: transform 200ms ease-in-out;
    }

    .main-home .btn-entrar:hover{
        transform: scale(1.1);
    }
    `} 
    </style>
    <div className="main-home">
      <div className="left-home">
        <Image src={HomeImage} width={0} height={0} className="left-home-image"  alt="home_image.svg" />
      </div>
      <div className="right-home">
        <h1>
          {" "}
          Bem vindo ao suporte <a href="https://www.eletromococa.com.br">Eletro</a>,
          aqui você poderá tirar duvidas e fazer uma sugestão ou reclamação para a
          escola.
        </h1>
        <a href={user ? "/aluno" : "/auth/login"} className="btn-entrar">Entrar</a>
      </div>
    </div>
    </>
  )
}
