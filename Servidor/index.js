const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

//TUTORES
// Login para tutores
app.post('/tutores/login', (req, res) => { 
    const { email, password } = req.body;

    const sql = `SELECT cursos.id as id_curso FROM cursos INNER JOIN profesores ON profesores.id = cursos.tutor_id WHERE profesores.email = ? AND profesores.contrasena = ?`;

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta SQL:", err); // Log para ver el error exacto
            return res.status(500).json({ success: false, message: "Error en el servidor", error: err.message });
        }

        if (results.length > 0) {
            res.json({ success: true, message: "Login exitoso", id_curso: results[0].id_curso });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    });
});

// Obtener alumnos por curso
app.get('/alumnos/curso/:id_curso', (req, res) => {
    const curso = req.params.id_curso;
    const sql='SELECT id, nombre, email, telefono, direccion, fecha_nacimiento, genero, fecha_ingreso FROM alumnos WHERE id_curso= ?';
    db.query(sql,[curso],(err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

// Obtener prácticas por alumno
app.get('/practicas/:id_alumno', (req, res) => {
    const id = req.params.id_alumno;
    db.query('SELECT * FROM practicas WHERE id_alumno = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No se encontraron prácticas para este alumno" });
        }

        res.json(results);
    });
});

// Actualizar prácticas
app.put('/practicas/update', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { id_alumno, nombre, fase, estado, tutor, fecha_inicio, fecha_fin, modalidad, lugar, empresa } = req.body;

    // Consulta SQL de actualización
    const sql = `UPDATE practicas SET alumno = ?, fase = ?, estado = ?, tutor = ?,
fecha_inicio = ?, fecha_fin = ?, modalidad = ?,lugar = ?, empresa = ?
WHERE id_alumno = ?`;


    db.query(sql, [nombre, fase, estado, tutor, fecha_inicio, fecha_fin, modalidad, lugar, empresa, id_alumno], (err, results) => {
        if (err) {
            console.error('Error de consulta SQL:', err.message);  // Log de error detallado
            return res.status(500).json({ error: 'Error al actualizar la práctica', details: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        res.json({ message: 'Práctica actualizada exitosamente' });
    });
});

//actualizar fase para todo el curos
app.put('/practicas/asignarFase/:id_curso', (req, res) => {
    const id_curso = req.params.id_curso;
    
    // SQL para insertar la asignación de fase en la tabla practicas
    const query = `
        INSERT INTO practicas (id_alumno, alumno, fase) 
        SELECT id, nombre, 'pendiente_asignacion' 
        FROM alumnos 
        WHERE id_curso = ?
    `;

    db.query(query, [id_curso], (err, result) => {
        if (err) {
            console.error("Error al asignar fase:", err);
            return res.status(500).json({ message: "Hubo un error al asignar la fase." });
        }

        // Respuesta exitosa
        res.status(200).json({ message: "Fase asignada exitosamente a los alumnos." });
    });
});


//guardar contacto de empresa
app.post("/contactos", (req, res) => {
    const { nombre, cargo_contacto, departamento, email, telefono, empresa} = req.body;

    const sql = `
        INSERT INTO contactos_empresa (nombre, cargo_contacto, departamento, email, telefono, empresa_id)
        VALUES (?, ?, ?, ?, ?, (select id from empresas where nombre_empresa like ?));
    `;

    db.query(sql, [nombre, cargo_contacto, departamento, email, telefono, empresa], (err, result) => {
        if (err) {
            console.error("Error al insertar el contacto:", err);
            return res.status(500).json({ error: "Error al insertar el contacto." });
        }else{
            res.json({ message: "Contacto insertado correctamente", id: result.insertId });
        }
    });
});

//insertar empresa
app.post("/empresas/insertar", (req, res) => {
    const { nombre_empresa, direccion_empresa, telefono_empresa, email_empresa, sector_empresa, tipo_empresa } = req.body;

    const sql = "INSERT INTO empresas (nombre_empresa, direccion_empresa, telefono_empresa, email_empresa, sector_empresa, tipo_empresa) VALUES (?, ?, ?, ?, ?, ?)";
    const valores = [nombre_empresa, direccion_empresa, telefono_empresa, email_empresa, sector_empresa, tipo_empresa];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("Error al insertar empresa:", err);
            res.status(500).json({ mensaje: "Error al insertar empresa" });
        } else {
            res.status(201).json({ mensaje: "Empresa insertada correctamente", id: result.insertId });
        }
    });
});

//PROFESORES
app.post("/profesores/login", (req, res) => {
    const { email, password } = req.body;
    //esta linea es solo para diagnostico
    console.log("Datos recibidos para login de profesor:", { email, password }); 

    const sql = "SELECT * FROM profesores WHERE email = ? AND contrasena = ?";

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]); // Retorna el profesor autenticado
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    });
});

