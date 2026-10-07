const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// In-memory product storage
let products = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 29.99, quantity: 15 },
  { id: 2, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, quantity: 8 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 59.99, quantity: 20 }
];

// 1. GET /products - Display All Products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// 2. GET /products/category/:category - Filter Products by Category
// (Placed before /products/:id to prevent route conflicts)
app.get('/products/category/:category', (req, res) => {
  const categoryParam = req.params.category.toLowerCase();
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryParam
  );

  if (filteredProducts.length === 0) {
    return res.status(404).json({
      message: `No products found under category: "${req.params.category}"`
    });
  }

  res.status(200).json(filteredProducts);
});

// 3. GET /products/:id - Display a Particular Product
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      message: `Product with ID ${req.params.id} not found.`
    });
  }

  res.status(200).json(product);
});

// 4. POST /products - Add a New Product
app.post('/products', (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({
      message: "Please provide all required fields: name, category, price, quantity."
    });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    category,
    price: Number(price),
    quantity: Number(quantity)
  };

  products.push(newProduct);
  res.status(201).json({
    message: "Product added successfully.",
    product: newProduct
  });
});

// 5. PUT /products/:id - Update an Existing Product
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      message: `Cannot update. Product with ID ${req.params.id} not found.`
    });
  }

  const { name, category, price, quantity } = req.body;

  products[index] = {
    ...products[index],
    name: name !== undefined ? name : products[index].name,
    category: category !== undefined ? category : products[index].category,
    price: price !== undefined ? Number(price) : products[index].price,
    quantity: quantity !== undefined ? Number(quantity) : products[index].quantity
  };

  res.status(200).json({
    message: `Product ID ${productId} updated successfully.`,
    product: products[index]
  });
});

// 6. DELETE /products/:id - Delete a Product
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      message: `Cannot delete. Product with ID ${req.params.id} not found.`
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    message: `Product ID ${productId} deleted successfully.`,
    product: deletedProduct[0]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});