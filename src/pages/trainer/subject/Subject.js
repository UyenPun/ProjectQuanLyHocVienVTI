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

import { selectSubjects, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/SubjectSelector";
import { getListSubjectAction } from '../../../redux/actions/trainer/SubjectActions';

const Subject = (props) => {

  // onclick on special row
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push(`/subjects/${row.id}/detail`);
    }
  }

  const totalLessonFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row.totalLesson >= 10) return row.totalLesson;
    return `0${row.totalLesson}`;
  };

  const tableColumns = [
    {
      dataField: "name",
      text: "Name",
      headerStyle: () => {
        return {
          width: "25%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: true
    },
    {
      dataField: "code",
      text: "Code",
      headerStyle: () => {
        return {
          width: "25%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "version",
      text: "version",
      headerStyle: () => {
        return {
          width: "25%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "totalLesson",
      text: "Total Lesson",
      formatter: totalLessonFormatter,
      headerStyle: () => {
        return {
          width: "25%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    }
  ];

  // view list
  const getListSubject = props.getListSubjectAction;

  useEffect(() => {
    getListSubject();
  }, [getListSubject]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListSubject(page, props.size, sortField, sortOrder, searchText);
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
      <h1 className="h3 mb-3">Subject Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.subjects}
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
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/subjects/new")} >
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
                        rowEvents={rowEvents}
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
    subjects: selectSubjects(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListSubjectAction })(withRouter(Subject));