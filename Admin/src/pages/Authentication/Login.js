import React from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Form,
  // Alert,
  Input,
} from "reactstrap"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

// Formik validation
import withRouter from "components/Common/withRouter"

// actions
import { socialLogin } from "../../store/actions"
import { useForm } from "helpers/Utilities/useForms"
import axios from "axios"

const Login = props => {
  // const navigate =useNavigate("")
  const [value, handleChange] = useForm({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: value.email,
      password: value.password,
    }
    await axios
      .post("http://localhost:8080/admin/signin", data)
      .then(response => {
        if (response.status === 200) {
          alert("ok")
          const token = response.data.token
          localStorage.setItem("token", token)
          const adminDetails = response.data.adminDetails
          localStorage.setItem("adminDetails", JSON.stringify(adminDetails))
          console.log("token stored in Local storage")
          window.location.href = "/dashboard"
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log(err.response.data.message)
        } else {
          console.log(err.message, "something went wrong")
        }
      })
  }

  const dispatch = useDispatch()



  const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate))
  }

  //for facebook and google authentication
  const socialResponse = type => {
    signIn(type)
  }

  return (
    <React.Fragment>
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
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue to Lexa.
                    </p>
                    <Form className="form-horizontal mt-4">
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
                      <div className="mb-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={value.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          value={value.password}
                          type="password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                        />
                      </div>
                      <Row className="mb-3 mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            onClick={handleSubmit}
                          >
                            Log In
                          </button>
                        </div>
                      </Row>
                      <Row className="form-group mb-0">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </Link>
                        <div className="col-12 mt-4 d-flex justify-content-center">
                          <Link
                            to="#"
                            className="social-list-item bg-danger text-white border-danger"
                            onClick={e => {
                              e.preventDefault()
                              socialResponse("google")
                            }}
                          >
                            <i className="mdi mdi-google" />
                          </Link>
                        </div>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Don't have an account ?{" "}
                  <Link to="/register" className="text-primary">
                    {" "}
                    Signup Now{" "}
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
