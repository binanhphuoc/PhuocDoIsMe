import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import './intropanel.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
import iconPrev from './slider-left-arrow.svg';
import iconNext from './slider-right-arrow.svg';
import StoryAPI from '../AdminManager/storyAPI';
import StoryItem from './StoryItem';


class Intropanel extends Component {
 
  constructor(props)
  {
    super(props);
    this.state = {
      stories: [],
    }

    StoryAPI.getAllStory((stories)=>{
      this.setState({stories});
      
      for (var i = 0; i < stories.length; i++)
      {
          var stories = this.state.stories.slice();
          stories[i].fileData=require('../AdminManager/empty.png');
          stories[i].done = false;
          stories[i].index = i;
          this.setState({stories});
      }
    },
    (file, index) => {
        var stories = this.state.stories.slice();
        stories[index].fileData=file;
        stories[index].done = true;
        this.setState({stories});
    })

    this.mapping = this.mapping.bind(this);
  }
  
  icon = {
    prev: iconPrev,
    next: iconNext
  }
  //images = this.importAll(require.context('./Intropanel/images', false, /\.(png|jpe?g|svg)$/));

  mapping(story)
  {
    return(
      <StoryItem story={story}/>
    )
  }

  render(){

    return(
      <Carousel showStatus={false} showThumbs={false} icon={this.icon}>
        {this.state.stories.map(this.mapping)}
      </Carousel>
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

export default Intropanel;
