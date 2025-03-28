import { createRoot } from 'react-dom/client'
import './index.css'
import './inventory.css'
import App from './App'
import { BrowserRouter} from 'react-router-dom'
import { store } from './store/index.js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <Provider store={store}>
  
        
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
     

    </Provider>
  </BrowserRouter>
)
