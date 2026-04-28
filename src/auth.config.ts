import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (pathname === "/admin/login") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", request.url));
        }
        return true;
      }

      return isLoggedIn;
    },
  },
  providers: [],
};
