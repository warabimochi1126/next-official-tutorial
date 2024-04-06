import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        // リクエストが完了するより先に呼び出される.ページにアクセスすることが許可
        authorized({ auth, request: { nextUrl } }) {
            console.log("---");
            console.log(auth);
            console.log("---");
            console.log(nextUrl);
            console.log("---");
            console.log(auth?.user);
            console.log("---");
            console.log(!!auth?.user);
            console.log("---");
            console.log(new URL("/dashboard", nextUrl.origin));
            console.log("---");
            
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

          if (isOnDashboard) {
            if (isLoggedIn) return true;    // /dashboard かつ 認証済みなら true
            return false;                   // /dashboard かつ 認証していないなら false
          } else if (isLoggedIn) {          
            return Response.redirect(new URL('/dashboard', nextUrl)); // /dashboard ではない かつ 認証している /dashboard に リダイレクト？
          }
          return true;  // /dashboardではない かつ 認証していないなら true
        },
      },
      providers: [], // Add providers with an empty array for now
    } satisfies NextAuthConfig;
    