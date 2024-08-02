import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  FriendButton,
  ToggleButton,
} from "../Habits/styled-conponents/StyledHabitView";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../User/AuthContext"; // Make sure to import the useAuth hook

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
  display: flex;
  gap: 10px;
`;

const DropdownContainer = styled.div``;

const DropdownButton = styled(ToggleButton)`
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  margin-top: 6px;
  padding: 2px;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

function Nav() {
  const dispatch = useDispatch();
  const sensitiveDataHidden = useSelector(
    (state: any) => state.nav.sensitiveDataHidden
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const handleSignOut = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

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
          <FriendButton
            className="friendContainer"
            onClick={() => dispatch(toggleFriendActivity())}
          >
            <div className="friendBtn">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
          </FriendButton>
          <DropdownContainer>
            <DropdownButton onClick={handleToggleDropdown}>
              Account
            </DropdownButton>
            {dropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
                <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        </NavItem>
      </NavLinks>
    </Wrapper>
  );
}

export default Nav;
