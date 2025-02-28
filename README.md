# 🎓 Gestión de Prácticas FCT

📌 **Aplicación web para la gestión de las prácticas FCT (Formación en Centros de Trabajo) de alumnos de Grado Superior.**\
Permite a profesores, tutores y administradores gestionar alumnos, empresas y contactos de manera eficiente.

---

## 🚀 Características principales

✅ **Roles de usuario:**\
🔹 **Profesores**: Insertan, editan y eliminan alumnos, empresas y contactos.\
🔹 **Tutores**: Insertan empresas y contactos, asignan cursos completos a prácticas y gestionan información de las prácticas.\
🔹 **Administradores**: Insertan, editan y eliminan profesores, y asignan tutores a cursos.

✅ **Funcionalidades clave:**

- 📋 **Gestión de alumnos:** Registro, edición, eliminación y asignación a prácticas.
- 🏢 **Gestión de empresas y contactos:** Creación y administración de empresas colaboradoras.
- 🔄 **Asignación masiva:** Los tutores pueden asignar todo un curso a prácticas con un solo clic.
- 🔐 **Autenticación:** Control de acceso basado en roles.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción                                                     |
| ---------- | --------------------------------------------------------------- |
|            | Lenguaje principal del frontend                                 |
|            | Entorno de ejecución del backend                                |
|            | Framework para el backend                                       |
|            | Base de datos relacional                                        |
|            | Framework CSS para diseño responsive                            |
|            | Cliente HTTP para solicitudes API                               |
|            | Herramienta de desarrollo para reinicio automático del servidor |

---

## 📥 Instalación y configuración

### 1️⃣ **Clonar el repositorio**

```bash
git clone https://github.com/RoyDuran/fct.git
cd fct
```

### 2️⃣ **Configurar la base de datos**

- Modifica el archivo `db.js` en la carpeta `Servidor` para que se conecte a tu base de datos MySQL.

### 3️⃣ **Instalar dependencias**

```bash
cd Servidor
npm install cors mysql2 express
npm install nodemon --save-dev
```
### 4️⃣ **Iniciar el servidor**

```bash
npm run nodemon index.js
```

### 5️⃣ **Ejecutar la aplicación**

- Abre `index.html` en tu navegador.

---

## 🎯 Uso de la aplicación

🔹 **Iniciar sesión:** Dependiendo del rol, se mostrarán diferentes opciones en el menú.\
🔹 **Profesores:** Gestionan alumnos y empresas.\
🔹 **Tutores:** Asignan alumnos a prácticas y gestionan empresas.\
🔹 **Administradores:** Gestionan profesores y asignaciones de tutores.

---

## 🛠️ Posibles mejoras futuras

✅ Implementar autenticación con JWT.\
✅ Añadir un dashboard con estadísticas.\
✅ Integrar notificaciones por correo.

---

👨‍💻 **Desarrollado por Roy Durán**

