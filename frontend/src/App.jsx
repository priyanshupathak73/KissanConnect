import { useEffect, useState } from "react"
import Header from "./Component/Header"
import ProductList from "./Component/ProductList"
import AddProduct from "./Component/AddProduct"
import Footer from "./Component/Footer"

function App() {

  const [products, setProducts] = useState([])
  const [apiError, setApiError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => {
        if (!res.ok) {
          throw new Error("Unable to load products")
        }

        return res.json()
      })
      .then(data => {
        setProducts(data)
        setApiError("")
      })
      .catch(() => {
        setApiError("Unable to connect to backend. Start backend/server.js on port 5000.")
      })
  }, [])

  return (
    <div id="home" className="min-h-screen bg-green-50 text-green-950">

      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">

        <section id="products" className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-green-900">Kissan Connect</h2>
        </section>

        {apiError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <AddProduct setProducts={setProducts} setApiError={setApiError} />

        <div className="mt-6">
          <ProductList products={products} />
        </div>

        <section id="about" className="mt-10 rounded-lg bg-green-100 p-4 text-sm text-green-800 sm:p-5">
          Built to support transparent product discovery for local farming communities.
        </section>

        <section id="contact" className="mt-4 rounded-lg border border-green-200 bg-white p-4 text-sm text-green-800 sm:p-5">
          Contact us at support@kissanconnect.example
        </section>

      </main>

      <Footer />

    </div>
  )
}

export default App