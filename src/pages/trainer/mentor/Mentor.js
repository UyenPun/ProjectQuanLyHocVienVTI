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

import { selectMentors, selectPage, selectSize, selectTotalSize } from "../../../redux/selectors/trainer/MentorSelector";
import { getListMentorAction } from '../../../redux/actions/trainer/MentorActions';

const Mentor = (props) => {

  // onclick on special row
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push(`/mentors/${row.id}/detail`);
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

  const totalHourInMonthFormatter = (cell, row, rowIndex, formatExtraData) => {
    return row.totalHourInThisMonth ? row.totalHourInThisMonth : 0;
  };

  const classFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (!row.teachings) {
      return ""
    }

    const classList = row.teachings.map((teaching, index) => {
      return <div key={index}>
        {teaching.clazzName + " - " + teaching.subjectName + " - " + (teaching.currentLessonName ? teaching.currentLessonName : "Not started")}
      </div>
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
          width: "25%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      sort: true
    },
    {
      dataField: "totalHourInThisMonth",
      text: "Total hours in month",
      formatter: totalHourInMonthFormatter,
      headerStyle: () => {
        return {
          width: "20%",
          textAlign: "center",
          fontSize: "14px",
        };
      },
      style: { textAlign: "center" }, // row style
      sort: true
    },
    {
      dataField: "class",
      text: "Class",
      formatter: classFormatter,
      headerStyle: () => {
        return {
          width: "auto",
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
  const getListMentor = props.getListMentorAction;

  useEffect(() => {
    getListMentor();
  }, [getListMentor]);

  const handleTableChange = (_, { page, sortField, sortOrder, searchText, filters }) => {
    getListMentor(page, props.size, sortField, sortOrder, searchText);
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
      <h1 className="h3 mb-3">Mentor Management</h1>

      {/* View List */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={props.mentors}
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
                            <Button color="primary" className="shadow-sm mr-1" onClick={() => props.history.push("/mentors/new")} >
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
    mentors: selectMentors(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListMentorAction })(withRouter(Mentor));