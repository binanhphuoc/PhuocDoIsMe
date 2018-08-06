import React, { Component } from 'react';
import './intropanel.css';


class StoryItem extends Component {
 
  constructor(props)
  {
    super(props);
    this.state = {
      bodyClass:'hidden',
    }
  }

  render(){
    return(
        <div className="intropanel div">
            <img className={this.props.start===true?'intropanel show':'intropanel hidden'} src={this.props.story.fileData} />
            {/*<p className="legend">{story.title}</p>*/}
            {this.props.story.done && 
            <div 
            style={{top:"100px", left:"100px"}} 
            className="intropanel title"
            onMouseEnter={()=>{
                this.setState({bodyClass:'show'});
            }}
            onMouseLeave={()=>{
                this.setState({bodyClass:'hidden'});
            }}
            >
            {this.props.story.title}
            </div>}
            
            <div 
            style={{top:"200px", left:"100px"}} 
            className={"intropanel subtitle "+this.state.bodyClass}
            > {/*"intropanel subtitle hidden"*/}
                {this.props.story.subtitle}
            </div>
            
            {this.props.story.body!=='' &&
            <div className={"intropanel body "+this.state.bodyClass}>
                <p className="intropanel text">{this.props.story.body}</p>
            </div>
            }
            
      </div>
    )};
}
 

/*
importAll(r) {
  let images = [];
  r.keys().map((item, index) => { images.push({original:r(item)}); });
  console.log('size: ' + images.length);
  return images;
}

images = this.importAll(require.context('./Intropanel/images', false, /\.(png|jpe?g|svg)$/));*/

StoryItem.defaultProps = {
    start: false
}

export default StoryItem;
