// import { DataType } from "@/types/datatype";

import { retrieveData, retrieveDataById } from "@/libs/firebase/service";
import { NextRequest, NextResponse } from "next/server";

// FAKE PRODUCTS
// const data: Array<{
//   id: string;
//   category: string;
//   image?: string;
//   name: string;
//   price: number;
// }> = [
//   {
//     id: "1cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus",
//     price: 12_000_000,
//   },
//   {
//     id: "2cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer",
//     price: 15_000_000,
//   },
//   {
//     id: "3cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus 2",
//     price: 12_000_000,
//   },
//   {
//     id: "4cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer 2",
//     price: 15_000_000,
//   },
//   {
//     id: "5cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus 3",
//     price: 12_000_000,
//   },
//   {
//     id: "6cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer 3",
//     price: 15_000_000,
//   },
//   {
//     id: "7cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus 4",
//     price: 12_000_000,
//   },
//   {
//     id: "8cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer 4",
//     price: 15_000_000,
//   },
//   {
//     id: "9cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus 5",
//     price: 12_000_000,
//   },
//   {
//     id: "10cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer 5",
//     price: 15_000_000,
//   },
//   {
//     id: "11cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Asus 6",
//     price: 12_000_000,
//   },
//   {
//     id: "12cuwiwaw",
//     category: "Elektronik",
//     image:
//       "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laptop Acer 6",
//     price: 15_000_000,
//   },
// ];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // const product = data.find((item) => item.id === id);
    const product = await retrieveDataById("products", id);

    if (product) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: product,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Failed",
        errors: ["Data not found"],
      });
    }
  }

  const products = await retrieveData("products");

  return NextResponse.json({ status: 200, message: "Success", data: products });
}
