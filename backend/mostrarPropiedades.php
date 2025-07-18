<?php
    header('Content-Type: application/json');
    

    try {
        
        
        include("../db.php");
        
        
        if (!$conexion) {
            // Envia el error en formato json
            echo json_encode(value: [
                'status' => 'error',
                'message' => 'Conexion fallida',
            ]);
            exit; 
        }
        
        // Ejecuta la consulta de mysql
        $sql = "SELECT * FROM propiedades";
        $resultado = mysqli_query($conexion, $sql);
        
       //inicializa el vector en el que se va a poner el resultado del query
        
        $filas = []; 
        
        
        while($rows = mysqli_fetch_assoc($resultado)) {
            
            $filas[] = $rows;
        }
        
        echo json_encode([
            'status' => 'success',
            'htmlapi' => $filas
            
        ]);
        
    } catch (Exception $e) {
        // si ocurre un error lo envia en formato json
        echo json_encode([
            'status' => 'error',
            'message' => 'Exception occurred: ' . $e->getMessage()
        ]);
    }
    
    if (isset($conexion) && $conexion) {
        mysqli_close($conexion);
    
    
    }


?>


