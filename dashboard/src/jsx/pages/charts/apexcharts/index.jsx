import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import PageTitle from "../../../layouts/PageTitle";
import Bar2 from "../../../components/charts/apexcharts/Bar2";
import Bar3 from "../../../components/charts/apexcharts/Bar3";
import RadialBar from "../../../components/charts/apexcharts/RadialBar";
import Line5 from "../../../components/charts/apexcharts/Line5";
import Line3 from "../../../components/charts/apexcharts/Line3";
import Line4 from "../../../components/charts/apexcharts/Line4";
import Pie4 from "../../../components/charts/apexcharts/Pie4";
import Pie5 from "../../../components/charts/apexcharts/Pie5";

function ApexChart() {
  return (
    <div className="h-80">
      <PageTitle motherMenu="Charts" activeMenu="ApexChart" />
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bar Chart</h4>
            </Card.Header>
            <Card.Body>
              <Bar2 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
               <h4 className="card-title">Bar Chart</h4>
            </Card.Header>
            <Card.Body>
              <Bar3 />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
               <h4 className="card-title">Line</h4>
            </Card.Header>
            <Card.Body>
              <Line5 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header> 
               <h4 className="card-title">Line</h4>
            </Card.Header>
            <Card.Body>
              <Line3 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
               <h4 className="card-title">Line</h4>
            </Card.Header>
            <Card.Body>
              <Line4 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Pie</h4>
            </Card.Header>
            <Card.Body className="mt-5">
              <Pie4 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
               <h4 className="card-title">Pie</h4>
            </Card.Header>
            <Card.Body>
              <Pie5 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
               <h4 className="card-title">Redial Bar</h4>
            </Card.Header>
            <Card.Body>
              <RadialBar />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ApexChart;
