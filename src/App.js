
import './App.css';
import MongoTable from './components/MongoTable';
import Form from './components/Form'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Form/>
        </div>
         <div className="col">
          <MongoTable/>
         </div>
      </div>
    </div>
  );
}

export default App;
