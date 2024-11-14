import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  Card,
  Button,
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

import { selectCourses, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/CourseSelector";
import { getListCourseAction } from '../../../redux/actions/trainer/CourseActions';

const Course = (props) => {

  const totalSubjectFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.totalSubject) return "00";
    if (row.totalSubject >= 10) return row.totalSubject;
    return `0${row.totalSubject}`;
  };

  const totalLessonFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.totalLesson) return "00";
    if (row.totalLesson >= 10) return row.totalLesson;
    return `0${row.totalLesson}`;
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
      dataField: "classCode",
      text: "Class Code",
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
      dataField: "menteeCode",
      text: "Mentee Code",
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
      dataField: "totalSubject",
      text: "Total Subject",
      formatter: totalSubjectFormatter,
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
    ,
    {
      dataField: "totalLesson",
      text: "Total Lesson",
      formatter: totalLessonFormatter,
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

  const getListCourse = props.getListCourseAction;

  useEffect(() => {
    getListCourse();
  }, [getListCourse]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListCourse(page, props.size, sortField, sortOrder, searchText);
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
      <h1 className="h3 mb-3">Course Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.courses}
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
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/courses/new")} >
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
    courses: selectCourses(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListCourseAction })(withRouter(Course));
