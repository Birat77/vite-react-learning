import { useState } from "react";
import Message from "./Message";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import Form from "./components/Form/Form";

const items = ["London", "Paris", "Kathmandu", "Delhi"];

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [like, setLike] = useState(false);

  const toggleLike = () => setLike(!like)

  const handleSelectItem = (item:string) =>{
    console.log(item)
  }
  const toggleAlert = () => setShowAlert(!showAlert);

  return <div>
    {/* <ListGroup 
      items={items}
      heading={'List'}
      onSelectItem={handleSelectItem}/>
      {
        showAlert &&
        <Alert onClose={() => setShowAlert(false)}>
        <>Hello World</>
      </Alert>
      }

      <Button type={'primary'} onClick={toggleAlert} data-dismiss={'alert'}>
        {showAlert ? 'Close' : 'Open'}
      </Button>
      <Like active={like} onClick={toggleLike}/> */}
      <Form/>
      </div>
}

export default App;