import React from 'react'
import { Card, Col,
  CardBody,
  CardTitle,
  CardImg,
  CardText,Row } from 'reactstrap'
  import img1 from "../../assets/images/small/img-1.jpg"
import { Link } from "react-router-dom"

function brand() {
  return (
    <div>
        <Row>
        <Col mg={2} lg={6} xl={3}>
          <Card>
            <CardImg top className="img-fluid" src={img1} alt="Lexa" />
            <CardBody>
              <CardTitle className="h4">Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make
                up the bulk of the card's content.
                  </CardText>
              <Link
                to="#"
                className="btn btn-primary waves-effect waves-light"
              >
                Button
                  </Link>
            </CardBody>
          </Card>
        </Col>
        <Col mg={6} lg={6} xl={3}>
          <Card>
            <CardImg top className="img-fluid" src={img1} alt="Lexa" />
            <CardBody>
              <CardTitle className="h4">Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make
                up the bulk of the card's content.
                  </CardText>
              <Link
                to="#"
                className="btn btn-primary waves-effect waves-light"
              >
                Button
                  </Link>
            </CardBody>
          </Card>
        </Col>
        <Col mg={6} lg={6} xl={3}>
          <Card>
            <CardImg top className="img-fluid" src={img1} alt="Lexa" />
            <CardBody>
              <CardTitle className="h4">Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make
                up the bulk of the card's content.
                  </CardText>
              <Link
                to="#"
                className="btn btn-primary waves-effect waves-light"
              >
                Button
                  </Link>
            </CardBody>
          </Card>
        </Col>
        <Col mg={6} lg={6} xl={3}>
          <Card>
            <CardImg top className="img-fluid" src={img1} alt="Lexa" />
            <CardBody>
              <CardTitle className="h4">Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make
                up the bulk of the card's content.
                  </CardText>
              <Link
                to="#"
                className="btn btn-primary waves-effect waves-light"
              >
                Button
                  </Link>
            </CardBody>
          </Card>
        </Col>
        </Row>
    </div>
  )
}

export default brand