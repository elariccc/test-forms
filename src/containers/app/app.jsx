import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { storeContext } from "../../store";

// import LocationForm from '../location-form';
import LocationsList from '../locations-list';

import './app.css';

export default function App() {
  return (
    <div className='app'>
      <LocationsList/>
    </div>
  );
}

const TestLocationForm = observer(function TestLocationForm() {
  const store = useContext(storeContext);
  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }
  return <div>Hello world</div>;
});

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState([{}]);
  return (
    <>
      {locationsList.map((location, index) => (
        <TestLocationForm key={`location-${index}`} />
      ))}
      <button
        onClick={() => {
          setLocationsList([...locationsList, {}]);
        }}
      >
        Добавить тестовую локацию
      </button>
      <button
        onClick={() => {
          console.log(locationsList);
        }}
      >
        Вывести результат в консоль
      </button>
    </>
  );
};
