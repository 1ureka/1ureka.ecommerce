import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "1ureka's ecommerce",
  description: "A demo of an ecommerce website built with Next.js.",
};

import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { theme } from "@/lib/theme";
import { ViewTransitions } from "next-view-transitions";
import "../style/globals.css";
import "../style/page-transition.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <InitColorSchemeScript />
          <AppRouterCacheProvider>
            <CssVarsProvider theme={theme}>
              <CssBaseline />
              {children}
            </CssVarsProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
