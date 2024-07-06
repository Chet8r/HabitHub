import { useState, useEffect } from "react";
import { Habit, HabitLog, User } from "./types";

const useUserData = () => {
  const [userData, setUserData] = useState<User>({
    userId: 0,
    firstname: "",
    habits: [],
    habitLog: [],
    hideSensitive: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const saveUserData = (data: User) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  const updateUserData = (key: keyof User, value: any) => {
    const updatedData = { ...userData, [key]: value };
    saveUserData(updatedData);
  };

  const addHabit = () => {
    const newHabit: Habit = {
      id: Date.now(),
      habitName: "",
      status: "",
      score: 0,
      updateDate: new Date().toISOString(),
      sensitive: false,
      // updateEntryDur: 0,
    };
    const updatedHabits = [...userData.habits, newHabit];
    updateUserData("habits", updatedHabits);
  };

  const updateHabit = (index: number, key: keyof Habit, value: any) => {
    const updatedHabits = userData.habits.map((habit, i) =>
      i === index ? { ...habit, [key]: value } : habit
    );
    updateUserData("habits", updatedHabits);
  };

  const addHabitLog = () => {
    const newHabitLog: HabitLog = { id: Date.now(), name: "" };
    const updatedHabitLog = [...userData.habitLog, newHabitLog];
    updateUserData("habitLog", updatedHabitLog);
  };

  const updateHabitLog = (index: number, value: string) => {
    const updatedHabitLog = userData.habitLog.map((log, i) =>
      i === index ? { ...log, name: value } : log
    );
    updateUserData("habitLog", updatedHabitLog);
  };

  return {
    userData,
    setUserData,
    updateUserData,
    addHabit,
    updateHabit,
    addHabitLog,
    updateHabitLog,
    saveUserData,
  };
};

export default useUserData;
