import { useState, useEffect } from "react"
import { Route, useLocation } from "react-router-dom"
import { DragDropContext} from "react-beautiful-dnd"

import DropZone from "../Components/DropZone"
import PageOverlay from "../Components/PageOverlay"
import NewOverlay from "../Components/NewOverlay"
import Banner from '../Components/Banner'
import Notification from '../Components/Notification'
import { updatePage } from "../Functions/api_calls"

const AdminCenter = ({ setPages, pages }) => { 
	const [ focusedPageID, setFocusedPageID ] = useState(null) //page to view or edit
	const [ filterQuery, setFilterQuery ] = useState("")
	const [ filteredResults, setFilteredResults ] = useState(pages) //which pages to show 
	const [notification,setNotification]=useState(null) // if notification to be shown, will be object {message:,color:}

	const currPath = useLocation()
	const backgroundImage="/bg.jpg"

	useEffect(() =>{ //get ID parameter from url
		setFocusedPageID(
			currPath.pathname.match(/.*\/(\d+)/)
				? parseInt(currPath.pathname.match(/.*\/(\d+)/)[ 1 ]) || null //
				: null
		)
	}, [ currPath ])

	useEffect(() =>{
		pages && setFilteredResults(filterPages(pages, filterQuery))// show page only if search query contained in the title 
	}, [ pages, filterQuery ])

	useEffect(()=>{ //Turn off notification after 3 sec 		
		if(notification){ 			
			setTimeout(() => {
				setNotification(null)}, 3000)
		} 	
	},[notification])

	const filterPages = (pages, query) => // filter by title and description
		pages.filter((page) => page.title.toLowerCase().includes(query.toLowerCase()) || 
			page.description.toLowerCase().includes(query.toLowerCase())) 

	return (
		<>
{notification && <Notification message={notification.message} color={notification.color}/>}
			<Banner filterQuery={ filterQuery } setFilterQuery={ setFilterQuery } username="Ioannis"/> 
			<div className="PageContainer" style={{ 
				backgroundImage:`url(${backgroundImage})`, 
				}}>
					<div className="dropZoneRow"> 
						<DragDropContext //context for drag interactions
							onDragEnd={ async (result) => 
							{
								if (!result.destination) {return}  // dragged outside valid areas
								const draggedId = result.draggableId.match(/\d+/)[ 0 ] // item id
								const targetPage = pages.filter((page) => page.id === parseInt(draggedId))[ 0 ] //get page by id
								const itemActivity = result.draggableId.match(/\d+ (.*)/)[ 1 ] // item currently active or inactive
								const destActivity = result.destination.droppableId // which area item was dragged to

								if (itemActivity === "active" && destActivity === "inactive") { // set inactive
									try {
										const updatedPage = await updatePage({ ...targetPage, isActive: false,publishedOn:new Date()}) //TODO doesn't work if same day
										setPages((pages.filter((page) => page.id !== parseInt(draggedId)).concat(updatedPage)))
									}
									catch{
										setNotification({message:"Something went wrong",color:"red"})
									}
								}
								else if (itemActivity === "inactive" && destActivity === "active") { //set active
									try {
										const updatedPage = await updatePage({ ...targetPage, isActive: true,publishedOn: new Date() })
										setPages((pages.filter((page) => page.id !== parseInt(draggedId)).concat(updatedPage)))
									}
									catch{
										setNotification({message:"Something went wrong",color:"red"})
									}
								}
								return
							} }> 

							{/*two droppable areas - toggle active or inactive page */}
						<div className="dropZoneContainer">
							<h2 style={ { marginRight: "auto" } }>Active pages</h2>
							<DropZone setNotification={ setNotification } droppableId={ "active" } pages={ pages }
								setPages={ setPages } filteredResults={ filteredResults } />
						</div>
						<div className="dropZoneContainer">
							<h2 style={ { marginRight: "auto" } }>Inactive pages</h2>
							<DropZone setNotification={ setNotification } droppableId={ "inactive" } pages={ pages }
								setPages={ setPages } filteredResults={ filteredResults } />
						</div>
						</DragDropContext>
					</div>

				<Route path="/admin/new"> {/*add new page */ }
					<NewOverlay setNotification={setNotification} pages={pages}setPages={ setPages } />
				</Route>

				<Route path="/admin/:id"> {/*view / edit page*/ }
					{ pages && focusedPageID &&
						<PageOverlay setNotification={setNotification} page={ pages.filter((page) => page.id === focusedPageID)[ 0 ] } //find focused page by id
							pages={ pages } setPages={ setPages }
						/> }
				</Route>
			</div>
		</>
	)
}
export default AdminCenter 