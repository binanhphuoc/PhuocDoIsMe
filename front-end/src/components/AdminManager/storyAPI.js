const axios = require('axios');
const base64 = require('base64-arraybuffer');

var getAllStory = (setStory, setFile) => {
    axios.post('/admin/binpdo/getAllStory')
        .then((result) => {
            console.log(result);
            setStory(result.data.data);
            getList(result.data.data, setFile);
        })
        .catch((error) => {
            console.log(error.response.data);
        })
}

var getFile = (key,i, cb) => {
    console.log(i);
    axios.post('/admin/binpdo/getStoryFile', {key})
    .then((result) =>
    {
        console.log(result);
        cb(i,'data:image/png;base64,'+base64.encode(result.data.data.Body.data));

    }).catch( (error) => {
        console.log(error.response.data);
    })
}

var getList = (stories, setFile) => {
    ///// Construct IMAGES
    //console.log(this.state.stories.length);
    for (var i = 0; i < stories.length; i++)
    {
        //console.log(this.state.stories[i].file);
        getFile(stories[i].file,i, (pos,file) => {
            //console.log(pos);
            //var imgs = this.state.images.slice();
            setFile(file, pos);
        })
    };
}

module.exports = {
    
    getAllStory,
    
    // Return: raw data of all stories (no image or video ---- just text)
    // 
    // Variables:
    //      setStory: 
    //          type: <callback> (stories: array of raw data of all stories)
    //          description: this callback function is called first 
    //                       to get all raw stories at once.
    //      setFile: 
    //          type: <callback> (file, index)
    //          description: this callback function is called after setStory
    //                       to get the file of each story. Because a file may
    //                       be large, we don't want to get all files at once
    //                       and return at the end. Instead, this callback function
    //                       will be called each time a file is successfully retrieved.
    //                       The retrieved file will be stored in 'file',
    //                       and it belongs to the Story at index 'index'.
}