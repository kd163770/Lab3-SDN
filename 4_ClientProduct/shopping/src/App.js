import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />}></Route>
          <Route path='/products' element={<ProductList />}></Route>
          <Route path='/products/:id' element={<ProductDetail/>}></Route>
          <Route path='/addproducts' element={<CreateProduct/>}></Route>
          <Route path='/editproducts' element={<CreateProduct/>}></Route>
          <Route path='/uploadimage' element={<UploadImage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
