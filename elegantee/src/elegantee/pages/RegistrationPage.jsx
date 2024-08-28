import maleFemaleImage from '../../assets/illustration/male-female.png'
import { Formik, Form } from 'formik'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export default function RegistrationPage(){
    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (dateSelected) => {
        const formattedDate = dateSelected ? dayjs(dateSelected).format('YYYY/MM/DD') : '';
        setSelectedDate(formattedDate);
    };


    const handleSubmitLogin = (values)=>{
        values.birthdate = selectedDate;
        console.log(values)
    }

    return (
        <div className="flex justify-center">
            <div className="p-5 flex gap-3 shadow-lg w-3/4">
                <div className="right-panel flex-1 flex flex-col justify-between">
                    <div>
                        <div className='mb-10'>
                            <h2 className='text-3xl font-semibold'>Create account</h2>
                            <span>Join our community of glamorus</span>
                        </div>
                        <Formik
                            initialValues={{firstname:'',lastname: '',
                                emailAddress:'', birthdate: selectedDate,
                                username: '', password: ''
                            }}
                            onSubmit={handleSubmitLogin}
                        >
                            {({values,handleChange})=>(
                                    <Form>
                                        <div className=' grid grid-cols-2 gap-2'>
                                            <TextField
                                                required
                                                id='firstname'
                                                name='firstname'
                                                label="First name"
                                                value={values.firstname}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                required
                                                id='lastname'
                                                name='lastname'
                                                label="Last name"
                                                value={values.lastname}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                required
                                                id='emailAddress'
                                                name='emailAddress'
                                                label="Email Address"
                                                value={values.emailAddress}
                                                onChange={handleChange}
                                            />
                                            <LocalizationProvider required dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id='birthdate'
                                                    name='birthdate'
                                                    maxDate={dayjs()} // not allowed advance date
                                                    value={values.selectedDate}
                                                    onChange={handleDateChange}
                                                    label="Date of Birth"
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>


                                            <TextField
                                                required
                                                id='username'
                                                name='username'
                                                label="Username"
                                                value={values.username}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                required
                                                type='password'
                                                id='password'
                                                name='password'
                                                label="Password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type='submit' className='w-full mt-3 py-3 bg-blue-500 
                                            text-white font-semibold rounded-md
                                            hover:bg-blue-600'>
                                            Create account
                                        </button>
                                    </Form>
                            )}
                        </Formik>
                    </div>
                    <span className='text-center'>Already have an account?<Link to="/" 
                    className='text-blue-500 hover:text-blue-600 hover:font-semibold transition-all ease-in-out'> Login</Link></span>
                </div>
                <div className="left-panel flex-1 hidden lg:block rounded-r-lg">
                    <img src={maleFemaleImage} alt="Illustration of male and female" />
                </div>
            </div>
        </div>
    )
}