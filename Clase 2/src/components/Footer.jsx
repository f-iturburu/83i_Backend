import React from 'react'

export const Footer = () => {
  return (
    <footer className="bgFooter">
    <div className="container mt-5">
      <div className="row pb-1 text-white align-items-center">
        <div className="col-12 text-center p-4 py-2">
          <div className="d-flex justify-content-center"></div>
        </div>
        <div className="col-12 col-md-4 p-4 py-2 text-center">
          <a href="/">
            <img
              src="/src/assets/logo.png"
              alt="Logo de Rolling Store"
              className="img-fluid"
            />
          </a>
        </div>

        <div className="col-12 col-md-4 py-3 text-center text-md-start">
          <div className="mb-1">
            <div className="mb-1">
              <a
                className="text-secondary text-start text-decoration-none itemFooter"
                href="/views/404.html"
              >
                Sobre nosotros</a
              >
            </div>
            <div className="mb-1">
              <a
                className="text-secondary text-decoration-none itemFooter"
                href="/views/404.html"
              >
                Contacto</a
              >
            </div>
            <div className="mb-1">
              <a
                className="text-secondary text-decoration-none itemFooter"
                href="/views/404.html"
                >Centro de ayuda</a
              >
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 py-3 text-center text-md-start">
          <div className="mb-1">
            <div className="mb-1">
              <a
                className="text-secondary text-decoration-none itemFooter"
                href="/views/404.html"
              >
                Politica de privacidad</a
              >
            </div>
            <div className="mb-1">
              <a
                className="text-secondary text-decoration-none itemFooter"
                href="/views/404.html"
              >
                Preferencias de cookies</a
              >
            </div>
            <div className="mb-1">
              <a
                className="text-secondary text-decoration-none itemFooter"
                href="/views/404.html"
              >
                Avisos legales</a
              >
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <div className="py-5 py-md-2 mx-3">
            <a
              className="h5 text-secondary text-decoration-none"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <i className="bi bi-instagram display-5"></i>
            </a>
          </div>
          <div className="py-5 py-md-2 mx-3">
            <a
              className="h5 text-secondary text-decoration-none"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <i className="bi bi-facebook display-5"></i>
            </a>
          </div>
          <div className="py-5 py-md-2 mx-3">
            <a
              className="h5 text-secondary text-decoration-none"
              href="https://twitter.com"
              target="_blank"
            >
              <i className="bi bi-twitter display-5"></i>
            </a>
          </div>
          <div className="py-5 py-md-2 mx-3">
            <a
              className="h5 text-secondary text-decoration-none"
              href="https://www.youtube.com/"
              target="_blank"
            >
              <i className="bi bi-youtube display-5"></i>
            </a>
          </div>
        </div>
        <div className="col-12 pt-2 border-top border-2">
          <p className="text-white text-center">
            &copy; 2022 <b>Rolling Store</b> - Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}
