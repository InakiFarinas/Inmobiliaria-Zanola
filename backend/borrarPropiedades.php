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
        



        // Recibe el id del form 
            
        $id_propiedad = (int) $_POST['id_propiedad'];
        

        
          $stmt = $conexion -> prepare("DELETE FROM propiedades WHERE id_propiedad=?");
          $stmt-> bind_param("i",$id_propiedad);
          $stmt->execute();
          

          
          //checks if the result was successfull or not 
          if($stmt->affected_rows>0) {
            echo json_encode(["status" => "success", "message" => "Propiedad borrada con éxito"]);
          } else {
            echo json_encode(["status" => "error", "message" => "No se encontró la propiedad"]);

          } 

        
        
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