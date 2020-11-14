import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBar } from './search-bar';
import { Header } from './header';
import { Footer } from './footer';

import style from './layout.module.scss';

export const Layout = ({
  children
}) => {
  return (
    <>
      <Header></Header>
        <div className={style.layout}>
          <Container>
            <SearchBar />
            {children}
          </Container>
        </div>
      <Footer></Footer>
    </>
  );
};