import './App.css';
import Approutes from './routes/Approutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Approutes />
    </div>
  );
}

export default App;
