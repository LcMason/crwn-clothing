import { Routes, Route,  } from 'react-router-dom';
import HomePage from "./routes/home/homepage.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component'



const Shop = () => {
  return <h1>I am the shop.</h1>;
}

const App = () => {
   return (
     <Routes>
        <Route path='/' element={<Navigation />}>
          < Route index element={<HomePage />}/>
          < Route path='shop' element={<Shop />}/>
          < Route path='auth' element={<Authentication />}/>
        </Route>
     </Routes>
   );
}

export default App;
