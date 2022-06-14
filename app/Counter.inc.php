<?php

class Counter {

    public static function getUserList($conexion){
        if(isset($conexion)){
            try{
                $sql = 'SELECT * from `usuarios`';
                $sentencia = $conexion -> prepare($sql);
                $sentencia -> execute();
                $resultado = $sentencia -> fetchAll();
                return json_encode($resultado);
            }catch (PDOException $ex){
                return "ERROR " . $ex;
            }
        }
    }
}