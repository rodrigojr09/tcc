import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LinkButton from '../components/Link';
import Navbar from '../components/Navbar'
import { User } from '../utils/types';
import HomeImage from '../styles/assets/home-img.svg';
import Image from 'next/image';

export default function Index() {
  const {data,status} = useSession();
  const user = data?.user as User | undefined; 
  return (
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
  )
}
