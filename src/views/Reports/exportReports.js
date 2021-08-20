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
    const {reportStatus = 'notCompleted', data = []} = this.props;
    let dataSet = []
    if (reportStatus === "notCompleted"){
      dataSet = data.filter(store => store.status === "false")
    }else {
      dataSet = data.filter(store => store.status === null)
    }

    dataSet = dataSet.map(({
                             erpProductName, nrtcProductName, ptclProductName,
                             erpProductDetailName, nrtcProductDetailName, ptclProductDetailName,
                             ...store
    }) => ({
      ...store,
      productName: erpProductName || nrtcProductName || ptclProductName,
      productDetailName: erpProductDetailName || nrtcProductDetailName || ptclProductDetailName,
    }))
    return(
      <ExcelFile element={<Button size="18">Export</Button>}>
        <ExcelSheet data={dataSet} name="Stores">
          <ExcelColumn label="Store Name" value="name"/>
          <ExcelColumn label="Code" value="code"/>
          <ExcelColumn label="Address" value="address"/>
          <ExcelColumn label="Incharge PhoneNo" value="inchargePhone"/>
          <ExcelColumn label="Incharge Name" value="inchargeName"/>
          <ExcelColumn label="Company" value="company"/>
          <ExcelColumn label="Category Name" value="productName"/>
          <ExcelColumn label="Item Name" value="productDetailName"/>
          <ExcelColumn label="Remarks" value="remarks"/>
        </ExcelSheet>
      </ExcelFile>
    )
  }
}

export default ExportReports;
