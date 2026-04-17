import { useState } from "react"

function AddProduct({ setProducts, setApiError }) {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const product = { name, price }

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unable to add product")
        }

        return res.json()
      })
      .then(data => {
        const createdProduct = data.product || data.data || data
        setProducts(prev => [...prev, createdProduct])
        setApiError("")
        setName("")
        setPrice("")
      })
      .catch(() => {
        setApiError("Unable to connect to backend. Start backend/server.js on port 5000.")
      })
  }

  return (
    <section className="rounded-xl border border-green-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-green-900">Add Product</h2>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-3">

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-green-300 px-3 py-2 text-sm text-green-900 outline-none ring-green-500 placeholder:text-green-500 focus:ring-2"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-md border border-green-300 px-3 py-2 text-sm text-green-900 outline-none ring-green-500 placeholder:text-green-500 focus:ring-2"
          min="0"
          step="0.01"
          required
        />

        <button
          type="submit"
          className="rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          Add
        </button>

      </form>
    </section>
  )
}

export default AddProduct