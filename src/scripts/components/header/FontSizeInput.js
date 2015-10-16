import React from 'react';
import * as AyahsActions from 'actions/AyahsActions';
import $ from 'jquery';

class FontSizeInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fontSize: 49,
      initWidth: 100
    };

  }

  componentDidMount() {
    this.setState({
      initWidth: $(React.findDOMNode(this)).width()
    });
  }

  onChange(e) {
    var sliderVal = e.target.value,
      fraction = sliderVal / 100,
      fontSize;

    if (fraction < 0.1) {
      fontSize = 49;
    }
    else {
      fontSize = 100 * fraction;
    }

    this.setState({fontSize: fontSize});
  }

  render() {
    let styleText = `
      .ayah_num b, .word-font{font-size: ${this.state.fontSize}px !important}
      input[type=range]:after{border-left-width: ${this.state.initWidth}px}`;
    return (
      <div className="input-range-container">
        <style dangerouslySetInnerHTML={{__html: styleText}} />
        <span className="size1">A</span>
        <input type="range" onChange={this.onChange.bind(this)} />
        <span className="size2">A</span>
      </div>
    );
  }
}

FontSizeInput.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};

export default FontSizeInput;
