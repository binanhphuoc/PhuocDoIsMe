import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import './intropanel.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
import iconPrev from './slider-left-arrow.svg';
import iconNext from './slider-right-arrow.svg';


class Intropanel extends Component {
 
  importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images.push({original:r(item)}); });
    console.log('size: ' + images.length);
    return images;
  }
  
  //images = this.importAll(require.context('./Intropanel/images', false, /\.(png|jpe?g|svg)$/));

  render(){

    var icon = {
      prev: iconPrev,
      next: iconNext
    }

    return(
  <Carousel showStatus={false} showThumbs={false} icon={icon}>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
      <p className="legend">Legend 2</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
      <p className="legend">Legend 3</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
      <p className="legend">Legend 4</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" />
      <p className="legend">Legend 5</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
      <p className="legend">Legend 6</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" />
      <p className="legend">Legend 7</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" />
      <p className="legend">Legend 8</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" />
      <p className="legend">Legend 9</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-10.jpg" />
      <p className="legend">Legend 10</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-11.jpg" />
      <p className="legend">Legend 11</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-12.jpg" />
      <p className="legend">Legend 12</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" />
      <p className="legend">Legend 13</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" />
      <p className="legend">Legend 14</p>
    </div>
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
