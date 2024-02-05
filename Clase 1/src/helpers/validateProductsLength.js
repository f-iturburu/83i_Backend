export const validateProductsLength = (length) => {
    const HTTP_OK = 200;
    const HTTP_NOT_FOUND = 404;
    return length == 0 ? HTTP_NOT_FOUND : HTTP_OK;
  };
  