import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdminPage = ["/dashboard"];
const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: Array<String>
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    //
    //
    //
    // JIKA INGIN KE HALAMAN YANG PERLU AUTH
    //
    if (requireAuth.includes(pathname)) {
      //
      //
      //
      // AMBIL TOKENNYA
      //
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      //
      //
      //
      // JIKA TOKEN BERNILAI NULL DAN PENGGUNA TIDAK ADA DI HALAMAN LOGIN ATAU REGISTER
      //
      if (!token && !authPage.includes(pathname)) {
        //
        //
        //
        //  MAKA BUAT URL SEKALIAN DENGAN PARAMS NYA UNTUK KEMBALI KE HALAMAN YANG INGIN DITUJU JIKA SUDAH LOGIN, LALU TENDANG PENGGUNA KE HALAMAN LOGIN
        //
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      //
      //
      //
      // JIKA TOKEN ADA
      //
      if (token) {
        //
        //
        //
        // DAN PENGGUNA MAU KE HALAMAN LOGIN ATAU REGISTER MAKA TOLAK
        //
        if (authPage.includes(pathname)) {
          //
          //
          //
          // JIKA DIA ADMIN, MAKA TENDANG KE HALAMAN DASHBOARD
          //
          if (token.role === "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
          //
          //
          //
          // JIKA DIA BUKAN ADMIN, MAKA TENDANG KE HALAMAN ROOT
          //
          else {
            return NextResponse.redirect(new URL("/", req.url));
          }
        }
        //
        //
        //
        // JIKA DIA BUKAN ADMIN, DAN DIA INGIN KE HALAMAN KHUSUS ADMIN, MAKA TOLAK
        //
        if (token.role !== "admin" && onlyAdminPage.includes(pathname)) {
          //
          //
          //
          // TENDANG KE HALAMAN ROOT
          //
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    //
    //
    //
    // JIKA TIDAK YASUDAH, LANJUTKAN KE MIDDLEWARE
    //
    return middleware(req, next);
  };
}
