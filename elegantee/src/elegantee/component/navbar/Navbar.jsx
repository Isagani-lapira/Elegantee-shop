import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser   } from "react-icons/fa";
import '@fontsource/mr-dafoe'; 
import './Navbar.css'
import { useAuth } from "../../provider/AuthProvider";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar(){
    const [currentPage, setCurrentPage] = useState('/')
    const location = useLocation();
    const auth = useAuth();
    useEffect(()=>{
        setCurrentPage(location.pathname);
    },[location])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
    return (
        <div className="p-3 flex justify-evenly items-center">
            <span id="brand-name">Elegantee</span>
            <ul className="flex gap-5 text-inactive navbar-item-list">
                <li className={currentPage == '/'? 'font-bold text-active': 'text-inactive'}><Link to="/">Home</Link></li>
                <li className={currentPage == '/category'? 'font-bold text-active': 'text-inactive'}><Link to="/category">Category</Link></li>
                <li className={currentPage == '/about'? 'font-bold text-active': 'text-inactive'}><Link to="/about">About</Link></li>
                <li className={currentPage == '/contact'? 'font-bold text-active': 'text-inactive'}><Link to="/contact">Contact</Link></li>
            </ul>

                <div className="flex gap-5 items-center text-accent-color">
                {auth.isAuthenticated? <p>{auth.accountUsername}</p>:
                  <Link to="/" className=" inline-flex items-center font-medium gap-2"><FaRegUser /> Login/Register</Link>
                }
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                    </Search>
                </div>
            
        </div>
    )
}