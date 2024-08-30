import maleFemaleImage from '../../assets/illustration/male-female.png'
import { Formik, Form } from 'formik'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { registerAccount } from '../api/RegistrationAPI';
import ReactLoading from 'react-loading';

export default function RegistrationPage(){
    const [selectedDate, setSelectedDate] = useState();
    const [isLoadingShown,setisLoadingShown] = useState(false)

    const handleDateChange = (dateSelected) => {
        const formattedDate = dateSelected ? dayjs(dateSelected).format('YYYY-MM-DD') : '';
        setSelectedDate(formattedDate);
    };

    const navigate = useNavigate();
    const handleSubmitLogin = (values,{setErrors})=>{
        values.birthdate = selectedDate;

        const user = { 'username':values.username,'password':values.password,'roles':'USERS' }
        const accountDetails = {
            'firstname':values.firstname,
            'lastname':values.lastname,
            'emailAddress':values.emailAddress,
            'birthDate':selectedDate
        }
        
        sendRegistrationRequest(user,accountDetails,setErrors)
    }

    const sendRegistrationRequest = async(user,accountDetails,setErrors)=>{
        setisLoadingShown(true)
        try{
            const requestBody = {user,accountDetails}
            const result = await registerAccount(requestBody)
            if(result.status == 201) navigate("/")
        }catch(error){
            if(error.response && error.response.status==400){
                const apiErrors = error.response.data;
                const fieldErrors = {}
                for(const [key, message] of Object.entries(apiErrors)){
                    const fieldName = key.replace(/^[^.]+./,'') //removing the user. and accountdetails. in the key
                    fieldErrors[fieldName] = message;
                }
                setErrors(fieldErrors) //displaying errors and showing message comming from the backend api message
            }
        }

        setisLoadingShown(false)
    }

    return (
        <div className="flex justify-center h-max">
            <div className="p-5 flex gap-3 shadow-lg w-3/4">
                <div className="right-panel flex-1 flex flex-col justify-between">
                    <div>
                        <div className='mb-10 text-center md:text-left'>
                            <h2 className='text-3xl font-semibold'>Create account</h2>
                            <span>Join our community of glamorus</span>
                        </div>
                        <Formik
                            initialValues={{firstname:'',lastname: '',
                                emailAddress:'', birthDate: selectedDate,
                                username: '', password: ''
                            }}
                            onSubmit={handleSubmitLogin}
                        >
                            {({values,handleChange,handleBlur,errors, touched})=>(
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
                                                error={touched.emailAddress && !!errors.emailAddress}
                                                helperText = {touched.emailAddress &&  errors.emailAddress}
                                            />
                                            <LocalizationProvider required dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id='birthDate'
                                                    name='birthDate'
                                                    maxDate={dayjs()} // not allowed advance date
                                                    value={values.selectedDate}
                                                    onChange={handleDateChange}
                                                    label="Date of Birth"
                                                    error
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
                                                error={touched.username && !!errors.username}
                                                helperText = {touched.user && errors.username}
                                            />
                                            <TextField
                                                required
                                                type='password'
                                                id='password'
                                                name='password'
                                                label="Password"
                                                value={values.password}
                                                onChange={handleChange}
                                                error = {touched.password && !!errors.password}
                                                helperText = {touched.password && errors.password}
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

            {isLoadingShown &&
                <div className='absolute -top-0 h-full w-full bg-black  bg-opacity-50 flex flex-col gap-10 items-center justify-center '>
                    <ReactLoading type={'spinningBubbles'} color={'#FFFFFF'} height={'5%'} width={'5%'} />
                <span className='font-bold text-lg md:text-2xl text-white'>Creating new account</span>
                </div>
            }
            
            
        </div>
    )
}