const products = [
  {
    id: 1,
    name: "RTX 5070",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPdQZ5SiFaWkQTizz79JuF_ynCWhcJLfbDw&s",
    description: "The RTX 5070 is a graphics card made by NVIDIA.",
    price: 2000
  },
  {
    id: 2,
    name: "RTX 3060",
    image: "https://images.kabum.com.br/produtos/fotos/475652/placa-de-video-rtx-3060-gaming-oc-8g-gigabyte-nvidia-geforce-8gb-gddr6-128bits-ray-tracing-gv-n3060gaming-oc-8gd_1695647509_gg.jpg",
    description: "The RTX 3060 is a graphics card made by NVIDIA.",
    price: 1500
  },
  {
    id: 3,
    name: "GTX 1050 TI",
    image: "https://images.kabum.com.br/produtos/fotos/84137/84137_index_gg.jpg",
    description: "The GTX 1050 TI is a graphics card made by NVIDIA.",
    price: 1000
  },
  {
    id: 4,
    name: "RX 6800 XT",
    image: "https://images9.kabum.com.br/produtos/fotos/136529/placa-de-video-gigabyte-radeon-rx-6800-xt-16-gb-gddr6-rgb-fusion-pci-express-4-0-gv-r68xtgaming-oc-16gd_1610655804_gg.jpg",
    description: "The RX 6800 XT is a graphics card made by AMD.",
    price: 1300
  }
];

const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

const app = express();

app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const port = 3000;

app.get('/product/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id == id);

  res.render('product', { product });
})

app.get('/', (req, res) => {
  res.render('home', { products });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})