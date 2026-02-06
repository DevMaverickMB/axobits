import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/:postId' element={<BlogPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
