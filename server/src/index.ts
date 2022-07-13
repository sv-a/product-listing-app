import express, { Express, Request, Response } from 'express';
import next from 'next';
import path from 'path';
import dotenv from 'dotenv';
import products from './Products.json';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    // "Content-Type:application/json",
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }

  next();
});

app.get('/products', (req: Request, res: Response) => {
  res.send(products);
});

app.get('/products/:id', (req: Request, res: Response) => {
  const foundProduct = products.find((product: Product) => {
    if (product.id.toString() === req.params.id) {
      return product
    }
  })


  if (!foundProduct) {
    res.status(404).json({ error: 'Product not found' })
  }

  res.send(foundProduct);
});

app.get('*', (req, res) => {
  res.send(`Route doesn't exist`);
});


// app.use(express.static(path.resolve(__dirname, '../../client/_next/static')));

// app.get('/', (req, res) => {
//   // /Users/sv/code/product-listing-app/client/.next/server/pages/index.html
//   res.sendFile(path.resolve(__dirname, '../../client/.next/server/pages', 'index.html'));
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
