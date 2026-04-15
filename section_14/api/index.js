const express = require('express');
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/products/create', (req, res) => {
  const { name, description, price } = req.body;

  const fieldMap = { name, description, price };
  let missingFields = [];

  for (const [key, value] of Object.entries(fieldMap)) {
    if (!value) {
      missingFields.push(key);
    }
  }

  if (missingFields.length) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  res.status(201).json({
    message: "Product created successfully!",
    product: req.body
  })
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello World!",
    date: new Date()
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})