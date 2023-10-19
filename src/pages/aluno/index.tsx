import Image from 'next/image';
import ReporteIMG from '../../styles/assets/img/reporte.svg';
import SuporteIMG from '../../styles/assets/img/suporte.svg';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
//import { User } from '../../utils/types';
import Link from 'next/link';
import { Users } from '@prisma/client';
import { Mohave, Tilt_Neon } from 'next/font/google';
import { useEffect } from 'react';
const neon = Tilt_Neon({weight:'400',style:'normal',subsets:['latin-ext'],})

export default function PageAluno(){
    const {data,status} = useSession();
    const user = data?.user as Users | undefined; 
    const router = useRouter();
    if(status === "unauthenticated") router.push("/auth/login")
    useEffect(() => {
        if(user && (!user.password || user.password === "" || user.password === user.cpf.split(".").join("").replace("-", "") || user.password === user.cpf)) router.push("/aluno/change-password?error=NotSecure")
    }, [user,router]);
    return <>
    <style jsx>{`
.aluno {
    display: flex;
    flex-direction: row;
}
.aluno .menu-lateral #button_lateral{
    border:none;
    padding: 10px;
    border-radius:8px;
    margin-top: 21vh;
    background-color: #d80000;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    position: absolute;
    bottom: 60px;
}
.aluno .menu-lateral #button_lateral2{
    position: absolute;
    bottom: 10px;
    border:none;
    padding: 10px;
    border-radius:8px;
    margin-top: 10px;
    background-color: #d80000;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
}
.aluno {
    font-family: '';
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #202020;
    background-size: cover;
    background-repeat: center;
}

.aluno nav.menu-lateral{
    width: 350px;
    height: 100%;
    padding: 40px 0 40px 1%;
    background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(50px);
    box-shadow: 3px 0 0 #DB0000;
    display: flex;
}

.aluno nav ul{
    list-style-type: none;
    margin-top: 100px;
}

.aluno nav ul li.item-menu a{
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    padding: 20px 4%;
    display: flex;
    margin-bottom: 1px;
    line-height: 25px;
}

.aluno nav #button_lateral:hover,#button_lateral2:hover{
    transform: scale(1.1);    
}

.aluno .cards{
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    background: #202020;
    display: flex;
    justify-content: center;
    align-items: center;
}

.aluno .cards .left-home{
    width: 400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.aluno .cards .right-home{
    width: 400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.aluno .cards .icon{
    margin-bottom: 20px;
}

.aluno .cards .card-class{
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
    
.aluno .cards .icon-class{
        margin-bottom: 20px;
    }
    .aluno .cards .icon img{
    width: 250px;
}
.aluno .cards.icon-class img{
    width: 250px;
}
.aluno .cards.content{
    height: 150px;
    overflow: hidden;
    position: relative;
}
.aluno .cards.content::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear linear-gradient(transparent, #3f3f3f);
}
.aluno .cards .content h3{
    text-align:center;
    margin-bottom: 15px;
    font-size: 23px;
    position: relative;
    color: #fff;
}

.aluno .cards .content h4{
    text-align:center;
    margin-bottom: 15px;
    font-size: 23px;
    position: relative;
    color: #fff;
}

.aluno .cards .content p{
    color: #fff;

}
.aluno .cards .entrar_button{
    border:none;
    padding: 10px;
    text-decoration: none;
    text-align: center;
    border-radius:8px;
    margin-top: 15px;
    background-color: #d80000;
    color: #fff;
    font-weight:bold;
    cursor:pointer;
    font-size: 16px;
    outline: none;
    text-transform: uppercase;
    box-shadow: 0px 10px 40px -12px #db00004e;
    transition: transform 200ms ease-in-out;
}
.aluno .cards .entrar_button:hover{
    transform: scale(1.1);
}
.aluno .cards .card-active .content{
    height:auto;
}
.aluno .cards .card.active .content::before{
    visibility:hidden;
}`} </style>
    <div className='aluno'>
        <nav className={"menu-lateral "+neon.className}>
            <ul>
                <li className="item-menu">
                    <a>
                        <span className="txt">RM: {user?.rm}</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Nome: {user?.nome.split(" ")[0].split("").map((a,i)=>i === 0 ? a : a.toLowerCase())}</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Módulo/Série: {user?.serie}</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Grupo da Divisão: Turma {user?.grupo.split("Turma")[1]}</span>
                    </a>
                </li>
                <p><a href='/aluno/change-password' id="button_lateral">Redefinir Senha</a><button onClick={e=>signOut({callbackUrl: "/"})} id="button_lateral2">Sair</button></p>
            </ul>
        </nav>
        <div className="cards">
            <div className="left-home">
                <div className="card-class">
                    <div className="icon">
                        <Image src={ReporteIMG} alt='reporte.svg' height="172" width="250"/>
                    </div>
                    <div className="content">
                        <h3>Reportar</h3>
                        <p>Aqui você consegue fazer o reporte de uma manutenção ou sugestão de melhoria</p>
                    </div>
                    <a href="/reporte" className="entrar_button">Entrar</a>
                </div>
            </div> 

            <div className="right-home">
                <div className="card-class">
                    <div className="icon-class">
                        <Image src={SuporteIMG} alt='suporte.svg' height="172" width="250"/>
                    </div>
                    <div className="content">
                        <h4>Suporte</h4>
                        <p>Aqui você consegue entrar em contato para tirar duvidas</p>
                    </div>
                    <a href='/suporte' className="entrar_button">Entrar</a>
                </div>
            </div>
        </div>
    </div>
    </>
}