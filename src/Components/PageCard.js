import CardAttribute from "./CardAttribute"
import {GoTrashcan} from "react-icons/go"
import {BsFillEyeFill} from "react-icons/bs"
import {deletePage} from "../Functions/api_calls"
import {Link} from "react-router-dom"

const PageCard = ({setConfirmation, setNotification, page, pages, setPages}) => {
  /* Page card, displaying title and publishing date, rendered draggable in dropZone.js */
  const activeColor = page.isActive ? "#44475A" : "#777777" //dynamic appearance
  const opacity = page.isActive ? "1" : "0.65"

  return (
    <div style={{backgroundColor: activeColor, opacity: opacity}} className="pageCard">
      <div className="attributeContainer--card">
        <CardAttribute activity={page.isActive} attribute={"Title"} value={page.title} />
        <CardAttribute activity={page.isActive} attribute={"Published"} value={page.publishedOn.replace(/T.*/, "")} />
        {/*remove time-too much info*/}
      </div>

      <div
        style={{
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "12px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: activeColor,
        }}>
        <Link to={`/admin/${page.id}`}>
          <BsFillEyeFill style={{cursor: "pointer", fontSize: "20px", marginBottom: "20px"}} />
        </Link>
        <GoTrashcan
          style={{cursor: "pointer", fontSize: "20px"}}
          onClick={() =>
            setConfirmation({
              message: `Are you sure you want to delete ${page.title}?`,
              yesCallback: async () => {
                try {
                  const deletedID = await deletePage(page.id)
                  setPages(pages.filter((page) => page.id !== deletedID))
                  setNotification({message: "Page deleted successfully", color: "white"})
                } catch {
                  setNotification({message: "Something went wrong", color: "red"})
                }
                setConfirmation(null)
              },
              noCallback: () => {
                setConfirmation(null)
              },
            })
          }
        />
      </div>
    </div>
  )
}
export default PageCard
