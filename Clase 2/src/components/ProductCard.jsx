import { discountPrice } from "../helpers/discountPrice.js";
import { formatCurrency } from "../helpers/formatCurrency.js";


const ProductCard = ({product}) => {
  const finalPrice = product.discountPercentage
    ? discountPrice(product.price, product.discountPercentage)
    : product.price;
  const formattedPrice = formatCurrency(finalPrice);
  const discount = product.discountPercentage ? true : false;

  return <>
    <div className="col-12 col-md-6 col-lg-3 p-2">
      <div className="card bg-white border-0 rounded-0 h-100">
          <img
            src={product.image}
            className="card-img-top rounded-0 img-fluid"
            alt={product.name}
          />
          <div className="mt-auto">
          <div className="card-body text-dark">
            <h5 className="card-title">{product.name}</h5>
            <div className="d-flex w-100">
              <p className="card-text text-decoration-line-through me-3">
                  {discount ? formatCurrency(product.price) : ""}
                {discount ? <span className="badge bg-danger">-${product.discountPercentage}%</span> : "  "}
              </p>
              <p className="card-text"> {formattedPrice}</p>
            </div>
             <button className="btn btn-primary rounded rounded-5"><i className="bi bi-cart-plus"></i> Agregar al carrito </button>
          </div>
        </div>
      </div>
    </div>
  </>
    
};

export default ProductCard;