let fecha = document.querySelector(".selection");

let today = new Date();
 
// obtener la fecha y la hora
let now = today.toLocaleDateString();
console.log(now);
 
fecha.innerHTML = (now)
