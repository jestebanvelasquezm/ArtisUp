import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import AllShows from "../components/Shows/allShows";
import ShowDetail from "../components/ShowDetail/ShowDetail";
import Categories from "../components/Categories";
import Login from "../components/Login/Login";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import Register from "../components/Form/CreateFormFin";
// import Contract from "../components/Contract";
import Pagos from "../components/pruebaPago/Pagos";
import FormShow from '../components/Form/FormShow';
import Slice from '../components/Sections/Slice';
// import Navbar from '../components/Navbar/index';
import DasBoard from '../components/DashBoard/DashBoard';



export default function App() {



  return (
    <>

        {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artists' element={<AllShows />} />
        <Route path='/artists/detail/:id' element={<ShowDetail />} />
        {/* <Route path='/categories' element={<Categories />} /> */}
        {/* <Route path='/con' element={<Slice />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/register' element={<Register />} /> */}
        {/* <Route path='/createartist' element={<FormShow />} /> */}
        {/* <Route path='/AdminPanel' element={<AdminPanel />} /> */}
        {/* <Route path='/contract' element={<Pagos />} /> */}
        {/* <Route path='/dash' element={<DasBoard />} /> */}

        
      </Routes>
    </>
  )
}
