import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/authRoute';

import MenuBar from './components/menuBar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import SinglePost from './pages/singlePost';
import Footer from './components/footer';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container className="content-container">
          <MenuBar/>
          <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/login" 
                   element={ 
                             <AuthRoute>
                               <Login />
                             </AuthRoute> 
                   }
            />
            <Route path="/register" 
                   element={ 
                             <AuthRoute>
                              <Register />
                             </AuthRoute>
                   }
            />
            <Route path="/post/:postId" element={ <SinglePost /> }/>
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
