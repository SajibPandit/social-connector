import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Refer from "../../pages/Refer/Refer";
import UserContext from "../../contexts/UserContext";

function Header() {
  const [referModalShow, setReferModalShow] = useState(false);
  const handleReferClose = () => setReferModalShow(false);
  const handleReferShow = () => setReferModalShow(true);

  const { user, setUserData } = useContext(UserContext);

  const handleLogout = () => {
    setUserData(null);
  };

  // Create a reference for the Navbar.Toggle component
  const toggleRef = useRef();

  // Function to collapse the navbar when a link is clicked
  const collapseNavbar = () => {
    // Check if the navigation is expanded
    if (toggleRef.current) {
      toggleRef.current.classList.remove("show");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ height: "10vh" }}
      id="site-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          XOXO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={toggleRef} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/posts">
              All Posts
            </Nav.Link>
            {!user?.id ? (
              <>
                <Nav.Link activeClassName="nav-active" as={Link} to="/login">
                  Sign In
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  // className="d-flex justify-content-center align-items-center"
                  title="Collect Your Social Asset"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/posts"
                    onClick={collapseNavbar}
                  >
                    Find Job
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/posts?data=finished">
                    Finished Task
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/posts?data=pendingReview">
                    Pending Review
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/offers">
                    Offers
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/referals">
                    Referals
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/wallet" onClick={collapseNavbar}>
                  Wallet
                </Nav.Link>

                <Nav.Link as={Link} to="/create-post">
                  Post a Task
                </Nav.Link>
                <Nav.Link as={Link} to="/posts">
                  All Posts
                </Nav.Link>

                <Nav.Link as={Link} onClick={handleReferShow}>
                  Refer
                </Nav.Link>

                <NavDropdown
                  // className="d-flex justify-content-center align-items-center"
                  title={`${user?.name}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile-settings">
                    Profile Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/perfromance">
                    My Perfromance
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/referals">
                    Referals Details
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <Refer
          referModalShow={referModalShow}
          handleReferClose={handleReferClose}
        />
      </Container>
    </Navbar>
  );
}

export default Header;
