import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '85vh' }}>
                {/* <h1>Layout</h1> */}
                {props.children}

            </main>
            <Footer />
        </div>
    )

}

export default Layout;