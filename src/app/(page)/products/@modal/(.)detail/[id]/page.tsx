// import Modal from "@/app/components/fragments/Modal";
import { getData } from "@/services/getData";
import { DataType } from "@/types/datatype";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Modal = dynamic(() => import("@/app/components/fragments/Modal"));

const DetailProductPage = async (props: any) => {
  const params = await props.params;
  const { data }: { data: DataType } = await getData(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?id=${params.id}`
  );

  return (
    <>
      <Modal>
        <div>
          <Image
            width={592}
            height={592}
            src={data.image}
            alt={data.name}
            className="w-full object-cover aspect-square col-span-2"
          />
          <div className="mt-3 text-lg">{data.name}</div>
          <div className="font-bold">{toIndonesiaCurrency(data.price)}</div>
        </div>
      </Modal>
    </>
  );
};

export default DetailProductPage;
