import {useHistory} from "react-router-dom"; 

const Home = ({pages}) => {
	const history = useHistory()
	const backgroundImage="/desk_background.jpg"

	return(
			<div className="PageContainer"style={{
backgroundImage:`url(${backgroundImage})`,
backgroundSize:"cover",backgroundRepeat:"noRepeat",
				flexDirection:"column",
				alignItems:"center",
				justifyContent:"center" }} > 
					<button className="entryButton" 
						onClick={()=>{history.push("/admin")}}> 
						<h1 className="entryButton__contents">
						{pages && pages.length}
						</h1>
						<p>{pages && pages.length}</p> {/*Pages retrieved, show how many*/}
					</button>
			</div> 
	)
}


export default Home