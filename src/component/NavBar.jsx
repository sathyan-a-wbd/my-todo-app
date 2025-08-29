import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FcTodoList } from "react-icons/fc";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CiSearch } from "react-icons/ci";
function NavBar() {
  let navStyle = {
    background: "#2f252a",
  };
  return (
    <>
      <Navbar style={navStyle} className="nav" data-bs-theme="dark">
        <Container>
          <FcTodoList size={35} style={{ margin: "5px" }} />
          <Navbar.Brand href="#home">Todo</Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
