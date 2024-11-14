import React, { useState, useEffect } from "react";
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
import { Filter, RefreshCw, PlusCircle } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import CustomFilter from "./CustomFilter.js";
import CustomSearch from "../../../components/table/CustomSearch.js";

import { selectMentees, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/MenteeSelector";
import { getListMenteeAction } from '../../../redux/actions/trainer/MenteeActions';

const Mentee = (props) => {

  // filter
  const [isVisibleFilter, setVisibleFilter] = useState(false);

  // onclick on special row
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push(`/mentees/${row.id}/detail`);
    }
  }

  const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
    return <div id={`mentee-name-${row.id}`}>
      {row.fullName}
      <UncontrolledTooltip
        placement={"bottom"}
        target={`mentee-name-${row.id}`}>
        {row.username}
      </UncontrolledTooltip>
    </div>
  };

  const courseFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.courses) {
      return ""
    }

    const courseList = row.courses.map((course, index) => {
      return <div key={index}>{course}</div>
    })

    return <>
      {courseList}
    </>
  };

  const classFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.clazzes) {
      return ""
    }

    const classList = row.clazzes.map((clazz, index) => {
      return <div key={index}>{clazz}</div>
    })

    return <>
      {classList}
    </>
  };

  const tableColumns = [
    {
      dataField: "fullName",
      text: "Name",
      formatter: nameFormatter,
      headerStyle: () => {
        return {
          width: "18%",
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
          width: "11%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      headerStyle: () => {
        return {
          width: "14%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
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
      dataField: "clazz",
      text: "Class",
      formatter: classFormatter,
      headerStyle: () => {
        return {
          width: "10%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: false
    },
    {
      dataField: "course",
      text: "Course",
      formatter: courseFormatter,
      headerStyle: () => {
        return {
          width: "15%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: false
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return {
          width: "10%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: true
    }
  ];

  // view list
  const getListMentee = props.getListMenteeAction;

  useEffect(() => {
    getListMentee();
  }, [getListMentee]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListMentee(page, props.size, sortField, sortOrder, searchText);
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
      <h1 className="h3 mb-3">Mentee Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.mentees}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      {/* Filter */}
                      <Row>
                        <Col>
                          {isVisibleFilter && <CustomFilter />}
                        </Col>
                      </Row>

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
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => setVisibleFilter(!isVisibleFilter)} >
                              <Filter size="24" className="feather" />
                            </Button>

                            <Button color="primary" className="shadow-sm mr-1">
                              <RefreshCw className="feather" />
                            </Button>

                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/mentees/new")} >
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
    mentees: selectMentees(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListMenteeAction })(withRouter(Mentee));
