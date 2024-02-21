import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";

const deleteProduct = (id, image, name, setState) => {
  console.log(id);

  Swal.fire({
    title: "Desea eliminar este producto?",
    imageUrl: image,
    text: name,
    showDenyButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        setState(true);
        Swal.fire("El producto se ha eliminado exitosamente!", "", "success");
      } catch (error) {
        console.log(error);
      } finally {
        setState(false);
      }
    }
  });
};

const editVisibility = (e, setState, setData) => {
  console.log(e.target.checked);
  setState(true);
  try {
    // setData()
  } catch (error) {
    console.log(error);
  } finally {
    setState(false);
  }
};

export const TableRow = ({
  name,
  price,
  category,
  discount,
  visible,
  id,
  image,
  product,
  setModalState,
  setProductState,
  setChangeVisibilityLoading,
  changeVisibilityLoading,
  deleteProductLoading,
  setDeleteProductLoading,
  setData
}) => {
  const editHandler = () => {
    setProductState(product);
    setModalState(true);
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{category}</td>
        <td>{price}</td>
        <td>{discount ? discount : 0}</td>
        <td>
          {changeVisibilityLoading ? (
            <Spinner size="sm" />
          ) : (
            <Form.Check
              type="checkbox"
              defaultChecked={visible}
              onChange={(e) => editVisibility(e, setChangeVisibilityLoading, setData)}
            />
          )}
        </td>
        <td>
          <Button
            disabled={deleteProductLoading}
            variant="danger"
            className="mx-1"
            size="sm"
            onClick={() =>
              deleteProduct(id, image, name, setDeleteProductLoading)
            }
          >
            {deleteProductLoading ? (
              <>
                {" "}
                Eliminar <Spinner size="sm" />{" "}
              </>
            ) : (
              <>
                Eliminar <i className="bi bi-trash"></i>
              </>
            )}
          </Button>

          <Button
            variant="primary"
            className="mx-1"
            size="sm"
            onClick={editHandler}
          >
            Editar <i className="bi bi-pencil"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};
