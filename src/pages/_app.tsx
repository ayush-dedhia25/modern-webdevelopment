import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
