const { NavbarBrand } = `require("react-bootstrap")`;

function NavLink({ children, ...props }) {
  return (
    <ReactRouterDOM.NavLink className="nav-link" activeClassName="bb-active" {...props}>
      {children}
    </ReactRouterDOM.NavLink>
  );
}

function NavBar() {
  const currentUser = useCurrentUser();
  const { Container, Nav, Navbar } = ReactBootstrap;
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
      
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
            <Nav className="me-auto">
            <NavLink to="/" exact>
              {currentUser ? null : "Home"}
            </NavLink>
            <NavLink to="/CreateAccount/" title="Create an Account">
              {currentUser ? null : "Create Account"}
            </NavLink>
            <NavLink to="/login/" title="Login to an account">
              {currentUser ? `Log Out` : "Login"}
            </NavLink>
            {currentUser && (
              <>
                <NavLink to="/deposit/" title="Make a Deposit">
                  Deposit
                </NavLink>
                <NavLink to="/withdraw/" title="Make a Withdrawal">
                  Withdraw
                </NavLink>
                <NavLink to="/balance" title="Check Account Balance">
                  Balance
                </NavLink>
                <NavLink to="/alldata" title="Review All Data">
              All Data
            </NavLink>
            <Navbar.Brand className= "welcome">Welcome, {currentUser.name}!</Navbar.Brand>


              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}