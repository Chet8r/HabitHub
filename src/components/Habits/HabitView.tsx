import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimesCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Habit, DurationType, UserData } from "../Shared/types";
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
import {
  getHabits,
  updateHabit,
  createHabit,
  deleteHabit,
} from "../Habits/Actions/habtiActions";
import { RootState } from "../Habits/Reducers";

const statusLevels = ["Failing", "Progress", "Consistency", "Habit"];
const EntryDuration: DurationType[] = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Monthly", value: 30 },
  { name: "Custom", value: 0 },
];

const HabitsTable: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const [user, setUser] = useState<UserData>();

  const sensitiveDataHidden = useSelector(
    (state: RootState) => state.nav.sensitiveDataHidden
  );
  const FullUserIData = useSelector((state: RootState) => state.user.data);
  const habits = useSelector((state: RootState) => state.habit.habits);

  const userId = user?.user.userId;

  useEffect(() => {
    FullUserIData && FullUserIData.user && setUser(FullUserIData);
  }, [FullUserIData]);

  useEffect(() => {
    if (userId) dispatch(getHabits(userId));
  }, [dispatch, userId]);

  const handleScoreChange = (habitId: number, change: number) => {
    dispatch(updateHabit(userId, habitId, change));
  };

  const handleSaveHabit = (
    name: string,
    isSensitive: boolean,
    updateEntryDurName: string,
    updateEntryDurValue: number
  ) => {
    const newHabit: any = {
      habitName: name,
      isSensitive: isSensitive,
      updateEntryDurName: updateEntryDurName,
      updateEntryDurValue: updateEntryDurValue,
    };

    dispatch(createHabit(userId, newHabit));
    setModalOpen(false);
  };

  const handleDeleteHabit = (habitId: number) => {
    dispatch(deleteHabit(userId, habitId));
  };

  const isActionAvailable = (habit: Habit) => {
    const today = new Date();
    const updateDate = new Date(habit.updateDate);

    switch (habit.updateEntryDurName) {
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
        const customDays = habit.updateEntryDurValue;
        const nextCustom = new Date(updateDate);
        nextCustom.setDate(updateDate.getDate() + customDays);
        return today >= nextCustom;
      default:
        return false;
    }
  };

  const handleAddHabit = () => {
    setModalOpen(true);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
  };

  const handleEdit = () => {
    setEditing(!isEditing);
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
              {habits.map((habit, index) => (
                <Tr key={index}>
                  <Td>
                    {(user && user.user.hideSensitive) ||
                    (sensitiveDataHidden && habit.IsSensitive)
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
          <button
            className="RestBtn"
            type="button"
            onClick={handleDeleteAccount}
          >
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
