import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

import "./styles.css";

import Form from "./Form";
import { data } from "./data";

const saveditems = JSON.parse(localStorage.getItem("usersData"));
const initialData = data.map((datum) => ({ ...datum, id: uuid() }));

export default function App() {
  const [usersData, setUsersData] = useState(saveditems || initialData);

  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(usersData));
  }, [usersData]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("usersData"));
    if (localStorageData && localStorageData.length > 0) {
      setUsersData(localStorageData);
    }
  }, []);

  const saveToLocalStorage = (id, data) => {
    const updatedData = usersData.map((userData) =>
      userData.id === id ? { ...data, id } : userData
    );
    setUsersData(updatedData);
  };

  return (
    <div className="App">
      {usersData.map((datum) => (
        <Form
          key={uuid()}
          formData={datum}
          saveToLocalStorage={saveToLocalStorage}
        />
      ))}
    </div>
  );
}
