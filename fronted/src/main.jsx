import ReactDOM from 'react-dom/client'; // Correct import without curly braces
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './Context/ShopContext.jsx'

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
      
    </ShopContextProvider>
  </BrowserRouter>
);
