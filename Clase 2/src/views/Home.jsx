import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { HomeBanner } from "../components/HomeBanner";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { ProductNotFoundMessage } from "../components/ProductNotFoundMessage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Placeholder from "react-bootstrap/Placeholder";
import Image from "react-bootstrap/Image";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const searchByNameHandler = async ({setState, setLoading, value}) => {
  console.log(value);
};

const sortByPriceHandler = async ({setState, setLoading, value}) => {
console.log(value);
};

const sortByCategoryHandler = async ({setState, setLoading, value}) => {
  console.log(value);
};

const searchWithOptions = async ({
  setState,
  setLoading,
  valueSearchInput,
  valueCategoryInput,
  valuePriceInput,
}) => {
  console.log(valueSearchInput, valueCategoryInput,valuePriceInput);
};

const fetchAllProducts = async (setState, setLoading) => {
  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    });

    const data = await res.json();
    if (res.status == 200) {
      setState(data);
    }

    if (res.status == 404) {
      setState(null);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const createProduct = async (setLoading, formData) =>{
           
}

const renderHandler = (data, loading) => {
  if (loading) {
    return (
      <>
        <div className="col-12 text-center">
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  if (data) {
    return data?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  return <ProductNotFoundMessage />;
};

export const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [createProductLoading, setCreateProductLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formDiscount, setFormDiscount] = useState(false);
  const [formAddImage, setFormAddImage] = useState(null);
  const searchInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
  const searchFormRef = useRef();
  const addFormRef = useRef();

  useEffect(() => {
    fetchAllProducts(setData, setLoading);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setShow(false);
    setFormDiscount(false);
    setFormAddImage(null);
  };
  
  const handleShow = () => setShow(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = addFormRef.current;
    const data = Object.fromEntries(new FormData(form));
    createProduct({setCreateProductLoading, data})
    console.log(data);
  };

  return (
    <>
      <HomeBanner />
      <section className="container mt-5 pt-5">
        <Form
          ref={searchFormRef}
          onSubmit={submitHandler}
          className="row g-3 align-items-center"
        >
          <div className="col-12 col-md-4">
            <div className="input-group">
              <Form.Control
                type="text"
                id="searchInput"
                placeholder="Buscar por nombre"
                ref={searchInputRef}
                // onKeyDown={(e) =>
                //   e.code == "Enter"
                //     ?   searchWithOptions({
                //       setState: setData,
                //       setLoading: setLoading,
                //       valueSearchInput: searchInputRef.current.value,
                //       valueCategoryInput: priceInputRef.current.value,
                //       valuePriceInput: categoryInputRef.current.value,
                //     })
                //     : ""
                // }
                onKeyDown={(e) =>
                  e.code == "Enter"
                    ?   searchByNameHandler({
                      setState: setData,
                      setLoading: setLoading,
                      value: searchInputRef.current.value,
                    })
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <Form.Select
              className="form-select"
              id="priceSelect"
              defaultValue={"default"}
              ref={priceInputRef}
              // onChange={() =>
              //   searchWithOptions({
              //     setState: setData,
              //     setLoading: setLoading,
              //     valueSearchInput: searchInputRef.current.value,
              //     valueCategoryInput: priceInputRef.current.value,
              //     valuePriceInput: categoryInputRef.current.value,
              //   })
              // }
              onChange={() =>
                sortByPriceHandler({
                  setState: setData,
                  setLoading: setLoading,
                  value: priceInputRef.current.value,
                })
              }
            >
              <option disabled hidden value="default">
                Filtrar por precio
              </option>
              <option value="asc">Precio ascendente</option>
              <option value="desc">Precio descendiente</option>
              <option value="disc">Descuento</option>
            </Form.Select>
          </div>
          <div className="col-12 col-md-3">
            <Form.Select
              className="form-select"
              id="categorySelect"
              defaultValue={"default"}
              ref={categoryInputRef}
              // onChange={(e) =>
              //   searchWithOptions({
              //     setState: setData,
              //     setLoading: setLoading,
              //     valueSearchInput: searchInputRef.current.value,
              //     valueCategoryInput: priceInputRef.current.value,
              //     valuePriceInput: categoryInputRef.current.value,
              //   })
              // }
              onChange={() =>
                sortByCategoryHandler({
                  setState: setData,
                  setLoading: setLoading,
                  value: categoryInputRef.current.value,
                })
              }
            >
              <option disabled hidden value="default">
                Filtrar por categoria
              </option>
              <option value="mug">Tazas</option>
              <option value="notepad">Libretas</option>
              <option value="keychain">Llaveros</option>
              <option value="hat">Gorras</option>
              <option value="bottle">Botellas</option>
            </Form.Select>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-dark border-1 border-light w-100"
              onClick={(e) => {
                e.preventDefault();
                searchFormRef.current.reset();
                fetchAllProducts(setData, setLoading);
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </Form>
      </section>
      <section className="container w-100 d-flex justify-content-end mt-2">
        <Button
          variant="outline-light"
          className="ms-auto rounded-2"
          onClick={handleShow}
        >
          <i className="bi bi-plus-lg"></i> Agregar Producto
        </Button>
      </section>
      <section className="container my-5 vh-50">
        <div className="row">{renderHandler(data, loading)}</div>
      </section>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={addFormRef} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="price" type="number" />
            </Form.Group>
            <Form.Select
              className="form-select mb-3"
              id="categorySelect"
              defaultValue={"default"}
              name="category"
            >
              <option disabled hidden value="default">
                Elegir categoria
              </option>
              <option value="mug">Tazas</option>
              <option value="notepad">Libretas</option>
              <option value="keychain">Llaveros</option>
              <option value="hat">Gorras</option>
              <option value="bottle">Botellas</option>
            </Form.Select>
            <section className="w-100 d-flex justify-content-center">
              <Image
                src={
                  formAddImage ? formAddImage : "/src/assets/placeholder.jpg"
                }
                style={{
                  height: "612px",
                  width: "612px",
                  objectFit: "contain",
                }}
                rounded
              />
            </section>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                name="image"
                onChange={(e) => setFormAddImage(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                onChange={() => setFormDiscount(!formDiscount)}
                label="Descuento"
              />
            </Form.Group>

            {formDiscount ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Porcentaje de descuento </Form.Label>
                <Form.Control name="discountPercenteage" type="number" />
              </Form.Group>
            ) : (
              ""
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            disabled={createProductLoading ? true : false}
            onClick={handleFormSubmit}
          >
            {createProductLoading ? <Spinner size="sm" /> : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
