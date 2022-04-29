let resquestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const currentUrl = window.location.href;
const id = currentUrl.slice(67);
const link = 'https://xp41-soundgarden-api.herokuapp.com/events/' + id;



window.onload = async () => {
    const data = await fetch(link, resquestOptions)
        .then((res) => res.json())
        .catch(() => {
            alert('Ouve um erro na busca deste evento')
        });
    onLoadEdit(data)
}

const onLoadEdit = async (log) => {
    const nameInput = document.querySelector("#nome");
    const bannerInput = document.querySelector("#banner");
    const attractionsInput = document.querySelector("#atracoes");
    const descriptionInput = document.querySelector("#descricao");
    const dateInput = document.querySelector("#data");
    const ticketsInput = document.querySelector("#lotacao");

    const date = log.scheduled;

    nameInput.value = log.name;
    bannerInput.value = log.poster;
    attractionsInput.value = log.attractions.join(", ");
    descriptionInput.value = log.description;
    dateInput.value = date.slice(0, 16);
    ticketsInput.value = log.number_tickets;
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
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    // .then(() => {
        
    // })
    .then(() => {
        alert('seu evento foi alterado com sucesso!')
        window.location.replace("admin.html")
    })
    .catch(() => {
        alert('ocorreu um erro ao alterar seu evento')
        window.location.replace("admin.html")
    }
    );
})    

