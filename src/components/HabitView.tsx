import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimesCircle,
  faEdit,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { userData } from "../demoData";
import { User, Habit } from "./types";
import HabitModal from "./HabitModal";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

const statusLevels = ["Struggle", "Kickstart", "Momentum", "Habit"];
const EntryDuration = ["Daily", "Weekly", "Monthly"];

const Wrapper = styled.section`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: "Roboto", sans-serif;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// const TitleContainer = styled.div`
//   flex: 1; /* Take as much space as possible */
// `;

// const Title = styled.h1`
//   margin: 0;
// `;

// const EyeIcon = styled.div`
//   font-size: 1.2em;
// `;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background-color: #163020;
  color: #fff;
  font-weight: 500;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const HabitActions = styled.td`
  .action-button {
    width: 40px;
    background-color: #d8d8d8;
    border: none;
    color: #3c4043;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 4px;
    margin-right: 4px;
    font-family: "Roboto", sans-serif;
  }

  .action-button:hover {
    background-color: #e7e7e7;
  }
`;

const NewHabitSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin-left: 10px;
    background-color: #00c600;
    border: none;
    color: #3c4043;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 16px;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
  }

  button:hover {
    background-color: #04e104;
  }

  .editBtn {
    background-color: orange;
  }

  .editBtn:hover {
    background-color: #ffb803 !important;
  }
`;

const DeleteButton = styled.button`
  background-color: #ce3c3c;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 4px;

  &:hover {
    background-color: #ff6666;
  }
`;

const ToggleButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const HabitsTable: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [hideSensitive, setHideSensitive] = useState(false); // State to toggle sensitive data

  // Load data from localStorage once on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(userData); // Initialize with demo data if nothing is in local storage
    }
  }, []);

  // Save user data to localStorage whenever the user state changes
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

        if (newScore >= 5) {
          newScore = 0;
          const currentIndex = statusLevels.indexOf(habit.status);
          newStatus =
            statusLevels[Math.min(currentIndex + 1, statusLevels.length - 1)];
        } else if (newScore <= -5) {
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

  useEffect(() => {
    if (!user) return;
    setUser({ ...user, hideSensitive: hideSensitive });
  }, [hideSensitive]);

  const handleAddHabit = () => {
    setModalOpen(true);
  };

  const handleSaveHabit = (
    name: string,
    status: string,
    isSensitive: boolean
  ) => {
    if (!user) return;

    const newHabit: Habit = {
      id: user.habits.length ? user.habits[user.habits.length - 1].id + 1 : 1,
      habitName: name,
      status,
      score: 0,
      updateDate: new Date().toISOString(),
      sensitive: isSensitive,
      //   updateEntryDur: 0,
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
                      <>
                        <button
                          disabled={
                            habit.score === -4 && habit.status === "Struggle"
                          }
                          className="action-button"
                          onClick={() => handleScoreChange(habit.id, -1)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleScoreChange(habit.id, 1)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </>
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
        </NewHabitSection>
      </ContentWrapper>

      <HabitModal
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
