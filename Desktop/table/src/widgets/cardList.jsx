
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../services/api';
import Card from '../components/Card';


const CardList = () => {

    const { data, error } = useSWR('http://localhost:3002/employee', fetcher);

    if (error) return <div>Error loading data...</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex flex-wrap gap-4">
            {Array.isArray(data) && data.map((item, index) => (
                <Card
                    key={index}
                    imgUrl={item.imgUrl}
                    name={item.name}
                    review={item.review}
                    job={item.job}
                />
            ))}
        </div>
    );
};

export default CardList;
