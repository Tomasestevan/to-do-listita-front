let cards = []

function getapis() {
    fetch("http://localhost:9047/tareas")

        //conecta con el backend basicamente realiza una request a una APIIIIIIII                //primer parametro la ruta y segundo el verbo (get post put)

        .then((res) => {
            res.json().then((data) => {
                data.forEach(card => {
                    addCard(card)
                    cards.push(card)

                });

            })
            //lo que ocurre si anduvo bien el fetch
        })
        .catch((err) => {
            console.log(err) //lo que ocurre si anduvo mal el fetch
        })
}
function addCard(card) {       //este es del get que te trae las cartas del back
    var cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.id = card.Nombre
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
        document.getElementById("tituloDeI").after(cardDiv)
        cardButton.addEventListener("click", (e) => pasar(e,"Done",card.Id), false)
            break;
        case "Requested":
            cardButton.innerText = "In Progress"
            document.getElementById("tituloDeR").after(cardDiv)
            cardButton.addEventListener("click", (e) => pasar(e,"In Progress",card.Id), false)
            break;
        case "Done":
            cardButton.innerText = "Reset"
            document.getElementById("tituloDeD").after(cardDiv)
            cardButton.addEventListener("click", (e) => pasar(e,"Requested",card.Id), false)    
    
        default:
            break;
    }
    
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardCruz)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardButton)
}
function agregarCard(){      //y este es el que te agrega una nueva carta en la pagina
    var cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.id = "nuevaCard"
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
    cardButton.onclick = postCard
    var inputDiv = document.createElement("div")
    inputDiv.className = "input-group"
    var input = document.createElement("input")
    input.className = "form-control"
    input.type = "text"
    input.placeholder = "Nombre"
    input.id = "inputId"
    document.getElementById("requestedColum").insertBefore(cardDiv, document.getElementById("contenedorButton")) // primer parametro insertar eso antes del segundo
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardCruz)
    cardBody.appendChild(inputDiv)
    inputDiv.appendChild(input)
    cardBody.appendChild(cardButton)
    changeAdd()
}
function changeAdd() {
    var button = document.getElementById("contenedorButton")
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
function postCard(){
    var inputText = document.getElementById("inputId").value
    if (inputText == ""){
        $('#myModal').modal('show')
        //alert("Tiene que darle un nombre señor")
    }else{
    fetch("http://localhost:9047/tarea", {
        method: 'POST',
        body: JSON.stringify({
            "Id": Math.floor(Math.random() * 1000) + 1,
            "Nombre": inputText,
            "Estado": "Requested"
        })
    })
    .then((res) => {
        console.log(res)
        document.location.reload()
        //lo que ocurre si anduvo bien el fetch
    })
    .catch(err => console.log(err));
}
}
function cancelAdd(){
    document.getElementById("nuevaCard").remove()
    changeAdd()
}
function pasar(event,columna,id){
    var card = event.currentTarget.offsetParent
    var estado = "Requested"
    card.remove()
    event.currentTarget.removeEventListener("click",pasar)
    switch (columna) {
        case "Requested":
            document.getElementById("requestedColum").insertBefore(card, document.getElementById("contenedorButton"))
            event.currentTarget.innerText = "In Progress"
            event.currentTarget.addEventListener("click", (e) => pasar(e,"In Progress"), false)
            break;
            case "In Progress":
                document.getElementById("inProgressColum").appendChild(card)
                event.currentTarget.innerText = "Done"
                event.currentTarget.addEventListener("click", (e) => pasar(e,"Done"), false)
                estado = "In Progress"
                break;
            case "Done":
                document.getElementById("doneColum").appendChild(card)
                event.currentTarget.innerText = "Reset"
                event.currentTarget.addEventListener("click", (e) => pasar(e,"Requested"), false)
                estado = "Done"
                break;
        default:
            break;
    }
    fetch("http://localhost:9047/putTarea", {
        method: 'POST',
        body: JSON.stringify({
            "Id": id,
            "Estado": estado
        })
    })
    .then((res) => {
        console.log(res)
    })
    .catch(err => console.log(err));
}
getapis()
