import React, { Fragment } from 'react';
import { Header, Footer } from '../header_footer';

const Layout = props => (
  <Fragment>
    <Header />
    {props.children}
    <Footer />
  </Fragment>
);

export default Layout;