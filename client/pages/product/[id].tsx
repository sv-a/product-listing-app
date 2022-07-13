import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect } from 'react'
import Router from 'next/router'
import { Product } from '../api/products'
import { Box, Heading, Image, Text } from 'rebass';
import Head from 'next/head';

interface IProps {
  id: string;
  product: Product;
  error?: string;
}

const Product: NextPage<IProps> = ({ product, error }) => {
  if (error) {
    setTimeout(() => Router.push('http://localhost:3000/'), 3000)

    return <div>{error} You will be redirected to landing page in 3 seconds or click <Link href='/'>here</Link></div>
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display={'flex'}
        flexDirection={'row'}
        padding={40}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          display={'flex'}
          alignSelf={'center'}
        />
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          margin={'0 0 0 20px'}
        >
          <Heading fontFamily={'Lato'} margin={'30px 0'}>{product.title}</Heading>
          <Text fontFamily={'Lato'}>Price {product.price}</Text>
          <Text fontFamily={'Lato'}>Rating {product.rating.rate} | {product.rating.count}</Text>
        </Box>
      </Box>
      <Text
        padding={40}
        maxWidth={1200}
        fontFamily={'Lato'}
      >
        {product.description}
      </Text>
    </>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await fetch(`${process.env.API_URL}/products`)
  const products = await data.json()

  const paths = products.map((product: Product) => ({
    params: {
      id: product.id.toString(),
    }
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}


export async function getStaticProps({ params }: GetStaticPropsContext<{ id?: string }>): Promise<GetStaticPropsResult<IProps>> {
  const data = await fetch(`${process.env.API_URL}/products/${params?.id?.toString()}`);
  const product = await data.json();

  if (product.error) {
    return {
      props: product
    }
  }

  return {
    props: {
      id: product.id,
      product,
    },
    revalidate: 60,
  }
}

export default Product