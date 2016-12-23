import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

import IndexHeader from 'components/IndexHeader';

export default class Contact extends Component {
  state = {
    success: false
  };

  submitSupport = (event) => {
    event.preventDefault();

    const form = {
      subject: ReactDOM.findDOMNode(this.purpose).value.trim(),
      description: ReactDOM.findDOMNode(this.body).value.trim(),
      requester: {
        name: ReactDOM.findDOMNode(this.name).value.trim(),
        email: ReactDOM.findDOMNode(this.email).value.trim(),
        locale_id: 8
      }
    };

    superagent.post('/support').send(form).end((err, { body }) => {
      if (body.ticket) {
        this.setState({
          success: true
        });
      }
    });
  }

  renderForm() {
    return (
      <form className="form-horizontal" onSubmit={this.submitSupport}>
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" ref={(name) => { this.name = name; }} />
          </div>
        </div>
        <input type="hidden" name="_next" value="google.com" />
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" ref={(email) => { this.email = email; }} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="col-sm-2 control-label">Purpose</label>
          <div className="col-sm-8">
            <select className="form-control" ref={(purpose) => { this.purpose = purpose; }} defaultValue="feedback">
              <option value="feedback">Feedback & Suggestions</option>
              <option value="translation-bug">Translation Error</option>
              <option value="bug">Site Bug</option>
              <option value="talent">Contributing (monetary or talent)</option>
              <option value="help">Help</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="col-sm-2 control-label">Message</label>
          <div className="col-sm-8">
            <textarea rows="4" cols="50" className="form-control" ref={(body) => { this.body = body; }} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-4">
            <input type="submit" value="Send" className="btn btn-primary btn-lg btn-block" />
          </div>
        </div>
      </form>
    );
  }

  renderSubmitSuccess = () => (
    <h3 className="text-center form-success-message">
      Thank you for contacting us - we look forward to speaking with you. While this is a
      volunteer effort, we do experience many
      support tickets on a daily basis and would love to get back to everyone on a timely manner.
    </h3>
  );

  render() {
    let body;

    if (this.state.success) {
      body = this.renderSubmitSuccess();
    } else {
      body = this.renderForm();
    }

    return (
      <div>
        <IndexHeader noSearch />
        <div className="container-fluid about-text">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h4>
                Contacting us - thank you for taking time to speak to us.
                Please be as concise as possible
                and include screenshots where applicable to help us help you as quickly as we can.
                <br />
                <br />
              </h4>
            </div>
            <div className="col-md-8 col-md-offset-2">
              {body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
