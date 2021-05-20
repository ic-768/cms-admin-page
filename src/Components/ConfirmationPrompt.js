const ConfirmationPrompt = ({message, yesCallback, noCallback}) => (
  <div className="confirmationPrompt">
    <div>
      <h1 style={{marginTop: "20px"}}>{message}</h1>
    </div>
    <div style={{marginTop: "auto"}}>
      <button
        className="yesButton"
        onClick={() => {
          yesCallback()
        }}>
        Yes
      </button>
      <button
        className="noButton"
        onClick={() => {
          noCallback()
        }}>
        No
      </button>
    </div>
  </div>
)

export default ConfirmationPrompt
