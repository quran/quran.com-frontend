import React from 'react';
// import AyahListActions from 'actions/AyahListActions';

class FontSizeInput extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  _onChange(e) {
    var sliderVal = e.target.value,
        fraction = sliderVal / 100,
        fontSize;

    if (fraction < 0.1) {
      fontSize = 16;
    } else {
      fontSize = 100 * fraction;
    }

    // AyahListActions.fontSizeChange(this.context.dispatcher, fontSize)
  }

  render() {
    return (
      <div className="input-range-container">
        <span className="size1">A</span>
        <input type="range" onChange={this._onChange} step="10" />
        <span className="size2">A</span>
      </div>
    );
  }
}

export default FontSizeInput;
