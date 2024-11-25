import { Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Logout from './auth/Logout';
import EditUser from './auth/EditUser';
import CardsList from './cards/CardsList';
import NewCard from './cards/NewCard';
import CardDetails from './cards/CardDetails';
import EditCard from './cards/EditCard';
import Mycards from './cards/Mycards';
import Favourites from './cards/Favourites';
// import Sandbox from './admin/Sandbox';
import About from './pages/About';
import Users from './admin/UsersS';


export default function Router() {
    return (
        
        <Routes>
            <Route path='/' element={<CardsList/>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/cards/fav' element={<Favourites/>}/>
            <Route path='/cards/my-cards' element={<Mycards/>}/>
            {/* <Route path='/admin/sandbox' element={<Sandbox/>}/> */}
            <Route path='/admin/sandbox' element={<Users/>}/>
            <Route path='/create' element={<NewCard/>}/>
            <Route path='/cards/:card_id/edit' element={<EditCard/>}/>          
            <Route path='/cards/:card_id' element={<CardDetails/>}/>
            <Route path="/auth/logout" element={<Logout/>} />
            <Route path="/auth/:user_id/edit" element={<EditUser/>} />
        </Routes>
    
    )
}