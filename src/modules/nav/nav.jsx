import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import style from './nav.module.scss';

export const Navigation = () => {
  return (
    <div className={style.nav}>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand href="/"><div className={style.logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipe-form">Submit recipe</Nav.Link>
          </Nav>
          {/*
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          */}
        </Navbar.Collapse>
      </Navbar>

      <div className={style.user}>
      </div>
    </div>
  );
};