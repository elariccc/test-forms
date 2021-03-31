import { useState } from 'react';

import LocationForm from '../location-form';

import './locations-list.css';

export default function LocationsList() {
  const [ locations, setLocations ] = useState([]);

  return (
    <div className='locations-list'>
      {locations.map(
        (location, index) => (
          <LocationForm
            location={location}
            locationIndex={index}
            setLocations={setLocations}
            key={index}
          />
        )
      )}
      <button
        className='locations-list__button'
        onClick={
          () => setLocations(
            prevLocations => [
              ...prevLocations, 
              { locationID: 0, envID: 0, hint: '' }
            ]
          )
        }
      >
        <i class="fas fa-plus"></i>
        Добавить тестовую локацию...
      </button>
      <button
        className='locations-list__button'
        onClick={
          () => console.log(locations)
        }
      >
        <i class="fas fa-terminal"></i>
        Вывести в консоль...
      </button>
    </div>
  )
}