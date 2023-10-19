export default function SuportePage(){
    return <>
    <style jsx>{`
    .box-question {
    height: 90vh;
    background-size: cover;
    background-repeat: center;
    background-color: #202020;
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
    display: flex;
    justify-content: center;
    margin-top: 85px;
    padding: 0;
    box-sizing: border-box;
}

.box-question .card {
    background-color: #30303066;
    margin-top: 2rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 600px;
    height: 78vh;
    max-height: 800px;
    border-radius: 10px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 10px 40px #00000056;
}

.box-question .header-suporte{
    background-color: #30303066;
    border-radius: 10px 10px 0 0;
    color:#fff;
    font-size: 1.4rem;
    padding: 20px;
}

.box-question .footer{
    background-color: #30303066;
    padding: 1rem;
    border-radius: 0 0 10px 10px;
}

.box-question input{
    width: 50%;
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 10px;
    border-radius: 5px;
    background: #717171;
    color: #fff;
}

.box-question ::placeholder{
    color:rgb(255, 255, 255);
}


.box-question #btn-submit{
    border-radius: 5px;
    font-size: 1rem;
    border: none;
    padding: 10px;
    border: none;
    border-radius: 8px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    color:#fff;
    background: #DB0000;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #db00004e;
    transition: transform 200ms ease-in-out;
}

.box-question #btn-submit:hover{
    transform: scale(1.1);
}
`}
    </style>
    <div className="box-question">
        <div className="card">
            <div className="header-suporte">
            <h1>Suporte Eletro</h1>
            </div>
            <p id="status"></p>
            <div className="footer">
            <input type="text" placeholder="Escreva sua mensagem" id="message-input"/>
            <button id="btn-submit">Enviar</button>
            </div>
        </div>
    </div>
    </>
}