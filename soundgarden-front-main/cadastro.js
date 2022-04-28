const formCadastro = document.querySelector(".col-6");


formCadastro.addEventListener("submit", e => {
    e.preventDefault();

    const formObjeto = new FormData(formCadastro);

    const numeroTickets = Number(formObjeto.get('numero'));

    const attractions = formObjeto.get('atracoes');

    const attractionTransToArray = attractions.split(', ');

    const body = {
        "name": formObjeto.get('nome'),
        "attractions": attractionTransToArray,
        "poster": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1027px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
        "description": formObjeto.get('descricao'),
        "scheduled": formObjeto.get('data'),
        "number_tickets": numeroTickets
    }

    fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
         "method": "POST",
         "headers": { "Content-Type": "application/JSON" },
         "body": JSON.stringify(body)
    }).then( response => console.log(response)).catch( error => console.error(error));
});