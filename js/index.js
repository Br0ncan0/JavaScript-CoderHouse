const inputBox = document.getElementById("caja_input");
const main = document.getElementById("main");
const title = document.getElementById("title");
const listContainer = document.getElementById("contenedor-lista");
const enlace = document.getElementById("enlace")
const parent = document.body;
const date = luxon.DateTime.now().toString();
const now = Datetime.fromISO(date).toLocaleString(DateTime.DATEFULL);
const tareas = [];
const user = "";

alert(now);

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

    title.remove() //Elimina titulo actual

    let h1 = document.createElement("h1");
    h1.innerHTML = `Hola, ${result.value.login}!`;
    main.insertChildAtIndex(h1, 1);

    enlace.href = `https://www.github.com/${result.value.login}`; //Coloca enlace de github de la persona que ingreso

  }
}) 

// Para insertar elementos por posicion
Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}

// Añadimos una clase para crear objetos "tarea", con el fin de crear las tareas que querramos

class Tarea{
  constructor(id = "tarea" + toString(tareas.length+1), nombre, prioridad = "Prioridad 1", fecha = now, estado = true, fecha_fin = ' - '){
    this.id = id;
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.fecha = fecha;
    this.estado = estado; // Agregado
    this.fecha_fin = fecha_fin;
  }

  terminarTarea(fecha){
    this.estado = false; //Tarea terminada
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
    let li = document.createElement("li");
    li.setAttribute(ID, "lista")

    tarea = new Tarea(nombre = inputBox.value)
    tareas.append(tarea)

    li.innerHTML = `<div class="${tarea.id}">
                              <p id="nombre"> ${tarea.nombre}</p>
                              <p id="prioridad">${tarea.prioridad}</p>
                              <p id="Fecha1">${tarea.fecha}</p>
                              <p id="Fecha2>${tarea.fecha_fin}</p>
                            </div>`
  }

  inputBox.value = '';
  saveData();
}

//Por terminar

function quitarTarea(){
  let count = document.querySelectorAll("#contenedor-lista .lista").length
  if(count <= 0){
    Swal.fire({
      
    })
  }
}

listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
  }
}, false);

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask()
