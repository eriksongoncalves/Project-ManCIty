import React, { Fragment } from 'react';
import { Header, Footer } from '../Components/Header_footer';

const Layout = props => (
  <Fragment>
    <Header />
    {props.children}
    <Footer />
  </Fragment>
);

export default Layout;