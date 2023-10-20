import { Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Reprotes() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const router = useRouter();
  if (status === "unauthenticated") router.push("/auth/login");
  useEffect(() => {
    fetch("/api/report/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user?.rm
      })
    }).then(req => req.json()).then(async res => {
        console.log(res);
    });
  }, []);
  return (
    <div className="body">
      <div className="container">
        <form>
          <input type="text" placeholder="Digite o numero da sala ou lab:" />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <section>
        <details>
          <summary> ID | Sala | Descrição</summary>
          <input className="btn btn-primary" type="submit" value="Exibir" />
          <input className="btn btn-secundary" type="button" value="Status" />
        </details>
        <details>
          <summary> ID | Sala | Descrição</summary>
          <input className="btn btn-primary" type="submit" value="Exibir" />
          <input className="btn btn-secundary" type="button" value="Status" />
        </details>
        <details>
          <summary> ID | Sala | Descrição</summary>
          <input className="btn btn-primary" type="submit" value="Exibir" />
          <input className="btn btn-secundary" type="button" value="Status" />
        </details>
      </section>
    </div>
  );
}
