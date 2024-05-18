import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import './component/component.css';
import axios from 'axios';
import ResultsPage from './component/result';

function Component({ setLikedData,likedData }) {
  const [lastDirection, setLastDirection] = useState();
  const [data, setData] = useState({});
  const [ID, setID] = useState(1);
  const [generatedIds, setGeneratedIds] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/berry/${ID}/`);
        setData(response.data);
        console.log(response.data, 'data');
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [ID]);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete, 'direction: ' + direction);
    setLastDirection(direction);
    let obj = {
      direction: direction,
      data: data,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`
    };
    setLikedData((prev) => [...prev, obj]);
    const generateUniqueId = () => {
      let newId;
      do {
        newId = Math.floor(Math.random() * 20) + 1;
      } while (generatedIds.includes(newId)); 
      setGeneratedIds(prevIds => [...prevIds, newId]);
      return newId;
    };
    
    setID(generateUniqueId());
     console.log(setLikedData.length,'len')
    if (likedData.length + 1 >= 10) {
      navigate('/results');
    }
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
    setID(Math.floor(Math.random() * 20) + 1);
  };

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      
      <div className='cardContainer'>
        {setLikedData.length < 10 && (
          <TinderCard className='swipe' key={data.item?.name} onSwipe={(dir) => swiped(dir, data.item?.name)} onCardLeftScreen={() => outOfFrame(data.item?.name)}>
            <div className='card'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`} />
              <div className='cardContent'>
                {data.natural_gift_type && (
                  <h3 style={{ color: 'green' }}>{'power '}{data.natural_gift_type.name}</h3>
                )}
                {data.item && (
                  <h3 style={{ color: 'green' }}>{data.item.name}</h3>
                )}
              </div>
            </div>
          </TinderCard>
        )}
      </div>
     
    </div>
  );
}

function App() {
  const [likedData, setLikedData] = useState([]);
  console.log(likedData,'likeddata')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Component setLikedData={setLikedData} likedData={likedData}/>} />
        <Route path="/results" element={<ResultsPage likedData={likedData} />} />
      </Routes>
    </Router>
  );
}

export default App;
