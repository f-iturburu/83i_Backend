import React from 'react'

export const Error404 = () => {
  return (
    <section className="vh-100 d-flex justify-content-center align-items-center">
    <div className="text-center">
       <h1 className="display-1 fw-semibold">Error 404</h1>
       <h1 className="fw-normal">No hemos podido encontrar lo que buscabas</h1>
       <button type="button" className="btn btn-outline-light mt-5 rounded rounded-5" onClick={()=> history.back()}><i className="bi bi-arrow-counterclockwise me-2"></i>Volver a la pagina anterior</button>
    </div>
</section>
  )
}
