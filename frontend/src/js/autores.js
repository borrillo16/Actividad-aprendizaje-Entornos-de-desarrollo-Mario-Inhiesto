/**
 * Añade un autor al DOM
 */
function addAutorNode(id, nombre, pais) {
    const ul = document.getElementById('autores');

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(`${nombre} (${pais || "Sin país"})`));

    const button = document.createElement('button');
    button.className = 'btn-close';
    button.onclick = function() {
        removeAutor(id);
        li.remove();
    };
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'btn btn-warning btn-sm me-2';

    editBtn.onclick = function () {
        document.getElementById('nombre').value = nombre;
        document.getElementById('pais').value = pais;
        window.editingId = id; // guardamos el id que estamos editando
    };

    li.appendChild(editBtn);
    li.appendChild(button);
    ul.appendChild(li);
}

/**
 * Leer autores del backend
 */
window.readAutores = function() {

    axios.get('http://localhost:8080/autores')
        .then(response => {
            const autores = response.data;

            if (autores.length === 0) {
            document.getElementById("no-autores").style.display = "block";
             } else {
            document.getElementById("no-autores").style.display = "none";
            }

            document.getElementById("autores").innerHTML = "";

            autores.forEach(autor => {
                addAutorNode(autor.id, autor.nombre, autor.pais);
            });
        });
};

/**
 * Crear autor
 */
window.addAutor = function() {
    const nombre = document.getElementById('nombre').value;
    const pais = document.getElementById('pais').value;

    if (!nombre || !pais) {
        alert('Todos los campos son obligatorios');
        return;
    }
     
    if (window.editingId) {
        axios.put(`http://localhost:8080/autores/${window.editingId}`, {
            nombre: nombre,
            pais: pais
        }).then(() => {
            window.editingId = null;
            location.reload(); // recarga la lista
        });
        return;
    }

    axios.post('http://localhost:8080/autores', {
        nombre: nombre,
        pais: pais
    }).then(response => {
        const id = response.data.id;
        addAutorNode(id, nombre, pais);
    });
};

/**
 * Eliminar autor
 */
window.removeAutor = function(id) {
    axios.delete(`http://localhost:8080/autores/${id}`);
};
