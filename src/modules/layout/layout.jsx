import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { Link } from 'react-router-dom';

export const Layout = ({
  children
}) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};