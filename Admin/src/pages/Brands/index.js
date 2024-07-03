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
} from "reactstrap"
import axios from "axios"
import styles from "./brand.module.css"
function Brand() {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [modal_center, setmodal_center] = useState(false)
  const [modal_large, setmodal_large] = useState(false)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [Bimage, setBImage] = useState("")
  const [editingProductId, setEditingProductId] = useState(null)

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  function tog_center() {
    setmodal_center(!modal_center)
    removeBodyCss()
  }
  function tog_large() {
    setmodal_large(!modal_large)
    removeBodyCss()
  }

  //listing brand
  useEffect(() => {
    fetchData()
    fetchCategory()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/brand")
      setBrands(response.data)
    } catch (err) {
      console.log(err, "Brand Listing failed")
    }
  }
  //category list
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories")
      setCategories(response.data)
    } catch (err) {
      console.log(err, "category listing failed")
    }
  }
  //handle images
  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setBImage(selectedImage)
  }

  //handle edit
  const handleEdit = async id => {
    try {
      const response = await axios.get(`http://localhost:8080/brand/${id}`)
      const Branditem = response.data
      setCategory(Branditem.category)
      setBrand(Branditem.brand)
      setBImage(`http://localhost:8080/upload/${Branditem.Bimage}`)
      setEditingProductId(id)
    } catch (err) {
      console.log(err, "something went wrong in editing")
    }
  }

  //handle create brand
  const handleCreate = async () => {
    const formData = {
      brand,
      category,
      Bimage,
    }
    try {
      await axios.post("http://localhost:8080/brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("success")
    } catch (err) {
      console.log(err, "brand created failed")
      alert("failed")
    }
  }
  //handle update
  const handleUpdate = async () => {
    const formData = {
      brand,
      category,
      Bimage,
    }
    try {
      await axios.put(
        `http://localhost:8080/brand/${editingProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      fetchData()
      alert("success")
    } catch (err) {
      console.log(err, "an error occured in updation")
      alert("failed")
    }
  }
  //handle delete
  const handleDelete = async () => {
    const confirmation = window.confirm("Do you want delete this brand")
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/brand/${editingProductId}`)
        fetchData()
        alert("deleted")
      } catch (err) {
        console.log(err, "an error occured in brand delete")
      }
    }
  }
  return (
    <div>
      <Col>
        <div
          className="text-center"
          onClick={() => {
            tog_large()
          }}
        >
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            data-toggle="modal"
            data-target=".bs-example-modal-lg"
            onClick={() => {
              tog_large()
            }}
            style={{ width: "100%" }}
          >
            CREATE NEW BRAND
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
              NEW BRAND
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
              placeholder="Brand"
              type="text"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
            <br />
            <select
              className={styles.options}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(category => (
                <option>{category.product}</option>
              ))}
            </select>
            <br />
            <Input type="file" accept="image/*" onChange={handleImage} />
            <br />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Create
              </button>
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button> */}
            </div>
          </div>
        </Modal>
      </Col>
      <br />
      {/* //create end */}
      <Row>
        {brands.map(brandlist => (
          <Col mg={2} lg={6} xl={3}>
            <Card>
              <CardImg
                top
                className="img-fluid"
                src={`http://localhost:8080/upload/${brandlist.Bimage}`}
                alt="Lexa"
                style={{height:"230px"}}
              />
              <CardBody>
                <CardTitle className="h4">{brandlist.brand}</CardTitle>
                <Col>
                  <div
                    className="text-center"
                    onClick={() => {
                      tog_center()
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                      data-toggle="modal"
                      data-target=".bs-example-modal-center"
                      style={{ width: "100%" }}
                      onClick={() => handleEdit(brandlist._id)}
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
                      <p>Edit your brand</p>
                      <button
                        type="button"
                        onClick={() => {
                          setmodal_center(false)
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Input
                        placeholder="Brand"
                        type="text"
                        name="brand"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                      />
                      <br />
                      <select
                        className={styles.options}
                        value={category}
                        name="category"
                        onChange={e => setCategory(e.target.value)}
                      >
                        {categories.map(category => (
                          <option>{category.product}</option>
                        ))}
                      </select>
                      <br />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                      />
                      <br />
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleUpdate}
                        >
                          Save changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={() => handleDelete(brandlist._id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default Brand
