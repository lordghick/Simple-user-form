/* en este archivo enviaré y recibiré la información de la base de datos */

let submitBtn = document.getElementById('submitFormBtn');
let firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    email = document.getElementById('email');

submitBtn.onclick = async function(e) {

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

const submitData = async function() {

    //creo el form data que enviaré a la DB
    let formSubmit = new FormData(document.getElementById('registerForm'));
    console.log(formSubmit);

    /* prefiero utilizar el método fetch por ser mas reciente y legible */
    fetch('../app/registro.php', {
        method: 'POST',
        body: formSubmit
    }).then(response => response.text()).then(data => {
        alert(data);
    })

}