// Ruta para insertar un alumno
app.put("/alumnos", (req, res) => {
    const { nombre, email, telefono, direccion, fecha_nacimiento, curso, genero, fecha_ingreso} = req.body;

    const sql = `INSERT INTO alumnos (nombre, email, telefono, direccion, fecha_nacimiento, id_curso, genero, fecha_ingreso) VALUES (?, ?, ?, ?, ?, (SELECT id FROM cursos WHERE curso = ?), ?, ?)`;
    const valores = [nombre, email, telefono, direccion, fecha_nacimiento, curso, genero, fecha_ingreso];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("Error al insertar alumno:", err);
            res.status(500).json({ mensaje: "Error al insertar alumno" });
        } else {
            res.status(201).json({ mensaje: "Alumno insertado correctamente", id: result.insertId });
        }
    });
});

//obtener todos los alumnos
app.get("/alumnos", (req, res) => {
    const sql = `
        SELECT
            alumnos.id,
            alumnos.nombre,
            cursos.curso
        FROM alumnos
        INNER JOIN cursos
        ON alumnos.id_curso=cursos.id
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener alumnos:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.json(results);
    });
});

// Obtener un alumno por su ID
app.get('/alumnos/:id', (req, res) => {
    const id = req.params.id;

    // Validar que el ID sea un número
    if (isNaN(id)) {
        console.error("ID inválido recibido:", id);
        return res.status(400).json({ mensaje: "ID inválido" });
    }

    console.log("Solicitud recibida para el alumno con ID:", id); // Depuración

    const sql = `
        SELECT nombre, email, telefono, direccion, fecha_nacimiento, genero, fecha_ingreso, centro
        FROM alumnos
        WHERE id = ?;
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el alumno:", err);
            return res.status(500).json({ 
                mensaje: "Error al obtener el alumno",
                error: err.message // Incluye el mensaje de error de la base de datos
            });
        }

        console.log("Resultados de la consulta:", results); // Depuración

        if (results.length > 0) {
            console.log("Datos obtenidos del alumno:", results[0]); // Depuración
            res.json(results[0]); // Retorna el alumno con el ID solicitado
        } else {
            console.log("Alumno no encontrado para el ID:", id); // Depuración
            res.status(404).json({ mensaje: "Alumno no encontrado" });
        }
    });
});

// Editar un alumno
app.post("/alumnos/:id", (req, res) => {
    const id = req.params.id;
    const {nombre,email,telefono,direccion,fecha_nacimiento,genero,fecha_ingreso,centro } = req.body;
    const sql = "UPDATE `alumnos` SET `nombre`=?,`email`=?,`telefono`=?,`direccion`=?,`fecha_nacimiento`=?,`genero`=?,`fecha_ingreso`=?,`centro`=? where id=?";
    
    db.query(sql, [nombre,email,telefono,direccion,fecha_nacimiento,genero,fecha_ingreso,centro,id], (err, result) => {
        if (err) {
            console.log(result);
            console.error("Error al actualizar alumno:", err);
            return res.status(500).json({ mensaje: "Error al actualizar alumno" });
        }
        res.json({ mensaje: "Alumno actualizado correctamente" });
    });
});

// Obtener todas las empresas (solo nombre y estado)
app.get("/empresas", (req, res) => {
    const sql = "SELECT id, nombre_empresa, estado FROM empresas"; // Solo traer estos datos
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener empresas:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.json(results);
    });
});

