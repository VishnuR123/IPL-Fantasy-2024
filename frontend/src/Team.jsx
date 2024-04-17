import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';
import './Test.css';

function Team(props){
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [peopleData,setPeopleData]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/people.json');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPeopleData(data);
            console.log("setting initial data");
          } catch (error) {
            console.error('Error fetching JSON data:', error);
          }
        };
    
        fetchData();
      }, []); 
      

    const newHandleButtonClick = (country) => {
        setSelectedCountries(prevSelectedCountries => {
            const updatedCountries = [...prevSelectedCountries, country];
            if (updatedCountries.length > 2) {
              updatedCountries.shift();
            }
            return updatedCountries;
        });
    }

    return(
        <div className='team'>
            <div className='team-container'>
            {['CSK','DC','GT','KKR','LSG','MI','PBKS','RCB','RR','SRH'].map((country) => (
                <button
                key={country}
                className={selectedCountries.includes(country) ? country+'1' :'normal-button'}
                onClick={() => newHandleButtonClick(country)}
                >
                {country}
                </button>
            ))}
            </div>
            <div className="card-container">
                {peopleData.map((person)=>(
                    <Card key={person.personName} personName={person.personName} players={person.players} selectedCountries={selectedCountries} data={props.data}/>
                ))}
            </div>
        </div>
      );
}

export default Team;
