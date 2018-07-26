import React from 'react';
import axios from 'axios';
import base64 from 'base64-arraybuffer';
import Gallery from 'react-grid-gallery';
import './adminLogin.css'

 class storyList extends React.Component{

    // Post('admin/binpdo/getAllStory') to get all raw Stories from Mongo
    // Parse Images to display

    constructor(props) {
        super(props);
        this.state ={
          stories: [],
          images: [],
        }
       
        axios.post('/admin/binpdo/getAllStory')
        .then((result) => {
            console.log(result);
            this.state.stories = result.data.data;
            this.getList();
        })
        .catch((error) => {
            console.log(error.response.data);
        })
        this.getFile = this.getFile.bind(this);
        this.getList = this.getList.bind(this);
    }

    getFile(key, cb){
        axios.post('/admin/binpdo/getStory', {key})
        .then((result) =>
        {
            console.log(result);
            cb('data:image/png;base64,'+base64.encode(result.data.data.Body.data));

        }).catch( (error) => {
            console.log(error.response.data);
        })
    }

    getList()
    {
        ///// Construct IMAGES
        console.log(this.state.stories.length);
        for (var i = 0; i < this.state.stories.length; i++)
        {
            console.log(this.state.stories[i].file);
            this.getFile(this.state.stories[i].file, (file) => {
                console.log(file);
                this.setState(prevState => ({
                    images: [...prevState.images, {
                        src: file,
                        thumbnail: file,
                        thumbnailWidth: 320,
                        thumbnailHeight: 320,
                        isSelected: false,
                        caption: "After Rain (Jeshu John - designerspics.com)"
                    }]
                }))
            });
            
        }
    }

    render(){
        return (
            <div className="storylist photogrid">
                <Gallery images={this.state.images} enableLightbox={false} margin={10}/>
            </div>
        );
    }
};

export default storyList;