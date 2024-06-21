import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Form,
} from "reactstrap"
import { Link, useParams } from "react-router-dom"

// import images
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"
import axios from "axios"

const LockScreen = () => {
  document.title = "Lockscreen | Lexa "
  const admin = JSON.parse(localStorage.getItem("adminDetails"))
  const [password, setPasswod] = useState("")
  const { id } = useParams("")
  const handleUnlock = async e => {
    e.preventDefault()
    try {
      const respons = await axios.post(
        `http://localhost:8080/admin/unlockPassword/${id}`,
        { password },
      )
      console.log(respons.data)
      alert("success")
      window.location.href = "/dashboard"
    } catch (err) {
      console.error(err.response.data) // Better error handling
      alert("Failed to unlock: " + err.response.data.message)
    }
  }

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6" xl="5">
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
                        src={logoLightPng}
                        alt=""
                        height="30"
                        className="auth-logo-light"
                      />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Locked
                    </h4>
                    <p className="text-muted text-center">{`Hello ${admin.name}, enter your password to unlock the screen!`}</p>
                    <Form className="form-horizontal mt-4">
                      <div className="user-thumb text-center mb-4">
                        <img
                          src={admin.image}
                          className="rounded-circle avatar-md img-thumbnail"
                          alt="thumbnail"
                        />
                        <h6 className="font-size-16 mt-3">{admin.name}</h6>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="userpassword">Password</label>
                        <Input
                          name="password"
                          className="form-control"
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={e => setPasswod(e.target.value)}
                        />
                      </div>

                      <div className="mb-3 row">
                        <div className="col-12 text-end">
                          <Button
                            color="primary"
                            className="w-md waves-effect waves-light"
                            type="submit"
                            onClick={handleUnlock}
                          >
                            Unlock
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Not you ? return{" "}
                  <Link to="/login" className=" text-primary">
                    {" "}
                    Sign In{" "}
                  </Link>{" "}
                </p>
                <p>© 2024 Lexa. Crafted by Narjisha</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default LockScreen
