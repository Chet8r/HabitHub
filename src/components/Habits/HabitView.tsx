import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimesCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { getDateDaysAgo, userData } from "../../demoData";
import { User, Habit, DurationType } from "../Shared/types";
import NewHabitModal from "./NewHabitModal";
import {
  Wrapper,
  ContentWrapper,
  Header,
  Table,
  Th,
  Td,
  Tr,
  HabitActions,
  ActionButtonsContainer,
  CheckMark,
  NewHabitSection,
  DeleteButton,
  TableWrapper,
} from "./styled-conponents/StyledHabitView";
import { habitHubConstants } from "./Constants";
import ScoreBar from "./Shared/ScoreBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSensitiveData } from "./Actions/actions";
import { fetchUserData } from "./Actions/userActions";
import { RootState } from "../Habits/Reducers/index";

const statusLevels = ["Failing", "Progress", "Consistency", "Habit"];
const EntryDuration: DurationType[] = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Monthly", value: 30 },
  { name: "Custom", value: 0 },
];

const HabitsTable: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const sensitiveDataHidden = useSelector(
    (state: any) => state.nav.sensitiveDataHidden
  );

  const data = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (user && user.hideSensitive !== sensitiveDataHidden)
      dispatch(toggleSensitiveData());
  }, [user]);

  const handleScoreChange = (id: number, change: number) => {
    if (!user) return;

    const updatedHabits = user.habits.map((habit: any) => {
      if (habit.id === id) {
        let newScore = habit.score + change;
        let newStatus = habit.status;

        if (newScore >= 6) {
          newScore = 0;
          const currentIndex = statusLevels.indexOf(habit.status);
          newStatus =
            statusLevels[Math.min(currentIndex + 1, statusLevels.length - 1)];
        } else if (newScore <= -6) {
          newScore = 0;
          const currentIndex = statusLevels.indexOf(habit.status);
          newStatus = statusLevels[Math.max(currentIndex - 1, 0)];
        }

        return {
          ...habit,
          score: newScore,
          status: newStatus,
          updateDate: new Date().toISOString(),
        };
      }
      return habit;
    });

    setUser({ ...user, habits: updatedHabits });
  };

  const isActionAvailable = (habit: Habit) => {
    const today = new Date();
    const updateDate = new Date(habit.updateDate);

    switch (habit.updateEntryDur.name) {
      case habitHubConstants.DAILY:
        return today.toDateString() !== updateDate.toDateString();
      case habitHubConstants.WEEKLY:
        const nextWeek = new Date(updateDate);
        nextWeek.setDate(updateDate.getDate() + 7);
        return today >= nextWeek;
      case habitHubConstants.MONTHLY:
        const nextMonth = new Date(
          updateDate.getFullYear(),
          updateDate.getMonth() + 1,
          updateDate.getDate()
        );
        return today >= nextMonth;
      case habitHubConstants.CUSTOM:
        const customDays = habit.updateEntryDur.value;
        const nextCustom = new Date(updateDate);
        nextCustom.setDate(updateDate.getDate() + customDays);
        return today >= nextCustom;

      default:
        return false;
    }
  };

  const handleSaveHabit = (
    name: string,
    status: string,
    isSensitive: boolean,
    updateDur: DurationType
  ) => {
    if (!user) return;

    const newHabit: Habit = {
      id: user.habits.length ? user.habits[user.habits.length - 1].id + 1 : 1,
      habitName: name,
      status,
      score: 0,
      updateDate: getDateDaysAgo(updateDur.value),
      sensitive: isSensitive,
      updateEntryDur: updateDur,
    };

    setUser({ ...user, habits: [...user.habits, newHabit] });
    setModalOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    setUser({ ...user, hideSensitive: sensitiveDataHidden });
  }, [sensitiveDataHidden]);

  const handleAddHabit = () => {
    setModalOpen(true);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
  };

  const handleDeleteHabit = (id: number) => {
    if (!user) return;

    const updatedHabits = user.habits.filter((habit) => habit.id !== id);
    setUser({ ...user, habits: updatedHabits });
  };

  const handleEdit = () => {
    setEditing(!isEditing);
  };

  const getData = () => {
    dispatch(fetchUserData(135));
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <div className="titleContainer">
            <h2 className="title">Habits</h2>
          </div>
        </Header>

        <TableWrapper>
          <Table>
            <thead className="thead">
              <tr className="tHeader">
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Score</Th>
                <Th>Actions</Th>
              </tr>
            </thead>

            <tbody>
              {user?.habits.map((habit) => (
                <Tr key={habit.id}>
                  <Td>
                    {user.hideSensitive && habit.sensitive
                      ? "HIDDEN"
                      : habit.habitName}
                  </Td>
                  <Td>{habit.status}</Td>
                  <Td>
                    <ScoreBar score={habit.score} />
                  </Td>
                  <Td>
                    <HabitActions>
                      {isEditing && (
                        <ActionButtonsContainer>
                          <DeleteButton
                            onClick={() => handleDeleteHabit(habit.id)}
                          >
                            Delete
                          </DeleteButton>
                        </ActionButtonsContainer>
                      )}
                      {!isEditing && (
                        <ActionButtonsContainer>
                          {isActionAvailable(habit) ? (
                            <>
                              <button
                                disabled={
                                  habit.score === -5 &&
                                  habit.status === statusLevels[0]
                                }
                                className={`action-button ${
                                  habit.score === -5 ? "highlight-red" : ""
                                }`}
                                onClick={() => handleScoreChange(habit.id, -1)}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                              <button
                                className={`action-button ${
                                  habit.score === 5 ? "highlight-green" : ""
                                }`}
                                onClick={() => handleScoreChange(habit.id, 1)}
                                disabled={
                                  habit.score === 5 &&
                                  habit.status === statusLevels[3]
                                }
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </>
                          ) : (
                            <CheckMark>
                              <FontAwesomeIcon icon={faCheck} />
                            </CheckMark>
                          )}
                        </ActionButtonsContainer>
                      )}
                    </HabitActions>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <NewHabitSection>
          <button type="button" onClick={handleAddHabit}>
            Add Habit
          </button>

          <button className="editBtn" type="button" onClick={handleEdit}>
            {isEditing ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faEdit} />
            )}
          </button>
          <button className="RestBtn" type="button" onClick={getData}>
            Reset
          </button>
        </NewHabitSection>
      </ContentWrapper>

      <NewHabitModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveHabit}
        statusLevels={statusLevels}
        EntryDuration={EntryDuration}
      />
    </Wrapper>
  );
};

export default HabitsTable;
