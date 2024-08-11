// Tabs.tsx
import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import HabitView from "./Habits/HabitView";
import { useSelector } from "react-redux";
import TimeboxDaily from "./TimeBox/Timebox";
import { HabitFriendWrapper } from "./Habits/styled-conponents/StyledHabitView";
import FriendActivity from "./Habits/Shared/FriendActivity";
import { NavLink } from "react-router-dom";

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TabList = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

const Tab = styled(NavLink)`
  text-decoration: none;
  color: #888;
  font-weight: normal;
  padding: 10px 20px;
  border-radius: 5px 5px 0 0;
  background-color: transparent;
  transition: all 0.3s;

  &.active {
    color: #333;
    font-weight: bold;
    background-color: #f0f8f7;
  }

  &:hover {
    background-color: #f0f8f7;
    color: #333;
  }
`;

const TabContent = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #ffffff;
`;

const Tabs: React.FC = () => {
  const friendActivityVisible = useSelector(
    (state: any) => state.nav.friendActivityVisible
  );

  return (
    <TabsWrapper>
      <TabList>
        <Tab to="/habits" end>
          Habits
        </Tab>
        <Tab to="/timebox">Timebox</Tab>
      </TabList>
      <TabContent>
        <Routes>
          <Route path="/habits" element={<HabitView />} />
          <Route path="/timebox" element={<TimeboxDaily />} />
        </Routes>
      </TabContent>
      {friendActivityVisible && (
        <HabitFriendWrapper>
          <FriendActivity />
        </HabitFriendWrapper>
      )}
    </TabsWrapper>
  );
};

export default Tabs;
