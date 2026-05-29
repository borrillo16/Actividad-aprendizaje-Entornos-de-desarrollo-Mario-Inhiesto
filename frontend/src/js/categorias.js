function addCategoriaNode(id, nombre) {
    const ul = document.getElementById('categorias');

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(nombre));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'btn btn-warning btn-sm me-2';

    editBtn.onclick = function () {
        document.getElementById('nombre').value = nombre;
        window.editingCategoriaId = id;
    };

    const button = document.createElement('button');
    button.className = 'btn-close';
    button.onclick = function() {
        removeCategoria(id);
        li.remove();
    };

    li.appendChild(editBtn);
    li.appendChild(button);
    ul.appendChild(li);
}

window.readCategorias = function() {
    axios.get('http://localhost:8080/categorias')
        .then(response => {
            const categorias = response.data;

            document.getElementById("categorias").innerHTML = "";

            categorias.forEach(categoria => {
                addCategoriaNode(categoria.id, categoria.nombre);
            });
        });
};

window.addCategoria = function() {
    const nombre = document.getElementById('nombre').value;

    if (!nombre) {
        alert('El nombre es obligatorio');
        return;
    }

    if (window.editingCategoriaId) {
        axios.put(`http://localhost:8080/categorias/${window.editingCategoriaId}`, {
            nombre: nombre
        }).then(() => {
            window.editingCategoriaId = null;
            location.reload();
        });
        return;
    }

    axios.post('http://localhost:8080/categorias', {
        nombre: nombre
    }).then(response => {
        const id = response.data.id;
        addCategoriaNode(id, nombre);
    });
};

window.removeCategoria = function(id) {
    axios.delete(`http://localhost:8080/categorias/${id}`);
};
