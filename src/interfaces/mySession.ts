export interface MySession {
  data: {
    accessToken?: string;
    expires?: string;
    user?: {
      email?: string;
      fullname?: string;
      name?: string;
      image?: string;
      role?: string;
    };
  } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}
