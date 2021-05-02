

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
    cardDiv.style = "width: 20rem;"
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
        document.getElementById("inProgressColum").appendChild(cardDiv)
            break;
        case "Requested":
            cardButton.innerText = "In Progress"
            document.getElementById("requestedColum").appendChild(cardDiv)
            break;
        case "Done":
            cardButton.innerText = "Delete"
            document.getElementById("doneColum").appendChild(cardDiv)    
    
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
    cardDiv.style = "width: 20rem;"
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
    var inputDiv = document.createElement("div")
    inputDiv.className = "input-group mb-3"
    var input = document.createElement("input")
    input.className = "form-control"
    input.type = "text"
    input.placeholder = "Nombre"

    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardCruz)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardButton)
    
}
function deletecard(unId) {

    fetch("http://localhost:9047/tarea", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
        .then(res => res.json())
        .then(data => {
            // Do some stuff...
        })
        .catch(err => console.log(err));
}
getapis()