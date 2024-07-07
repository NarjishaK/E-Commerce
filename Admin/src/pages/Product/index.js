import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setBreadcrumbItems } from "../../store/actions"
import { useForm } from "helpers/Utilities/useForms"
import {
  fetchCategories,
  fetchBrands,
  fetchProducts,
  createProduct,
  deleteProduct,
} from "./api-helperspage"

const UiCarousel = props => {
  document.title = "Products | Lexa"

  const breadcrumbItems = [
    { title: "Lexa", link: "/dashboard" },
    { title: "Products", link: "#" },
  ]

  const [modal, setmodal] = useState(false)
  const [productimage, setProductimage] = useState([])
  const [modal_standard, setmodal_standard] = useState(false)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])

  function tog_standard() {
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const [values, handleChange] = useForm({
    brand: "",
    category: "",
    price: "",
    offerpercentage: "",
    color: "",
    offerday: "",
    details: "",
    available: "",
    delivery: "",
  })

  //category,brand and proct listing
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const categoryData = await fetchCategories()
      setCategories(categoryData)
      const brandData = await fetchBrands()
      setBrands(brandData)
      const productData = await fetchProducts()
      setProducts(productData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleImage = e => {
    const selectedImage = Array.from(e.target.files)
    setProductimage(selectedImage)
  }

  //product create
  const handleCreate = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("brand", values.brand)
    formData.append("category", values.category)
    formData.append("price", values.price)
    formData.append("offerday", values.offerday)
    formData.append("offerpercentage", values.offerpercentage)
    formData.append("color", values.color)
    formData.append("available", values.available)
    formData.append("delivery", values.delivery)
    formData.append("details", values.details)
    for (let i = 0; i < productimage.length; i++) {
      formData.append("productimage", productimage[i])
    }
    try {
      const response = await createProduct(formData)
      alert("Success")
      console.log(response, "success")
      loadData() // Reload the data after creating a product
    } catch (err) {
      console.error(err)
      alert("Failed")
    }
  }
  //delete product
  const handleDelete = async id => {
    const confirmation = window.confirm(
      "Are you sure you want delete this product?",
    )
    if (confirmation) {
      try {
        await deleteProduct(id)
        loadData()
        alert("Success")
      } catch (err) {
        console.error(err)
        alert("Failed")
      }
    }
  }

  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleView = product => {
    setSelectedProduct(product)
    if (productimage) {
      setProductimage([productimage])
    } else {
      setProductimage([])
    }
    tog_standard()
  }

  useEffect(() => {
    props.setBreadcrumbItems("Products", breadcrumbItems)
  })

  //handleview
  // const handleView =async(id)=>{
  //   try {
  //     const response = await axios.get(`http://localhost:8080/product/${id}`)
  //     const productlist = response.data
  //     values.brand(productlist.brand)
  //     setProductimage(`http://localhost:8080/upload/${productlist.productimage}`)
  //   } catch (err) {
  //     console.log(err, "Something went wrong ")
  //   }

  // }

  return (
    <>
      <Card>
        <CardBody>
          <div>
            <Link
              onClick={() => {
                setmodal(!modal)
              }}
              to="#"
              className="popup-form btn btn-primary"
              style={{ width: "100%" }}
            >
              Create
            </Link>
          </div>

          <Modal
            size="lg"
            isOpen={modal}
            toggle={() => {
              setmodal(!modal)
            }}
          >
            <ModalHeader
              toggle={() => {
                setmodal(!modal)
              }}
            >
              Product create
            </ModalHeader>
            <ModalBody>
              <form>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="name">Product Name(category)</label>
                      <select
                        className="form-control"
                        value={values.category}
                        onChange={handleChange}
                        name="category"
                      >
                        <option>Select Category</option>
                        {categories.map(categorys => (
                          <option key={categorys.id}>
                            {categorys.product}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="brand">Brand</label>
                      <select
                        className="form-control"
                        value={values.brand}
                        name="brand"
                        onChange={handleChange}
                      >
                        <option>Select Category</option>
                        {brands.map(braand => (
                          <option key={braand.id}>{braand.brand}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="Color">Color</label>
                      <select value={values.color}
                        onChange={handleChange}
                        className="form-control"
                        name="color">
                          <option>Select color</option>
                          <option className="red">Red</option>
                          <option className="black">Black</option>
                          <option className="white">White</option>
                        </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="Price">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={values.price}
                        onChange={handleChange}
                        name="price"
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="availability"> Delivery</label>
                      <select
                        className="form-control"
                        value={values.delivery}
                        onChange={handleChange}
                        name="delivery"
                      >
                        <option>Delivery status</option>
                        <option>Available</option>
                        <option>Not Availble</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="availability">Product status</label>
                      <select
                        className="form-control"
                        value={values.available}
                        onChange={handleChange}
                        name="available"
                      >
                        <option>Status</option>
                        <option>Available</option>
                        <option>Limited stock</option>
                        <option>Sold Out</option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="offer">%Offer</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="%Offer "
                        value={values.offerpercentage}
                        onChange={handleChange}
                        name="offerpercentage"
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="offer day End">Offer day End</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Offer day End "
                        value={values.offerday}
                        onChange={handleChange}
                        name="offerday"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="subject">About Product</label>
                      <textarea
                        className="form-control"
                        id="subject"
                        rows="3"
                        value={values.details}
                        onChange={handleChange}
                        name="details"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="subject">Product Images</label>
                      <input
                        type="file"
                        style={{ width: "100%" }}
                        className="form-control"
                        accept="image/*"
                        onChange={handleImage}
                        multiple
                        color=""
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleCreate}
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>

      <Row>
        {products.map(product => (
          <Col lg={3} md={6} sm={12} key={product.id}>
            <Card>
              <CardBody>
                <Carousel showThumbs={false} infiniteLoop>
                  {product.productimage.map((img, index) => (
                    <div key={index}>
                      <img
                        src={`http://localhost:8080/upload/${img}`}
                        alt={`Product ${index}`}
                        style={{ height: "170px", width: "100%" }}
                      />
                    </div>
                  ))}
                </Carousel>
                <CardTitle className="h4">{product.category}</CardTitle>
                <p>{product.brand} </p>
                <p>{product.available} </p>

                <Col>
                  <div>
                    <button
                      style={{ width: "68%", marginRight: "2%" }}
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={() => handleView(product)}
                    >
                      Views
                    </button>
                    <Modal
                      isOpen={modal_standard}
                      toggle={() => {
                        tog_standard()
                      }}
                    >
                      <div
                        className="modal-header"
                        onClick={() => {
                          setmodal_standard(false)
                        }}
                      >
                        {selectedProduct && (
                          <h5 className="modal-title mt-0" id="myModalLabel">
                            {selectedProduct.category} Details
                          </h5>
                        )}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      {selectedProduct && (
                        <div className="modal-body">
                          <Col xl={12}>
                            <Card>
                              <CardBody>
                                <CardTitle className="h4">
                                  {selectedProduct.category} {" - "}
                                  {product.brand}
                                </CardTitle>
                                <p className="card-title-desc">
                                  {selectedProduct.color} color{" "}
                                  {selectedProduct.category} .
                                  {selectedProduct.details}{" "}
                                </p>
                                <p>
                                  Offer ends in {selectedProduct.offerday} days
                                  - Free shipping {selectedProduct.delivery}
                                </p>
                                <div className="popup-gallery">
                                  <h5 style={{ display: "flex" }}>
                                    Price{" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={12}
                                      height={15}
                                      fill="currentColor"
                                      className="bi bi-currency-rupee"
                                      viewBox="0 -1 12 13"
                                    >
                                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                    </svg>
                                    {selectedProduct.price} -{" "}
                                    <h5 style={{ color: "green" }}>
                                      {" "}
                                      Offer price{" "}
                                    </h5>{" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={12}
                                      height={15}
                                      fill="currentColor"
                                      className="bi bi-currency-rupee"
                                      viewBox="0 -1 12 13"
                                    >
                                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                    </svg>
                                    {selectedProduct.price -
                                      (
                                        (selectedProduct.price / 100) *
                                        selectedProduct.offerpercentage
                                      ).toFixed(2)}{" "}
                                  </h5>
                                  <p>Product {selectedProduct.available}</p>
                                  {selectedProduct.productimage.map(
                                    (imgs, index) => (
                                      <Link to="#" className="float-start">
                                        <div
                                          className="img-responsive"
                                          key={index}
                                        >
                                          <img
                                            src={`http://localhost:8080/upload/${imgs}`}
                                            alt={`Product ${index}`}
                                            width="120"
                                            height={120}
                                          />
                                        </div>
                                      </Link>
                                    ),
                                  )}
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        </div>
                      )}

                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={() => {
                            tog_standard()
                          }}
                          className="btn btn-secondary waves-effect"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                        >
                          Edit
                        </button>
                      </div>
                    </Modal>
                    <Button
                      style={{ width: "30%" }}
                      onClick={() => handleDelete(product._id)}
                    >
                      <svg
                        // width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </Button>
                  </div>
                </Col>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default connect(null, { setBreadcrumbItems })(UiCarousel)
