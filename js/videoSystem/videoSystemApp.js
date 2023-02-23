import VideoSystemController from "./videoSystemController.js";
import VideoSystem from "./videoSystemModel.js";
import VideoSystemView from "./videoSystemView.js";


let VideoSystemApp;

$(function(){
    VideoSystemApp = new VideoSystemController(
        VideoSystem.getInstance("videoS"), new VideoSystemView()
    );
});

/**
 * Acciones en caso de popstate
 */
const historyActions = {
    init: () => VideoSystemApp.handleInit(),
    ListProductionsCategory: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.category),
    ListActores: (event) => VideoSystemApp.handleActoresList(event.state.nav),
    ListDirectores: (event) => VideoSystemApp.handleDirectoresList(event.state.nav),
    showProduction: (event) => VideoSystemApp.handleProduction(event.state.produccion),
    showActor:(event) => VideoSystemApp.handleActor(event.state.person),
    showDirector:(event) => VideoSystemApp.handleDirector(event.state.person)
};

/**
 * Evento popstate
 * Es lanzado cada vez que el historial cambia
 */
window.addEventListener('popstate', function (event) {
    console.log(event.state)
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({action: 'init'}, null); //Primer history init


export default VideoSystemApp;