import * as React from "react";
import "./globals.css";
import "./globalsChart.css";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import { Providers } from "./Provider";
import localFont from "next/font/local";
import ReduxProvider from "@/reduxStore/Provider";
import SpinnerPortal from "@/components/cui/loader/SpinnerPortal";

import ThemeProvider from "@/utils/theme/themeProvider";
import Head from "next/head";
import { getCookie } from "@/action/cookieAction";
import ReactToasterProvider from "@/lib/ReactToasterProvider";
// import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: "../../public/fonts/AvenirLTProLight.otf" });
export const metadata = {
  title: "MY PCP",
  description: "MY PCP",
};

export default function RootLayout({ children }) {
  const theme = getCookie("mytheme", true) ?? "system";

  return (
    <html lang="en">
      <body className={myFont.className}>
        <ThemeProvider
          // defaultTheme={typeof theme === "string" ? theme : "system"}
          defaultTheme={theme}
        >
          {/* <RouteLoader /> */}

          <Providers>
            <Provider>
              <ReduxProvider>
                <ReactToasterProvider />
                <div id="modal-root">
                  {" "}
                  {/* simple modal */}
                  <div id="spinner-root"></div> {/* Add Spinner Root */}
                </div>
                {children}
                <SpinnerPortal /> {/* Add Spinner Portal */}
              </ReduxProvider>
            </Provider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
