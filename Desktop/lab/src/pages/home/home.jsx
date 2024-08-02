import React, { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import Modal from '../../components/modal/modal';
import { getCard } from '../../services/api';

const HomePage = () => {
  const [cardData, setCardData] = useState([]);

  const fetchCardData = async () => {
    try {
      const data = await getCard();
      setCardData(data);
    } catch (error) {
      console.error('Failed to fetch card data:', error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  return (
    <div className="p-4">
      <Modal onCardAdded={fetchCardData} />
      <div className="flex flex-wrap gap-5 mt-4">
        {cardData.length > 0 ? (
          cardData.map((card) => <Card key={card.id} data={card} onDelete={fetchCardData} />) 
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
