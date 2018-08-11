import React from 'react';
import axios from 'axios';
import base64 from 'base64-arraybuffer';
import Gallery from 'react-grid-gallery';
import EditStory from './editStory';
import StoryAPI from './storyAPI';
import './adminLogin.css';


const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const customTagStyle = {
    wordWrap: "break-word",
    display: "inline-block",
    backgroundColor: "white",
    height: "auto",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    padding: ".2em .6em .3em",
    borderRadius: ".25em",
    color: "black",
    verticalAlign: "baseline",
    margin: "2px"
};

 class storyList extends React.Component{

    // Post('admin/binpdo/getAllStory') to get all raw Stories from Mongo
    // Parse Images to display

    constructor(props) {
        super(props);
        this.state ={
          stories: [],
          images: [],
          hidden: {value: true, storyIndex: undefined},
          data: {}
        }
        
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onClickThumbnail = this.onClickThumbnail.bind(this);

        this.state.images.splice(0, 0, {
            src: require('./add-plus-button.svg'),
            thumbnail: require('./add-plus-button.svg'),
            thumbnailWidth: 320,
            thumbnailHeight: 320,
            isSelected: false,
        });

        StoryAPI.getAllStory(
            (stories)=>{
                this.setState({stories});
                
                for (var i = 0; i < stories.length; i++)
                {
                    var imgs = this.state.images.slice();
                    imgs.splice(i+1, 0, {
                        pos: i,                   //////// Pos of the image in the array
                        src: require('./empty.png'),
                        thumbnail: require('./empty.png'),
                        thumbnailWidth: 320,
                        thumbnailHeight: 320,
                        isSelected: false,
                        caption: stories[i].title,
                        tags: [{value: stories[i].title, 
                            title: stories[i].subtitle}],
                    })
                    this.setState({images: imgs});
                }
            },
            (file, index) => {
                var imgs = this.state.images.slice();
                imgs.splice(index+1,1, {
                        pos: index,                    //////// Pos of the image in the array
                        src: file,
                        thumbnail: file,
                        thumbnailWidth: 'auto',
                        thumbnailHeight: 320,
                        isSelected: false,
                        caption: this.state.stories[index].title,
                        tags: [{value: this.state.stories[index].title, 
                            title: this.state.stories[index].subtitle}],
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

    componentDidMount() {

        //Authenticate User, if not login redirect user to login page, if already Login
        //take user to homepage
        //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/admin/auth', { 'headers': { 'Authorization': localStorage.getItem('jwtToken')} })
          .then(res => {
            //display homepage (App.js)
            // res contains all the information from the back-end
            
          })
          .catch((error) => {
            console.log(error)
            //redirect to login page
            this.props.history.push("/admin/login");
          });
      }

    setCustomTags (i) {
        return (
            i.tags.map((t) => {
                return (<div
                        key={t.value}
                        style={customTagStyle}>
                        {t.title}
                        </div>);
            })
        );
    }


    onSelectImage (index, image) {

        if (index == 0)
            return;
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
        // Show panel EditStory
        

        if (index === 0)
        {
            this.setState({data: undefined, hidden: {value: false, storyIndex:this.state.stories.length}})
            return;
        }

        if (this.state.hidden.value)
        {

            const story = this.state.stories[index-1];
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
            this.setState({data, hidden: {value: false, storyIndex:index-1}});
            console.log(data);
        }
    }

    updateStoryList(isNew, res){
        if (isNew)  //// if add a new story
            this.setState((prevState) => ({
                stories: [...prevState.stories, res.story],
                images: [...prevState.images, {
                    pos: prevState.stories.length,  //////// Pos of the image in the array
                    src: res.file,
                    thumbnail: res.file,
                    thumbnailWidth: 'auto',
                    thumbnailHeight: 320,
                    isSelected: false,
                    caption: res.story.title,
                    tags: [{value: res.story.title, 
                        title: res.story.subtitle}],
                }]
            }))
        else{ ////// if edit story
            var stories = this.state.stories.slice();
            Object.assign(stories[this.state.hidden.storyIndex], res.story);
            var imgs = this.state.images.slice();
            var obj = {};
            obj.tags = imgs[this.state.hidden.storyIndex+1].tags;
            if (res.story.title)
            {
                obj.caption= res.story.title;
                obj.tags[0].value = res.story.title;
            }
            if (res.story.subtitle)
            {
                obj.tags[0].title = res.story.subtitle;
            }
            if (res.file)
            {
                obj.src = res.file,
                obj.thumbnail =res.file
            }
            Object.assign(imgs[this.state.hidden.storyIndex+1], obj);
            this.setState({stories, images: imgs});
        }
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    render(){
        console.log(this.state.stories);
        var images =
                this.state.images.map((i) => {
                    i.customOverlay = (
                            <div style={captionStyle}>
                                <div>{i.caption}</div>
                                {i.hasOwnProperty('tags') &&
                                this.setCustomTags(i)}
                            </div>);
                    return i;
                });

        return (
            <div>
                <button 
                style={{position: "fixed", right: 20+"px", bottom: 20+"px"}}
                type="submit" class="btn btn-primary" onClick={this.logout}>Log Out</button>
                <div className="storylist photogrid">
                    <Gallery images={images} 
                    enableLightbox={false} 
                    margin={10}
                    onSelectImage={this.onSelectImage}
                    onClickThumbnail={this.onClickThumbnail}
                    
                    />
                </div>
                <EditStory onShowData={this.state.data}
                onCancelClick={() => this.setState(
                    {hidden:{value:true, storyIndex:this.state.hidden.storyIndex}
                })}
                onDeleteClick={(showResponse) => {
                    var index = this.state.hidden.storyIndex;
                    var id = this.state.stories[index]._id;
                    StoryAPI.deleteStory(id, (err, result) => {
                        showResponse(err, result);
                        if (err)
                            console.log(err);
                        else
                        {
                            // Remove the story
                            var stories = this.state.stories.slice();
                            stories.splice(index, 1);
                            
                            // Remove the file
                            var imgs = this.state.images.slice();
                            imgs.splice(index+1, 1);

                            // Set state
                            this.setState({stories, images: imgs});

                        }
                    })
                }}
                hidden={this.state.hidden.value}
                onSaveClick={(data, showResponse) => {
                    StoryAPI.saveStory(data, (err, res) => {
                        console.log(err);
                        console.log(res);
                        if (err)
                            showResponse(err);
                        else {
                            showResponse(null, res);
                            this.updateStoryList(!data.id, res);
                        }
                        
                    })
                }}/>
            </div>
        );
    }
};

export default storyList;