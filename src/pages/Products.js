import React, { useState, useEffect } from "react";
import axios from "axios";




function Products() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar la consulta a la base de datos
    axios.get("/api/productos")
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
   
 
  <table className="product-table">
    <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Stock</th>
      <th>Fecha de vencimiento</th>
    </tr>
  </thead>
  <tbody>
    {productos.map(producto => (
      <tr key={producto.id_producto}>
        <td style={{ fontSize: "0.8rem" }}>{producto.id_producto}</td>
        <td style={{ fontSize: "0.8rem" }}>{producto.nombre}</td>
        <td style={{ fontSize: "0.8rem" }}>{producto.precio}</td>
        <td style={{ fontSize: "0.8rem" }}>{producto.stock}</td>
        <td style={{ fontSize: "0.8rem" }}>{producto.fecha_vencimiento}</td>
      </tr>
    ))}
  </tbody>
</table>

 
  
  );
}

export default Products;
