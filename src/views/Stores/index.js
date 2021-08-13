import React from 'react'
import {Row, Card, CardBody, CardHeader, Label, CardFooter, Input, FormGroup, Button} from "reactstrap";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

function StoresPage({...props}) {
    const data = [{
        name: 'Tanner Linsley',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        }
    },{
        name: 'Tanner Linsley',
        age: 26,
        friend: {
            name: 'Jason Maurer',
            age: 23,
        }
    }]

    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
    }, {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
    }]
    return (
        <div className="content">
            <Row>
                <Card className="card-stats">
                    <CardHeader>Stores</CardHeader>
                    <CardBody>
                        <div style={{display: "flex", flexDirection: 'row', alignItems: 'center'}}>
                            <FormGroup style={{marginRight: 8, width: 100}}>
                                <Label for="exampleSelect">Zones</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup style={{marginRight: 8, width: 150}}>
                                <Label for="exampleSelect">Regions</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Abdtobad</option>
                                    <option>Attock</option>
                                    <option>Lahore</option>
                                    <option>Islanabad</option>
                                    <option>karachi</option>
                                </Input>
                            </FormGroup>
                            <div style={{marginTop: 8}}>
                                <Button color="primary">primary</Button>
                            </div>
                        </div>
                        <ReactTable
                            data={data}
                            columns={columns}
                        />

                    </CardBody>
                    <CardFooter>
                        <p align="center">pagination</p>
                    </CardFooter>
                </Card>
            </Row>
        </div>
    )
}

export default StoresPage
