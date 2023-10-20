import Image from "next/image";
import correct from "../../styles/assets/correct1.png";
import { useRouter } from "next/router";

export default function success() {
    const router = useRouter();
    const query = router.query as any;
    console.log(query)
  return (
    <div className="success">
      <div className="main-success">
        <div className="left-home">
          <Image src={correct} className="left-home-image2" alt="image anim" />
        </div>
        <div className="right-home">
          <h1>
            Seu reporte foi enviado com sucesso!
            <br/>Sua colaboração é fundamental para assegurar o funcionamento de nossa escola. Caso tenha outro reporte ou sugestão, por favor, não hesite em fazer o reporte para que podemos cuidar de nossa escola.
            <br/><br/>
            Reporte Registrado como #{`${query.id}`}
          </h1>
          <a className="btn-voltar" href="/aluno">
            Voltar
          </a>
        </div>
      </div>
    </div>
  );
}
