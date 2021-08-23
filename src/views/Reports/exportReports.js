import React from 'react';
import ReactExport from "react-export-excel";
import {Button} from "reactstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportReports extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {data = []} = this.props;
    let dataSet = []
    data.forEach(store => {
      const { details, ptclStatus, nrtcStatus, erpStatus } = store
      if (!details) {
        dataSet.push({
          ...store,
          status: 'Pending'
        })
      } else{
        const {ptclDetails = [], erpDetails = [], nrtcDetails = []} = details;
        // for ptcl details
        ptclDetails.forEach(detail => {
          const {name, data} = detail
          data.forEach(d => {
            dataSet.push({
              ...store,
              company: "PTCL",
              status: !ptclStatus ? 'Pending': ptclStatus,
              productName: detail.name,
              itemName: d.name,
              itemDetail: d.description,
              remarks: d.remarks
            })
          })
        })

        // for NRTC details
        nrtcDetails.forEach(detail => {
          const {name, data} = detail
          data.forEach(d => {
            dataSet.push({
              ...store,
              company: "NRTC",
              status: !nrtcStatus ? 'Pending': nrtcStatus,
              productName: detail.name,
              itemName: d.name,
              itemDetail: d.description,
              remarks: d.remarks
            })
          })
        })

        // for ERP details
        erpDetails.forEach(detail => {
          const {name, data} = detail
          data.forEach(d => {
            dataSet.push({
              ...store,
              company: "ERP",
              status: !erpStatus ? 'Pending': erpStatus,
              productName: detail.name,
              itemName: d.name,
              itemDetail: d.description,
              remarks: d.remarks
            })
          })
        })
      }
    })

    return(
      <ExcelFile element={<Button size="18">Export</Button>}>
        <ExcelSheet data={dataSet} name="Stores">
          <ExcelColumn label="Store Name" value="name"/>
          <ExcelColumn label="Code" value="code"/>
          <ExcelColumn label="Address" value="address"/>
          <ExcelColumn label="Incharge PhoneNo" value="inchargePhone"/>
          <ExcelColumn label="Incharge Name" value="inchargeName"/>
          <ExcelColumn label="Company" value="company"/>
          <ExcelColumn label="Status" value="status"/>
          <ExcelColumn label="Category Name" value="productName"/>
          <ExcelColumn label="Item Name" value="itemName"/>
          <ExcelColumn label="Item Description" value="itemDetail"/>
          <ExcelColumn label="Remarks" value="remarks"/>
        </ExcelSheet>
      </ExcelFile>
    )
  }
}

export default ExportReports;
