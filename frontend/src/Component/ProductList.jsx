function ProductList({ products }) {

  return (
    <section className="rounded-xl border border-green-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-green-900">Products</h2>

      <div className="mt-4 space-y-3">
        {products.length === 0 && (
          <p className="text-sm text-green-700">No products yet. Add your first item above.</p>
        )}

        {products.map(product => (
          <article key={product.id} className="rounded-lg border border-green-100 bg-green-50 px-4 py-3">
            <h3 className="font-medium text-green-900">{product.name}</h3>
            <p className="text-sm text-green-700">Price: {product.price}</p>
          </article>
        ))}
      </div>

    </section>
  )
}

export default ProductList