// Obtener una empresa por su ID (traer todos los datos)
app.get("/empresas/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT id, nombre_empresa, estado, direccion_empresa, telefono_empresa, email_empresa, 
               sector_empresa, tipo_empresa, fecha_creacion, sitio_web 
        FROM empresas WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener empresa:", err);
            return res.status(500).json({ mensaje: "Error al obtener empresa" });
        }
        if (results.length > 0) {
            res.json(results[0]); // Enviar la primera coincidencia
        } else {
            res.status(404).json({ mensaje: "Empresa no encontrada" });
        }
    });
});

// Editar una empresa (ahora guarda todos los datos)
app.put("/empresas/editar/:id", (req, res) => {
    const id = req.params.id;
    const { nombre_empresa, estado, direccion_empresa, telefono_empresa, email_empresa, 
            sector_empresa, tipo_empresa, fecha_creacion, sitio_web } = req.body;

    const sql = `
        UPDATE empresas 
        SET nombre_empresa = ?, estado = ?, direccion_empresa = ?, telefono_empresa = ?, 
            email_empresa = ?, sector_empresa = ?, tipo_empresa = ?, fecha_creacion = ?, sitio_web = ? 
        WHERE id = ?
    `;

    db.query(sql, [nombre_empresa, estado, direccion_empresa, telefono_empresa, email_empresa, 
                   sector_empresa, tipo_empresa, fecha_creacion, sitio_web, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar empresa:", err);
            return res.status(500).json({ mensaje: "Error al actualizar empresa" });
        }
        res.json({ mensaje: "Empresa actualizada correctamente" });
    });
});

//obtener contactos de empresa
app.get("/contactos", (req, res) => {
    const sql = `SELECT c.nombre, e.nombre_empresa as empresa, c.id
    FROM contactos_empresa c
    INNER JOIN empresas e ON e.id=c.empresa_id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener contactos:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.json(results);  // Retorna los contactos
    });
});

// Obtener un contacto por su ID
app.get("/contactos/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT c.*,e.nombre_empresa as empresa
                FROM contactos_empresa c
                INNER JOIN empresas e ON c.empresa_id = e.id
                WHERE c.id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener contacto:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.json(results[0]);
    });
});

// Editar un contacto
app.put("/contactos/editar/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, empresa, cargo_contacto, departamento, email, telefono, extension, direccion_oficina, horario_trabajo, nivel_acceso, estado, notas_adicionales } = req.body;

    const sql = `
        UPDATE contactos_empresa
        SET nombre = ?, empresa_id = (SELECT id FROM empresas WHERE nombre_empresa LIKE ?), cargo_contacto = ?, departamento = ?, email = ?, telefono = ?, extension = ?, direccion_oficina = ?, horario_trabajo = ?, nivel_acceso = ?, estado = ?, notas_adicionales = ?
        WHERE id = ?`;

    db.query(sql, [nombre, empresa, cargo_contacto, departamento, email, telefono, extension, direccion_oficina, horario_trabajo, nivel_acceso, estado, notas_adicionales, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar contacto:", err);
            return res.status(500).json({ mensaje: "Error al actualizar contacto" });
        }
        res.json({ mensaje: "Contacto actualizado correctamente" });
    });
});

//ADMINISTRADORES
app.post("/administradores/login", (req, res) => {
    const { email, password } = req.body;

    // Mostrar los datos recibidos para diagnóstico
    console.log("Datos recibidos para login de administrador:", { email, password });

    // Consulta a la base de datos
    const sql = "SELECT * FROM administradores WHERE email = ? AND contrasena = ?";

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }

        if (results.length > 0) {
            // Si las credenciales son correctas, devolver los datos del administrador
            res.status(200).json(results[0]); // Devolvemos el primer resultado que es el administrador autenticado
        } else {
            // Si no se encuentran credenciales, devolver error
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    });
});

//Ruta para insertar profesores
app.post("/profesores", (req, res) => {
    const {
        nombre, email, telefono, direccion, fecha_nacimiento, genero, rol, departamento,
        tipo_contrato, fecha_ingreso, estado, contrasena, centro
    } = req.body;

    const sql = `INSERT INTO profesores (nombre, email, telefono, direccion, fecha_nacimiento, genero, rol, departamento, 
                tipo_contrato, fecha_ingreso, estado, contrasena, centro) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [nombre, email, telefono, direccion, fecha_nacimiento, genero, rol, departamento,
        tipo_contrato, fecha_ingreso, estado, contrasena, centro], (err, result) => {
        
        if (err) {
            console.error("Error al insertar profesor:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }

        res.status(201).json({ mensaje: "Profesor insertado correctamente" });
    });
});


// Obtener todos los profesores (solo nombres)
app.get("/profesores", (req, res) => {
    const sql = "SELECT id, nombre FROM profesores"; // Solo traer id y nombre
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener profesores:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        // Enviar lista de profesores (id y nombre)
        res.json(results);
    });
});

