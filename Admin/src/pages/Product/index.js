import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

// Carousel
import Slidewithcontrol from "pages/Ui/CarouselTypes/slidewithcontrol"

import { connect } from "react-redux"
import { Link } from "react-router-dom"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import axios from "axios"
//homoram
const UiCarousel = props => {
  document.title = "Products | Lexa"

  const breadcrumbItems = [
    { title: "Lexa", link: "/dashboard" },
    { title: "Products", link: "#" },
  ]

  const [modal, setmodal] = useState(false)
  const [brand,setBrand]=useState('')
  const [category,setCategory] =useState("")
  const [productimage,setProductimage] =useState("")
  const [price,setPrice] =useState("")
  const [offerpercentage,setOfferpercentage]=useState("")
  const [color,setColor]=useState("")
  const[offerday,setOfferday] =useState("")
  const[details,setDetails] =useState("")
  const[available,setAvailable] =useState("")
  const[delivery,setDelivery] =useState("")
  const [categories,setCategories]=useState([])
  const [brands,setBrands]=useState([])

  useEffect(()=>{
    fetchCategory()
    fetchBrand()
  },[])
  //category
  const fetchCategory =async()=>{
    try{
      const response = await axios.get('http://localhost:8080/categories')
      setCategories(response.data)
    }catch(err){console.log(err,'category listing error');}
  }
  //brand
  const fetchBrand =async()=>{
    try{
      const response = await axios.get('http://localhost:8080/brand')
      setBrands(response.data)
    }catch(err){console.log(err,'brands listing error');}
  }
//handleimage
const handleImage = e => {
  const selectedImage = e.target.files[0]
  setProductimage(selectedImage)
}
//handlecrate
const handleCreate =async(e)=>{
  e.preventDefault();
  const formData ={
    brand,
    category,
    price,
    offerday,
    offerpercentage,
    productimage,
    color,
    available,
    delivery,
    details
  }
  try{
    const response = await axios.post('http://localhost:8080/product',formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    alert('success')
    console.log(response.data,"success");
  }catch(err){console.log(err,"something wentv wrong in product create");
    alert('failed')
  }
}
  useEffect(() => {
    props.setBreadcrumbItems("Products", breadcrumbItems)
  })

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
                      <select className="form-control" value={category} onChange={(e)=>setCategory(e.target.value)}>
                      <option>Select Category</option>
                        {categories.map((categorys)=>(
                        <option>{categorys.product}</option>
                      ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="brand">Brand</label>
                      <select className="form-control" value={brand} onChange={(e)=>setBrand(e.target.value)}>
                      <option>Select Category</option>
                        {brands.map((braand)=>(
                        <option>{braand.brand}</option>
                      ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="Color">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Color"
                        value={color}
                        onChange={(e)=>setColor(e.target.value)}
                      />
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
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="availability">Free Delivery</label>
                      <select className="form-control"value={delivery}
                        onChange={(e)=>setDelivery(e.target.value)}>
                        <option>Yes</option>
                        <option> No</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="availability">Availability</label>
                      <select className="form-control" value={available}
                        onChange={(e)=>setAvailable(e.target.value)}>
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
                        value={offerpercentage}
                        onChange={(e)=>setOfferpercentage(e.target.value)}
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
                        value={offerday}
                        onChange={(e)=>setOfferday(e.target.value)}
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
                        value={details}
                        onChange={(e)=>setDetails(e.target.value)}
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
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary" onClick={handleCreate}>
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
        <Col lg={2} md={4} sm={6}>
          <Card>
            <CardBody>
              <Slidewithcontrol />
              <CardTitle className="h4">With controls</CardTitle>
              <p className="card-title-desc">nnnnnn</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default connect(null, { setBreadcrumbItems })(UiCarousel)
