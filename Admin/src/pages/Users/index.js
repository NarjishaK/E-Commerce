import React, { useEffect } from "react"

import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const ResponsiveTables = props => {
  document.title = "Users | Lexa "

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Users", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Users", breadcrumbItems)
  })

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">User List </CardTitle>

              <div className="table-rep-plugin">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <Table
                    id="tech-companies-1"
                    className="table table-striped table-bordered"
                  >
                    <Thead>
                      <Tr>
                        <Th>User Name</Th>
                        <Th data-priority="1">Number</Th>
                        <Th data-priority="3">Email</Th>
                        <Th data-priority="3">
                          Shipping
                          <br /> Address
                        </Th>
                        <Th data-priority="3">
                          Billing <br />
                          Address
                        </Th>
                        <Th data-priority="1">Order ID</Th>
                        <Th data-priority="6">Order Items</Th>
                        <Th data-priority="6">Status</Th>
                        <Th data-priority="6">Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th>
                          {/* AMZN{" "} */}
                          <span className="co-name">Narjisha</span>
                        </Th>
                        <Td>8136949407</Td>
                        <Td>narji@gmail.com</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>
                          <Button style={{ width: "100%" }}>EDIT</Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default connect(null, { setBreadcrumbItems })(ResponsiveTables)
