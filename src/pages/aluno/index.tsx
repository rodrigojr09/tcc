import Image from "next/image";
import ReporteIMG from "../../styles/assets/img/reporte.svg";
import HistoryIMG from "../../styles/assets/img/history.svg";
import SuporteIMG from "../../styles/assets/img/suporte.svg";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
//import { User } from '../../utils/types';
import Link from "next/link";
import { Users } from "@prisma/client";
import { Mohave, Tilt_Neon } from "next/font/google";
import { useEffect } from "react";
const neon = Tilt_Neon({
  weight: "400",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function PageAluno() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const router = useRouter();
  if (status === "unauthenticated") router.push("/auth/login");
  useEffect(() => {
    if (
      user &&
      (!user.password ||
        user.password === "" ||
        user.password === user.cpf.split(".").join("").replace("-", "") ||
        user.password === user.cpf)
    )
      router.push("/aluno/change-password?error=NotSecure");
  }, [user, router]);
  return (
    <>
      <div className="aluno">
        <nav className={"menu-lateral " + neon.className}>
          <ul>
            <li className="item-menu">
              <a>
                <span className="txt">RM: {user?.rm}</span>
              </a>
            </li>
            <li className="item-menu">
              <a>
                <span className="txt">
                  Nome:{" "}
                  {user?.nome
                    .split(" ")[0]
                    .split("")
                    .map((a, i) => (i === 0 ? a : a.toLowerCase()))}
                </span>
              </a>
            </li>
            <li className="item-menu">
              <a>
                <span className="txt">Módulo/Série: {user?.serie}</span>
              </a>
            </li>
            <li className="item-menu">
              <a>
                <span className="txt">
                  Grupo da Divisão: Turma {user?.grupo.split("Turma")[1]}
                </span>
              </a>
            </li>
            <p>
              <a href="/aluno/change-password" id="button_lateral">
                Redefinir Senha
              </a>
              <button
                onClick={(e) => signOut({ callbackUrl: "/" })}
                id="button_lateral2"
              >
                Sair
              </button>
            </p>
          </ul>
        </nav>
        <div className="cards">
          <div className="left-home">
            <div className="card-class">
              <div className="icon">
                <Image
                  src={ReporteIMG}
                  alt="reporte.svg"
                  height="172"
                  width="250"
                />
              </div>
              <div className="content">
                <h3>Reportar</h3>
                <p>
                  Aqui você consegue fazer o reporte de uma manutenção ou
                  sugestão de melhoria
                </p>
              </div>
              <a href="/reporte" className="entrar_button">
                Entrar
              </a>
            </div>
          </div>
          <div className="left-home">
            <div className="card-class">
              <div className="icon">
                <Image
                  src={HistoryIMG}
                  alt="historico.svg"
                  height="172"
                  width="250"
                />
              </div>
              <div className="content">
                <h3>Historico</h3>
                <p>
                  Aqui você consegue ver seu historico de reportes e se foram respondidos
                </p>
              </div>
              <a href="/aluno/reportes" className="entrar_button">
                Entrar
              </a>
            </div>
          </div>
          <div className="right-home">
            <div className="card-class">
              <div className="icon-class">
                <Image
                  src={SuporteIMG}
                  alt="suporte.svg"
                  height="172"
                  width="250"
                />
              </div>
              <div className="content">
                <h4>Suporte</h4>
                <p>Aqui você consegue entrar em contato para tirar duvidas</p>
              </div>
              <a href="/suporte" className="entrar_button">
                Entrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
