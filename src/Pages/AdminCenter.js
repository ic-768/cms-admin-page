import {useState,useEffect} from "react"
import {BiAddToQueue} from "react-icons/bi"
import {IoIosArrowDropdown} from "react-icons/io"
import {useHistory} from "react-router-dom" 
import {Route,useLocation} from "react-router-dom"
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"

import PageCard from "../Components/PageCard"
import PageOverlay from "../Components/PageOverlay"
import NewOverlay from "../Components/NewOverlay"
import {updatePage} from "../API_calls/calls"

const AdminCenter = ({setPages,pages}) => { 
const history = useHistory()	

const [focusedPageID,setFocusedPageID]=useState(null)
const [filterQuery,setFilterQuery]=useState("")
const [filterAttribute,setFilterAttribute]=useState("title") // filter by title or description
const [filteredResults,setFilteredResults]=useState(pages) //which pages to show

const currPath=useLocation() 

useEffect(()=>{ //get ID parameter from url
	setFocusedPageID(
		currPath.pathname.match(/.*\/(\d+)/)
		? parseInt(currPath.pathname.match(/.*\/(\d+)/)[1]) || null
		: null 
	) 
},[currPath])

useEffect(()=>{
	pages && setFilteredResults(filterPages(pages,filterQuery,filterAttribute))// show page only if query contained in the title 
	},[pages,filterQuery,filterAttribute])

const filterPages=(pages,query,attribute)=>{
	return attribute === "title" 
		? pages.filter((page)=>page.title.includes(query)) //by title
		: pages.filter((page)=>page.description.includes(query))  //by description
}

return(
	<div className="PageContainer"style={{display:"flex"}}>
		<div className="sideBar" >
			<h2 style={{margin:"10px"}}>Filter by 
				<div className="dropdown">
					<button className="dropbtn">
						{filterAttribute}
						<IoIosArrowDropdown style={{marginLeft:"10px"}}/>
					</button>
			  	<div className="dropdown-content">
  					<div onClick={()=>{setFilterAttribute("title")}}>Title</div>
  					<div onClick={()=>{setFilterAttribute("description")}}>Description</div>
 		 			</div>
				</div>
			</h2>
		<input style={{height:"25px",margin:"5px",color:"black"}}
			value={filterQuery}
			onChange={(event)=>{setFilterQuery(event.target.value)}}/>
			<BiAddToQueue style={{ alignSelf:"center",marginTop:"auto",marginBottom:"10px"}} size={70}
			onClick={()=>{ history.push("/admin/new") }}/>
		</div> 


<div style={{flexGrow:"1",display:"flex",alignItems:"center",flexDirection:"column"}}> 
			<div style={{display:"flex"}}> 
					<DragDropContext 
					onDragEnd={async(result)=>{
						if (!result.destination){return}  // dragged outside valid areas
							const draggedId=result.draggableId.match(/\d+/)[0] // item id
							const targetPage=pages.filter((page)=>page.id===parseInt(draggedId))[0]
							const itemActivity=result.draggableId.match(/\d+ (.*)/)[1] // item currently active or inactive
							const destActivity=result.destination.droppableId // area dragged to

							if (itemActivity ==="active" && destActivity ==="inactive" ) { // set inactive
								try{ 
									const updatedPage=await updatePage({...targetPage,isActive:false})  
									setPages((pages.filter((page)=>page.id!==parseInt(draggedId)).concat(updatedPage)))
								}
								catch{
									console.log("error") // TODO notifications
								}
							} 
							else if  (itemActivity==="inactive" && destActivity ==="active"){ //set active
								try{
									const updatedPage=await updatePage({...targetPage,isActive:true})
									setPages((pages.filter((page)=>page.id!==parseInt(draggedId)).concat(updatedPage)))
								}
								catch{
									console.log("error") // TODO notifications
								}
						}
							return 
						}}>

						{/*area for active pages */ }
						<Droppable droppableId={ "active" }>
							{ (provided, snapshot) =>
							{
								return (
									<div className="dragArea--active" style={ {
										border:"1px solid white",
										margin: "15px",
										flexWrap: "wrap", display: "flex", borderRadius: "10px",
										minHeight: "500px", minWidth: "500px", justifyContent: "center"
									} }
										{ ...provided.droppableProps }
										ref={ provided.innerRef }
									>
										{ filteredResults && filteredResults.map((page, i) => //TODO there's definitely a way to optimise the sorting 
										{
											return <Draggable key={page.id.toString()} draggableId={`${page.id.toString()} active`} index={ i }> 
												{ (provided, snapshot) =>
														<div
															ref={ provided.innerRef }
															{ ...provided.draggableProps }
															{ ...provided.dragHandleProps } >
															{page.isActive && <PageCard page={ page } pages={ page } setPages={ setPages }
																key={ `${page.id.toString()}${i}` } />}
														</div> 
												 }
											</Draggable> 
										}
										) } 
								{provided.placeholder}
									</div> 
								) 
							} }
						</Droppable> 
						{/*area for inactive pages */ }
						<Droppable droppableId={ "inactive" }>
							{ (provided, snapshot) =>
							{
								return (
									<div className="dragArea--inactive" style={ {
										border:"1px solid white",
										margin: "15px",
										flexWrap: "wrap", display: "flex", borderRadius: "10px",
										minHeight: "500px", minWidth: "500px", justifyContent: "center"
									} }
										{ ...provided.droppableProps }
										ref={ provided.innerRef }
									>
										{ filteredResults && filteredResults.map((page, i) =>
										{//TODO there's definitely a way to optimise the sorting 
											return <Draggable key={page.id.toString()} draggableId={`${page.id.toString()} inactive`} index={ i }> 
												{ (provided, snapshot) =>
												{
													return (
														<div
															ref={ provided.innerRef }
															{ ...provided.draggableProps }
															{ ...provided.dragHandleProps } >
															{!page.isActive && <PageCard page={ page } pages={ page } setPages={ setPages }
																key={ `${page.id.toString()}${i}` } />}
														</div>
													)
												} }
											</Draggable> 
										}
										) } 
								{provided.placeholder}
									</div> 
								) 
							} }
						</Droppable> 
					</DragDropContext>
				</div>
			</div>

			<Route path="/admin/new"> {/*add new page */ }
				<NewOverlay setPages={ setPages } />
			</Route>

			<Route path="/admin/:id"> {/*view / edit page*/ }
				{
					pages && focusedPageID &&
					<PageOverlay page={ pages.filter((page) => page.id === focusedPageID)[ 0 ] }
						pages={ pages } setPages={ setPages }
					/>
				}
			</Route>
		</div>
	)
}
export default AdminCenter
