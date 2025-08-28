import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryProvider } from "@/providers/react-query";
import { ThemeProvider } from "@/providers/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
