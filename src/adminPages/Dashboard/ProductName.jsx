export default function ProductName({ product }) {
  return (
    <div>
      <div>
        {product && product.productName
          ? product.productName
          : "Product Name Not Available"}
      </div>
    </div>
  );
}
