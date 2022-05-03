const params = new URLSearchParams(window.location.search);
const idObject = params.getAll('id');
const id = idObject.toString();
const link = 'https://xp41-soundgarden-api.herokuapp.com/events/' + id;

window.onload = async () => {
    const data = await fetch(link, {
        method: 'GET',
        redirect: 'follow'
    })
        .then((res) => res.json())
        .catch(() => {
            alert('Ouve um erro na busca deste evento')
        });
    onLoadDelete(data)
}

const onLoadDelete = async (log) => {
    
    const nameExcluirInput = document.querySelector("#nome").value;
    const bannerExcluirInput = document.querySelector("#banner").value;
    const attractionsExcluirInput = document.querySelector("#atracoes").value;
    const descriptionExcluirInput = document.querySelector("#descricao").value;
    const dateExcluirInput = document.querySelector("#data").value;
    const ticketsExcluirInput = document.querySelector("#lotacao").value;

    const date = log.scheduled;

    const nameImport = log.name;
    const bannerImport = log.poster;
    const attractionImport = log.attractions.join(", ");
    const descreptionImport = log.description;
    const dateImport = date.slice(0, 16);
    const ticketsImport = log.number_tickets;

    const nameNewValor = nameExcluirInput.replace(nameExcluirInput, nameImport);
    const bannerNewValor = bannerExcluirInput.replace(bannerExcluirInput, bannerImport);
    const attractionNewValor = attractionsExcluirInput.replace(attractionsExcluirInput, attractionImport);
    const descreptionNewValor = descriptionExcluirInput.replace(descriptionExcluirInput, descreptionImport);
    const dateNewValor = dateExcluirInput.replace(dateExcluirInput, dateImport);
    const ticketsNewValor = ticketsExcluirInput.replace(ticketsExcluirInput, ticketsImport);

    document.querySelector("#nome").value = nameNewValor;
    document.querySelector("#banner").value = bannerNewValor;
    document.querySelector("#atracoes").value = attractionNewValor;
    document.querySelector("#descricao").value = descreptionNewValor;
    document.querySelector("#data").value = dateNewValor;
    document.querySelector("#lotacao").value = ticketsNewValor;

}

const formCadastro = document.querySelector(".col-6");

formCadastro.addEventListener("submit", (enter) => {
    enter.preventDefault();

    const body = {}

    for (i = 0; i < formCadastro.elements.length - 1; i++) {
        const item = formCadastro.elements[i];
        body[item.name] =
      item.name === "attractions" ? item.value.split(", ") : item.value;
    }

    

    fetch(link , {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    .then( () => {
        window.location.replace("admin.html")
        alert('seu evento foi excluido com sucesso')
    })
    .catch(() => {
        alert('ocorreu um erro ao excluir seu evento')
        window.location.replace("admin.html")
    });
})