<?php

include_once 'conexion.inc.php';
include_once 'Counter.inc.php';

Conexion::abrirConexion();
$conexion = Conexion::obtenerConexion();

$contador = Counter::getUserList($conexion);

print $contador;