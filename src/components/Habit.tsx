import React from 'react';
import styled from 'styled-components';
import HabitView from './HabitView';

const Wrapper = styled.section`
    background-color: #163020;
    color: white;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    height: 92vh;
`;

const ContentWrapper = styled.section`
    width: 90%;
    max-width: 800px;
    background-color: #0e1e15;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 20px;
`;

const Ul = styled.ul`
    list-style-type: none;
    padding: 16px;
    background-color: #163020;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Li = styled.li`
    color: #EEF0E5;
`;

const HabitList = styled.div`
    padding: 8px;
    background-color: #0e1e15;
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const HabitItemInput = styled.input`
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    color: #EEF0E5;
    font-family: sans-serif;
    font-size: medium;
`;

const HabitActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: -10px;
`;

const NewHabitSection = styled.section`
    padding: 1rem;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #B6C4B6;
    border: 1px solid #0e1e15;
    border-radius: 4px;
    color: #3c4043;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 14px;
    height: 36px;
    line-height: 27px;
    min-width: 100px;
    text-align: center;
    user-select: none;

    &:hover {
        background-color: #becdbe;
        border: 1px solid #ffffff;
    }
`;

function Habit() {
    return (
        <Wrapper>
            <ContentWrapper>
                <Header>
                    <h1>Personal Growth</h1>
                    <Ul>
                        <Li>0 - Struggle</Li>
                        <Li>1 - Motion</Li>
                        <Li>2 - Momentum</Li>
                        <Li>3 - Habit</Li>
                    </Ul>
                </Header>
                <HabitView />
            </ContentWrapper>
        </Wrapper>
    );
}

export default Habit;
