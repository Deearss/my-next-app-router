import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  // LANJUT AJA
  return NextResponse.next();
}

// WAJIBKAN AUTHENTIKASI DI PATHNAME BERIKUT
export default withAuth(mainMiddleware, [
  "/dashboard",
  "/settings",
  "/login",
  "/register",
]);
