import HabitView from "./HabitView";
import FriendActivity from "./Shared/FriendActivity";
import { useSelector } from "react-redux";
import {
  HabitContentWrapper,
  HabitFriendWrapper,
  HabitRouteWrapper,
} from "./styled-conponents/StyledHabitView";

function Habit() {
  const friendActivityVisible = useSelector(
    (state: any) => state.nav.friendActivityVisible
  );
  return (
    <HabitRouteWrapper>
      <HabitContentWrapper>
        <HabitView />
      </HabitContentWrapper>
      {friendActivityVisible && (
        <HabitFriendWrapper>
          <FriendActivity />
        </HabitFriendWrapper>
      )}
    </HabitRouteWrapper>
  );
}

export default Habit;
