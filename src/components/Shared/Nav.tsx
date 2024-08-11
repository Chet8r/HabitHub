import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserFriends,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../User/AuthContext";
import {
  toggleSensitiveData,
  toggleFriendActivity,
} from "../Habits/Actions/actions";
import {
  ToggleButton,
  FriendButton,
} from "../Habits/styled-conponents/StyledHabitView";

const lightTheme = {
  background: "#ffffff",
  color: "#333",
  navBackground: "#ffffff",
  tabBackground: "#333",
  tabColor: "#fff",
  tabHoverBackground: "#000000",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    transition: background-color 0.3s, color 0.3s;
  }
`;

const MainWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.navBackground};
  padding: 0px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const Logo = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: ${(props) => props.theme.color};
  flex: 1;

  @media (max-width: 550px) {
    font-size: 1em;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: 550px) {
    display: none;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  color: ${(props) => props.theme.tabColor};
  padding: 5px 0;
  overflow-x: auto;
  white-space: nowrap;
  gap: 10px;
`;

const Tab = styled.div<{ $active: boolean }>`
  cursor: pointer;
  padding: 6px 12px;
  font-size: 0.9em;
  font-weight: bold;
  color: ${(props) => (props.$active ? "#ffffff" : props.theme.tabColor)};
  background-color: ${(props) => (props.$active ? "#000000" : "lightgrey")};
  border-radius: 3px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.tabHoverBackground};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(ToggleButton)`
  cursor: pointer;
  height: 30px;
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 6px 12px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HamburgerButton = styled.button`
  width: 30px;
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => props.theme.color};

  @media (max-width: 550px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  position: static;
  align-items: center;
  background-color: ${(props) => props.theme.navBackground};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  z-index: 1000;
  width: 100px;

  ${DropdownItem} {
    padding: 10px;
  }

  @media (min-width: 550px) {
    display: none;
  }
`;

function Nav() {
  const dispatch = useDispatch();
  const sensitiveDataHidden = useSelector(
    (state: any) => state.nav.sensitiveDataHidden
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const currentPath = location.pathname;

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

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <MainWrapper>
        <Wrapper>
          <TopRow>
            <Logo>HabitHub</Logo>
            <TabsContainer>
              {currentPath !== "/profile" && (
                <Tabs>
                  <Tab
                    $active={currentPath === "/"}
                    onClick={() => navigate("/")}
                  >
                    Habit
                  </Tab>
                  <Tab
                    $active={currentPath === "/timebox"}
                    onClick={() => navigate("/timebox")}
                  >
                    Timebox
                  </Tab>
                </Tabs>
              )}
            </TabsContainer>
            <NavItems>
              {currentPath === "/" && (
                <>
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
                </>
              )}
              <DropdownContainer>
                <DropdownButton onClick={handleToggleDropdown}>
                  Account
                </DropdownButton>
                {dropdownOpen && (
                  <DropdownMenu>
                    <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
                    <DropdownItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownContainer>
            </NavItems>
            <HamburgerButton onClick={handleToggleMobileMenu}>
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
            </HamburgerButton>
          </TopRow>
          {mobileMenuOpen && (
            <MobileMenu>
              <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
              <DropdownItem
                onClick={() => {
                  dispatch(toggleSensitiveData());
                  setMobileMenuOpen(false);
                }}
              >
                <div className="eyeBtn">
                  {sensitiveDataHidden ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  dispatch(toggleFriendActivity());
                  setMobileMenuOpen(false);
                }}
              >
                <div className="friendBtn">
                  <FontAwesomeIcon icon={faUserFriends} />
                </div>
              </DropdownItem>
              <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
            </MobileMenu>
          )}
        </Wrapper>
      </MainWrapper>
    </ThemeProvider>
  );
}

export default Nav;
