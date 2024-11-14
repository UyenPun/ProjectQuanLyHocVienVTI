import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { PlusCircle } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import CustomSearch from "../../../components/table/CustomSearch.js";

import { selectClasses, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/ClassSelector";
import { getListClassAction } from '../../../redux/actions/trainer/ClassActions';

const Class = (props) => {

  // onclick on special row
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push(`/classes/${row.id}/detail`);
    }
  }

  const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
    return <div id={`class-name-${row.id}`}>
      {row.name}
      <UncontrolledTooltip
        placement={"bottom"}
        target={`class-name-${row.id}`}>
        {row.code}
      </UncontrolledTooltip>
    </div>
  };

  const scheduleFormatter = (cell, row, rowIndex, formatExtraData) => {
    return row.schedules.map(schedule => schedule.name).join("-");
  };

  const dropoutRateFormatter = (cell, row, rowIndex, formatExtraData) => {
    return `${row.menteeRate.dropoutRate}%`;
  };

  const deferredRateFormatter = (cell, row, rowIndex, formatExtraData) => {
    return `${row.menteeRate.deferredRate}%`;
  };

  const lessonFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.currentLesson || !row.currentSubject) return "";

    return (
      <>
        {row.currentSubject}
        <br />
        {row.currentLesson}
      </>
    );
  };

  const mentorFormatter = (cell, row, rowIndex, formatExtraData) => {

    if (!row.currentMentor) return "";

    return <div id={`mentor-fullname-${row.id}`}>
      {row.currentMentor.fullName}
      <UncontrolledTooltip
        placement={"bottom"}
        target={`mentor-fullname-${row.id}`}>
        {row.currentMentor.username}
      </UncontrolledTooltip>
    </div>
  };

  const tableColumns = [
    {
      dataField: "name",
      text: "Name",
      formatter: nameFormatter,
      headerStyle: () => {
        return {
          width: "12%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: true
    },
    {
      dataField: "schedules",
      formatter: scheduleFormatter,
      text: "Schedule",
      headerStyle: () => {
        return {
          width: "16%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: false
    },
    {
      dataField: "address",
      text: "Address",
      headerStyle: () => {
        return {
          width: "auto",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "lesson",
      text: "Lesson",
      formatter: lessonFormatter,
      headerStyle: () => {
        return {
          width: "12%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "mentor",
      text: "Mentor",
      formatter: mentorFormatter,
      headerStyle: () => {
        return {
          width: "13%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "dropoutRate",
      text: "Drop-out Rate",
      formatter: dropoutRateFormatter,
      headerStyle: () => {
        return {
          width: "10%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "deferredRate",
      text: "Deferred Rate",
      formatter: deferredRateFormatter,
      headerStyle: () => {
        return {
          width: "10%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return {
          width: "12%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    }
  ];

  // view list
  const getListClass = props.getListClassAction;

  useEffect(() => {
    getListClass();
  }, [getListClass]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListClass(page, props.size, sortField, sortOrder, searchText);
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
      <h1 className="h3 mb-3">Class Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.classes}
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

                          {/* filter & Refresh button */}
                          <div className="float-right pull-right">
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/classes/new")} >
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
    classes: selectClasses(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListClassAction })(withRouter(Class));