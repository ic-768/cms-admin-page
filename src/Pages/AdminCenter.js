import {IoIosArrowDropdown} from "react-icons/io"
import PageCard from "../Components/PageCard"
import PageOverlay from "../Components/PageOverlay"
import NewOverlay from "../Components/NewOverlay"
import {useState,useEffect} from "react"
import {BiAddToQueue} from "react-icons/bi"
import {useHistory} from "react-router-dom"

import {Route,useLocation} from "react-router-dom"


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
		</div> 


<div style={{flexGrow:"1",display:"flex",alignItems:"center",flexDirection:"column"}}> 
			<BiAddToQueue style={{ marginTop:"10px"}} size={70}
			onClick={()=>{ history.push("/admin/new") }}/>

			<div style={{display:"flex"}}> 

			{/*Green area for active pages */}
				<div className="dragArea--active" style={{backgroundColor:"rgba(0, 255, 0, 0.15)",margin:"15px",
				flexWrap: "wrap",  display: "flex", borderRadius:"10px",
				minHeight:"500px",minWidth:"500px",justifyContent:"center"}}>
					{ filteredResults && filteredResults.map((page, i) => //TODO there's definitely a way to optimise the sorting
						page.isActive && <PageCard page={page} pages={page} setPages={setPages} key={ `${page.title}${i}` } />
					) }
				</div>

			{/*Red area for inactive pages */}
				<div className="dragArea--inactive" style={{backgroundColor:"rgba(255, 0, 0, 0.15)", borderRadius:"10px",
					flexWrap: "wrap", margin:"15px",display: "flex",justifyContent:"center",minHeight:"500px",minWidth:"500px"}}>
					{ filteredResults && filteredResults.map((page, i) => 
						!page.isActive && <PageCard page={page} pages={page} setPages={setPages} key={ `${page.title}${i}` } />
					) }
				</div> 
			</div> 
	</div>

			<Route path="/admin/new"> {/*add new page */}
					<NewOverlay setPages={setPages} /> 
			</Route>

			<Route path="/admin/:id"> {/*view / edit page*/}
				{
					pages && focusedPageID &&
					<PageOverlay page={ pages.filter((page) => page.id === focusedPageID)[0] }
						pages={pages} setPages={setPages}
					/>
				}
			</Route>
		</div>
	)
}
export default AdminCenter