// Obtener un profesor por su ID
app.get("/profesores/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM profesores WHERE id = ?"; // Traer todos los campos del profesor
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener profesor:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        if (results.length > 0) {
            res.json(results[0]); // Devolver el primer (y único) profesor encontrado
        } else {
            res.status(404).json({ mensaje: "Profesor no encontrado" });
        }
    });
});

// Actualizar profesor con todos los datos
app.put("/profesores/:id", (req, res) => {
    const { id } = req.params;
    const {
        nombre, email, telefono, direccion, fecha_nacimiento, genero, rol, departamento,
        tipo_contrato, fecha_ingreso, estado, contrasena, centro
    } = req.body;

    // Crear la consulta para actualizar todos los campos
    const sql = `UPDATE profesores SET 
                 nombre = ?, email = ?, telefono = ?, direccion = ?, fecha_nacimiento = ?, genero = ?, 
                 rol = ?, departamento = ?, tipo_contrato = ?, fecha_ingreso = ?, estado = ?, 
                 contrasena = ?, centro = ? 
                 WHERE id = ?`;

    // Ejecutar la consulta en la base de datos
    db.query(sql, [
        nombre, email, telefono, direccion, fecha_nacimiento, genero, rol, departamento,
        tipo_contrato, fecha_ingreso, estado, contrasena, centro, id
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar el profesor:", err);
            return res.status(500).json({ mensaje: "Error en el servidor al actualizar el profesor" });
        }

        // Responder con mensaje de éxito
        res.status(200).json({ mensaje: "Profesor actualizado correctamente" });
    });
});


//set tutores de cursos
app.post("/cursos", (req, res) => {
    const { nombre, curso } = req.body;

    // Validar que nombre y curso no estén vacíos
    if (!nombre || !curso) {
        return res.status(400).json({ mensaje: "Nombre y curso son obligatorios" });
    }

    const sql = `UPDATE cursos 
                 SET tutor_id = (SELECT id FROM profesores WHERE nombre = ? LIMIT 1) 
                 WHERE curso = ?`;
    db.query(sql, [nombre, curso], (err, result) => {
        if (err) {
            console.error("Error al actualizar el curso:", err);
            return res.status(500).json({ mensaje: "Error en la base de datos" });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: "Curso actualizado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Profesor o curso no válidos" });
        }
    });
});

app.delete("/profesores/:id", (req,res)  => {
    const {id}=req.params;
    sql="delete from profesores where id=?";
    db.query(sql,[id],(err,results) => {
        if (err) {
            console.error("Error al eliminar profesor:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.status(200).json({ mensaje: "Profesor eliminado correctamente" });
    })
})

app.delete("/alumnos/:id", (req,res)  => {
    const {id}=req.params;
    sql="delete from alumnos where id=?";
    db.query(sql,[id],(err,results) => {
        if (err) {
            console.error("Error al eliminar alumno:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.status(200).json({ mensaje: "Alumno eliminado correctamente" });
    })
})

app.delete("/contactos/:id", (req,res)  => {
    const {id}=req.params;
    sql="delete from contactos_empresa where id=?";
    db.query(sql,[id],(err,results) => {
        if (err) {
            console.error("Error al eliminar el contacto de la empresa:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.status(200).json({ mensaje: "Contacto de empresa eliminado" });
    })
})

app.delete("/empresas/:id", (req,res)  => {
    const {id}=req.params;
    sql="delete from empresas where id=?";
    db.query(sql,[id],(err,results) => {
        if (err) {
            console.error("Error al eliminar la empresa:", err);
            return res.status(500).json({ mensaje: "Error en el servidor" });
        }
        res.status(200).json({ mensaje: "Empresa eliminada" });
    })
})

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
