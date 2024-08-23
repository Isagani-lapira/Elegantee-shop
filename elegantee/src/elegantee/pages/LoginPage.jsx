import React, { useState, useCallback } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';

const LoginPage = React.memo(() =>{

    const authProvider = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    const [isShowErrorMessage, setisShowErrorMessage] = useState(false)

    const handleSubmitLogin = (values)=>{
        let result = authProvider.authenticateUser(values.username,values.password)
        if(result) {
            setisShowErrorMessage(false)
            navigate('/rar')
        }
        else setisShowErrorMessage(true)

    }

    const validateFields = (values)=>{
        let errors = {}

        if(values.username == '') errors.username = "Invalid username"
        if(values.password == '') errors.password = "Invalid password"

        return errors;
    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Formik 
                initialValues={{ username: '', password: '' }}  
                onSubmit={handleSubmitLogin}
                validate={validateFields}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    ({values,handleChange})=>(
                        <Form className='flex flex-col gap-3 w-1/5'>
                        <h2 className='text-3xl font-bold'>Login</h2>
                        
                        {isShowErrorMessage && <div className="text-sm text-red-500">Invalid Username and password</div>}
                        <ErrorMessage name='username' id='username' component="p" className='text-sm text-red-500'/>
                        <TextField id="username" label="Username" 
                            variant="outlined" 
                            value={values.username} 
                            onChange={handleChange}
                            />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <button type='submit' className='bg-blue-500 py-3 text-white rounded-md hover:bg-blue-600  duration-300 transition-all ease-in-out'>LOG IN</button>
                    </Form>
                    )
                }
               
            </Formik>
        </div>
    )
})

export default LoginPage;