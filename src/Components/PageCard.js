import CardAttribute from "./CardAttribute"
import {FiEdit} from "react-icons/fi"
import {GoTrashcan} from "react-icons/go"
const PageCard = ({page}) => 
	<div 
	className="pageCard">
			<CardAttribute attribute={"Title"} value={page.title}/>
			<CardAttribute attribute={"Description"} value={page.description}/>
			<CardAttribute attribute={"Published"} value={page.publishedOn.replace(/T.*/,"")}/>{/*remove time-too much info*/}
			<div style={{padding:"5px",backgroundColor:"#44475a",position:"sticky",bottom:"0px", right:"0px",left:"0px" }}> 
				<FiEdit style={{cursor:"pointer",fontSize:"20px",marginRight:"16px"}}/> {/*TODO wrap icons in buttons to make accessible */}
				<GoTrashcan style={{cursor:"pointer",fontSize:"20px"}}/>
			</div>
	</div> 

export default PageCard 