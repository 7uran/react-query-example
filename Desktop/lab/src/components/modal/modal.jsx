import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addCard } from '../../services/api';

const Modal = ({ onCardAdded }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggleModal = () => {
        setIsOpen(!isOpen);
    };

    const validationSchema = Yup.object({
        cardName: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        cardDesc: Yup.string()
            .required('Description is required')
            .min(5, 'Description must be at least 5 characters'),
    });

    const formik = useFormik({
        initialValues: {
            cardName: '',
            cardDesc: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await addCard(values);
                formik.resetForm();
                handleToggleModal();
                if (onCardAdded) {
                    onCardAdded();
                }
            } catch (error) {
                console.error('Failed to add card:', error);
            }
        },
    });

    return (
        <div>
            <button
                onClick={handleToggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add New Post
            </button>

            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add new
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleToggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="p-4 md:p-5 space-y-4 flex flex-col">
                                    <input
                                        type="text"
                                        name="cardName"
                                        placeholder='Name'
                                        value={formik.values.cardName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`h-10 rounded bg-transparent border ${formik.touched.cardName && formik.errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {formik.touched.cardName && formik.errors.cardName ? (
                                        <div className="text-red-500 text-sm">{formik.errors.cardName}</div>
                                    ) : null}

                                    <input
                                        type="text"
                                        name="cardDesc"
                                        placeholder='Description'
                                        value={formik.values.cardDesc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`h-10 rounded bg-transparent border ${formik.touched.cardDesc && formik.errors.cardDesc ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {formik.touched.cardDesc && formik.errors.cardDesc ? (
                                        <div className="text-red-500 text-sm">{formik.errors.cardDesc}</div>
                                    ) : null}
                                </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
