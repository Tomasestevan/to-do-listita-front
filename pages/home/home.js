

function getapis() {
    fetch("http://localhost:9047/tareas")

        //conecta con el backend basicamente realiza una request a una APIIIIIIII                //primer parametro la ruta y segundo el verbo (get post put)

        .then((res) => {
            res.json().then((data) => {
                data.forEach(card => {
                    addCard(card)

                });

            })
            //lo que ocurre si anduvo bien el fetch
        })
        .catch((err) => {
            console.log(err) //lo que ocurre si anduvo mal el fetch
        })
}
function addCard(card) {
    var cardDiv = document.createElement("div")
    cardDiv.className = "card"
    
    var cardBody = document.createElement("div")
    cardBody.className = "card-body"
    var cardCruz = document.createElement("button")
    cardCruz.className = "cruz"
    cardCruz.type = "button"
    cardCruz.innerText = "X"
    cardCruz.addEventListener("click", () => deletecard(card.Id), false)
    var cardTitle = document.createElement("p")
    cardTitle.className = "card-title"
    cardTitle.innerHTML = card.Nombre
    var cardButton = document.createElement("button")
    cardButton.type = "button"
    cardButton.className = "btn btn-outline-dark"
    switch (card.Estado) {
        case "In Progress": 
        cardButton.innerText = "Done"
        document.getElementById("inProgressTitle").after(cardDiv)
            break;
        case "Requested":
            cardButton.innerText = "In Progress"
            document.getElementById("requestedTitle").after(cardDiv)
            break;
        case "Done":
            cardButton.innerText = "Delete"
            document.getElementById("doneTitle").after(cardDiv)    
    
        default:
            break;
    }
    
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardCruz)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardButton)
}
function agregarCard(){
    var cardDiv = document.createElement("div")
    cardDiv.className = "card"
    var cardBody = document.createElement("div")
    cardBody.className = "card-body"
    var cardCruz = document.createElement("button")
    cardCruz.className = "cruz"
    cardCruz.type = "button"
    cardCruz.innerText = "X"
    cardCruz.addEventListener("click", () => cancelAdd(), false)
    // var cardTitle = document.createElement("p")
    // cardTitle.className = "card-title"
    // cardTitle.innerHTML = card.Nombre
    var cardButton = document.createElement("button")
    cardButton.type = "button"
    cardButton.className = "btn btn-outline-dark"
    cardButton.innerText = "Agregar"
    var inputDiv = document.createElement("div")
    inputDiv.className = "input-group"
    var input = document.createElement("input")
    input.className = "form-control"
    input.type = "text"
    input.placeholder = "Nombre"
    document.getElementById("requestedColum").insertBefore(cardDiv, document.getElementById("addButtonContainer"))
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardCruz)
    cardBody.appendChild(inputDiv)
    inputDiv.appendChild(input)
    cardBody.appendChild(cardButton)
    changeAdd()
    // fetch("http://localhost:9047/tarea", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "Id": "2010",
    //         "Nombre": "boca",
    //         "Estado": "In Progress"
    //     })
    // })
    //     .then((res) => {
    //         document.location.reload()
    //         //lo que ocurre si anduvo bien el fetch
    //     })
    //     .catch((err) => {
    //         console.log(err) //lo que ocurre si anduvo mal el fetch
    //     })
    
}

function changeAdd() {
    var button = document.getElementById("addButtonContainer")
    if (button.style.display == ""){
        button.style = "display: none"
    } else {
        button.style = ""
    }
}

function deletecard(unId) {

    fetch("http://localhost:9047/deleteTarea", {
        method: 'POST',
        body: JSON.stringify({
            "Id": unId
        })
    })
    .then((res) => {
        console.log(res)
        document.location.reload()
        //lo que ocurre si anduvo bien el fetch
    })
    .catch(err => console.log(err));
}
getapis()