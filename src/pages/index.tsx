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
      <div className='mb-10 w-screen h-[450px] eletro-image border-b border-red-600'>
        <div className='px-20 py-20 h-[450px]'>
          <div className='flex bg-opacity-40 shadow-2xl bg-black h-full max-h-max'>
            <div className='my-10 m-auto w-1/2 flex flex-col'>
              <h1 className='text-green-500 text-center font-bold text-4xl'>Suporte ETEC</h1>
              <Link href="https://www.eletromococa.com.br/" className='mx-auto underline text-cyan-400'>João Baptista de Lima Figueiredo</Link>
              <p className='text-xl mt-10'>Use a Manutenção Escolar para relatar se estiver aluns problemas em salas, laboratórios e etc, para solucionar mais rapido os problemas</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-10 mb-4 mt-4 text-2xl text-black dark:text-white flex flex-col space-y-4'>
        <p>{user ? ", aqui está sua pagina do aluno Eletro para reporte de problemas." : "Bem vindo ao Suporte ETEC, aqui você poderá tirar duvidas e fazer uma sugestão ou reclamação para a escola."}</p>
        <div>
          <LinkButton href={user ? "/reporte/new" : "/auth/login"}>
            {user ? <span>Novo Reporte</span>: <span>Entrar</span>}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
