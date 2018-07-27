import React from 'react';
import axios from 'axios';
import base64 from 'base64-arraybuffer';
import Gallery from 'react-grid-gallery';
import EditStory from './editStory';
import StoryAPI from './storyAPI';
import './adminLogin.css'

 class storyList extends React.Component{

    // Post('admin/binpdo/getAllStory') to get all raw Stories from Mongo
    // Parse Images to display

    constructor(props) {
        super(props);
        this.state ={
          stories: [],
          images: [],
          hidden: true,
          data: {}
        }
        
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onClickThumbnail = this.onClickThumbnail.bind(this);
        this.saveStory = this.saveStory.bind(this);

        StoryAPI.getAllStory(
            (stories)=>{
                this.setState({stories});
            },
            (file, index) => {
                var imgs = this.state.images.slice();
                imgs.splice(index,0, {
                        pos: index,                    //////// Pos of the image in the array
                        src: file,
                        thumbnail: file,
                        thumbnailWidth: 320,
                        thumbnailHeight: 320,
                        isSelected: false,
                        caption: "After Rain (Jeshu John - designerspics.com)"
                    });
                this.setState({images: imgs});
            })

        /*
        axios.post('/admin/binpdo/getAllStory')
        .then((result) => {
            console.log(result);
            this.state.stories = result.data.data;
            this.getList();
        })
        .catch((error) => {
            console.log(error.response.data);
        })
        */
    }

    onSelectImage (index, image) {

        var images = this.state.images.slice();
        var img = images[index];
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });

    }

    onClickThumbnail (index) {
        this.setState({hidden: false});
        const story = this.state.stories[this.state.images[index].pos];
        const file = this.state.images[index].src;
        console.log(story);
        var data = {
            id: story._id,
            title: story.title,
            subtitle: story.subtitle,
            body: story.body,
            fileName: story.file,
            selected: story.selected,
            file
        }
        this.setState({data});
        console.log(data);
    }


    saveStory(data)
    {

    }

    render(){
        return (
            <div>
                
                <div className="storylist photogrid">
                    <Gallery images={this.state.images} 
                    enableLightbox={false} 
                    margin={10}
                    onSelectImage={this.onSelectImage}
                    onClickThumbnail={this.onClickThumbnail}/>
                </div>
                <EditStory onShowData={this.state.data}
                onCancelClick={() => this.setState({hidden:true})}
                onSaveClick={this.saveStory} 
                hidden={this.state.hidden}/>
            </div>
        );
    }
};

export default storyList;