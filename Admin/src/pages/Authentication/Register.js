import React, { useState } from "react"
// Formik Validation

import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"

//redux

import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap"
import { useForm } from "helpers/Utilities/useForms"
import axios from "axios"

const Register = props => {
  const navigate = useNavigate()
  const [image, setImage] = useState("")

  const [value, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
  })
  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", value.name)
      formData.append("password", value.password)
      formData.append("email", value.email)
      formData.append("image", image)

      const response = await axios.post(
        "http://localhost:8080/admin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      alert("success")
      console.log(response.data)
      navigate("/login")
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      } else {
        console.error(err, "Something went error on your form subimit")
      }
    }
  }

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        src={logoDark}
                        alt=""
                        height="30"
                        className="auth-logo-dark"
                      />
                      <img
                        src={logoLight}
                        alt=""
                        height="30"
                        className="auth-logo-light"
                      />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      {" "}
                      Register
                    </h4>
                    <p className="text-muted text-center">
                      Admin account for Electronics
                    </p>
                    <Form className="form-horizontal mt-4">
                      <div className="mb-3">
                        <Label htmlFor="useremail">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={handleChange}
                          value={value.email}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          name="name"
                          value={value.name}
                          type="text"
                          placeholder="Enter username"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          value={value.password}
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="image"
                          type="file"
                          accept="Image/*"
                          onChange={handleImage}
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-12 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            onClick={handleSubmit}
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="text-primary">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Register
