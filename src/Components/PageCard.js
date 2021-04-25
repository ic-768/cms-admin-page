import CardAttribute from "./CardAttribute"
//import {FiEdit} from "react-icons/fi"
import {GoTrashcan} from "react-icons/go" 
import {BsFillEyeFill} from "react-icons/bs"
import {deletePage} from "../API_calls/calls"
import {useHistory} from "react-router-dom" 

const PageCard = ({page,pages,setPages}) => {
const history = useHistory()
	return ( 
	<div 
	className="pageCard">
			<CardAttribute attribute={"Title"} value={page.title}/>
			<CardAttribute attribute={"Description"} value={page.description}/>
			<CardAttribute attribute={"Published"} value={page.publishedOn.replace(/T.*/,"")}/>{/*remove time-too much info*/}
			<div style={{padding:"5px",backgroundColor:"#44475a",position:"sticky",bottom:"0px", right:"0px",left:"0px" }}> 
				<BsFillEyeFill style={{cursor:"pointer",fontSize:"20px",marginRight:"16px"}}	/*TODO wrap icons in buttons to make accessible */
				onClick={()=>{history.push(`/admin/${page.id}`)}}
				/> 
				<GoTrashcan style={{cursor:"pointer",fontSize:"20px"}}
				onClick={async()=>{
					try{
						const deletedID=await deletePage(page.id) 
						console.log(deletedID)
						setPages(pages.filter((page)=>page.id!==parseInt(deletedID)))
					}
					catch{
						console.log("Something went wrong")
					}
				}}
				
				/>
			</div>
	</div> 
)
}
export default PageCard 