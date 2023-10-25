let listaEstudiantes = [];

const objEstudiante = {
    id: '',
    nombre: '',
    apellido: '',
    edad: '',
    carrera: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const edadInput = document.querySelector('#edad');
const carreraInput = document.querySelector('#carrera');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || edadInput === '' || carreraInput === ''){
        alert('Todos estos campos son obligatorios')
        return;
    }
    
    if(editando){
        editarEstudiante();
        editando = false;
    }else {
        objEstudiante.id = Date.now()
        objEstudiante.nombre = nombreInput.value;
        objEstudiante.apellido = apellidoInput.value;
        objEstudiante.edad = edadInput.value;
        objEstudiante.carrera = carreraInput.value;
    
       agregarEstudiante(); 
    }
}

function agregarEstudiante() {
    listaEstudiantes.push({...objEstudiante});

    mostrarEstudiantes();

    formulario.reset();

    limpiarObjeto();
}

function guardar() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Estudiante Agredado con Exito',
        showConfirmButton: false,
        timer: 1500
      })
}


function limpiarObjeto() {
    objEstudiante.id = '';
    objEstudiante.nombre = '';
    objEstudiante.apellido = '';
    objEstudiante.edad = '';
    objEstudiante.carrera = '';
}

function mostrarEstudiantes() {
    limpiarHTML();

    const divEstudiantes = document.querySelector('.div-estudiantes');

    listaEstudiantes.forEach( estudiante =>{
        const {id, nombre, apellido, edad, carrera} = estudiante;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${edad} - ${carrera} - `;
        parrafo.dataset.id =id;
        
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstudiante(estudiante);

        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEstudiantes.appendChild(parrafo);
        divEstudiantes.appendChild(hr);

    })
}

function cargarEstudiante(estudiante) {
    const {id, nombre, apellido, edad, carrera} = estudiante;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    edadInput.value = edad;
    carreraInput.value = carrera;

    objEstudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEstudiante() {
    objEstudiante.nombre = nombreInput.value;
    objEstudiante.apellido = apellidoInput.value;
    objEstudiante.edad = edadInput.value;
    objEstudiante.carrera = carreraInput.value;

    listaEstudiantes.map( estudiante =>{
        
        if(estudiante.id === objEstudiante.id){
            estudiante.id = objEstudiante.id;
            estudiante.nombre = objEstudiante.nombre;
            estudiante.apellido = objEstudiante.apellido;
            estudiante.edad = objEstudiante.edad;
            estudiante.carrera = objEstudiante.carrera;
        }
    });

    limpiarHTML();
    mostrarEstudiantes();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}


function eliminarEstudiante(id){
    listaEstudiantes = listaEstudiantes.filter(estudiante => estudiante.id !== id);

    limpiarHTML();
    mostrarEstudiantes();
}

function limpiarHTML() {
    const divEstudiantes = document.querySelector('.div-estudiantes');

    while(divEstudiantes.firstChild) {
        divEstudiantes.removeChild(divEstudiantes.firstChild);
    }
}
