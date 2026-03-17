import React from "react"; 
import { Row, Col, Card } from "react-bootstrap"; 
import PageTitle from "../../../layouts/PageTitle"; 
import BarChartNoPadding from "../../../components/charts/rechart/BarChartNoPadding";
import NagetivePositive from "../../../components/charts/rechart/PositiveNagative2";
import TinyLineChart from "../../../components/charts/rechart/TinyLineChart";
import LegendEffectOpacity from "../../../components/charts/rechart/LegendEffectOpacity";

function RechartJs() {
  return (
    <>
      <PageTitle motherMenu="Charts" activeMenu="ReChartJs" />
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
				<h4 className="card-title">Bar</h4>
            </Card.Header>
            <Card.Body>
              <BarChartNoPadding />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bar</h4>
            </Card.Header>
            <Card.Body>
              <NagetivePositive />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Line</h4>
            </Card.Header>
            <Card.Body>
              <TinyLineChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Line</h4>
            </Card.Header>
            <Card.Body>
              <LegendEffectOpacity />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default RechartJs;
