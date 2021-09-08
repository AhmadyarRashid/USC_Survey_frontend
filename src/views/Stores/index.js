import React from 'react'
import {Row, Card, CardBody, CardHeader, CardFooter} from "reactstrap";
import ReactTable from 'react-table-6';
import {getAllAssignStores} from '../../api/area';
import 'react-table-6/react-table.css';

const columns = [{
  Header: 'id',
  accessor: 'id'
}, {
  id: 'storeName',
  Header: 'Store Name',
  accessor: 'storeName',
  Cell: props => <span>{props.value}</span>
}, {
  id: 'User Name',
  Header: 'userName',
  accessor: d => d.userName,
}, {
  id: 'ptclLocation',
  Header: 'PTCL Location',
  accessor: d => d.ptclLocation,
  // Cell: props => <a href={`https://www.google.com/maps/@${props.value},21z`}>{props.value}</a>
  Cell: props => <a href={`https://www.google.com/maps/search/?api=1&query=${props.value}`} target="_blank">{props.value}</a>
}, {
  id: 'nrtcLocation',
  Header: 'NRTC Location',
  accessor: d => d.nrtcLocation,
  // Cell: props => <a href={`https://www.google.com/maps/@${props.value},21z`}>{props.value}</a>
  Cell: props => <a href={`https://www.google.com/maps/search/?api=1&query=${props.value}`} target="_blank">{props.value}</a>
},  {
  id: 'erpLocation',
  Header: 'ERP Location',
  accessor: d => d.erpLocation,
  // Cell: props => <a href={`https://www.google.com/maps/@${props.value},21z`}>{props.value}</a>
  Cell: props => <a href={`https://www.google.com/maps/search/?api=1&query=${props.value}`} target="_blank">{props.value}</a>
}]

class StoresPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    getAllAssignStores()
      .then(response => {
        const {isSuccess, message = '', payload = []} = response;
        if (isSuccess){
          this.setState({
            data: payload
          })
        }else {
          alert(message)
        }
      })
      .catch(error => {
        console.log("error response:", error)
      })
  }

  render() {
    const {data} = this.state;
    const rows = data.map(({storeName, storeAddress, userName, erpLocation, nrtcLocation, ptclLocation}, index) => ({
      id: index + 1,
      storeName: storeName+', '+storeAddress,
      userName,
      ptclLocation,
      nrtcLocation,
      erpLocation,
    }))
    return (
      <div className="content">
        <Row>
          <Card className="card-stats">
            <CardHeader>Stores</CardHeader>
            <CardBody>
              <ReactTable
                data={rows}
                columns={columns}
                defaultPageSize={10}
              />
            </CardBody>
          </Card>
        </Row>
      </div>
    )
  }
}

export default StoresPage
