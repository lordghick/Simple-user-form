<?php


/* confirmar que se escribió un email (aunque ya fue confirmado por HTML y por Javascript) */

if(isset($_POST['email'])){

    /* consultamos la base de datos en búsqueda de coíncidencias */

    /* primero obtengo la conexión de forma segura */

    include_once 'conexion.inc.php';
    Conexion::abrirConexion();
    $conexion = Conexion::obtenerConexion();

    /* voy a preparar la sentencia con PDO */
    $sql = "SELECT email FROM usuarios WHERE email = :email";

    /* preparo la sentencia utilizando el método de la conexión */
    $sentencia = $conexion->prepare($sql);
    $sentencia->bindParam(':email', $_POST['email'], PDO::PARAM_STR);

    /* ejecuto la operación */
    $sentencia->execute();
    $resultado = $sentencia->fetch();

    /* si hay un resultado, significa que el correo existe */
    if($resultado){
        echo "El correo electrónico ya está registrado";
        return;

        /* de no haberlo, procedo con el registro */
    }else{
        try{
            $sql = "INSERT INTO usuarios(nombre, apellido, email, phone, city, country, zipcode) 
                    VALUES(:nombre, :apellido, :email, :phone, :city, :country, :zipcode)";

            /* preparando las sentencias con PDO */
            $sentencia = $conexion -> prepare($sql);
            $sentencia -> bindParam(':nombre', $_POST['firstName'], PDO::PARAM_STR);
            $sentencia -> bindParam(':apellido', $_POST['lastName'], PDO::PARAM_STR);
            $sentencia -> bindParam(':email', $_POST['email'], PDO::PARAM_STR);
            $sentencia -> bindParam(':phone', $_POST['phone'], PDO::PARAM_STR);
            $sentencia -> bindParam(':city', $_POST['city'], PDO::PARAM_STR);
            $sentencia -> bindParam(':country', $_POST['country'], PDO::PARAM_STR);
            $sentencia -> bindParam(':zipcode', $_POST['zipcode'], PDO::PARAM_STR);

            /* y ejecutamos */
            $usuarioInsertado = $sentencia -> execute();

            if($usuarioInsertado){
               echo "Usuario registrado con éxito";
            }
            
        }catch (PDOException $ex){
            echo "ERROR " . $ex;
        }
    }
}else{
    print "El proceso de registro no recibió información. Inténtelo de nuevo";
}

Conexion::cerrarConexion();