import React from 'react'

const Card = ({ imgUrl, name, review, job }) => {
    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <img class="rounded-t-lg" src={imgUrl} alt={name} />

            <div class="p-5">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {job}</p>
                <button href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800">
                    {review}

                </button>
            </div>
        </div>
    )
}

export default Card