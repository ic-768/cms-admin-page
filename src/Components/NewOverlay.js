import {useHistory, Link} from "react-router-dom"
import {useState} from "react"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {postPage} from "../Functions/api_calls"
import Calendar from "react-calendar"

const NewOverlay = ({setNotification, pages, setPages}) => {
  /*form for creating a new page */
  const history = useHistory()
  const [newPage, setNewPage] = useState({title: "", description: "", type: null, publishedOn: new Date()})

  return (
    <div className="formContainer">
      <div className={"form__title"}>
        <h3 style={{marginLeft: "20px", whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis"}}>
          New Page
        </h3>
        <Link
          style={{
            marginLeft: "auto",
            marginRight: "15px",
            justifySelf: "flex-end",
            alignSelf: "flex-end",
            marginTop: "5px",
          }}
          to="/admin">
          <AiOutlineCloseCircle size={"30px"} />
        </Link>
      </div>

      <div className={"form__content--new"}>
        <h2 className="form__label--left">Title *</h2>
        <input
          maxLength="50"
          className={"form__input--text"}
          placeholder={"Title (max 50 chars)"}
          value={newPage.title}
          onChange={(event) => {
            setNewPage({...newPage, title: event.target.value})
          }}
        />
        {/*update title*/}
        <h2 className="form__label--left">Description </h2>
        <div style={{width: "100%"}}>
          <textarea
            maxLength="200"
            className={"form__input--text"}
            placeholder={"Description (max 200 chars)"}
            value={newPage.description}
            onChange={(event) => {
              setNewPage({...newPage, description: event.target.value})
            }}
          />
          {/*update description*/}
        </div>
        <h2 className={"form__label--center"} style={{marginTop: "20px", marginBottom: "10px"}}>
          Type *
        </h2>
        <div>
          <form className={"radioForm"}>
            <div className="radioContainer">
              <input
                type="radio"
                value="0"
                id="Menu"
                onChange={(e) => {
                  /*update type*/
                  setNewPage({...newPage, type: parseInt(e.target.value)})
                }}
                name="Type"
              />
              <label className={"radio__label"}>Menu</label>
            </div>

            <div className="radioContainer">
              <input
                type="radio"
                value="1"
                id="Events"
                onChange={(e) => {
                  setNewPage({...newPage, type: parseInt(e.target.value)})
                }}
                name="Type"
              />
              <label className={"radio__label"}>Events</label>
            </div>

            <div className="radioContainer">
              <input
                type="radio"
                value="2"
                id="Content"
                onChange={(e) => {
                  setNewPage({...newPage, type: parseInt(e.target.value)})
                }}
                name="Type"
              />
              <label className={"radio__label"}>Content</label>
            </div>
          </form>
        </div>
        <h2 className={"form__label--center"} style={{marginTop: "20px", marginBottom: "10px"}}>
          Deployment Date *
        </h2>
        <Calendar
          value={newPage.publishedOn}
          onChange={(date) => {
            setNewPage({...newPage, publishedOn: date})
          }}
        />
        <div style={{width: "100%"}}>
          <button
            className="saveButton"
            onClick={async () => {
              if (newPage.type === null || !newPage.title.trim()) {
                setNotification({message: "Please provide all requested information", color: "red"})
                return
              }
              if (newPage.publishedOn < new Date()) {
                setNotification({message: "Please provide a valid future date", color: "red"})
                return
              }

              try {
                const updatedPage = await postPage(newPage)
                setPages(pages.concat(updatedPage)) // add updated page
                setNotification({message: "Page added successfully", color: "white"})
                history.push("/admin")
              } catch {
                setNotification({message: "Something went wrong", color: "red"})
              }
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewOverlay
