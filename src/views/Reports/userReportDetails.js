import React from 'react';
import {Row, Card, CardBody, Alert, CardHeader} from "reactstrap"
import {Link} from "react-router-dom";
import {userReportDetails} from "../../api/user"

class UserReportDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      details: {
        erpDetails: [],
        nrtcDetails: [],
        ptclDetails: []
      },
      error: ''
    }
  }

  componentDidMount() {
    const splitPathName = this.props.location.pathname.split("/")
    if (splitPathName.length > 4){
      userReportDetails(splitPathName[splitPathName.length -1])
        .then(response => {
          const {isSuccess, payload} = response
          console.log("user reports details", response)
          if (isSuccess){
            this.setState({
              details: payload,
              error: ''
            })
          }else {
            this.setState({
              error: 'Something went wrong'
            })
          }
        })
        .catch(error => {
          console.log("user reports details error", error)
          this.setState({
            error: 'Something went wrong'
          })
        })
    }
  }

  render() {
    const {error, details} = this.state;
    const { erpDetails = [], nrtcDetails = [], ptclDetails= []} = details;
    return(
      <div className="content" style={{height: "100vh", overflowY: "scroll"}}>
        <Row>
          <Link to="/admin/userReports">{"<<"} back to User Reports</Link>
        </Row>
        {error &&  <Alert color="danger">{error}</Alert>}
        <Row style={{marginTop: 12}}>
          <Card>
            <CardHeader>PTCL</CardHeader>
            <CardBody>
              {ptclDetails.length < 1 ? <h4>No Data Found</h4>: ptclDetails.map(product => {
                let renderData = `<React.Fragment>
                  <h4 style="margin-top: 20px" align="center">${product.name}</h4>
                  <Table style="width: 100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>description</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>`
                product.data.forEach((item, index) => {
                  if (!item.status){
                    renderData += `<tr>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                    </tr>`
                  }else {
                    renderData += `<tr style="background-color:#f8d7da">
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                  </tr>`
                  }

                })
                renderData += `</tbody></Table></React.Fragment>`

                return <div dangerouslySetInnerHTML={{__html: renderData}} />
              })}
            </CardBody>
          </Card>
        </Row>

        <Row style={{marginTop: 12}}>
          <Card>
            <CardHeader>NRTC</CardHeader>
            <CardBody>
              {nrtcDetails.length < 1 ? <h4>No Data Found</h4> : nrtcDetails.map(product => {
                let renderData = `<React.Fragment>
                  <h4 style="margin-top: 20px" align="center">${product.name}</h4>
                  <Table style="width: 100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>description</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>`
                product.data.forEach((item, index) => {
                  if (!item.status){
                    renderData += `<tr>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                  </tr>`
                  }else {
                    renderData += `<tr style="background-color:#f8d7da">
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                  </tr>`
                  }
                })
                renderData += `</tbody></Table></React.Fragment>`

                return <div dangerouslySetInnerHTML={{__html: renderData}} />
              })}
            </CardBody>
          </Card>
        </Row>

        <Row style={{marginTop: 12}}>
          <Card>
            <CardHeader>ERP</CardHeader>
            <CardBody>
              {erpDetails.length < 1 ? <h4>No Data Found</h4>: erpDetails.map(product => {
                let renderData = `<React.Fragment>
                  <h4 style="margin-top: 20px" align="center">${product.name}</h4>
                  <Table style="width: 100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>description</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>`
                product.data.forEach((item, index) => {
                  if (!item.status){
                    renderData += `<tr>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                  </tr>`
                  }else {
                    renderData += `<tr style="background-color:#f8d7da">
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${!item.remarks ? '' : item.remarks}</td>
                  </tr>`
                  }
                })
                renderData += `</tbody></Table></React.Fragment>`

                return <div dangerouslySetInnerHTML={{__html: renderData}} />
              })}
            </CardBody>
          </Card>
        </Row>
      </div>
    )
  }
}

export default UserReportDetails;
