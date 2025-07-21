<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: ../../frontend/admin/login.php");
    exit;
}