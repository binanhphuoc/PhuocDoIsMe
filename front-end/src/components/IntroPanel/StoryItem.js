import React, { Component } from 'react';
import './intropanel.css';
import './StoryItem.css'


class StoryItem extends Component {
 
  constructor(props)
  {
    super(props);
    this.state = {
      bodyClass:'hidden',
      imgClass: 'intropanel hidden',
      titleClass: '',
    }

    this.showSubtitle = this.showSubtitle.bind(this);
  }

  showSubtitle(){
    this.setState({
        subtitleClass: 'intropanel subtitle show'
    });
  }

  static getDerivedStateFromProps(props, state){
    if (props.start)
    {
        
        return{
            imgClass: 'intropanel show',
            titleClass: 'typewriter'
        }  
    }
    else{
        return{
            imgClass: 'intropanel hidden',
            titleClass: '',
            subtitleClass: 'intropanel subtitle hidden'
        }
    }
  }

  shouldComponentUpdate(nextProps, nextState)
    {  
        if (nextProps.start)
        {
            setTimeout(this.showSubtitle,3200);
        }
        return true;
    }

  render(){
    return(
        <div className="intropanel div">
            <img className={this.state.imgClass} src={this.props.story.fileData} />
            {/*<p className="legend">{story.title}</p>*/}
            
            
            {this.props.story.done &&
            <div style={{position:"absolute", top:"100px", left:"100px"}}>
                <div
                className={this.state.titleClass}
                onMouseEnter={()=>{
                    this.setState({bodyClass:'show'});
                }}
                onMouseLeave={()=>{
                    this.setState({bodyClass:'hidden'});
                }}
                >
                {this.props.story.title}
                </div>
            </div>
            }

            <div 
            style={{top:"200px", left:"100px"}} 
            className={this.state.subtitleClass}
            onMouseEnter={()=>{
                this.setState({bodyClass:'show'});
            }}
            onMouseLeave={()=>{
                this.setState({bodyClass:'hidden'});
            }}>
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
