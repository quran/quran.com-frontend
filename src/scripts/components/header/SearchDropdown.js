import React from 'react';
import classNames from 'classnames';

class SearchDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { surahs: [], ayat: [] };
  }

  componentWillUpdate(nextProps, nextState) {
    this.setState({ ayat: nextProps.ayat, surahs: nextProps.surahs });
    this.renderList('surahs');
    this.renderList('ayat');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( nextProps.ayat !== nextState.ayat || nextProps.surahs !== nextState.surahs  ) return true;
    return false;
  }

  renderList(key) {
    return this.props[key].map((item) => {
      return this.renderItem(item);
    });
  }

  renderItem(item) {
    return (
      <li key={item.href} style={{textAlign: 'left', listStyleType: 'none'}}>
        <div href={item.href} style={{display: 'block'}}>
          <div style={{position:'absolute',right:'1px', paddingLeft:'70px', paddingRight: '10px', lineHeight: '28px', background: 'linear-gradient(to right,rgba(255, 255, 255, 0), white 40%, rgba(255,255,255,1))', zIndex: '2', textAlign: 'right'}}>
            <a href={item.href}>{item.href}</a>
          </div>
          <div style={{overflow: 'hidden', wordWrap:'break-word', whiteSpace: 'nowrap', lineHeight: '28px', backgroundColor: 'white', paddingLeft: '10px' }}>
            <a href={item.href} style={{display: 'block'}} dangerouslySetInnerHTML={{__html: item.text }} />
          </div>
        </div>
      </li>
    );
  }

  render() {
    var className = classNames({
      'searchdropdown': true,
      'hidden': this.props.ayat.length || this.props.surahs.length ? false : true
    });

    return (
      <div className={className} style={{width:'100%',backgroundColor:'#ccc',position:'absolute',zIndex:'99', paddingTop: '10px', paddingBottom: '10px'}}>
        <ul style={{margin:0, padding:0, border: '1px solid black'}}>
          {this.renderList('surahs')}
          {this.renderList('ayat')}
        </ul>
      </div>
    );
  }
};


SearchDropdown.contextTypes = {
  executeAction: React.PropTypes.func.isRequired
};
SearchDropdown.displayName = 'SearchDropdown';
export default SearchDropdown;
