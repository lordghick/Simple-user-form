<?php

/* La información de conexión a la base de datos se encuentra acá 

PS: usuario y clave, 'root' y '' son los predeterminados de phpmyadmin
*/

class Conexion {
    private static $conexion;
    
    public static function abrirConexion() {
        if (!isset(self::$conexion)){
            try {
                self::$conexion = new PDO("mysql:host=localhost; dbname=challenge", 'root', '');
                self::$conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$conexion -> exec('SET CHARACTER SET utf8');
            } catch (PDOException $ex) {
                print "ERROR: " . $ex -> getMessage() . "<br>";
                die();
            }

        }
    }

    /* las funciones que utilizaré para conectarme a la DB */

    public static function cerrarConexion(){
        if (isset(self::$conexion)) {
            self::$conexion = null;
        }
    }

    public static function obtenerConexion(){
        return self::$conexion;
    }
}