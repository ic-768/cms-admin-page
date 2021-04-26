import CardAttribute from "./CardAttribute"
import { GoTrashcan } from "react-icons/go"
import { BsFillEyeFill } from "react-icons/bs"
import { deletePage } from "../API_calls/calls"
import { useHistory } from "react-router-dom"

const PageCard = ({ page, pages, setPages }) =>
{
	const activeColor = page.isActive ? "#44475A" : "#777777"
	const history = useHistory()
	return (
		<div style={{backgroundColor:activeColor } }
			className="pageCard">
			<CardAttribute activity={ page.isActive } attribute={ "Title" } value={ page.title } />
			<CardAttribute activity={ page.isActive } attribute={ "Published" } value={ page.publishedOn.replace(/T.*/, "") } />{/*remove time-too much info*/ }
			<div style={{backgroundColor: activeColor }}>
				<BsFillEyeFill style={{ cursor: "pointer", fontSize: "20px", marginRight: "16px" }}	/*TODO wrap icons in buttons to make accessible */
					onClick={() => { history.push(`/admin/${page.id}`) }}
				/>
				<GoTrashcan style={{ cursor: "pointer", fontSize: "20px" }}
					onClick={ async () =>
					{
						try{
							const deletedID = await deletePage(page.id)
							setPages(pages.filter((page) => page.id !== parseInt(deletedID)))
						}
						catch{
							console.log("Something went wrong") // TODO turn into notification
						}
					}}

				/>
			</div>
		</div>
	)
}
export default PageCard 