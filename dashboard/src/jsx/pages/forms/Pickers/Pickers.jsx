import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import PageTitle from "../../../layouts/PageTitle";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function Pickers() {
  const [colorChange, setColorChange] = useState("#28475d");
  const [colorChange2, setColorChange2] = useState("#2c2c2c");
  const [colorChange3, setColorChange3] = useState("#495A69");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate2, endDate2] = dateRange;
  const [value, onChange] = useState('10:00');
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Fragment>
      <PageTitle activeMenu="Pickers" motherMenu="Form" />

      <div className="row">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Date Picker</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 mb-3">
                  <div className="example">
                    <label className="form-label">Date Range Pick</label>
                    <div className="input-hasicon mb-sm-0 mb-3 d-flex w-100 border form-control cmscalender">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="2025-05-10"
                        className="border-0 pt-2 bg-transparent clearallselect"
                      />
                      <div className="icon"><i className="far fa-calendar" /></div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 mb-3">
                  <div className="example">
                    <label className="form-label">Date Range With Time</label>
                    <div className="input-hasicon mb-sm-0 mb-3 d-flex w-100 border form-control cmscalender">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="2025-05-11"
                        className="border-0 pt-2 bg-transparent clearallselect"
                      />
                      <div className="icon"><i className="far fa-calendar" /></div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="example">
                    <label className="form-label">Limit Selectable Dates</label>
                    <div className="input-hasicon mb-sm-0 mb-3 d-flex w-100 border form-control cmscalender z-3">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="2025-05-12"
                        className="border-0 pt-2 bg-transparent clearallselect"
                      />
                      <div className="icon"><i className="far fa-calendar" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Pick-Date picker</h4>
            </div>
            <div className="card-body cmscalender">
              <p className="mb-1 form-label">Start Date </p>
              <DatePicker
                className="form-control "
                selectsRange={true}
                startDate={startDate2}
                endDate={endDate2}
                onChange={(update) => {
                  setDateRange(update);
                }}
                withPortal
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Clock picker</h4>
            </div>
            <div className="card-body timepick">
              <div className="row">
                <div className="col-md-6 col-xl-3 mb-3">
                  <label className="form-label">Default Clock Picker</label>
                  <div className="input-group clockpicker">
                    <TimePicker onChange={onChange} value={value} clearIcon clearAriaLabel minutePlaceholder="12" hourPlaceholder="24" className="form-control  pt-2" />
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-3">
                  <label className="form-label">Auto btn-close Clock Picker</label>
                  <div className="input-group clockpicker" data-placement="bottom" data-align="top" data-autobtn-close="true">
                    <TimePicker onChange={onChange} value={value} clearIcon clearAriaLabel minutePlaceholder="12" hourPlaceholder="24" className="form-control pt-2" />
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-3">
                  <label className="form-label">Now time</label>
                  <div className="input-group">
                    <TimePicker align="left" onChange={onChange} value={value} clearIcon clearAriaLabel minutePlaceholder="12" hourPlaceholder="24" className="form-control pt-2" clockIcon="" />
                    <button type="button" id="check-minutes" className="btn waves-effect waves-light btn-ft btn-success">Check the minutes</button>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <label className="form-label">Left Placement</label>
                  <div className="input-group clockpicker" data-placement="left" data-align="top" data-autobtn-close="true">
                    <TimePicker align="left" onChange={onChange} value={value} clearIcon clearAriaLabel minutePlaceholder="12" hourPlaceholder="24" className="form-control pt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Color Picker</h4>
            </div>
            <div className="card-body">
              <div className="row">

                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="example style-1">
                    <p className="form-label d-block">Simple mode</p>
                    <input
                      type="color"
                      className="as_colorpicker asColorPicker-trigger border-0"
                      value={colorChange}
                      onChange={(e) => setColorChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="example style-1">
                    <p className="form-label d-block">Complex mode</p>
                    <input
                      type="color"
                      className="as_colorpicker asColorPicker-trigger border-0"
                      value={colorChange2}
                      onChange={(e) => setColorChange2(e.target.value)}

                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="example style-1">
                    <p className="form-label d-block">Gradiant mode</p>
                    <input
                      type="color"
                      className="as_colorpicker asColorPicker-trigger border-0"
                      value={colorChange3}
                      onChange={(e) => setColorChange3(e.target.value)}

                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Pickers;