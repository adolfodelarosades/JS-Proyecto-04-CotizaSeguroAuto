//Llenado del Select con los 20 últimos años vía JS
const max = new Date().getFullYear(),
      min = max - 20;
const selectAnios = document.getElementById('anio');
for( let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

//Constructor para seguros
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
   /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
   */

   let cantidad;
   const base = 2000;
   switch (this.marca) {
       case '1':
           cantidad = base * 1.15;
           break;
       case '2':
           cantidad = base * 1.05;
           break;
       case '3':
           cantidad = base * 1.35;
           break;
   }

   //Calcular años a cotizar
   const diferencia = new Date().getFullYear() - this.anio;

   //Cada año de diferencia hay que reducir 3% el valor del seguro
   cantidad -= ((diferencia * 3) * cantidad) / 100;

   /*
        Si el seguro es básico se incrementa 30% 
        Si el seguro es clompleto se incrementa 50% 
   */
   
   if(this.tipo === 'basico'){
       cantidad *= 1.30;
   }else{
    cantidad *= 1.50;
   }

   console.log(cantidad);

   return cantidad;
}

//Todo lo que muestra la interfaz
function Interfaz() {}

//Mensaje se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function( mensaje, tipo ){
    const div = document.createElement('div');
    if ( tipo === 'error' ){
        div.classList.add('mensaje','error');
    } else {
        div.classList.add('mensaje','correcto');
    }
    div.innerHTML = mensaje;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function() {
        document.querySelector('.mensaje').remove();
    }, 3000);
}

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, total){
    //División donde se pinta el resultado
    const resultado = document.getElementById('resultado');
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }
    let tipo;
    switch (seguro.tipo) {
        case 'basico':
            tipo = 'Básico';
            break;
        case 'completo':
            tipo = 'Completo';
            break;
    }
    //Crear un div
    const div = document.createElement('div');
    //Insertar la información
    div.innerHTML = `
        <p>Resumen: </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${tipo} </p>
        <p>Total: ${total} </p>
    `;
    resultado.appendChild(div);
};

//EventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Leer marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leer el año seleccionado del <select>
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // Leer el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia de Interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no esten vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        //Interfaz imprimiendo mensaje de error
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo', 'error');
    }else{
        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //console.log(seguro);

        //Cotizar el seguro        
        const cantidad = seguro.cotizarSeguro();

        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
    }
});
