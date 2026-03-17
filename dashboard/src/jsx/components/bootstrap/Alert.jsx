import React, { Fragment, useReducer } from "react";
import { Link } from 'react-router-dom';
import PageTitle from "../../layouts/PageTitle";
import { Row, Card, Col, Alert, Button } from "react-bootstrap";
import { reducer } from './alertReducer';
import { SVGICON } from '../../constant/theme';

const initial = true;

function UiAlert() {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <Fragment>
      <PageTitle motherMenu="Bootstrap" activeMenu="Alert" />
      <Row>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Basic Alerts</Card.Title>
              <Card.Text className="subtitle mb-0"> Bootstrap default style </Card.Text>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.primary}>
                {SVGICON.welcome}
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'primary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.secondary}>
                {SVGICON.done}
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'secondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.success}>
                {SVGICON.success}
                <strong>Success! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'success' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.info}>
                {SVGICON.info}
                <strong>Info!  </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'info' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.warning}>
                {SVGICON.error}
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'warning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.danger}>
                {SVGICON.error}
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'danger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.dark}>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'dark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.light}>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'light' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Solid color alerts</Card.Title>
              <Card.Text className="subtitle mb-0"> add <code>.solid</code> class to change the solid color.</Card.Text>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.solidprimary} className="solid">
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'solidprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.solidsecondary} className="solid">
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'solidsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.solidsuccess} className="solid">
                <strong>Success!</strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'solidsuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.solidinfo} className="solid">
                <strong>Info! </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'solidinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.solidwarning} className="solid">
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'solidwarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.soliddanger} className="solid">
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.soliddark} className="solid">
                <strong>Error! </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.solidlight} className="solid">
                <strong>Error! </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'solidlight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Square alerts</Card.Title>
              <p className="mb-0 subtitle"> add <code>.alert-square</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" className="solid alert-square">
                <strong>Welcome! </strong> 	Message has been sent.
              </Alert>
              <Alert variant="secondary" className="solid alert-square">
                <strong>Done! </strong> Your profile photo updated.
              </Alert>
              <Alert variant="success" className="solid alert-square">
                <strong>Success!</strong> Message has been sent.
              </Alert>
              <Alert variant="info" className="solid alert-square">
                <strong>Info! </strong> You have got 5 new email.
              </Alert>
              <Alert variant="warning" className="solid alert-square">
                <strong>Error! </strong> Something went wrong. Please check.

              </Alert>
              <Alert variant="danger" className="solid alert-square">
                <strong>Error! </strong> Message sending failed.

              </Alert>
              <Alert variant="dark" className="solid alert-square">
                <strong>Error! </strong> You successfully read this important alert message.

              </Alert>
              <Alert variant="light" className="solid alert-square">
                <strong>Error! </strong> You successfully read this message..
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Rounded alerts</Card.Title>
              <p className="mb-0 subtitle"> add <code>.alert-rounded</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" className="solid alert-rounded">
                <strong>Welcome! </strong> Message has been sent.
              </Alert>
              <Alert variant="secondary" className="solid alert-rounded">
                <strong>Done! </strong> Your profile photo updated.
              </Alert>
              <Alert variant="success" className="solid alert-rounded">
                <strong>Success!</strong> Message has been sent.
              </Alert>
              <Alert variant="info" className="solid alert-rounded">
                <strong>Info! </strong> You have got 5 new email.
              </Alert>
              <Alert variant="warning" className="solid alert-rounded">
                <strong>Error! </strong> Something went wrong. Please check.
              </Alert>
              <Alert variant="danger" className="solid alert-rounded">
                <strong>Error! </strong> Message sending failed.
              </Alert>
              <Alert variant="dark" className="solid alert-rounded">
                <strong>Error! </strong> You successfully read this important alert message.
              </Alert>
              <Alert variant="light" className="solid alert-rounded">
                <strong>Error! </strong> You successfully read this message..
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Dismissable Alerts</Card.Title>
              <Card.Text className="subtitle mb-0"> Bootstrap default style </Card.Text>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.disprimary}>
                {SVGICON.welcome}
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'disprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.dicsecondary}>
                {SVGICON.done}
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'dicsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.dissuccess}>
                {SVGICON.success}
                <strong>Success! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'dissuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.disinfo}>
                {SVGICON.info}
                <strong>Info!  </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'disinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.diswarning}>
                {SVGICON.error}
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'diswarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.disdanger}>
                {SVGICON.error}
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'disdanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.disdark}>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'disdark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.dislight}>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'dislight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alerts alt</Card.Title>
              <p className="mb-0 subtitle"> add <code>.alert-alt</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.altprimary} className='alert-alt'>
                {SVGICON.welcome}
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'altprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.altsecondary} className='alert-alt'>
                {SVGICON.done}
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.altsuccess} className='alert-alt'>
                {SVGICON.success}
                <strong>Success! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.disinfo} className='alert-alt'>
                {SVGICON.info}
                <strong>Info!  </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'altinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.altwarning} className='alert-alt'>
                {SVGICON.error}
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'altwarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.altdanger} className='alert-alt'>
                {SVGICON.error}
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'altdanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.altdark} className='alert-alt'>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'altdark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.altlight} className='alert-alt'>
                {SVGICON.error}
                <strong>Error!  </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'altlight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Solid Alt</Card.Title>
              <p className="mb-0 subtitle">add <code>.alert-alt.solid</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.altsolidprimary} className="solid alert-alt">
                {SVGICON.welcome}
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.altsolidsecondary} className="solid alert-alt">
                {SVGICON.done}
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.altsolidsuccess} className="solid alert-alt">
                {SVGICON.success}
                <strong>Success!</strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidsuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.altsolidinfo} className="solid alert-alt">
                {SVGICON.info}
                <strong>Info! </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.altsolidwarning} className="solid alert-alt">
                {SVGICON.error}
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidwarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.altsoliddanger} className="solid alert-alt">
                {SVGICON.error}
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsoliddanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.altsoliddark} className="solid alert-alt">
                {SVGICON.error}
                <strong>Error! </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'altsoliddark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.altsolidlight} className="solid alert-alt">
                {SVGICON.error}
                <strong>Error! </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'altsolidlight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Dismissable with solid</Card.Title>
              <p className="mb-0 subtitle"> add <code>.solid</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.soliddisprimary} className="solid">
                {SVGICON.welcome}
                <strong>Welcome! </strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddisprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.soliddicsecondary} className="solid">
                {SVGICON.done}
                <strong>Done! </strong> Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddicsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.soliddissuccess} className="solid">
                {SVGICON.success}
                <strong>Success!</strong> Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddissuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.soliddisinfo} className="solid">
                {SVGICON.info}
                <strong>Info! </strong> You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddisinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.soliddiswarning} className="solid">
                {SVGICON.error}
                <strong>Error! </strong> Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddiswarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.soliddisdanger} className="solid">
                {SVGICON.error}
                <strong>Error! </strong> Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddisdanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.soliddisdark} className="solid">
                {SVGICON.error}
                <strong>Error! </strong> You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddisdark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.soliddislight} className="solid">
                {SVGICON.error}
                <strong>Error! </strong> You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'soliddislight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert with Link</Card.Title>
              <p className="mb-0 subtitle">Bootstrap default style</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.linkprimary}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Please check this one as well. <button className="btn-close" onClick={() => dispatch({ type: 'linkprimary' })}></button></Link>
              </Alert>
              <Alert variant="secondary" dismissible show={state.linksecondary}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Please check this one as well. <button className="btn-close" onClick={() => dispatch({ type: 'linksecondary' })}></button></Link>
              </Alert>
              <Alert variant="success" dismissible show={state.linksuccess}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Please check this one as well. <button className="btn-close" onClick={() => dispatch({ type: 'linksuccess' })}></button></Link>
              </Alert>
              <Alert variant="info" dismissible show={state.linkinfo}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>My birthday party <button className="btn-close" onClick={() => dispatch({ type: 'linkinfo' })}></button></Link>
              </Alert>
              <Alert variant="warning" dismissible show={state.linkwarning}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Check this out <button className="btn-close" onClick={() => dispatch({ type: 'linkwarning' })}></button></Link>
              </Alert>
              <Alert variant="danger" dismissible show={state.linkdanger}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Click here for details. <button className="btn-close" onClick={() => dispatch({ type: 'linkdanger' })}></button></Link>
              </Alert>
              <Alert variant="dark" dismissible show={state.linkdark}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Click here for details. <button className="btn-close" onClick={() => dispatch({ type: 'linkdark' })}></button></Link>
              </Alert>
              <Alert variant="light" dismissible show={state.linklight}>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"}>Click here for details. <button className="btn-close" onClick={() => dispatch({ type: 'linklight' })}></button></Link>
              </Alert>

            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert with Link and solid color</Card.Title>
              <p className="mb-0 subtitle"> add <code>.solid</code> class to change the solid color.</p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.linksolidprimary} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-primary'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.linksolidsecondary} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-secondary'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.linksolidsuccess} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-succes'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidsuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.linksolidinfo} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-info'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.linksolidwarning} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-warning'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidwarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.linksoliddanger} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-danger'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksoliddanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.linksoliddark} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-dark'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksoliddark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.linksolidlight} className='solid'>
                <strong>WOW! Eveything looks OK. </strong>
                <Link to={"#"} className='badge-sm light ms-1 badge badge-light'>upgrade</Link>
                <button className="btn-close" onClick={() => dispatch({ type: 'linksolidlight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12}>
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Inline Notifications</Card.Title>
              <p className="mb-0 subtitle">Default inline notification</p>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={6}>
                  <Alert variant="primary" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="primary" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="secondary" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="secondary" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="success" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="success" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="info" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="info" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="warning" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="danger" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="danger" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="dark" className="notification">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="dark" size="sm"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="light" className="fade alert-primary notification show">
                    <p className="notificaiton-title mb-2"> <strong>Success!</strong> Vampires The Romantic Ideology Behind Them </p>
                    <p> The following article covers a topic that has recently moved to center stage-at lease it seems that way.</p>
                    <Button variant="light" size="sm" className="text-white"> Confirm </Button>
                    <Button variant="link" size="sm"> Cancel </Button>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert Icon Left</Card.Title>
              <p className="mb-0 subtitle"> add <code>.alert-right-icon</code> to change the style </p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.iconprimary} className="solid alert-right-icon">
                <span><i className='mdi mdi-account-search' /></span>{" "}
                Welcome! {" "} Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'iconprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.iconsecondary} className="solid alert-right-icon">
                <span><i className='icon icon-bell-53' /></span>{" "}
                Done! {" "} Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'iconsecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.iconsuccess} className="solid alert-right-icon">
                <span><i className='mdi mdi-check' /></span>{" "}
                Success!{" "} Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'iconsuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.iconinfo} className="solid alert-right-icon">
                <span><i className='mdi mdi-email' /></span>{" "}
                Info! {" "} You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'iconinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.iconwarning} className="solid alert-right-icon">
                <span><i className='mdi mdi-alert' /></span>{" "}
                Error! {" "} Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'iconwarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.icondanger} className="solid alert-right-icon">
                <span><i className='mdi mdi-help' /></span>{" "}
                Error! {" "} Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'icondanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.icondark} className="solid alert-right-icon">
                <span><i className='mdi mdi-settings' /></span>{" "}
                Error! {" "} You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'icondark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.iconlight} className="solid alert-right-icon">
                <span><i className='mdi mdi-cogs' /></span>{" "}
                Error! {" "} You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'iconlight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert outline</Card.Title>
              <p className="mb-0 subtitle"> add <code>.alert-outline-primary,secondary,success...</code> to change the style </p>
            </Card.Header>
            <Card.Body>
              <Alert variant="primary" dismissible show={state.outlineprimary} className="alert-outline-primary">
                Welcome! {" "} Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlineprimary' })}></button>
              </Alert>
              <Alert variant="secondary" dismissible show={state.outlinesecondary} className="alert-outline-secondary">
                Done! {" "} Your profile photo updated.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinesecondary' })}></button>
              </Alert>
              <Alert variant="success" dismissible show={state.outlinesuccess} className="alert-outline-success">
                Success!{" "} Message has been sent.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinesuccess' })}></button>
              </Alert>
              <Alert variant="info" dismissible show={state.outlineinfo} className="alert-outline-info">
                Info! {" "} You have got 5 new email.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlineinfo' })}></button>
              </Alert>
              <Alert variant="warning" dismissible show={state.outlinewarning} className="alert-outline-warning">
                Error! {" "} Something went wrong. Please check.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinewarning' })}></button>
              </Alert>
              <Alert variant="danger" dismissible show={state.outlinedanger} className="alert-outline-danger">
                Error! {" "} Message sending failed.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinedanger' })}></button>
              </Alert>
              <Alert variant="dark" dismissible show={state.outlinedark} className="alert-outline-dark">
                Error! {" "} You successfully read this important alert message.
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinedark' })}></button>
              </Alert>
              <Alert variant="light" dismissible show={state.outlinelight} className="alert-outline-light">
                Error! {" "} You successfully read this message..
                <button className="btn-close" onClick={() => dispatch({ type: 'outlinelight' })}></button>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xl-12 col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert Social</Card.Title>
              <p className="mb-0 subtitle"> add{" "} <code> .alert-social .facebook,.twitter,.linkedin,.google-plus </code>{" "} to change the style </p>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.socialefacebook} className="facebook alert-social">
                    <button className="btn-close" onClick={() => dispatch({ type: 'socialefacebook' })}></button>
                    <div className='media'>
                      <div className="alert-social-icon">
                        <span><i className="mdi mdi-facebook" /></span>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Facebook</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.socialtwitter} className="twitter alert-social">
                    <button className="btn-close" onClick={() => dispatch({ type: 'socialtwitter' })}></button>
                    <div className='media'>
                      <div className="alert-social-icon">
                        <span><i className="mdi mdi-twitter" /></span>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Twitter</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.sociallinkdin} className="linkedin  alert-social">
                    <button className="btn-close" onClick={() => dispatch({ type: 'sociallinkdin' })}></button>
                    <div className='media'>
                      <div className="alert-social-icon">
                        <span><i className="mdi mdi-linkedin" /></span>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Linkedin</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.socialgoogle} className="google-plus alert-social">
                    <button className="btn-close" onClick={() => dispatch({ type: 'socialgoogle' })}></button>
                    <div className='media'>
                      <div className="alert-social-icon">
                        <span><i className="mdi mdi-google-plus" /></span>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Google Plus</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xl-12 col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Message Alert</Card.Title>
              <Card.Text className="subtitle mb-0"> Bootstrap default style </Card.Text>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={6}>
                  <Alert variant="primary" dismissible show={state.messageprimary} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messageprimary' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="secondary" dismissible show={state.messagesecondary} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagesecondary' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="success" dismissible show={state.messagesuccess} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagesuccess' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="info" dismissible show={state.messageinfo} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messageinfo' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.messagewarning} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagewarning' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="danger" dismissible show={state.messagedanger} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagedanger' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="dark" dismissible show={state.messagedark} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagedark' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="light" dismissible show={state.messagelight} className="">
                    <button className="btn-close" onClick={() => dispatch({ type: 'messagelight' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-1">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xl-12 col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Message Alert with Solid color</Card.Title>
              <p className="mb-0 subtitle"> add <code>.solid</code> to change the style </p>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={6}>
                  <Alert variant="primary" dismissible show={state.solidmessageprimary} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessageprimary' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="secondary" dismissible show={state.solidmessagesecondary} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagesecondary' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="success" dismissible show={state.solidmessagesuccess} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagesuccess' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="info" dismissible show={state.solidmessageinfo} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessageinfo' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.solidmessagewarning} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagewarning' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="danger" dismissible show={state.solidmessagedanger} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagedanger' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="dark" dismissible show={state.solidmessagedark} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagedark' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2 text-white">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="light" dismissible show={state.solidmessagelight} className="solid">
                    <button className="btn-close" onClick={() => dispatch({ type: 'solidmessagelight' })}></button>
                    <div className='media'>
                      <div className="media-body">
                        <h5 className="mt-1 mb-2">Notifications</h5>
                        <p className="mb-0">
                          Cras sit amet nibh libero, in gravida nulla. tempus
                          viverra turpis. Fusce condimentum nunc ac nisi
                          vulputate fringilla. Donec lacinia congue felis in
                          faucibus.
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-xl-12 col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Alert left icon big </Card.Title>
              <p className="mb-0 subtitle"> add <code>.left-icon-big</code> to change the style </p>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={6}>
                  <Alert variant="primary" dismissible show={state.iconbigprimary} className="left-icon-big">
                    <button className="btn-close" onClick={() => dispatch({ type: 'iconbigprimary' })}></button>
                    <div className='media'>
                      <div variant="" className="alert-left-icon-big">
                        <span>
                          <i className="mdi mdi-email-alert" />
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-1 mb-2">Welcome to your account, Dear user!</h6>
                        <p className="mb-0">Please confirm your email address: email@example.com</p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="warning" dismissible show={state.iconbigwarning} className="left-icon-big">
                    <button className="btn-close" onClick={() => dispatch({ type: 'iconbigwarning' })}></button>
                    <div className='media'>
                      <div variant="" className="alert-left-icon-big">
                        <span>
                          <i className="mdi mdi-help-circle-outline" />
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-1 mb-2">Pending!</h6>
                        <p className="mb-0">You message sending failed.</p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="success" dismissible show={state.iconbigsuccess} className="left-icon-big">
                    <button className="btn-close" onClick={() => dispatch({ type: 'iconbigsuccess' })}></button>
                    <div className='media'>
                      <div variant="" className="alert-left-icon-big">
                        <span>
                          <i className="mdi mdi-check-circle-outline" />
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-1 mb-2">Congratulations!</h6>
                        <p className="mb-0">You have successfully created a account.</p>
                      </div>
                    </div>
                  </Alert>
                </Col>
                <Col xl={6}>
                  <Alert variant="danger" dismissible show={state.iconbigdanger} className="left-icon-big">
                    <button className="btn-close" onClick={() => dispatch({ type: 'iconbigdanger' })}></button>
                    <div className='media'>
                      <div variant="" className="alert-left-icon-big">
                        <span>
                          <i className="mdi mdi-alert" />
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-1 mb-2">Loading failed!</h6>
                        <p className="mb-0">Again upload your server</p>
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UiAlert;
