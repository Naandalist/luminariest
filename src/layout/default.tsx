import React from "react";
import App from "../App";
import { Header, Footer } from "../components";

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <App>
      <div className="relative">
        <div
          className={`navbar-sticky main-container text-black dark:text-white-dark min-h-screen`}
        >
          <div className="main-content flex flex-col min-h-screen">
            <Header />

            <React.Suspense>
              <div className={`animate__fadeIn p-6 animate__animated`}>
                {children}
              </div>
            </React.Suspense>

            <Footer />
          </div>
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;
