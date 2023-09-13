import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../components/Navbar'
import mail from '../lib/email';
import { User } from '../utils/types';

export default function Index() {
  const {data,status} = useSession();
  const user = data?.user as User | undefined; 
  mail
  return (
    <div className='flex flex-col'>
      <div className='mb-10 w-screen h-[450px] eletro-image border-b border-red-600'>
        <div className='px-20 py-20 h-[450px]'>
          <div className='flex bg-opacity-40 shadow-2xl bg-black h-full max-h-max'>
            <div className='my-10 m-auto w-1/2 flex flex-col'>
              <h1 className='text-red-600 text-center font-bold text-4xl'>Manutenção Escolar</h1>
              <Link href="https://www.eletromococa.com.br/" className='mx-auto underline text-cyan-400'>João Baptista de Lima Figueiredo</Link>
              <p className='text-xl mt-10'>Use a Manutenção Escolar para relatar se estiver aluns problemas em salas, laboratórios e etc, para solucionar mais rapido os problemas</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-10 mb-4 mt-4 text-2xl text-red-600'>{user ? user.nome+", aqui está sua pagina do aluno Eletro para reporte de problemas." : "Pagina do aluno, aqui você poderá reportar problemas na escola."}</div>
      <Link href={user ? "/reporte/new" : "/auth/login"} className='mx-10 w-36 px-5 text-white py-3 rounded-e-xl mb-10 bg-green-500 hover:bg-green-300'>{user ? <span>Novo Reporte</span>: <span>Acesse sua Conta</span>}</Link>
    </div>
  )
}
