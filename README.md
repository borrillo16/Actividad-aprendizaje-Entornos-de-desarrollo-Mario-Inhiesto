***Aplicación Web Biblioteca — Backend + Frontend***

***Actividad de Aprendizaje — 2ª Evaluación***

***Entornos de Desarrollo — DAM***

**Descripción del proyecto**

Este proyecto consiste en el desarrollo de una aplicación web completa formada por:

**Backend:** API REST creada con Node.js + Express

**Base de datos:** SQLite

**Frontend:** HTML + JavaScript + Axios + Bootstrap

El objetivo es gestionar dos elementos del modelo de datos:

Autores

Libros

Categorías

cuentan con un **CRUD**completo: crear, listar, editar y eliminar.

Además, los libros están relacionados con los autores mediante el campo autor_id.

**Tecnologías utilizadas**

Node.js

Express

SQLite3

Axios

Bootstrap 5

HTML5 + JavaScript

Git + GitHub



**Cómo ejecutar el backend**

Instalar dependencias:

**Código**

npm install
Iniciar el servidor:

**Código**

node server.js
El backend se ejecutará en:

**Código**

http://localhost:8080

**Cómo ejecutar el frontend**

No necesita servidor.
Solo abre los siguientes archivos en el navegador:

frontend/index.html

frontend/src/html/autores.html

frontend/src/html/libros.html

El frontend se comunica con el backend mediante Axios.
