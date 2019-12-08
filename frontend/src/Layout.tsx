import React from "react";
import Header from "./components/content/header/header";
import BackToTop from "./components/content/Layout/BackToTop";
import GoBack from "./components/content/Layout/GoBack";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div id="layout-root">
        <GoBack />
        <Header />
        <main className="after-layout">{children}</main>
        <BackToTop />
      </div>
    </>
  );
};

export default Layout;
