import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { HomeBanner } from "../components/HomeBanner";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { ProductNotFoundMessage } from "../components/ProductNotFoundMessage";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Image from "react-bootstrap/Image";
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// const searchByNameHandler = async (setState, setLoading, value) => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${BASE_URL}/product/name/${value}`, {
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "GET",
//     });
//     const data = await res.json();

//     if (res.status == 200) {
//       setState(data);
//     }

//     if (res.status == 404) {
//       setState(null);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

// const sortByPriceHandler = async (setState, setLoading, value) => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${BASE_URL}/product/order/${value}`, {
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "GET",
//     });

//     const data = await res.json();

//     if (res.status == 200) {
//       setState(data);
//     }

//     if (res.status == 404) {
//       setState(null);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

// const sortByCategoryHandler = async (setState, setLoading, value) => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${BASE_URL}/product/category/${value}`, {
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "GET",
//     });

//     const data = await res.json();

//     if (res.status == 200) {
//       setState(data);
//     }

//     if (res.status == 404) {
//       setState(null);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchAllProducts = async (setState, setLoading) => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${BASE_URL}/products`, {
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "GET",
//     });

//     const data = await res.json();
//     if (res.status == 200) {
//       setState(data);
//     }

//     if (res.status == 404) {
//       setState(null);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

const searchWithOptions = async ({
  setState,
  setLoading,
  queryParams
}) => {
  setLoading(true);

  try {
    const res = await axios.get(`${BASE_URL}/products/search${queryParams}`);
    const data = res.data;

    if (res.status == 200) {
      setState(data);
    }

    if (res.status == 404 || res.status == 500) {
      setState(null);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleQueryParams = ({
  valueSearchInput,
  valueCategoryInput,
  valuePriceInput,
  setQueryParams,
}) => {
  const queryParams = {
    name: valueSearchInput,
    price: valuePriceInput,
    category: valueCategoryInput,
  };

  let queryString = "?";

  for (const key in queryParams) {
    if (queryParams[key]) {
      queryString.length == 1
        ? (queryString += `${key}=${queryParams[key]}`)
        : (queryString += `&${key}=${queryParams[key]}`);
    }
  }

  setQueryParams(queryString)

  // * let queryString = "?";

  // * if (valueCategoryInput) {
  // *  queryString.length == 1
  // *    ? (queryString += `category=${category}`)
  // *    : (queryString += `&category=${category}`);
  // * }

  // * if (valuePriceInput) {
  // *  queryString.length == 1
  // *    ? (queryString += `price=${price}`)
  // *    : (queryString += `&price=${price}`);
  // * }

  // * if (valueSearchInput) {
  // *  queryString.length == 1
  // *    ? (queryString += `name=${name}`)
  // *   : (queryString += `&name=${name}`);
  // * }
};

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
  const [queryParams, setQueryParams] = useSearchParams();
  const location = useLocation();
  const searchInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
  const searchFormRef = useRef();

  // useEffect(() => {
  //   searchWithOptions(setData, setLoading, searchParams);
  // }, []);

  useEffect(()=>{
    searchWithOptions({setState: setData, setLoading: setLoading, queryParams: location.search});
  },[queryParams])

  const submitHandler = (e) => {
    e.preventDefault();
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
                onKeyDown={(e) =>
                  e.code == "Enter"
                    ? handleQueryParams({
                        valueSearchInput: searchInputRef.current.value,
                        valueCategoryInput: categoryInputRef.current.value,
                        valuePriceInput: priceInputRef.current.value,
                        setQueryParams: setQueryParams
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
              defaultValue={""}
              ref={priceInputRef}
              onChange={(e) =>
                handleQueryParams({
                  valueSearchInput: searchInputRef.current.value,
                  valueCategoryInput: categoryInputRef.current.value,
                  valuePriceInput: priceInputRef.current.value,
                  setQueryParams: setQueryParams
                })
              }
            >
              <option disabled hidden value="">
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
              defaultValue={""}
              ref={categoryInputRef}
              onChange={(e) =>
                handleQueryParams({
                  valueSearchInput: searchInputRef.current.value,
                  valueCategoryInput: categoryInputRef.current.value,
                  valuePriceInput: priceInputRef.current.value,
                  setQueryParams: setQueryParams
                })
              }
            >
              <option disabled hidden value="">
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
                setQueryParams();
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </Form>
      </section>
      <section className="container my-5 vh-50">
        <div className="row">{renderHandler(data, loading)}</div>
      </section>
    </>
  );
};
