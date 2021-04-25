import {useHistory} from "react-router-dom"
import {useState} from "react"
import OverlayAttribute from "./OverlayAttribute"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {AiOutlineEdit} from "react-icons/ai"
import {BiSave} from "react-icons/bi" 
import {updatePage} from '../API_calls/calls' 

const PageOverlay=({page,pages,setPages})=>{
	const history=useHistory() 
	const [isEditable,setIsEditable]=useState(false) 

	//TODO refactor and import to both overlays
	const typeNumToString=(typeNum)=>{ // get meaning of enum 
		switch (typeNum){
			case 0:
				return "Menu"
		  case 1:
				return "Events"
			default:
				return "Content" 
		} 
	}

	const typeStringToNum=(typeString)=>{ // switch back to enum 
		console.log(typeString)
		switch (typeString){
			case "Menu":
				return 0 
		  case "Events":
				return 1	
			case "Content":
        return 3
			default:
				return false   //something went wrong
		} 
	}

	//updated values to be sent if edited. PageType will be stored as a meaningful string, and switched back to 0-2 on submission
	const [editedPage,setEditedPage]=useState({...page,type:typeNumToString(page.type)}) 

	return page 
		? (
			<div style ={{borderRadius:"8px",border:"1px solid #6272a4",opacity:"0.9",backgroundColor:"#000000",
			position:"absolute", display:"flex",
			top:"0px",bottom:"0px",left:"0px",right:"0px",
			margin:"60px 200px 60px 200px",
			zIndex:"1" 
			}}>
			{isEditable
						?
						editedPage && 
				<div style ={{display:"flex", flexDirection:"column"}}>
					<input style={{color:"black"}}value={editedPage.title} onChange={(event)=>{
						setEditedPage({...editedPage,title:event.target.value})}}/>
					<input style={{color:"black"}}value={editedPage.description} onChange={(event)=>{
						setEditedPage({...editedPage,description:event.target.value})}}/>  {/**TODO enforce restrictions*/}
					<input style={{color:"black"}}value={editedPage.type} onChange={(event)=>{
						setEditedPage({...editedPage,type:event.target.value})}}/>

					<BiSave 
						onClick={async()=>{
							try{ 
								const updatedPage=await updatePage({...editedPage,type:typeStringToNum(editedPage.type)}) 
								setPages(pages.filter((page)=>page.id!==updatedPage.id).concat(updatedPage)) //remove old page, add updated
							} 
							catch{
								console.log("something failed")  //TODO notification
						}
							}}
						/>

				</div>
						:
				<div style ={{display:"flex", flexDirection:"column"}}>
					<OverlayAttribute attribute={"title"} value ={page.title}/>
					<OverlayAttribute attribute={"description"} value ={page.description}/>
					<OverlayAttribute attribute={"active"} value ={page.active}/>
					<OverlayAttribute attribute={"published on"} value ={page.publishedOn}/>
					<OverlayAttribute attribute={"type"} value ={typeNumToString(page.type)}/>
				</div>
				}
				<div style={{display:"flex", flexDirection:"column"}}>
					<AiOutlineCloseCircle 
						onClick={()=>{history.push("/admin")}}/>   {/*TODO wrap in button for accessibility */}
					<AiOutlineEdit style={{color:"white"}} 
						onClick={()=>{setIsEditable(!isEditable)}} />
			</div>
			</div>
			) 
		: (null) /*invalid url parameter*/
}

export default PageOverlay