import img from "../styles/assets/image.svg";
import Image from "next/image";

export default function Sobre() {
  return (
    <>
      <div className="main-home">
        <div className="left-home">
          <h1>
            <a>Sobre o projeto:</a>
            <br />O projeto "Suporte Eletrô" consiste em um site que tem a
            finalidade de melhorar a comunicação entre a escola e os alunos.
            Este projeto vai ser importante, para que a escola melhore com a
            ajuda do nosso TCC. Podendo ser utilizado por alunos, para dar
            sugestões e resolver os problemas da escola.
          </h1>
        </div>
        <div className="right-home">
          <Image src={img} className="right-home-image" alt="image anim" />
        </div>
      </div>
    </>
  );
}
