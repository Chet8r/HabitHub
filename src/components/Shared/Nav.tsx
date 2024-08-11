import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserFriends,
  faBars,
  faTimes,
  faUserCircle,
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

interface DropdownMenuProps {
  $open: boolean;
}

const lightTheme = {
  background: "#ffffff",
  color: "#333",
  navBackground: "#ffffff",
  tabBackground: "#333",
  tabColor: "#fff",
  tabHoverBackground: "orange",
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
  background-color: ${(props) => (props.$active ? "darkorange" : "black")};
  border-radius: 3px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.tabHoverBackground};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  cursor: pointer;
  height: 36px;
  width: 36px;
  background: none;
  border: none;
  font-size: 1.8em;
  color: ${(props) => props.theme.color};
  transition: color 0.3s ease;

  &:hover {
    color: darkorange; /* Highlight color */
  }
`;

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
  min-width: 180px;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${(props) =>
    props.$open &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.color};
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1em;

  &:hover {
    background-color: darkorange;
    color: #fff; /* Make text white on hover for better contrast */
  }
`;

const HamburgerButton = styled.button<{ $menuOpen: boolean }>`
  width: 30px;
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.$menuOpen ? "#ffffff" : props.theme.color)};
  z-index: 1100; /* Ensure button is above the menu */

  @media (max-width: 550px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.$open ? "0" : "-100%")}; /* Slide in from right */
  width: 70%;
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease-in-out; /* Smooth slide-in effect */

  ${DropdownItem} {
    margin: 5px;
    display: flex;
    justify-content: center;
    padding: 20px;
    color: #dbdbdb;
    font-size: 1.2em;
    width: 100%;
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentPath = location.pathname;

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    handleToggleMobileMenu();
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <MainWrapper ref={mobileMenuRef}>
        <Wrapper>
          <TopRow>
            <Logo>HabitHub</Logo>
            <TabsContainer>
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
            </TabsContainer>
            <NavItems>
              {currentPath === "/" && (
                <>
                  <ToggleButton
                    className="eyeContainer"
                    onClick={() => dispatch(toggleSensitiveData())}
                  >
                    <div className="eyeBtn">
                      <FontAwesomeIcon
                        icon={sensitiveDataHidden ? faEyeSlash : faEye}
                      />
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
                  <FontAwesomeIcon icon={faUserCircle} />
                </DropdownButton>
                {dropdownOpen && (
                  <DropdownMenu $open={dropdownOpen}>
                    <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
                    <DropdownItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownContainer>
            </NavItems>
            <HamburgerButton
              $menuOpen={mobileMenuOpen}
              onClick={handleToggleMobileMenu}
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
            </HamburgerButton>
          </TopRow>
          <MobileMenu $open={mobileMenuOpen}>
            <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
            <DropdownItem
              onClick={() => {
                dispatch(toggleSensitiveData());
                setMobileMenuOpen(false);
              }}
            >
              <div className="eyeBtn">
                <FontAwesomeIcon
                  icon={sensitiveDataHidden ? faEyeSlash : faEye}
                />
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
        </Wrapper>
      </MainWrapper>
    </ThemeProvider>
  );
}

export default Nav;
