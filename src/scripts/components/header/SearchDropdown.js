import React from 'react';
import classNames from 'classnames';

class SearchDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { text: '', list: [] };
  }

  componentDidMount() {
    console.log('SearchDropDown componentDidMount', arguments);
  }

  componentDidUpdate(nextProps, nextState) {
    //console.log('SearchDropDown componentDidUpdate', nextProps, nextState);
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('SearchDropdown componentWillUpdate', nextProps, nextState);
    this.setState({ text: nextProps.text, list: nextProps.list });
    this.renderList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('SearchDropdown shouldComponentUpdate', nextProps, nextState);
    if ( nextProps.text !== nextState.text || nextProps.list !== nextState.list ) return true;
    return false;
  }

  renderList() {
    return this.props.list.map((item) => {
      return this.renderItem(item);
    });
  }

  renderItem(item) {
    //console.log('SearchDropdown renderItem', item);
    var href = '/'+ item.ayah.replace( /:/, '/' );
    return (
      <li key={item.ayah} style={{textAlign: 'left', listStyleType: 'none'}}>
        <div href={href} style={{display: 'block'}}>
          <div style={{position:'absolute',right:'1px', paddingLeft:'70px', paddingRight: '10px', lineHeight: '28px', background: 'linear-gradient(to right,rgba(255, 255, 255, 0), white 40%, rgba(255,255,255,1))', zIndex: '2', textAlign: 'right'}}>
            <a href={href}>{href}</a>
          </div>
          <div style={{overflow: 'hidden', wordWrap:'break-word', whiteSpace: 'nowrap', lineHeight: '28px', backgroundColor: 'white', paddingLeft: '10px' }}>
            <a href={href} dangerouslySetInnerHTML={{__html: item.text }} />
          </div>
        </div>
      </li>
    );
  }

  render() {
    var className = classNames({
      'searchdropdown': true,
      'hidden': this.props.list.length ? false : true
    });

    return (
      <div className={className} style={{width:'100%',backgroundColor:'#ccc',position:'absolute',zIndex:'99', paddingTop: '10px', paddingBottom: '10px'}}>
        <ul style={{margin:0, padding:0, border: '1px solid black'}}>
          {this.renderList()}
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
