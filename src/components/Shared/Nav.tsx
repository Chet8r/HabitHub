import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px; /* Adjust height as needed */
  background-color: #f0f8f7; /* Light greenish-white background */
  padding: 0 20px; /* Horizontal padding */
  overflow: hidden;
`;

const Logo = styled.div`
  width: 100px; /* Adjust width as needed */
  height: auto; /* Ensure logo scales appropriately */
  font-size: small;
`;

const NavLinks = styled.ul`
  list-style-type: none; /* Remove default list styles */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-left: 20px; /* Adjust spacing between items */
`;

const StyledLink = styled.a`
  color: #163020; /* Dark greenish color */
  text-decoration: none;
  padding: 20px 16px; //Padding inside each link
  transition: background-color 0.3s; /* Smooth background color transition */

  &:hover {
    border-radius: 5%;
    background-color: #becdbe; /* Light gray background on hover */
  }
`;

const AccountLink = styled(StyledLink)`
  font-weight: bold; /* Bold font weight for emphasis */
`;

function Nav() {
  return (
    <Wrapper>
      <Logo>
        <h1>HabitHub</h1>
      </Logo>
      <NavLinks>
        {/* <NavItem><StyledLink href="lessons.asp">Lessons</StyledLink></NavItem>
                <NavItem><StyledLink href="banking.asp">Banking</StyledLink></NavItem>
                <NavItem><StyledLink href="socialhub.asp">Social Hub</StyledLink></NavItem>
                <NavItem><StyledLink href="friends.asp">Friends</StyledLink></NavItem>
                <NavItem><StyledLink href="products.asp">Store</StyledLink></NavItem> */}
        <NavItem>
          <AccountLink href="#">Account</AccountLink>
        </NavItem>
      </NavLinks>
    </Wrapper>
  );
}

export default Nav;
