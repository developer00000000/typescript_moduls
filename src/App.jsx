import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './Layout/Layout'
import Home from './pages/home/Home'
import Blog from './pages/blog/Blog'
import Contact from './pages/contact/Contact'

function App() {

  return (
    <>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='/blog' element={<Blog/>}/>
              <Route path='/contact' element={<Contact/>}/>
           </Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
