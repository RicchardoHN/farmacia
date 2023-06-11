import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://localhost:8081/Products")
      .then(response => {
        const sortedProducts = response.data.sort((a, b) => a.id_producto - b.id_producto);
        setProductos(sortedProducts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleBusquedaChange = event => {
    setBusqueda(event.target.value);
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = productosFiltrados.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(productosFiltrados.length / recordsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; 

    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2);
      if (currentPage <= maxVisiblePagesHalf) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxVisiblePagesHalf >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxVisiblePagesHalf;
        endPage = currentPage + maxVisiblePagesHalf;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(number => (
      <button key={number} onClick={() => paginate(number)} className={currentPage === number ? "active" : ""}>
        {number}
      </button>
    ));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={handleBusquedaChange}
        className="search-input"
      />

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
          {currentRecords.map(producto => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{new Date(producto.fecha_vencimiento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;


