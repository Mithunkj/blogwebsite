import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="container-fluid bg-light sticky-top">
        <div className="container">
          {["sm"].map((expand) => (
            <Navbar
              key={expand}
              expand={expand}
              className="bg-body-tertiary mb-3"
            >
              <Container fluid>
                <Navbar.Brand href="#">M-blog</Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      M-blog
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      {token ? (
                        <>
                          <Nav.Link href="/">Home</Nav.Link>
                          <Nav.Link href="/post">Create post</Nav.Link>

                          <Nav.Link
                            href="/login"
                            onClick={() => {
                              localStorage.clear();
                            }}
                            className="navItem"
                          >
                            Log Out
                          </Nav.Link>
                        </>
                      ) : (
                        <>
                          <Nav.Link href="/login">Login</Nav.Link>
                          <Nav.Link href="/signup">SingUp</Nav.Link>
                        </>
                      )}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
