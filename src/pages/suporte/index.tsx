export default function SuportePage(){
    return <div className="box-question">
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
}