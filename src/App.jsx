import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './Layout/Layout'
import Home from './pages/home/Home'
import Blog from './pages/blog/Blog'
import Contact from './pages/contact/Contact'
import DetailPage from './pages/home/DetailPage'
import { CharacterProvider } from './Contect'

function App() {

  return (
    <>
     <CharacterProvider>
         <Routes>
           <Route path='/' element={<Layout/>}>
              <Route path='/detail/:id' element={<DetailPage/>}/>
              <Route index element={<Home/>}/>
              <Route path='/blog' element={<Blog/>}/>
              <Route path='/contact' element={<Contact/>}/>
           </Route>
         </Routes>
     </CharacterProvider>
    </>
  )
}

export default App
