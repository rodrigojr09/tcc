import Image from 'next/image';
import ReporteIMG from '../../styles/assets/img/reporte.svg';
import SuporteIMG from '../../styles/assets/img/suporte.svg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from '../../utils/types';
import Link from 'next/link';

export default function PageAluno(){
    const {data,status} = useSession();
    const user = data?.user as User | undefined; 
    const router = useRouter();
    if(status === "unauthenticated") router.push("/auth/login")
    return <div className='aluno'>
        <nav className="menu-lateral">
            <ul>
                <li className="item-menu">
                    <a>
                        <span className="txt">RM: {user?.rm}</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Nome: {user?.nome}</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Módulo/Série:</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a>
                        <span className="txt">Grupo da Divisão:</span>
                    </a>
                </li>
                <p><button id="button_lateral">Redefinir Senha</button></p>
                <p><button id="button_lateral2">Sair</button></p>
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
                    <a href="/reporte/new" className="entrar_button">Entrar</a>
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
}