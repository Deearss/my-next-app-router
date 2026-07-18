import { getData } from "@/services/getData";
import { DataType } from "@/types/datatype";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
import Image from "next/image";
import React from "react";

const DetailProductPage = async (props: any) => {
  const params = await props.params;
  const { data }: { data: DataType } = await getData(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?id=${params.id}`
  );

  return (
    <>
      <div className="container mx-auto my-10 p-6 bg-white rounded-lg">
        <div className={`flexcc`}>
          <div className={`size-[40rem]`}>
            <Image
              width={592}
              height={592}
              src={data.image}
              alt={data.name}
              className="w-full object-cover aspect-square col-span-2"
            />
          </div>
          <div className="font-bold text-4xl">{data.name}</div>
          <div className="mt-3 font-bold text-xl">
            {toIndonesiaCurrency(data.price)}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
