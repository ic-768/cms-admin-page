import {useHistory} from "react-router-dom"; 

const Home = ({pages}) => {
	const history = useHistory()
	const backgroundImage="/desk_background.jpg"

	return(
			<div className="PageContainer"style={{ backgroundImage:`url(${backgroundImage})`,
				backgroundSize:"cover",backgroundRepeat:"noRepeat",
				flexDirection:"column",
				alignItems:"center",
				justifyContent:"center" }} > 
					<button className="entryButton" 
						onClick={()=>{history.push("/admin")}}> 
						<h1 className="entryButton__contents">
						{(pages && pages.length) || "Pages"} {/*Show num pages, or if api taking long, show "Pages" */}
						</h1>
					</button>
			</div> 
	)
}


export default Home