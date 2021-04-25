import {useState,useEffect} from "react"
import {Route} from "react-router-dom"; 
import Banner from './Components/Banner'
import Home from './Pages/Home'
import AdminCenter from './Pages/AdminCenter' 
import {getPages} from './API_calls/calls' 
import './App.css'

function App() {
	const [pages,setPages]=useState(null)
	console.log(pages)

	useEffect(() => {
		(async () => { // On render, get pages
			 setPages(await getPages());
		})(); 
	},[]);

  return (
    <div className="App">
			<Banner username="Ioannis"/>
			<Route exact path="/"> 
				<Home pages={pages}/>
			</Route>
			<Route path="/admin">  
				<AdminCenter pages={pages} setPages={setPages}/> 
			</Route>
    </div>
  );
} 
export default App;
