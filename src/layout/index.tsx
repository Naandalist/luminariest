import React, { PropsWithChildren, Suspense } from "react";
import App from "../App";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/Footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <App>
      <div className="relative">
        <div
          className={`navbar-sticky main-container text-black dark:text-white-dark min-h-screen`}
        >
          <div className="main-content flex flex-col min-h-screen">
            <Header />

            <Suspense>
              <div className={`animate__fadeIn p-6 animate__animated`}>
                {children}
              </div>
            </Suspense>

            <Footer />
          </div>
        </div>
      </div>
    </App>
  );
};

export default Layout;
