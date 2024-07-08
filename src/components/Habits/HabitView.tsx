import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimesCircle,
  faEdit,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { userData } from "../../demoData";
import { User, Habit } from "../Shared/types";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import NewHabitModal from "./NewHabitModal";
import {
  ContentWrapper,
  DeleteButton,
  HabitActions,
  Header,
  NewHabitSection,
  Table,
  Td,
  Th,
  ToggleButton,
  Tr,
  Wrapper,
  CheckMark,
  ActionButtonsContainer, // Import the ActionButtonsContainer styled component
} from "./styled-conponents/StyledHabitView";

const statusLevels = ["Initiation", "Progress", "Consistency", "Habit"];
const EntryDuration = ["Daily", "Weekly", "Monthly"];

const HabitsTable: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [hideSensitive, setHideSensitive] = useState(false);

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

    if (user) setHideSensitive(user?.hideSensitive);
  }, [user]);

  const handleScoreChange = (id: number, change: number) => {
    if (!user) return;

    const updatedHabits = user.habits.map((habit) => {
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

    switch (habit.updateEntryDur) {
      case "Daily":
        return today.toDateString() !== updateDate.toDateString();
      case "Weekly":
        const nextWeek = new Date(updateDate);
        nextWeek.setDate(updateDate.getDate() + 7);
        return today >= nextWeek;
      case "Monthly":
        const nextMonth = new Date(
          updateDate.getFullYear(),
          updateDate.getMonth() + 1,
          updateDate.getDate()
        );
        return today >= nextMonth;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (!user) return;
    setUser({ ...user, hideSensitive: hideSensitive });
  }, [hideSensitive]);

  const handleAddHabit = () => {
    setModalOpen(true);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
  };

  const handleSaveHabit = (
    name: string,
    status: string,
    isSensitive: boolean,
    updateDur: string
  ) => {
    if (!user) return;

    const newHabit: Habit = {
      id: user.habits.length ? user.habits[user.habits.length - 1].id + 1 : 1,
      habitName: name,
      status,
      score: 0,
      updateDate: new Date().toISOString(),
      sensitive: isSensitive,
      updateEntryDur: updateDur,
    };

    setUser({ ...user, habits: [...user.habits, newHabit] });
    setModalOpen(false);
  };

  const handleDeleteHabit = (id: number) => {
    if (!user) return;

    const updatedHabits = user.habits.filter((habit) => habit.id !== id);
    setUser({ ...user, habits: updatedHabits });
  };

  const handleEdit = () => {
    setEditing(!isEditing);
  };

  const toggleSensitiveData = () => {
    setHideSensitive(!hideSensitive);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <div className="titleContainer">
            <h1 className="title">Habits</h1>
          </div>
          <ToggleButton className="eyeContainer " onClick={toggleSensitiveData}>
            <div className="eyeBtn">
              {hideSensitive ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </ToggleButton>
        </Header>

        <Table>
          <thead>
            <tr>
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
                  {hideSensitive && habit.sensitive
                    ? "HIDDEN"
                    : habit.habitName}
                </Td>
                <Td>{habit.status}</Td>
                <Td>{habit.score}</Td>
                <Td>
                  <HabitActions>
                    {isEditing && (
                      <DeleteButton onClick={() => handleDeleteHabit(habit.id)}>
                        Delete
                      </DeleteButton>
                    )}
                    {!isEditing && (
                      <ActionButtonsContainer>
                        {isActionAvailable(habit) ? (
                          <>
                            <button
                              disabled={
                                habit.score === -4 &&
                                habit.status === statusLevels[0]
                              }
                              className="action-button"
                              onClick={() => handleScoreChange(habit.id, -1)}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                            <button
                              className="action-button"
                              onClick={() => handleScoreChange(habit.id, 1)}
                              disabled={
                                habit.score === 4 &&
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

        <NewHabitSection>
          <button type="button" onClick={handleAddHabit}>
            New Habit
          </button>
          <button className="editBtn" type="button" onClick={handleEdit}>
            {isEditing ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faEdit} />
            )}
          </button>
          <button
            className="editBtn"
            type="button"
            onClick={handleDeleteAccount}
          >
            Delete Account
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
