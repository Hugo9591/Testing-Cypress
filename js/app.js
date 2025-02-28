let BD;

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

const heading = document.querySelector('#administra');

let editando = false;

//Crear objeto para guardar datos
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}

//Cuando carga la pagina ejecuta las funciones
window.onload = () => {
    eventListeners();

    crearDB();
}

//Eventos
// eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
}

//llenar objeto con valor del input objeto = input
function datosCita(e){
    citaObj[e.target.name] =  e.target.value;
}

//Clases
class Citas{

    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    editaCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UserInterfaz{

    constructor({citas}){
        this.textoHeading(citas);
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger', 'animacion', 'opacity-50');
        }else{
            divMensaje.classList.add('alert-success', 'animacion', 'opacity-50');
        }

        //agregar data-cy
        divMensaje.dataset.cy = 'alerta';

        divMensaje.textContent = mensaje;

        //Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje, document.querySelector('.agregar-cita'));
        
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas(){
        this.limpiarHTML();

        //Abre una transacción en la base de datos DB, 
        // específicamente en el almacén de objetos (objectStore) 
        // llamado citas.
        const objectStore = DB.transaction('citas').objectStore('citas');

        const fnTextoHeading = this.textoHeading;
        //Contar el num de registros y devuelve un objeto IDBRequest
        const total = objectStore.count();

        // onsuccess cuando la operacion count se ejecuta correctamente
        total.onsuccess = function(){

            fnTextoHeading(total.result);//Total de registros
            console.log(total.result);
        }

        //openCursor itera sobre los registros devuelve un obj
        //Al encontrar un resultado o no hay registros se activa onsuccess
        objectStore.openCursor().onsuccess = function(e){
            const cursor = e.target.result;

            //si el cursor no es null ejecuta el if
            if(cursor){
                const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;

                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3', 'targeta');
                divCita.dataset.id = id;

                // scRIPTING DE LOS ELEMENTOS...
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.innerHTML = `${mascota}`;

                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

                // Agregar un botón de eliminar...
                const btnEliminar = document.createElement('button');

                // data set de cypress
                btnEliminar.dataset.cy = 'btn-eliminar';

                btnEliminar.onclick = () => {
                    const confirmar = confirm('Seguro que Desea eliminar el Registro?');
                    if(confirmar){
                        eliminarCita(id);
                    }
                    // eliminarCita(id);
                }

                 // añade la opción de eliminar
                btnEliminar.classList.add('btn1');
                btnEliminar.innerHTML = '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

                // Añade un botón de editar...
                const btnEditar = document.createElement('button');
                
                //usar con cypress
                btnEditar.dataset.cy = 'btn-editar';
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);//No funciona el cursor.value en lo parentesis porque el valor es dinamico y va cambiando

                btnEditar.classList.add('btn1');
                btnEditar.innerHTML = '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

                const contenedorBoton = document.createElement('DIV');
                contenedorBoton.classList.add('contenedor-boton');
                contenedorBoton.appendChild(btnEditar);
                contenedorBoton.appendChild(btnEliminar);
                
                // Agregar al HTML
                divCita.appendChild(contenedorBoton);
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);

                contenedorCitas.appendChild(divCita);

                //Ir al siguiente elemento(Usando un iteraador)
                cursor.continue();
            }
        }
    }

    textoHeading(resultado){
        if(resultado > 0){
            heading.textContent = 'Administra tus Citas'
        }else{
            heading.textContent = 'No hay Citas, Comienza Creando Una'
        }
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}


//Intancias
const administrarCitas = new Citas();
const userI = new UserInterfaz(administrarCitas);

function nuevaCita(e){

    e.preventDefault();
    
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        userI.imprimirAlerta('Todos Los Campos Son Obligatorios', 'error');
        return;
    }

    if(editando){
        administrarCitas.editaCita({...citaObj});

        //Editar el indexedDB
        //Crear transaction en la BD
        const transaction = DB.transaction(['citas'], 'readwrite');
        //Obtiener referencia al almacén de objetos (objectStore) llamado citas dentro de la transacción creada.
        const objectStore = transaction.objectStore('citas');

        objectStore.put(citaObj);//Agrega o actualiza el registro

        transaction.oncomplete = function(){
            userI.imprimirAlerta('Guardado Correctamente...');

            formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

            editando = false;
        }

        transaction.onerror = function (){
            console.log('Hubo un Error');
        }

    }else{
        //Nuevo Registro
        citaObj.id = Date.now();//Genera un nuevo id

        //Añade nueva cita
        administrarCitas.agregarCita({...citaObj});

        //Insertar en la BD
        const transaction = DB.transaction(['citas'], 'readwrite');

        const objectStore = transaction.objectStore('citas');

        objectStore.add(citaObj);

        transaction.oncomplete = function(){
            console.log('Cita Agregada');

            userI.imprimirAlerta('Se Agrego Correctamente');
        }
    }

    userI.imprimirCitas();
    reiniciarObjeto();
    formulario.reset();
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){

    const transaccion = DB.transaction(['citas'], 'readwrite');
    const objectStore = transaccion.objectStore('citas');

    objectStore.delete(id);

    transaccion.oncomplete = function(){
        console.log(`Cita ${id} Eliminada...`);
        userI.imprimirCitas();
    }
    transaccion.onerror = function(){
        console.log('Hubo un error');
    }
}

function cargarEdicion(cita){

    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Rellenando el obj
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

function crearDB(){
    const crearDB = window.indexedDB.open('citas', 1);

    crearDB.onerror = function(){
        console.log('Hubo un error al crear la BD');
    }

    crearDB.onsuccess = function(){
        console.log('Base de Datos Creada Exitosamente');

        DB = crearDB.result;//Reultado de la BD
        console.log(BD);

        userI.imprimirCitas();
    }

    //Configurar BD
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas',{
            keyPath: 'id',
            autoIncrement: true
        });


        //Definir las columnas
        objectStore.createIndex('mascota', 'mascota', {unique: false});
        objectStore.createIndex('propietario', 'propietario', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});//el id si es unico

        console.log('Base de datos creada y lista');
    }
}