import React, { useEffect, useState } from "react"
import { Button, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

function Inbox() {
  const [admin, setAdmin] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin")
      setAdmin(response.data)
    } catch (err) {
      console.log(err,"admin list failed")
    }
  }

  const handleDelete =async(id)=>{
    const confirmation =window.confirm("Are you sure you want to delete this admin admin?")
    if(confirmation){
    try{
        await axios.delete(`http://localhost:8080/admin/${id}`)
        fetchData();
        toast.success("admin deleted succefull")
    }catch(err){
        console.log(err,"deletation failed");
        toast.error("something went wrong!!!!!")
    }
}
  }
  const [status ,setStatus]=useState("")
  const newAdmin =JSON.parse(localStorage.getItem("adminDetails"))
  if (!status || newAdmin.email !== status.email) {
    setStatus(newAdmin);
  }
  return (
    <>
      <Card>
        <ToastContainer/>
        <CardBody>
          <h4 className="card-title mb-3">Admins</h4>
          <div className="inbox-wid">
            {admin.map(admins => (
              <Link to="#" className="text-dark">
                <div className="inbox-item">
                  <div className="inbox-item-img float-start me-3">
                    <img
                      src={`http://localhost:8080/upload/${admins.image}`}
                      className="avatar-sm rounded-circle"
                      alt=""
                    />
                  </div>
                  <h6 className="inbox-item-author mb-1 font-size-16">
                    {admins.name}
                  </h6>
                  <p className="inbox-item-text text-muted mb-0">
                    {admins.email}
                  </p>
                  <p><i className="mdi mdi-checkbox-blank-circle " style={{ color: status?.email === admins.email ? "green" : "red" }}>
                  </i> {status?.email === admins.email ? "Online" : "Offline"}</p>
                  <p className="inbox-item-date text-muted">
                    <Button color="secondary" size="sm" onClick={()=>handleDelete(admins._id)}>
                      Delete
                    </Button>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Inbox
