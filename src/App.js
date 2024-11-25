import { useState, useEffect, createContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import Router from './Router';
import Footer from './components/Footer';
import Navbar,  { RoleTypes } from './components/navbar/Navbar';
import Loader from './components/Loader';
import APIContext from './components/contexts/APIContext';
import './App.css';

export const GeneralContext = createContext(null);
export const SearchContext = createContext();

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme((curr)=> (curr === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.title = "BCards";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            if (decodedToken.isAdmin === true) {
                setUserRoleType(RoleTypes.admin);
            } else if (decodedToken.isBusiness === true) {
                setUserRoleType(RoleTypes.business);
            } else {
                setUserRoleType(RoleTypes.user);
            }
        }
    }
}, []);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
    <APIContext.Provider 
    value='https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards'>
    <GeneralContext.Provider 
    value={{theme, setTheme, toggleTheme, setLoader, userRoleType, setUserRoleType }}>
      <div className='App' id={theme}>
        <Navbar/>
        <div className="frame">
          <Router/>
          {loader && <Loader/>}
        </div>
      <Footer/>
      </div>
    </GeneralContext.Provider>
    </APIContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;