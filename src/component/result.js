// ResultsPage.js
import React from 'react';
import '../component/result.css';

const ResultsPage = ({ likedData }) => {
    const renderCard = (item) => (
        <div className='card' key={item.data.item?.name}>
          <div className='cardContent'>
            {/* Display the image if URL exists */}
              <img src={item.img} alt={'image'} className="cardImage" />
        
            {item.data.natural_gift_type && (
              <h3 style={{ color: 'green' }}>{'power '}{item.data.natural_gift_type.name}</h3>
            )}
            {item.data.item && (
              <h3 style={{ color: 'green' }}>{item.data.item.name}</h3>
            )}
          </div>
        </div>
      );
      

  return (
    <div className='resultsPage'>
      <h1>Cards you liked and disliked</h1>
      <div className='likedDislikedContainer'>
        <div className='section'>
          <h2>Liked</h2>
          <div className='cardGrid'>
            {likedData.filter(item => item.direction === 'right' || item.direction === 'up').map(renderCard)}
          </div>
        </div>
        <div className='section'>
          <h2>Disliked</h2>
          <div className='cardGrid'>
            {likedData.filter(item => item.direction === 'left' || item.direction === 'down').map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
