import {useHistory} from "react-router-dom"
import {useState} from "react"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {BiSave} from "react-icons/bi" 
import {postPage} from '../API_calls/calls' 

const NewOverlay=({page,pages,setPages})=>{
	const history=useHistory() 
	const [newPage,setNewPage]=useState({title:"",description:"",type:0,})

	return  (
			<div style ={{borderRadius:"8px",border:"1px solid #6272a4",opacity:"0.9",backgroundColor:"#000000",
			position:"absolute", display:"flex",
			top:"0px",bottom:"0px",left:"0px",right:"0px",
			margin:"60px 200px 60px 200px",
			zIndex:"1" 
			}}>
				<div style ={{display:"flex", flexDirection:"column"}}>
					<input style={{color:"black"}}value={newPage.title} onChange={(event)=>{
						setNewPage({...newPage,title:event.target.value})}}/>
					<input style={{color:"black"}}value={newPage.description} onChange={(event)=>{
						setNewPage({...newPage,description:event.target.value})}}/>  {/**TODO enforce restrictions*/}
					<input style={{color:"black"}}value={newPage.type} onChange={(event)=>{
						setNewPage({...newPage,type:event.target.value})}}/> 
					<BiSave 
						onClick={async()=>{
							try{ 
								const updatedPage=await postPage({...newPage,type:0})/*TODO fix type, extract function from other overlay*/
								setPages(pages.concat(updatedPage)) // add updated TODO internal server error...
							} 
							catch{
								console.log("something failed")  //TODO notification
						}
							}}
						/> 
				</div>
				
				<div style={{display:"flex", flexDirection:"column"}}>
					<AiOutlineCloseCircle 
						onClick={()=>{history.push("/admin")}}/>   {/*TODO wrap in button for accessibility */}
			</div>
			</div>
			) 
}

export default NewOverlay