import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
} from "reactstrap"

//redux
import withRouter from "components/Common/withRouter"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// actions

const UserProfile = () => {
  document.title = "Profile | Lexa-Admin-Profile"

  const admin = JSON.parse(localStorage.getItem("adminDetails"))
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")
  const [admins, setAdmin] = useState([])
  const { id } = useParams()
  const fileInputRef = React.createRef()

  useEffect(() => {
    if (!id) {
      console.error("Admin ID is undefined.")
      alert("missing id")
      return
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${id}`)
        const adminData = response.data
        setName(adminData.name)
        setEmail(adminData.email)
        setImagePreviewUrl(`http://localhost:8080/upload/${adminData.image}`)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id])

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleUpdate = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("image", image)
    try {
      await axios.put(`http://localhost:8080/admin/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      localStorage.setItem(
        "adminDetails",
        JSON.stringify({
          ...admins,
          id: id,
          name: name,
          email: email,
          image: imagePreviewUrl,
        }),
      )
      setAdmin(JSON.parse(localStorage.getItem("adminDetails")))
      toast.success(" updated successfull!")
    } catch (err) {
      toast.error("Something went wrong in updating.")
    }
  }
  return (
    <>
      <div className="page-content p-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={imagePreviewUrl || "default-placeholder.png"}
                        alt="Admin Avatar"
                        className="avatar-md rounded-circle img-thumbnail"
                        onClick={triggerFileInput}
                      />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{admin.name}</h5>
                        <p className="mb-1">{admin.email}</p>
                        <p className="mb-0">Id no: {admin.id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Admin Details</h4>

          <Card>
            <CardBody>
              <Form className="form-horizontal">
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="name"
                    value={name}
                    className="form-control"
                    placeholder="Enter Your Name"
                    onChange={e => setName(e.target.value)}
                    type="text"
                  />
                  <br />
                  <Input
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Email"
                    type="text"
                  />
                  <br />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger" onClick={handleUpdate}>
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default withRouter(UserProfile)
