const inputBox = document.getElementById("caja_input");
const main = document.getElementById("main");
const title = document.getElementById("title");
const listContainer = document.getElementById("contenedor-lista");
const enlace = document.getElementById("enlace")
const parent = document.body;
const tareas = [];
var DateTime = luxon.DateTime;
const now = DateTime.now().toLocaleString(DateTime.DATE_FULL);

const user = "";

// Validacion con Sweet Alert para obtener datos del usuario y tambien su avatar
Swal.fire({
  title: 'Ingresa tu username de Github: ',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Ingresar',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    return fetch(`//api.github.com/users/${login}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json();
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: `Hola, ${result.value.login}!`,
      imageUrl: result.value.avatar_url
    })


    let h1 = document.getElementById("title");
    h1.innerHTML = `Hola, ${result.value.login}!`;

    enlace.href = `https://www.github.com/${result.value.login}`; //Coloca enlace de github de la persona que ingreso

  }
}) 


// Añadimos una clase para crear objetos "tarea", con el fin de crear las tareas que querramos
class Tarea{

  static #nextId = 1;

  constructor(nombre, prioridad = "Prioridad 1", fecha = now, estado = true, fecha_fin = '-'){
    this.id = "tarea" + Tarea.#nextId++;
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.fecha = fecha;
    this.estado = estado; // Agregado
    this.fecha_fin = fecha_fin;
  }

  cambiarStatus(){
    this.estado = false;
    this.fecha_fin = now;
  }
}

//Funcionalidad del proyecto

function agregarTarea(){
  if(inputBox.value === ''){
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Debes ingresar una tarea.',
    })    
  }
  else {

    let tarea = '';

    tarea = new Tarea(nombre = inputBox.value);
    tareas.push(tarea);

    task = `<li id="${tarea.id}">
      <div id="tarea">
      <input type="checkbox" id="check${tarea.id}">
      <p id="nombre">${tarea.nombre}</p>
      <p id="prioridad">${tarea.prioridad}</p>
      <p id="Fecha1">${tarea.fecha}</p>
      <p id="Fecha2">${tarea.fecha_fin}</p>
      </div>
      </li>`;


    listContainer.insertAdjacentHTML('beforeend', task);
  }

  inputBox.value = '';
  saveData();
}

//Por terminar

function quitarTarea(){

  let ids = []
  tareas_activas = tareas.filter((el) => el.estado == true);

  for(let i = 0; i <= tareas_activas.length; i++){
    id = tareas_activas[i]?.id;
    ids.push(id);
    if(document.getElementById("check"+id).checked == true){
      document.getElementById(id).remove();
      tareas[i].cambiarStatus();
    }else{
      continue
    }
  }

  if (tareas.length == 0){
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No cuenta con actividades por eliminar.', 
    })
  }
}

function saveData(){
  sessionStorage.setItem("data", listContainer.innerHTML);
}
