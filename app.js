// Cargo los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    document
      .querySelector("#btn-ajustar")
      .addEventListener("click", ajustarProducto);

    document
        .querySelector("#btn-agregar")
        .addEventListener("click", agregarProducto);

    document
        .querySelector("#btn-eliminar")
        .addEventListener("click", eliminarProducto);
});

// Cargo los productos
function cargarProductos() {
   let productos = [
    {nombre:'2890-1-BL',stock:10},
    {nombre:'2890-1-NE',stock:0},
    {nombre:'2890-2-BL',stock:0},
    {nombre:'2890-2-NE',stock:0},
    {nombre:'2890-3-BL',stock:0},
    {nombre:'2890-3-NE',stock:0},
   ];

    // inserto los productos al local storage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Muestro los productos
    mostrarProductos();
}

// Muestro los productos
function mostrarProductos() {
    let productos = JSON.parse(localStorage.getItem('productos'));
    let listaProductos = document.querySelector("#tbody");
    // Limpio la lista
    listaProductos.innerHTML = '';

    let selectProductosAjuste = document.querySelector("#producto-ajuste");
    let productoEliminar = document.querySelector("#producto-eliminar");
    productoEliminar.innerHTML = '';
    selectProductosAjuste.innerHTML = '';
    productos.forEach(producto => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.stock}</td>
        `;
        listaProductos.appendChild(tr);

        let option = document.createElement('option');
        option.value = producto.nombre;
        option.text = producto.nombre;
        selectProductosAjuste.appendChild(option);
        productoEliminar.appendChild(option.cloneNode(true));
    });
}




function ajustarProducto() {
    let tipoAjuste = document.querySelector("#tipo-ajuste").value;
    let producto = document.querySelector("#producto-ajuste").value;
    let cantidad = document.querySelector("#cantidad-ajuste").value;
    let productos = JSON.parse(localStorage.getItem('productos'));
    let productoAjustado = productos.find(p => p.nombre === producto);
    if(!cantidad || cantidad <= 0) {
        alert('Ingrese una cantidad valida');
        return;
    }
    if(tipoAjuste === '-' && productoAjustado.stock < cantidad) {
        alert('No hay stock suficiente');
        return;
    }
    if(tipoAjuste === '-') {
        productoAjustado.stock = parseInt(productoAjustado.stock) - parseInt(cantidad);
    } else {
        productoAjustado.stock = parseInt(productoAjustado.stock) + parseInt(cantidad);
    }
    localStorage.setItem('productos', JSON.stringify(productos));
    document.querySelector("#cantidad-ajuste").value='';
    mostrarProductos();
}

function validateInput(value) {
  console.log(value);
  const regex = /[a-zA-Z0-9\-]$/; // Expresión regular
  if (!regex.test(value)) {
    
    return false;
  }
    return true;
}

// agregar producto
function agregarProducto() {
  const producto = document.querySelector("#producto-agregar").value;
  const stock = document.querySelector("#cantidad-inicial").value;
  if (!producto || !stock) {
    alert("Ingrese un producto y stock");
    return;
  }
  if (!validateInput(producto)) {
    alert("Solo se permiten números, letras y guion");
    return;
  }
  const productos = JSON.parse(localStorage.getItem("productos"));
  const productoExistente = productos.find((p) => p.nombre === producto);
  if (productoExistente) {
    alert("El producto ya existe");
    return;
  }
  productos.push({ nombre: producto, stock: stock });
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
  document.querySelector("#producto-agregar").value = "";
  document.querySelector("#cantidad-inicial").value = "";
}

function eliminarProducto() {
  const producto = document.querySelector("#producto-eliminar").value;
  if (!producto) {
    alert("Seleccione un producto");
    return;
  }
//   asegurarse que quiere eliminar
    if (!confirm("¿Está seguro que desea eliminar el producto?")) {
        return;
    }
  const productos = JSON.parse(localStorage.getItem("productos"));
  const productoIndex = productos.findIndex((p) => p.nombre === producto);
  productos.splice(productoIndex, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

