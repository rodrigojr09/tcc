import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LinkButton from '../components/Link';
import Navbar from '../components/Navbar'
import { User } from '../utils/types';

export default function Index() {
  const {data,status} = useSession();
  const user = data?.user as User | undefined; 
  return (
    <div className='flex flex-col'>
      <div className='mb-10 w-screen min-h-min md:h-[450px] eletro-image border-b border-red-600'>
        <div className='px-20 py-20 md:h-[450px]   min-h-min'>
          <div className='flex bg-opacity-40 shadow-2xl bg-black h-full max-h-max'>
            <div className='my-10 m-auto w-1/2 flex flex-col'>
              <h1 className='text-green-500 text-center font-bold text-4xl'>Suporte ETEC</h1>
              <Link href="https://www.eletromococa.com.br/" className='mx-auto underline text-cyan-400'>João Baptista de Lima Figueiredo</Link>
              <p className='text-xl mt-10'>Site criado para os alunos poderem dar sujestões para melhorias na escola ou reclamar sobre algo de errado.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-10 mb-4 mt-4 text-2xl text-black dark:text-white flex flex-col space-y-4'>
        <p>{user ? user.nome+", aqui está sua pagina do aluno Eletro para reporte de problemas." : "Bem vindo ao Suporte ETEC, aqui você poderá tirar duvidas e fazer uma sugestão ou reclamação para a escola."}</p>
        <div>
          <LinkButton href={user ? "/reporte/new" : "/auth/login"}>
            {user ? <span>Novo Reporte</span>: <span>Entrar</span>}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
