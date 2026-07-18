"use client";

import { DataType } from "@/types/datatype";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import SkeletonCard from "../SkeletonCard";
import { useParams } from "next/navigation";
import { getData } from "@/services/getData";

const ProductsPage = () => {
  const [products, setProducts] = useState<Array<DataType> | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>("");

  const params: { category: Array<string> } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getData(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => {
        if (res.status === 200) setProducts(res.data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) throw new Error(error);

  return (
    <>
      <Head>
        <title>Products Page</title>
      </Head>

      {/*  */}
      {/*  */}
      {/*  */}
      {/* ================================================================== */}
      {/* ====================== START TITLE PRODUCTS ====================== */}
      {/* ================================================================== */}

      <h1 className="font-bold text-3xl mt-10 mb-5">Products</h1>

      {/* ================================================================== */}
      {/* ======================= END TITLE PRODUCTS ======================= */}
      {/* ================================================================== */}
      {/*  */}
      {/*  */}
      {/*  */}

      <div className="container grid md:grid-cols-2 w-[95%] xl:grid-cols-3 overflow-y-auto overflow-x-hidden h-[70vh] scrollbar-custom">
        {!isLoading && products.length > 0
          ? products?.map((value, index) => (
              <Fragment key={`product-${index}`}>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* ================================================================== */}
                {/* ====================== START PRODUCT CARD ====================== */}
                {/* ================================================================== */}

                <ProductCard
                  className="animate-squish"
                  value={value}
                  index={index}
                />

                {/* ================================================================== */}
                {/* ======================= END PRODUCT CARD ======================= */}
                {/* ================================================================== */}
                {/*  */}
                {/*  */}
                {/*  */}
              </Fragment>
            ))
          : // SKELETONNYA
            [1, 2, 3, 4, 5].map((value, index) => (
              <Fragment key={`skeleton-${index}`}>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* ================================================================== */}
                {/* ====================== START SKELETON CARD ====================== */}
                {/* ================================================================== */}

                <SkeletonCard />

                {/* ================================================================== */}
                {/* ======================= END SKELETON CARD ======================= */}
                {/* ================================================================== */}
                {/*  */}
                {/*  */}
                {/*  */}
              </Fragment>
            ))}
      </div>

      {params.category && (
        <div className="mt-5">category : {params.category.join(", ")}</div>
      )}
    </>
  );
};

export default ProductsPage;
