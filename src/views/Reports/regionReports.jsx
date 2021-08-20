import React, {Component} from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  Pagination, PaginationItem, PaginationLink, FormGroup, Label, Input
} from "reactstrap";
import {getRegionReports, getAllRegion, getAllRegionStores} from "../../api/area"
import {statusColor} from "../../utils/constants"
import ExportReports from "./exportReports";

class RegionReportsPage extends Component {
  constructor(props) {
    super(props);
    this.regionsRef = React.createRef()
    this.state = {
      data: [],
      startPage: 0,
      endPage: 5,
      currentPage: 0,
      regions: [],
      exportState: 'pending',
      allRegionStores: []
    }
  }

  componentDidMount() {
    getRegionReports()
      .then(response => {
        const {payload, isSuccess} = response
        this.setState({
          data: payload,
          endPage: Math.round(payload.length / 5)
        })
      })
      .catch(error => {
        console.log("error:", error)
      })

    getAllRegion()
      .then(response => {
        const {payload} = response
        this.setState({
          regions: payload.map(item => ({
            cat: '1',
            name: item.name,
            id: item.id,
          }))
        })
      })
      .catch(error => {
        console.log("error:", error)
      })
  }

  renderPagination = () => {
    const {startPage, currentPage, endPage} = this.state;

    return (
      <Pagination style={{float: 'right'}}>
        {startPage > 0 && <PaginationItem onClick={() => {
          this.setState(prevState => ({
            startPage: Number(prevState.startPage - 1)
          }))
        }}>
          <PaginationLink first/>
        </PaginationItem>}
        {[0,1,2,3,4,5,6,7,8,9].map(item => (
          <PaginationItem onClick={() => {
            this.setState({
              currentPage: Number(startPage*10 +item),
            })
          }}>
            <PaginationLink>
              {Number(startPage*10 +item) + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage > startPage+5 &&  <PaginationItem onClick={() => {
          this.setState(prevState => ({
            startPage: Number(prevState.startPage + 1)
          }))
        }}>
          <PaginationLink last/>
        </PaginationItem>}
      </Pagination>
    )
  }

  onSelectRegionHandler = (regionId) => {
    getRegionReports(regionId)
      .then(response => {
        const {payload, isSuccess} = response
        this.setState({
          data: payload,
          endPage: Math.round(payload.length / 10),
          startPage: 0,
          currentPage: 0,
        })
      })
      .catch(error => {
        console.log("error:", error)
      })

    getAllRegionStores(regionId)
      .then(response => {
        const {payload = {}, isSuccess} = response
        const {storesPayload = []} = payload
        this.setState({
          allRegionStores: storesPayload
        })
      })
  }

  render() {
    const {data, currentPage, regions, exportState, allRegionStores} = this.state;
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Region Reports</CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {regions.length > 0 && (
                      <FormGroup style={{marginBottom: 18, width: "40%"}}>
                        <Label for="exampleSelect">Select Regions</Label>
                        <Input type="select" onChange={(event) => {
                          console.log("select change", event.target.value)
                          this.onSelectRegionHandler(event.target.value)
                        }} name="select" id="exampleSelect">
                          <option value={-1}>All</option>
                          {regions.map(item => <option value={item.id}>{item.name}</option>)}
                        </Input>
                      </FormGroup>
                    )}
                    <FormGroup style={{marginBottom: 18, width: "40%", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <Label for="exampleSelect" style={{marginRight: 8}}>Category</Label>
                      <Input type="select" onChange={event => {
                        this.setState({
                          exportState: event.target.value
                        })
                      }} name="select" id="exampleSelect">
                        <option value={'pending'}>Pending</option>
                        <option value={'completed'}>Completed</option>
                        <option value={'notCompleted'}>Not Completed</option>
                      </Input>

                      <ExportReports
                        reportStatus={exportState}
                        data={allRegionStores}
                      />
                    </FormGroup>
                  </div>
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Store Name</th>
                      <th>User Name</th>
                      <th>PTCL Status</th>
                      <th>ERP Status</th>
                      <th>NRTC Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(currentPage*10, currentPage*10+10).map((item, index) => (
                      <tr>
                        <td className="text-center">
                          {Number(currentPage*10 + (index + 1))}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.userName}</td>
                        <td>
                          <span style={{
                            alignItems: 'center',
                            backgroundColor: statusColor[!item.ptclStatus ? "pending": item.ptclStatus],
                            padding: 8,
                            borderRadius: 4,
                            cursor: "pointer"
                          }}>
                            {!item.ptclStatus ? "pending": item.ptclStatus }
                          </span>
                        </td>
                        <td>
                          <span style={{
                            alignItems: 'center',
                            backgroundColor: statusColor[!item.erpStatus ? "pending": item.erpStatus],
                            padding: 8,
                            borderRadius: 4,
                            cursor: "pointer"
                          }}>
                            {!item.erpStatus ? "pending": item.erpStatus }
                          </span>
                        </td>
                        <td>
                          <span style={{
                            alignItems: 'center',
                            backgroundColor: statusColor[!item.nrtcStatus ? "pending": item.nrtcStatus],
                            padding: 8,
                            borderRadius: 4,
                            cursor: "pointer"
                          }}>
                            {!item.nrtcStatus ? "pending": item.nrtcStatus }
                          </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                  {this.renderPagination()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

export default RegionReportsPage;
