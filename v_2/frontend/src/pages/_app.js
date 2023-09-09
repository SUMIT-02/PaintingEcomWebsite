import store from "@/app/store";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NOSSRWrapper from "@/NOSSRWrapper";
import PageWrapper from "@/PageWrapper";
// Inside the page you want to disable SSR.

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <NOSSRWrapper>
          <Component {...pageProps} />
          <ToastContainer autoClose={5000} />
        </NOSSRWrapper>
      </PageWrapper>
    </Provider>
  );
}
