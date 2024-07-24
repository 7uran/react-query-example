import React, { useState } from 'react'
import { GoTrash } from "react-icons/go";
import useSWR, { mutate } from 'swr';
import { fetcher, creatList } from '../services/api';
export const Table = () => {
    const { data, error } = useSWR('http://localhost:3002/employee', fetcher);
    const [newEmployee, setNewEmployee] = useState({ name: '', job: '', review: '' });

    if (error) return <div>Error loading data...</div>;
    if (!data) return <div>Loading...</div>;

    const handleCreate = async () => {
        try {
            await creatList(newEmployee);
            mutate('http://localhost:3002/employee');
            setNewEmployee({ name: '', job: '', review: '' });
        } catch (error) {
            console.error('Error creating new employee:', error);
        }
    };

    return (
        <div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Review</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((el, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={el?.imgUrl} alt="Profile" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{el?.name}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {el?.job}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{el?.review}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-2xl text-red-600 dark:text-red-500 "><GoTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>Add New Employee</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Job"
                    value={newEmployee.job}
                    onChange={(e) => setNewEmployee({ ...newEmployee, job: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Review"
                    value={newEmployee.review}
                    onChange={(e) => setNewEmployee({ ...newEmployee, review: e.target.value })}
                />
                <button onClick={handleCreate}>Add Employee</button>
            </div>
        </div>
    );
}

