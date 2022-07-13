import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Card, Heading, Text, Image, Flex, Box } from 'rebass'
import { Input } from '@rebass/forms'
import { Product } from './api/products'
import { ChangeEvent, useState } from 'react'

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
  const [currentProducts, setCurrentProducts] = useState<Product[] | undefined>(products)

  const searchProducts = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget

    if (!value.length) {
      setCurrentProducts(products)

      return
    }

    const filteredResult = products?.filter(product => {
      if (product.title.toLowerCase().indexOf(value.toLocaleLowerCase()) > -1 || product.price.toString().indexOf(value.toLowerCase()) > -1) {
        return product
      }
    })
    setCurrentProducts(filteredResult)
  }

  return (
    <>
      <Head>
        <title>Product listing app</title>
        <meta name="description" content="Product listing app for store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Input placeholder='Filter products' onChange={searchProducts} />
      <Flex flexWrap='wrap' color='black'>
        {currentProducts?.map(product => {
          return (
            <Box
              key={product.id}
              className='box-product'
              width={250}
              height={500}
              margin={20}
            >
              <Link
                href={`product/${product.id}`}
              >
                <Card
                  width={250}
                  height={500}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    margin={'20px 0'}
                    display={'flex'}
                    alignSelf={'center'}
                  />
                  <Box>
                    <Box
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      margin={10}
                    >
                      <Text fontFamily={'Lato'}>{product.price}</Text>
                      <Text fontFamily={'Lato'}>Rating {product.rating.rate} | {product.rating.count}</Text>
                    </Box>
                    <Heading fontFamily={'Lato'} margin={10}>{product.title}</Heading>
                  </Box>
                </Card>
              </Link>
            </Box>
          )
        })}
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_URL}/products`)
  const products = await response.json();

  return {
    props: {
      products,
    },
  }
}

export default Home
