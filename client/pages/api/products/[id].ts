import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '.';
import products from './Products.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { error?: string }>
) {
  const { id } = req.query;
  const result = products.find((product: Product) => {
    if (product.id.toString() === id) {
      return product
    }
  })

  if (!result) {
    res.status(404).json({ error: 'Product not found' })
  }

  res.status(200).json(result as unknown as Product)
}
