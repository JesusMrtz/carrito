// Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");

// Listener
cargarEventListener();

function cargarEventListener() {
    // Dispara cuando se presiona agregar carrito
    cursos.addEventListener("click", comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener("click", eliminarCurso);

    // Vaciar el carrito
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);

    // AL cargar el documento, mostrar el localStorage
    document.addEventListener("DOMContentLoaded", cargarLocalStorage);
}


//Funciones

// Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para enviar al carrito
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

// Función para leer los datos del curso
function leerDatosCurso(curso) {
    const informacionCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id")
    }

    insertarCarrito(informacionCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>ç
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Eliminar un curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso;
    let cursoID;

    if (e.target.classList.contains("borrar-curso")) {
        curso = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();
        cursoID = curso.querySelector("a").getAttribute("data-id");
    }

    eliminarCursoLocalStorage(cursoID);
}

// Vaciar el carrito de compras
function vaciarCarrito(e) {
    e.preventDefault

    // Forma lenta
    //listaCursos.innerHTML = "";

    // Forma mas rapida y recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    localStorage.removeItem("cursos");
    return false;
}

// Almacena cursos en el carrito al localStorage
function guardarCursoLocalStorage(curso) {
    // Tomar el valor del localStorage
    let cursos = obtenerCursosLocalStorage();
    // El curso seleccionado se agrega al arreglo
    cursos.push(curso);
    localStorage.setItem("cursos", JSON.stringify(cursos));

}

// Obtener los cursos al localStorage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // Comprobamos si hay algo el en localStorage
    if (localStorage.getItem("cursos") === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem("cursos"));
    }

    return cursosLS;
}

// Funcion que imprime los cursos del localStorage en el carrito
function cargarLocalStorage() {
    let cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>ç
        `;

        listaCursos.appendChild(row);
    });
}

// Elimina el curso por el ID del localStorage
function eliminarCursoLocalStorage(cursoID) {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((curso, index) => {
        if (cursoID === curso.id) {
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem("cursos", JSON.stringify(cursosLS));
}