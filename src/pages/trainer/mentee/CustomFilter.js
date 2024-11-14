import React from "react";
import {
    Col,
    Row,
    InputGroupAddon,
    Button,
    FormGroup,
    Label
} from "reactstrap";
import Select from "react-select";

import { Formik, FastField, Form } from 'formik';

const CustomFilter = () => {

    const tuitionOptions = [
        { value: "FullPaied", label: "Full Paied" },
        { value: "FullUnpaied", label: "Full Unpaied" },
        { value: "PaiedThisMonth", label: "Paied This Month" },
        { value: "UnpaiedThisMonth", label: "Unpaied This Month" }
    ];

    return <Formik
        initialValues={
            {
                minTotalMember: "",
                maxTotalMember: ""
            }
        }
    >
        <Form>
            <fieldset className="filter-border">
                <legend className="filter-border">Filter</legend>

                <Row>
                    {/* tuition */}
                    <Col md="4">
                        <FormGroup>
                            <Label>Tuition</Label>
                            <FastField
                                bsSize="lg"
                                name="tuition"
                                placeholder="Enter paied tuition"
                                options={tuitionOptions}
                                component={Select}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    {/* filter */}
                    <Col xs="auto">
                        <InputGroupAddon addonType="append" color="primary">
                            <Button color="primary" type="submit">Filter!</Button>
                        </InputGroupAddon>
                    </Col>
                </Row>
            </fieldset>
        </Form>
    </Formik>
}
export default CustomFilter;