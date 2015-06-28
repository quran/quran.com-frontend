import React from 'react';
import IndexHeader from 'components/header/IndexHeader';
import Settings from 'constants/Settings';
import request from 'superagent-promise';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    }
  };

  submitSupport(e) {
    e.preventDefault();

    let toSubmit = {
      subject: React.findDOMNode(this.refs.purpose).value.trim(),
      description: React.findDOMNode(this.refs.body).value.trim(),
      requester: {
        name: React.findDOMNode(this.refs.name).value.trim(),
        email: React.findDOMNode(this.refs.email).value.trim(),
        locale_id: 8
      }
    };

    request.post(Settings.url + 'support').send(toSubmit).end()
    .then((res) => {
      if (res.body.ticket) {
        this.setState({
          success: true
        });
      }
    });
  };

  renderForm() {
    return(
      <form className="form-horizontal" onSubmit={this.submitSupport.bind(this)}>
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" ref="name" />
          </div>
        </div>
        <input type="hidden" name="_next" value="google.com" />
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" ref="email" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="col-sm-2 control-label">Purpose</label>
          <div className="col-sm-8">
            <select className="form-control" ref="purpose">
              <option value="feedback" selected>Feedback</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
              <option value="help">Help</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="col-sm-2 control-label">Message</label>
          <div className="col-sm-8">
            <textarea  rows="4" cols="50" className="form-control" ref="body" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-4">
            <input type="submit" value="Send" className="btn btn-primary btn-lg btn-block" />
          </div>
        </div>
      </form>
    );
  };

  renderSubmitSuccess() {
    return (
      <h3 className="text-center form-success-message">Form submitted. Thank you</h3>
    );
  };

  render() {
    let body;
    if (this.state.success) {
      body = this.renderSubmitSuccess();
    }
    else {
      body = this.renderForm();
    }

    return(
      <div>
        <IndexHeader noSearch={true} />
        <div className="container-fluid about-text">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
            {body}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Contact;
