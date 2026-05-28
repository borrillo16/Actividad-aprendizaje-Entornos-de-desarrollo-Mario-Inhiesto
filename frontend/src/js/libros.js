
function addLibroNode(id, titulo, genero, autor_id) {
    const ul = document.getElementById('libros');

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(`${titulo} - ${genero || "Sin género"} (Autor ID: ${autor_id})`));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'btn btn-warning btn-sm me-2';

    editBtn.onclick = function () {
        document.getElementById('titulo').value = titulo;
        document.getElementById('genero').value = genero;
        document.getElementById('autor_id').value = autor_id;
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

            autores.forEach(a => {
                const option = document.createElement('option');
                option.value = a.id;
                option.textContent = a.nombre;
                select.appendChild(option);
            });
        });
}


window.readLibros = function() {
    loadAutoresSelect();

    axios.get('http://localhost:8080/libros')
        .then(response => {
            const libros = response.data;

            libros.forEach(l => {
                addLibroNode(l.id, l.titulo, l.genero, l.autor_id);
            });
        });
};


window.addLibro = function() {
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const autor_id = document.getElementById('autor_id').value;

    if (titulo === '') {
        alert('El título es obligatorio');
        return;
    }

    if (window.editingLibroId) {
        axios.put(`http://localhost:8080/libros/${window.editingLibroId}`, {
            titulo: titulo,
            genero: genero,
            autor_id: autor_id
        }).then(() => {
            window.editingLibroId = null;
            location.reload();
        });
        return;
    }

    axios.post('http://localhost:8080/libros', {
        titulo: titulo,
        genero: genero,
        autor_id: autor_id
    }).then(response => {
        const id = response.data.id;
        addLibroNode(id, titulo, genero, autor_id);
    });
};


window.removeLibro = function(id) {
    axios.delete(`http://localhost:8080/libros/${id}`);
};
