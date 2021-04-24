import {useHistory} from "react-router-dom"; 

const Home = ({pages}) => {
	const history = useHistory()

	return(
			<div className="PageContainer"style={{display:"flex",
				flexDirection:"column",
				alignItems:"center",
				justifyContent:"center" }} > 
					<button className="EntryButton" 
						onClick={()=>{history.push("/admin")}}> 
						My Pages
						<p>{pages && pages.length}</p> {/*Pages retrieved, show how many*/}
					</button>
			</div> 
	)
}


export default Home