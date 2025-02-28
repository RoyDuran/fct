-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2025 a las 17:31:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `scarlattifct`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`email`, `contrasena`) VALUES
('roy@mail.com', 'clase');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_curso` int(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` varchar(10) DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `fecha_ingreso` varchar(10) DEFAULT NULL,
  `centro` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `id_curso`, `email`, `telefono`, `direccion`, `fecha_nacimiento`, `genero`, `fecha_ingreso`, `centro`) VALUES
(1, 'Carlos López', 1, 'carlos.lopez@correo.com', '555-345678', 'Calle Alumno 100, Ciudad', '2001-02-10', 'Masculino', '2021-09-01', 'escuela_secundaria_a'),
(2, 'Lucía Fernández', 2, 'lucia.fernandez@correo.com', '555-876543', 'Calle Alumna 200, Ciudad', '2002-07-14', 'Femenino', '2022-01-15', 'escuela_secundaria_a'),
(19, 'alejandro', 5, '', '', '', '', 'Masculino', '', NULL),
(20, 'alejandro', NULL, '', '', '', '2025-02-07', 'Masculino', '', NULL),
(21, 'robin bryan', 5, '', '', '', '', 'Masculino', '2025-02-12', NULL),
(22, 'daniel alcañiz', 7, '', '6546554', '', '2025-02-04', 'Masculino', '2025-02-12', 'null'),
(23, 'alejandro moreno', 7, '', '', '', '', 'Masculino', '', NULL),
(24, 'mateo', 5, '', '', '', '2025-02-14', 'Masculino', '2025-02-19', NULL),
(25, 'daniel alcañiz', NULL, '', '', '', '2025-02-13', 'Masculino', '2025-02-13', NULL),
(26, 'alberto', NULL, '', '', '', '2025-02-18', 'Masculino', '', NULL),
(27, 'mariano', 6, '', '', '', '', 'Masculino', '', NULL),
(28, 'robin bryan', 9, '', '', '', '', 'Masculino', '', NULL),
(29, 'roy alberto', 9, '', '', '', '', 'Masculino', '', 'null'),
(30, 'ruben salido', 9, '', '', '', '', 'Masculino', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos_empresa`
--

CREATE TABLE `contactos_empresa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cargo_contacto` varchar(100) DEFAULT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `extension` varchar(20) DEFAULT NULL,
  `direccion_oficina` text DEFAULT NULL,
  `horario_trabajo` varchar(100) DEFAULT NULL,
  `nivel_acceso` enum('Acceso Total','Acceso Limitado','Administrador de Personal') DEFAULT NULL,
  `relacion_empresa` enum('Empleado','Contratista','Consultor','Directivo') DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('Activo','Inactivo','En Licencia','Baja') DEFAULT NULL,
  `notas_adicionales` text DEFAULT NULL,
  `empresa_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contactos_empresa`
--

INSERT INTO `contactos_empresa` (`id`, `nombre`, `cargo_contacto`, `departamento`, `email`, `telefono`, `extension`, `direccion_oficina`, `horario_trabajo`, `nivel_acceso`, `relacion_empresa`, `fecha_ingreso`, `foto_perfil`, `observaciones`, `estado`, `notas_adicionales`, `empresa_id`) VALUES
(5, 'alejandro', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'alejandro', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'alejandro gil ', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'alejandro gil', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'juan bernabe', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `tutor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `curso`, `tutor_id`) VALUES
(1, '1 dam', 24),
(6, '2 dam', NULL),
(8, '1 daw', NULL),
(9, '2 daw', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `direccion_empresa` text DEFAULT NULL,
  `telefono_empresa` varchar(15) DEFAULT NULL,
  `email_empresa` varchar(255) DEFAULT NULL,
  `sector_empresa` varchar(100) DEFAULT NULL,
  `tipo_empresa` enum('Pequeña','Mediana','Grande') DEFAULT NULL,
  `fecha_creacion` varchar(100) DEFAULT NULL,
  `sitio_web` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombre_empresa`, `estado`, `direccion_empresa`, `telefono_empresa`, `email_empresa`, `sector_empresa`, `tipo_empresa`, `fecha_creacion`, `sitio_web`) VALUES
(2, 'Empresa 2', 'no recibe alumnos', 'Avenida Ejemplo 456, Ciudad', '555-654321', 'empresa2@correo.com', 'Consultoría', 'Grande', '2015-08-15', 'http://www.empresa2.com'),
(11, 'endesa', '', '', '', '', 'electricidad', 'Pequeña', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `practicas`
--

CREATE TABLE `practicas` (
  `id_alumno` int(11) NOT NULL,
  `alumno` varchar(100) NOT NULL,
  `fase` enum('no_realiza_practicas','pendiente_asignacion','asignado_empresa','realizacion_convenio','relacion_alumnos','programa_horario') NOT NULL DEFAULT 'no_realiza_practicas',
  `estado` varchar(100) DEFAULT NULL,
  `tutor` varchar(100) DEFAULT NULL,
  `fecha_inicio` varchar(100) DEFAULT NULL,
  `fecha_fin` varchar(100) DEFAULT NULL,
  `modalidad` varchar(100) DEFAULT NULL,
  `lugar` varchar(100) DEFAULT NULL,
  `empresa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `practicas`
--

INSERT INTO `practicas` (`id_alumno`, `alumno`, `fase`, `estado`, `tutor`, `fecha_inicio`, `fecha_fin`, `modalidad`, `lugar`, `empresa`) VALUES
(28, 'robin bryan', 'asignado_empresa', 'null', 'null', '2025-02-03', '2025-02-12', 'null', 'null', 'null'),
(29, 'roy alberto', 'pendiente_asignacion', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'ruben salido', 'pendiente_asignacion', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `fecha_nacimiento` varchar(100) DEFAULT NULL,
  `genero` enum('Masculino','Femenino','Otro','Prefiero no decirlo') DEFAULT NULL,
  `rol` enum('Profesor','Coordinador','Jefe de Departamento') DEFAULT NULL,
  `departamento` enum('informatica','jardineria','administracion') DEFAULT NULL,
  `tipo_contrato` enum('tiempo_completo','medio_tiempo','sustituto') DEFAULT NULL,
  `fecha_ingreso` varchar(100) DEFAULT NULL,
  `estado` enum('activo','en_licencia','inactivo') DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `centro` enum('escuela_secundaria_a','colegio_abc') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `nombre`, `email`, `contrasena`, `telefono`, `direccion`, `fecha_nacimiento`, `genero`, `rol`, `departamento`, `tipo_contrato`, `fecha_ingreso`, `estado`, `foto_perfil`, `notas`, `centro`) VALUES
(22, 'carmen', 'carmen@correo.com', 'clase', '', '', '', 'Femenino', 'Profesor', 'informatica', 'tiempo_completo', '2025-02-06', 'activo', NULL, NULL, 'escuela_secundaria_a'),
(24, 'gregorio', '', '', '', '', '', 'Masculino', 'Profesor', 'informatica', 'tiempo_completo', '', 'activo', NULL, NULL, 'escuela_secundaria_a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contactos_empresa`
--
ALTER TABLE `contactos_empresa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Empresa` (`empresa_id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tutor_id` (`tutor_id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `practicas`
--
ALTER TABLE `practicas`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `contactos_empresa`
--
ALTER TABLE `contactos_empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contactos_empresa`
--
ALTER TABLE `contactos_empresa`
  ADD CONSTRAINT `FK_Empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `practicas`
--
ALTER TABLE `practicas`
  ADD CONSTRAINT `practicas_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
