/* en este archivo enviaré y recibiré la información de la base de datos */

let submitBtn = document.getElementById('submitFormBtn');
let firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    email = document.getElementById('email'),
    userCounterSpan = document.getElementById('counter'),
    userModal = document.getElementById('userBtn'),
    modalContainer = document.getElementById('modalUsers'),
    modalTable = document.getElementById('tableList');

let modalVisible = false;

submitBtn.onclick = async function (e) {

    /* confirmo que los inputs requeridos tienen contenido */
    if (firstName.value != "" && lastName.value != "" && email.value != "") {
        //pequeño fix para que el botón no recargue la página
        e.preventDefault()
        submitData();
    } else {
        alert('Los campos requeridos deben tener información!')
    }

}

/* función que inserta los datos */

const submitData = async function () {

    //creo el form data que enviaré a la DB
    let formSubmit = new FormData(document.getElementById('registerForm'));

    /* prefiero utilizar el método fetch por ser mas reciente y legible */
    fetch('../app/registro.php', {
        method: 'POST',
        body: formSubmit
    }).then(response => response.text()).then(data => {
        alert(data);
        actualizarContador();
    })

}

async function userCounter() {
    let resData = await fetch('../app/tablaUsuarios.php', {
        method: 'POST',
        body: ''
    })

    let parsedData = await resData.json();
    return parsedData;

}

/*actualizar contador */

async function actualizarContador() {
    let totalUsuarios = await userCounter();
    if(totalUsuarios.length >= 1){
        userCounterSpan.innerText = totalUsuarios.length;
    }
}

async function listaUsuarios() {
    let totalUsuarios = await userCounter();
    modalTable.innerHTML = '';
    let tableHeaders = document.createElement('tr');
    tableHeaders.innerHTML = `
    <th>Nombre</th>
    <th>Apellido</th>
    <th>Correo</th>
    <th>Teléfono</th>
    <th>City</th>
    <th>Country</th>
    <th>zipcode</th>`;
    modalTable.appendChild(tableHeaders);
    totalUsuarios.forEach(user => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${user.nombre}</td>
                        <td>${user.apellido}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.city}</td>
                        <td>${user.country}</td>
                        <td>${user.zipcode}</td>`;
        modalTable.appendChild(tr);
    })



}

/* al cargar */

window.onload = async function () {
    actualizarContador();
}

/* abrir y cerrar modal */

function switchModal(){
    if (!modalVisible) {
        modalContainer.style.top = '30%';
        modalVisible = true;
        
    } else {
        modalContainer.style.top = '-100%'
        modalVisible = false;
    }
}

userModal.addEventListener('click', () => {
    listaUsuarios();
    switchModal();
})




