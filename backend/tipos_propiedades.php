<?php
include("db.php");
header('Content-Type: application/json');

$result = $conexion->query("SHOW COLUMNS FROM propiedades LIKE 'tipo'");
$row = $result->fetch_assoc();
preg_match("/^enum\((.*)\)$/", $row['Type'], $matches);
$enum = [];
if (isset($matches[1])) {
    foreach (explode(",", $matches[1]) as $value) {
        $v = trim($value, "'");
        $enum[] = $v;
    }
}
echo json_encode($enum);