import {IoIosArrowDropdown} from "react-icons/io"
import PageCard from "../Components/PageCard"
import {useState,useEffect} from "react"
import {useRouteMatch} from "react-router-dom"

const AdminCenter = ({pages}) => { 

const focusedPage = useRouteMatch('/admin/:id') //TODO use parameterised url to edit a page
console.log(focusedPage)

const [filterQuery,setFilterQuery]=useState("")
const [filterAttribute,setFilterAttribute]=useState("title") // filter by title or description
const [filteredResults,setFilteredResults]=useState(pages) //which pages to show

const filterPages=(pages,query,attribute)=>{
	return attribute === "title" 
		? pages.filter((page)=>page.title.includes(query)) //by title
		: pages.filter((page)=>page.description.includes(query))  //by description
}

useEffect(()=>{
	pages && setFilteredResults(filterPages(pages,filterQuery,filterAttribute))// show page only if query contained in the title 
	},[pages,filterQuery,filterAttribute])

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
		<div style={{flexWrap:"wrap",padding:"100px",display:"flex"}}>
			{filteredResults && filteredResults.map((page,i)=>
			<PageCard page={page} key ={`${page.title}${i}`}/>
			)} 
		</div> 
	</div> 
)
}
export default AdminCenter