import React from 'react';
import { useState, useEffect } from 'react';

export default function PointsTable(props){
    console.log('MyComponent rendered');
    const [peopleData, setPeopleData] = useState([]);
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState([]);
    const [pointResults, setPointResults]=useState([]);
    const [playerResults,setPlayerResults]=useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    function sorter(){
      const playerPoints = props.data;
      for (const person of peopleData) {
        person.points = 0;
        //sanjay
        if(person.personName==="Sanjay"){
          person.points+=2497;
        }
        //saran
        if(person.personName==="Saran"){
          person.points+=1760;
          person.points-=69; //rachin ravindra pts
        }
        //sathish took mayank yadav later
        if(person.personName==="Sathish"){
          person.points+=1546.5;
          // person.points-=182;
        }
        //shashwat took Azmatullah Omarzai later
        if(person.personName==="Shashwat"){
          person.points+=2141;
        }
        //shriman
        if(person.personName==="Shriman"){
          person.points+=2574.5;
        }
        //subu
        if(person.personName==="Subu"){
          person.points+=3101;
        }
        //vishnu took Harshit Rana later
        if(person.personName==="Vishnu"){
          person.points+=2912;
        }
        //yukesh
        if(person.personName==="Yukesh"){
          person.points+=2712;
          person.points-=138 //Jack Fraser-Mcgurk pts
        }

      }
      for (const playerPoint of playerPoints) {
        const playerNameToFind = playerPoint.Title;

        const viceCaptainNames = [
          "Yuzvendra Chahal",
          "Shikhar Dhawan",
          "Wriddhiman Saha",
          "MS Dhoni",
          "Jasprit Bumrah",
          "Rinku Singh",
          "Ravi Bishnoi",
          "Suyash Sharma"
        ];
        const captainNames = [
          "Virat Kohli",
          "David Warner",
          "Shubman Gill",
          "Glenn Maxwell",
          "Faf du Plessis",
          "Ruturaj Gaikwad",
          "Ishan Kishan",
          "Yashasvi Jaiswal"
        ];
        
        for (const person of peopleData) {
          if (person.players.includes(playerNameToFind)) {
            if(captainNames.includes(playerNameToFind)){
              person.points+= playerPoint.Points * 2;
              break;
            }
            if(viceCaptainNames.includes(playerNameToFind)){
              person.points+= playerPoint.Points * 1.5;
              break;
            }
            person.points += playerPoint.Points;
            break;
          }
        }
      }
      const sortedData = [...peopleData].sort((a, b) => b.points - a.points);
      setPeopleData(sortedData);
      console.log("setting final data");
    }

    const handleInputChange = (e) => {
      const userInput = e.target.value;
      setInputText(userInput);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      checkInput(inputText);
      setIsSubmitted(true);
    };
    
    const checkInput = (userInput) => {
      console.log(userInput);
      const excelsheet=props.data;

      const temparr=[];
      for(const personEntry of peopleData){
        if(personEntry.personName === userInput){
          for (let i = 0; i < personEntry.players.length; i++) {
            const hobby = personEntry.players[i];
            temparr.push(hobby);
          }
          break;
        }
      }
      console.log(temparr);
      var i=0;
      const temppoints=[];
      const tempplayers=[];
      for(const playerEntry of excelsheet){
        if (results.includes(playerEntry.Title)) {
          i++;
          tempplayers.push(playerEntry.Title);
          temppoints.push(playerEntry.Points);
          console.log(playerEntry.Title);
          console.log(playerEntry.Points);
          // if(i===16)break;
        }
      }
      setPlayerResults(tempplayers);
      setPointResults(temppoints);
      setResults(temparr);

    }

    return (
        <div className='main-con'>
          <div className='box'>
            <button onClick={() => sorter()}>View Points</button>
            <div className="container">
              {peopleData.map((person, index) => (
                <div key={index}>
                  <button className="one">{person.personName} - {person.points}</button>
                </div>
              ))}
            </div>
          </div>
          <div className="spacer"></div>
          <div className="divider"></div>
          <div className="spacer"></div>
          <div className='box'>
            
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter text" value={inputText} onChange={handleInputChange}/>
            <button type="submit">Submit</button>
          </form>
            {isSubmitted && (
              <div>
              <table className='ind'>
                <thead>                  
                  <tr>
                    <th>Player</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                {playerResults.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>{pointResults[index]}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
          )}
          </div>
        </div>
    );

};
