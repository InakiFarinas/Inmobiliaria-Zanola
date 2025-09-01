-- Configuraciones iniciales
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Charset global
SET NAMES utf8mb4;
SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;

-- Base de datos
CREATE DATABASE IF NOT EXISTS `sys_inmobiliaria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sys_inmobiliaria`;

-- Tabla: administradores
CREATE TABLE `administradores` (
  `id_administrador` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NOT NULL UNIQUE,
  `contrasena` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos iniciales: administradores
INSERT INTO `administradores` (`id_administrador`, `usuario`, `contrasena`) VALUES
  (1, 'admin', '$2y$10$RbcG7pgsRaGunmHghpprIusoX4JSMeA0bTslJeAuOUbFGxrmmzlUm'); -- el hash de la contraseña es 'admin'

-- Tabla: ciudades
CREATE TABLE `ciudades` (
  `id_ciudad` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos iniciales: ciudades
INSERT INTO `ciudades` (`id_ciudad`, `nombre`) VALUES
  (1, 'Ituzaingo'),
  (2, 'Castelar'),
  (3, 'Moron'),
  (4, 'Merlo');

-- Tabla: propiedades
CREATE TABLE `propiedades` (
  `id_propiedad` INT(11) NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(50) NOT NULL,
  `altura` VARCHAR(10) NOT NULL,
  `precio` INT(11) NOT NULL,
  `estado` ENUM('Venta','Alquiler') NOT NULL,
  `tipo` ENUM('Casa','Departamento','Terreno','Local') NOT NULL,
  `ambientes` INT(11) DEFAULT 0,
  `dormitorios` INT(11) DEFAULT 0,
  `garaje` TINYINT(1) DEFAULT 0,
  `banos` INT(11) DEFAULT 0,
  `descripcion` VARCHAR(255) DEFAULT NULL,
  `fecha_publicacion` DATE DEFAULT CURDATE(),
  `superficie` INT(11) NOT NULL,
  `antiguedad` INT(11) NOT NULL, /* en años */
  `id_ciudad` INT(11),
  PRIMARY KEY (`id_propiedad`),
  KEY `id_ciudad` (`id_ciudad`),
  CONSTRAINT `propiedades_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: imagenes_propiedad
CREATE TABLE `imagenes_propiedad` (
  `id_imagen` INT(11) NOT NULL AUTO_INCREMENT,
  `id_propiedad` INT(11) NOT NULL,
  `ruta_imagen` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `id_propiedad` (`id_propiedad`),
  CONSTRAINT `imagenes_propiedad_ibfk_1` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades` (`id_propiedad`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;

-- Restaurar configuraciones de charset
SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;
