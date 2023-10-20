import { useState } from "react";

export default function Suporte() {
  return (
    <div className="suporte">
      <div className="body">
        <section>
          <details>
            <summary> Como adquirir o seu armario na eletrô?</summary>
            <h1> Acesse o site de armarios da eletro pelo site principal. </h1>
          </details>
          <details>
            <summary> Como desbloquear o seu NSA?</summary>
            <h1>
              {" "}
              Leve os seguintes documentos na secretaria: Xerox do RG, Xerox do
              Histórico do Ensino Fundamental, 2 Fotos 3x4 e CPF.
            </h1>
          </details>
          <details>
            <summary> Como pedir reconsideração de nota?</summary>
            <h1> Vá e pegue o requerimento na secretaria. </h1>
          </details>
          <details>
            <summary> Como acessar a internet da escola? </summary>
            <h1>
              {" "}
              Procure a gráfica, e compre o pacote desejado. Conecte na rede
              "Eletro Mesh" e digite o usuario e a senha.{" "}
            </h1>
          </details>
          <details>
            <summary> Como pegar um livro na Biblioteca? </summary>
            <h1>
              {" "}
              Se dirija até a biblioteca, pegue o livro desejado e fale com o
              responsavel pela biblioteca, que vai te orientar onde assinar{" "}
            </h1>
          </details>
          <details>
            <summary> Como fazer a rematricula? </summary>
            <h1> Vá na opção "Rematricula" no NSA. </h1>
          </details>
          <details>
            <summary> Como pegar um livro na Biblioteca? </summary>
            <h1>
              {" "}
              Se dirija até a biblioteca, pegue o livro desejado e fale com o
              responsavel pela biblioteca, que vai te orientar onde assinar{" "}
            </h1>
          </details>
          <details>
            <summary>
              {" "}
              Como pegar autorização por ter chegado atrasado?{" "}
            </summary>
            <h1> Fale com a Soninha ou vá até a sala da cordenação. </h1>
          </details>
          {/*<details>
                <summary> Outras duvidas? </summary>
                <h1> Clique Aqui: </h1>
                <button className="btn">Outros</button>
</details>*/}
        </section>
      </div>
    </div>
  );
}
