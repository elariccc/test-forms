import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { storeContext } from '../../store';

import './location-form.css';

const LocationForm = observer(
  function LocationForm({ location, locationIndex, setLocations }) {
    const store = useContext(storeContext);

    const servers = store.servers.reduce(
      (prevServers, server) => {
        if ( (server.locationID === location.locationID) && (server.envID === location.envID) ) prevServers.push(server.name);
        
        return prevServers;
      }, []
    );

    const handlePropertyChange = property => {
      return event => {
        setLocations(
          prevLocations => {
            const newLocations = [...prevLocations];
            newLocations.splice(
              locationIndex, 
              1, 
              {
                ...location,
                ...{[property]: +event.target.value}
              }
            );
  
            return newLocations;
          }
        );
      }
    } 

    const handleHintChange = event => {
      setLocations(
        prevLocations => {
          const newLocations = [...prevLocations];
          newLocations.splice(
            locationIndex, 
            1, 
            {
              ...location,
              ...{hint: event.target.value.slice(2)}
            }
          );

          return newLocations;
        }
      );
    }

    const handleDeleteClick = event => {
      setLocations(
        prevLocations => {
          const newLocations = [...prevLocations];
          newLocations.splice(
            locationIndex, 
            1,
          );

          return newLocations;
        }
      );
    }

    return (
      <div className='location-form'>
        <div className='location-form__header'>
          <i className="fas fa-vial"></i>
          Тестовая локация {locationIndex + 1}
        </div>
        <div className='location-form__delete'>
          <i 
            className="fas fa-trash-alt"
            onClick={handleDeleteClick}
          ></i>
        </div>
        <div className='location-form__location-label'>
          Локация
        </div>
        {store.isLoaded ?
          (
            <select
              className='location-form__location-input input-with-icon'
              onChange={handlePropertyChange('locationID')}
              value={location.locationID}
            >
              <option value=''>-- Выберите локацию --</option>
              {store.locations.map(
                (storeLocation, index) => (
                  <option
                    value={storeLocation.locationID}
                    key={index}
                  >&#xf3c5; {storeLocation.name}</option>
                )
              )}
            </select>
          )
        :
          (
            <div
              className='location-form__location-input loading-background'
            />
          )
        }
        <div className='location-form__env-label'>
          Среда
        </div>
        {store.isLoaded ?
          (
            <select
              className='location-form__env-input input-with-icon'
              onChange={handlePropertyChange('envID')}
              value={location.envID}
            >
              <option value=''>-- Выберите среду --</option>
              {store.envs.map(
                (storeEnv, index) => (
                  <option
                    value={storeEnv.envID}
                    key={index}
                  >&#xf299; {storeEnv.name}</option>
                )
              )}
            </select>
          )
        :
          (
            <div
              className='location-form__env-input loading-background'
            />
          )
        }
        <div className='location-form__servers-label'>
          Серверы
        </div>
        {store.isLoaded ?
          (
            <div className='location-form__servers-data input-with-icon'>
              {servers.length ?
                (
                  <>
                    &#xf233; {servers.join(', ')}
                  </>
                )
              :
                (
                  <>
                    &#xf057; No servers
                  </>
                )
              }
            </div>
          )
        :
          (
            <div
              className='location-form__servers-data loading-background'
            />
          )
        }
        <div className='location-form__hint-label'>
          Подсказка
        </div>
        {store.isLoaded ?
          (
            <input 
              type='text' 
              className='location-form__hint-input input-with-icon' 
              value={`\uf128 ${location.hint}`}
              onChange={handleHintChange}
            />
          )
        :
          (
            <div
              className='location-form__hint-input loading-background'
            />
          )
        }
      </div>
    );
  }
);

export default LocationForm