import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row
} from "reactstrap";
import { PlusCircle } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import CustomSearch from "../../../components/table/CustomSearch.js";

import { selectDocuments, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/DocumentSelector";
import { getListDocumentAction } from '../../../redux/actions/trainer/DocumentActions';

import { formatBytes } from "../../../utils/Utils.js";

const Document = (props) => {

  const sizeFormatter = (cell, row, rowIndex, formatExtraData) => {
    return formatBytes(row.size);
  };

  const pathFormatter = (cell, row, rowIndex, formatExtraData) => {
    return <a href={row.path}>Link</a>;
  };

  const tableColumns = [
    {
      dataField: "name",
      text: "Name",
      headerStyle: () => {
        return {
          width: "auto",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: true
    },
    {
      dataField: "documentType",
      text: "Type",
      headerStyle: () => {
        return {
          width: "15%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "size",
      text: "Size",
      formatter: sizeFormatter,
      headerStyle: () => {
        return {
          width: "15%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "type",
      text: "Type",
      headerStyle: () => {
        return {
          width: "15%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "path",
      text: "Path",
      formatter: pathFormatter,
      headerStyle: () => {
        return {
          width: "15%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    }
  ];

  // view list
  const getListDocument = props.getListDocumentAction;

  useEffect(() => {
    getListDocument();
  }, [getListDocument]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListDocument(page, props.size, sortField, sortOrder, searchText);
  }

  let tableRef;

  const resetPaging = () => {
    tableRef.paginationContext.currPage = 1;
  }

  const resetSorting = () => {
    tableRef.sortContext.state = {
      sortColumn: {
        dataField: null
      },
      sortOrder: null
    };
  }

  const resetFormWhenSearchChange = () => {
    resetPaging();
    resetSorting();
  }

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Document Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.documents}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      <Row style={{ alignItems: "flex-end" }}>
                        <Col xs="9">
                          {/* search */}
                          <CustomSearch
                            {...toolkitprops.searchProps}
                            resetFormWhenSearchChange={resetFormWhenSearchChange}
                          />
                        </Col>
                        <Col xs="3" style={{ paddingBottom: 20 }}>
                          {/* Create button */}
                          <div className="float-right pull-right">
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/documents/new")} >
                              <PlusCircle size="24" className="feather" />
                            </Button>
                          </div>
                        </Col>
                      </Row>

                      <BootstrapTable
                        {...toolkitprops.baseProps}
                        bootstrap4
                        striped
                        hover
                        bordered
                        remote
                        ref={ref => (tableRef = ref)}
                        pagination={paginationFactory({
                          page: props.page,
                          sizePerPage: props.size,
                          totalSize: props.totalSize,

                          nextPageText: '>',
                          prePageText: '<',
                          withFirstAndLast: true,
                          alwaysShowAllBtns: true,

                          hideSizePerPage: true,
                        })}

                        onTableChange={handleTableChange}
                      />
                    </>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

const mapGlobalStateToProps = state => {
  return {
    documents: selectDocuments(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListDocumentAction })(withRouter(Document));