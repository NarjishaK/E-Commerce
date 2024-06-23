import React, { useEffect, useState } from "react"
import {
  Card,
  Col,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Modal,
  Input,
  Button,
} from "reactstrap"
import { setBreadcrumbItems } from "../../store/actions"
import { connect } from "react-redux"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

const Category = props => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Categories", link: "#" },
  ]

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  useEffect(() => {
    props.setBreadcrumbItems("Categories", breadcrumbItems)
  })

  const [modal_center, setmodal_center] = useState(false)
  const [modal_large, setmodal_large] = useState(false)
  const [product, setProduct] = useState("")
  const [Cimage, setCImage] = useState(null)
  const [category, setCategory] = useState([])
  const [editingProductId, setEditingProductId] = useState(null)

  function tog_center() {
    setmodal_center(!modal_center)
    removeBodyCss()
  }
  function tog_large() {
    setmodal_large(!modal_large)
    removeBodyCss()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories")
      if (Array.isArray(response.data)) {
        setCategory(response.data)
      } else {
        console.error("Expected an array but got:", response.data)
      }
    } catch (err) {
      console.log(err, "category listing failed")
    }
  }

  const handleDelete = async id => {
    const confirmation = window.confirm("Do you want to delete this category?")
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/categories/${id}`)
        toast.success("Deleted Successfull")
        fetchData()
      } catch (err) {
        console.log(err, "Something went wrong in delete")
        toast.error("Deleted failed")
      }
    }
  }

  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setCImage(selectedImage)
  }

  const handleEdit = async id => {
    try {
      const response = await axios.get(`http://localhost:8080/categories/${id}`)
      const categorylist = response.data
      setProduct(categorylist.product)
      setCImage(`http://localhost:8080/upload/${categorylist.Cimage}`)
      setEditingProductId(id)
      tog_center()
    } catch (err) {
      console.log(err, "Something went wrong ")
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append("product", product)
    formData.append("Cimage", Cimage)
    try {
      await axios.put(
        `http://localhost:8080/categories/${editingProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      toast.success("Updated Successfull")
      fetchData()
      setmodal_center(false)
    } catch (err) {
      console.log(err, "something went wrong in updation ")
      toast.error("Updated Successfull")
    }
  }

  const handleCreate = async () => {
    const formData = {
      product,
      Cimage,
    }
    try {
      await axios.post("http://localhost:8080/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toast.success("Created new category ")
    } catch (err) {
      console.log(err, "category created failed")
    }
  }

  return (
    <div>
      <ToastContainer />
      <Col>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              tog_large()
            }}
            data-toggle="modal"
            data-target=".bs-example-modal-lg"
            style={{ width: "100%" }}
          >
            CREATE NEW
          </button>
        </div>

        <Modal
          size="lg"
          isOpen={modal_large}
          toggle={() => {
            tog_large()
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myLargeModalLabel">
              CREATE NEW CATEGORY
            </h5>
            <button
              onClick={() => {
                setmodal_large(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Input
              type="text"
              placeholder="Product"
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
            <br />
            <Input
              type="file"
              placeholder="Image"
              accept="image/*"
              onChange={handleImage}
            />
            <br />
            <Button style={{ width: "100%" }} onClick={handleCreate}>
              CREATE
            </Button>
          </div>
        </Modal>
      </Col>
      <br />

      {/* ./// */}
      <Row>
        {category.map(lists => (
          <Col key={lists._id} mg={2} lg={6} xl={3}>
            <Card>
              <CardImg
                top
                className="img-fluid"
                style={{ height: "230px" }}
                src={`http://localhost:8080/upload/${lists.Cimage}`}
                alt="Lexa"
              />
              <CardBody>
                <CardTitle className="h4"> {lists.product}</CardTitle>
                <Col>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect"
                      style={{ width: "100%" }}
                      onClick={() => handleEdit(lists._id)}
                    >
                      EDIT
                    </button>
                  </div>
                  <Modal
                    isOpen={modal_center}
                    toggle={() => {
                      tog_center()
                    }}
                    centered={true}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title mt-0">Make Change</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setmodal_center(false)
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{ width: "100%" }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Input
                        type="text"
                        placeholder="Product"
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                      />
                      <br />
                      <Input
                        type="file"
                        placeholder="Image"
                        accept="image/*"
                        onChange={handleImage}
                      />
                      <br />
                      <Button style={{ width: "100%" }} onClick={handleUpdate}>
                        Update
                      </Button>
                      <br />
                      <br />
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => handleDelete(lists._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Modal>
                </Col>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default connect(null, { setBreadcrumbItems })(Category)
