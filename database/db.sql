
-- Crear tabla de cargos
CREATE TABLE cargo (
    id INT PRIMARY KEY,
    nombre_cargo VARCHAR(255) UNIQUE
);

-- Crear tabla de usuarios
CREATE TABLE usuario (
    dni INT PRIMARY KEY,
    password_hash VARCHAR(255),
    area_empresa VARCHAR(255),
    id_cargo INT,
    FOREIGN KEY (id_cargo) REFERENCES cargo(id)
);

-- Insertar algunos cargos
INSERT INTO cargo (id, nombre_cargo) VALUES
    (1, 'Vendedor'),
    (2, 'Publicista'),
    (3, 'Reclutador'),
    (4, 'Desarrollador'),
    (5, 'Contador'),
    (6, 'Operario'),
    (7, 'Jefe');

-- Insertar datos para trabajadores
INSERT INTO usuario (dni, password_hash, area_empresa, id_cargo) VALUES
    (123456789, 'hash_trabajador1', 'Departamento de Ventas', 1),
    (987654321, 'hash_trabajador2', 'Departamento de Marketing', 2),
    (111223344, 'hash_trabajador3', 'Departamento de Recursos Humanos', 3),
    (555666777, 'hash_trabajador4', 'Departamento de IT', 4),
    (888999000, 'hash_trabajador5', 'Departamento de Finanzas', 5),
    (222333444, 'hash_trabajador6', 'Departamento de Producción', 6);

-- Insertar datos para el jefe
INSERT INTO usuario (dni, password_hash, area_empresa, id_cargo) VALUES
    (777888999, 'hash_jefe', 'Alta Dirección', 7);

INSERT INTO usuario (dni, password_hash, area_empresa, id_cargo) VALUES
    (777888997, 'hash_jefe', 'Dirección', 7);   
 


-- Formulario
CREATE TABLE formulario (
    formulario SERIAL PRIMARY KEY,
    dni_usuario INTEGER,
    descripcion TEXT NOT NULL,
    fecha_creada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_retorno TIMESTAMP,
    autorizacion_jefe INTEGER,
    estado VARCHAR(255),
    FOREIGN KEY (dni_usuario) REFERENCES usuario(dni)
);


-- Formulario_temporal
CREATE TABLE formulario_temporal (
    formulario_temporal SERIAL PRIMARY KEY,
    dni_usuario INTEGER,
    descripcion TEXT NOT NULL,
    fecha_creada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_retorno TIMESTAMP,
    autorizacion_jefe INTEGER,
    estado VARCHAR(255) DEFAULT 'pendiente',
    FOREIGN KEY (dni_usuario) REFERENCES usuario(dni)
);




-- Insertar datos en la tabla de formularios asignando un jefe por cargo
INSERT INTO formulario (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, autorizacion)
SELECT
    123456789 AS dni_usuario,
    'Solicitud de permiso para reunión de ventas' AS descripcion,
    '2024-01-18 12:00:00' AS fecha_retorno,
    u.dni AS autorizacion_jefe,
    'aceptada' AS autorizacion
FROM usuario u
INNER JOIN cargo j ON u.id_cargo = j.id
WHERE u.dni = 777888999;


SELECT dni, nombre_cargo FROM usuario JOIN cargo ON usuario.id_cargo = cargo.id WHERE usuario.id_cargo = 7;



select * from usuario
select * from formulario
select * from formulario_temporal



DELETE FROM formulario;


