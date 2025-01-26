
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthService from './appwrite/auth.js'
import {login, logout} from './store/authSlice.js'
import {Header, Footer} from './components/index.js'
import { Outlet } from 'react-router-dom'
import './App.css'
import config from './config/config.js'

function App() {

  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch()

  useEffect(()=>{
    AuthService.getAccount()
    .then((userData)=>{ 
      if (userData){

        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>console.log("Error in App.jsx :: useEffect Failed to fetch data:: ", error))
    .finally(()=> setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen felx flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header/>
      <main>
        {/* <Outlet/> */}
        TODO: <Outlet/>
      </main>
      <Footer/>
      </div>

    </div>
  ) : null
}

export default App
