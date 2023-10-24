import { Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { setegid } from "process";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const { data, status } = useSession();
  const user = data?.user as Users | undefined;
  const [error, setError] = useState<string | undefined>();
  const [senha, setSenha] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const router = useRouter();
  if (status === "unauthenticated") router.push("/auth/login");
  useEffect(() => {
    const query = router.query;
    const erro = query.error;
    if (!erro) return;
    if (erro === "NotSecure") setError("Sua senha não é segura");
  }, []);
  function enviar() {
    if (senha !== confirm) return setError("As Senhas não são iguais");
    if (senha.length < 6) return setError("Senha muito curta");
    fetch("/api/db/change-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senha,
        confirm,
        user: (data?.user as any).rm,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        router.push("/aluno");
      });
  }
  return (
    <>
      <div className="center-senha">
        <div className="card-senha">
          <h1>Senha</h1>
          {error && <p className="error">{error}</p>}
          <div className="textfield">
            <label htmlFor="Nova-Senha">Nova Senha:</label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              type="password"
              name="Nova-senha"
              placeholder="Nova Senha"
            />
          </div>
          <div className="textfield">
            <label htmlFor="Senha">Confirmação de Nova Senha:</label>
            <input
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
              type="password"
              name="Senha"
              placeholder="Confirmação de Nova Senha"
            />
          </div>
          <button onClick={(e) => enviar()} className="btn">
            Alterar Senha
          </button>
        </div>
      </div>
    </>
  );
}
