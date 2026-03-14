const express = require("express")

const app = express()

app.use(express.json())

const products = []
let currentId = 1

app.get("/products", (req, res) => {
  res.json(products)
})

app.post("/products", (req, res) => {
  const product = {
    id: currentId,
    name: req.body.name,
    price: req.body.price
  }

  currentId++

  products.push(product)

  res.json({
    message: "Product added",
    data: product
  })
})

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id)

  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.json(product)
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})