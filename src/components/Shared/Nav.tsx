import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ToggleButton } from "../Habits/styled-conponents/StyledHabitView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import {
  toggleSensitiveData,
  toggleFriendActivity,
} from "../Habits/Actions/actions";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px; /* Adjust height as needed */
  background-color: #f0f8f7; /* Light greenish-white background */
  padding: 0 20px; /* Horizontal padding */
  overflow: hidden;

  .friendContainer {
    margin: 0px 10px 0px 10px;
  }
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

// const StyledLink = styled.a`
//   color: #163020; /* Dark greenish color */
//   text-decoration: none;
//   padding: 20px 16px; //Padding inside each link
//   transition: background-color 0.3s; /* Smooth background color transition */

//   &:hover {
//     border-radius: 5%;
//     background-color: #becdbe; /* Light gray background on hover */
//   }
// `;

// const AccountLink = styled(StyledLink)`
//   font-weight: bold; /* Bold font weight for emphasis */
// `;

function Nav() {
  const dispatch = useDispatch();
  const sensitiveDataHidden = useSelector(
    (state: any) => state.sensitiveDataHidden
  );

  return (
    <Wrapper>
      <Logo>
        <h1>HabitHub</h1>
      </Logo>
      <NavLinks>
        <NavItem>
          <ToggleButton
            className="eyeContainer"
            onClick={() => dispatch(toggleSensitiveData())}
          >
            <div className="eyeBtn">
              {sensitiveDataHidden ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </ToggleButton>
          <ToggleButton
            className="friendContainer"
            onClick={() => dispatch(toggleFriendActivity())}
          >
            <div className="friendBtn">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
          </ToggleButton>
          <ToggleButton>Account</ToggleButton>
        </NavItem>
      </NavLinks>
    </Wrapper>
  );
}

export default Nav;
