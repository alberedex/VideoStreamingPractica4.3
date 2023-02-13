import VideoSystemController from "./videoSystemController.js";
import VideoSystem from "./videoSystemModel.js";
import VideoSystemView from "./videoSystemView.js";


let VideoSystemApp;

$(function(){
    VideoSystemApp = new VideoSystemController(
        VideoSystem.getInstance("videoS"), new VideoSystemView()
    );
});


export default VideoSystemApp;