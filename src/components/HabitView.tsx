import React, { useState } from 'react';
import styled from 'styled-components';
import { habitsData } from '../demoData';

const statusLevels = ['Struggle', 'Kickstart', 'Momentum', 'Habit'];

const Wrapper = styled.section`
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const ContentWrapper = styled.div`
    width: 90%;
    max-width: 800px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const Th = styled.th`
    background-color: #163020;
    color: #fff;
    font-weight: bold;
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
        background-color: #b6c4b6;
        border: none;
        color: #3c4043;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 4px;
        margin-right: 4px;
    }

    .action-button:hover {
        background-color: #becdbe;
    }
`;

const NewHabitSection = styled.section`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input[type="text"] {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        margin-right: 8px;
    }

    button {
        background-color: #b6c4b6;
        border: none;
        color: #3c4043;
        cursor: pointer;
        font-size: 14px;
        padding: 10px 16px;
        border-radius: 4px;
    }

    button:hover {
        background-color: #becdbe;
    }
`;

const HabitsTable = () => {
    const [habits, setHabits] = useState(habitsData);

    const handleScoreChange = (id:any, change:any) => {
        setHabits(prevHabits =>
            prevHabits.map(habit => {
                if (habit.id === id) {
                    let newScore = habit.score + change;
                    let newStatus = habit.status;

                    if (newScore >= 5) {
                        newScore = 0;
                        const currentIndex = statusLevels.indexOf(habit.status);
                        newStatus = statusLevels[Math.min(currentIndex + 1, statusLevels.length - 1)];
                    } else if (newScore <= -5) {
                        newScore = 0;
                        const currentIndex = statusLevels.indexOf(habit.status);
                        newStatus = statusLevels[Math.max(currentIndex - 1, 0)];
                    }

                    return { ...habit, score: newScore, status: newStatus };
                }
                return habit;
            })
        );
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Header>
                    <h1>Habits</h1>
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
                        {habits.map(habit => (
                            <Tr key={habit.id}>
                                <Td>{habit.name}</Td>
                                <Td>{habit.status}</Td>
                                <Td>{habit.score}</Td>
                                <HabitActions>
                                    <button className="action-button" onClick={() => handleScoreChange(habit.id, -1)}>
                                        -
                                    </button>
                                    <button className="action-button" onClick={() => handleScoreChange(habit.id, 1)}>
                                        +
                                    </button>
                                </HabitActions>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                <NewHabitSection>
                    <input type="text" placeholder="Enter Title" />
                    <button type="button">Create new</button>
                </NewHabitSection>
            </ContentWrapper>
        </Wrapper>
    );
};

export default HabitsTable;
