import React from "react";

import {
    Col,
    Row,
    InputGroupAddon,
    Button
} from "reactstrap";

import { Formik, FastField, Form } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";

const CustomSearch = (props) =>
    <Formik
        initialValues={{
            search: ""
        }}
        onSubmit={
            values => {
                props.resetFormWhenSearchChange();
                props.onSearch(values.search);
            }
        }
    >
        <Form>
            <Row>
                <Col xs="auto">
                    <FastField
                        bsSize="lg"
                        name="search"
                        placeholder="Search for ..."
                        component={ReactstrapInput}
                    />
                </Col>
                <Col xs="auto">
                    <InputGroupAddon addonType="append" color="primary">
                        <Button color="primary" type="submit">Search</Button>
                    </InputGroupAddon>
                </Col>
            </Row>
        </Form>
    </Formik>

export default CustomSearch;