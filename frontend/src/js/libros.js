
function addLibroNode(id, titulo, genero, autor_id, categoria_nombre, categoria_id) {
    const ul = document.getElementById('libros');

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(`${titulo} - ${genero || "Sin género"} (Autor ID: ${autor_id}) (categoria: ${categoria_nombre || "Sin categoría"})`));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'btn btn-warning btn-sm me-2';

    editBtn.onclick = function () {
        document.getElementById('titulo').value = titulo;
        document.getElementById('genero').value = genero;
        document.getElementById('autor_id').value = autor_id;
        document.getElementById('categoria').value = categoria_id;
        window.editingLibroId = id; 
    };

    const button = document.createElement('button');
    button.className = 'btn-close';
    button.onclick = function() {
        removeLibro(id);
        li.remove();
    };

    li.appendChild(editBtn);
    li.appendChild(button);
    ul.appendChild(li);
}


function loadAutoresSelect() {
    axios.get('http://localhost:8080/autores')
        .then(response => {
            const autores = response.data;
            const select = document.getElementById('autor_id');

            autores.forEach(autor => {
                const option = document.createElement('option');
                option.value = autor.id;
                option.textContent = autor.nombre;
                select.appendChild(option);
            });
        });
}

async function cargarCategorias() {
    const respuesta = await fetch('http://localhost:8080/categorias');
    const categorias = await respuesta.json();

    const select = document.getElementById('categoria');
    select.innerHTML = '';

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });

}

    document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarLibros();
});


window.readLibros = function() {
    loadAutoresSelect();

    axios.get('http://localhost:8080/libros')
        .then(response => {
            const libros = response.data;

            libros.forEach(libro => {
                addLibroNode(libro.id, libro.titulo, libro.genero, libro.autor_id, libro.categoria_nombre, libro.categoria_id);
            });
        });
};


window.addLibro = function() {
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const autor_id = document.getElementById('autor_id').value;
    const categoria_id = document.getElementById('categoria').value;

    if (!titulo || !genero || !autor_id || !categoria_id) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (window.editingLibroId) {
        axios.put(`http://localhost:8080/libros/${window.editingLibroId}`, {
            titulo: titulo,
            genero: genero,
            autor_id: autor_id,
            categoria_id: categoria_id

        }).then(() => {
            window.editingLibroId = null;
            location.reload();
        });
        return;
    }

    axios.post('http://localhost:8080/libros', {
        titulo: titulo,
        genero: genero,
        autor_id: autor_id,
        categoria_id: categoria_id

    }).then(response => {
        const id = response.data.id;
        addLibroNode(id, titulo, genero, autor_id, categoria_id);
    });
};


window.removeLibro = function(id) {
    axios.delete(`http://localhost:8080/libros/${id}`);
};
