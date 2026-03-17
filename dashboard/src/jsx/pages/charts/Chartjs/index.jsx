import React from "react"; 
import { Row, Col, Card } from "react-bootstrap"; 
import PageTitle from "../../../layouts/PageTitle";
import BarChart1 from "../../../components/charts/Chartjs/bar1";
import BarChart5 from "../../../components/charts/Chartjs/bar5";
import BarChart6 from "../../../components/charts/Chartjs/bar6";
import LineChart1 from "../../../components/charts/Chartjs/line1";
import DualLine from "../../../components/charts/Chartjs/dualLine";
import BasicArea from "../../../components/charts/Chartjs/basicArea";
import GradientArea from "../../../components/charts/Chartjs/gradinetArea";
import DualArea from "../../../components/charts/Chartjs/dualArea"; 
import PolarChart from "../../../components/charts/Chartjs/polar"; 
import ChartPie from "../../../components/charts/Chartjs/pie";

function ChartChartjs() {
  return (
    <>
      <PageTitle motherMenu="Charts" activeMenu="ChartJs" />
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bar chart</h4>
            </Card.Header>
            <Card.Body>
              <BarChart1 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bar chart</h4>
            </Card.Header>
            <Card.Body>
              <BarChart5 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bar chart</h4>
            </Card.Header>
            <Card.Body>
              <BarChart6 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Line chart</h4>
            </Card.Header>
            <Card.Body>
              <LineChart1 />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Dual Line chart</h4>
            </Card.Header>
            <Card.Body>
              <DualLine />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Basic Area Chart</h4>
            </Card.Header>
            <Card.Body>
              <BasicArea />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Gradinet Area Chart</h4>
            </Card.Header>
            <Card.Body>
              <GradientArea />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Dual Area Chart</h4>
            </Card.Header>
            <Card.Body>
              <DualArea />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Pie</h4>
            </Card.Header>
            <Card.Body>
              <ChartPie />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Polar Chart</h4>
            </Card.Header>
            <Card.Body>
              <PolarChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChartChartjs;
