import Head from "next/head";

export default function Page404(){
    return <>
        <Head>
            <title>404 - Pagina não encontrada</title>
        </Head>
        <div className="page-404">
            <span className="code-404">4 0 4</span>
            <p className="text-404">Pagina não encontrada</p>
        </div>
    </>
}