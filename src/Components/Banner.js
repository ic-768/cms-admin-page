import {FiUser} from 'react-icons/fi'
import {BsSearch} from 'react-icons/bs'
import {GoFlame} from 'react-icons/go'
import {BsGraphUp} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'
import {Link} from "react-router-dom"

const Banner = ({filterQuery, setFilterQuery, username}) => (
  <div className="banner">
    <div style={{width: "70%"}}>
      <h3 style={{justifySelf: "center"}}>Admin Dashboard</h3>
    </div>
    <div className="banner__iconContainer">
      <Link style={{height: "100%"}} to="/admin/new">
        <BiAddToQueue className="banner__icon" size={"40px"} />
      </Link>
      <div style={{height: "100%"}} className="dropdown">
        <BsSearch className="banner__icon dropbtn" size={"30px"} />
        {/*TODO not sure how to make this accessible without mouse*/}
        <div className="dropdown-content">
          <input
            style={{marginTop: "-1px"}}
            placeholder={"Filter"}
            value={filterQuery}
            onChange={(event) => {
              setFilterQuery(event.target.value)
            }}
          />
        </div>
      </div>

      <GoFlame className="banner__icon" size={"30px"} />
      <BsGraphUp className="banner__icon" size={"30px"} />
      <FiUser className="banner__icon" size={"30px"} />

      <h3 style={{marginLeft: "20px"}}>{username}</h3>
    </div>
  </div>
)



export default Banner