import VideoSystemController from "./videoSystemController.js";
import VideoSystem from "./videoSystemModel.js";
import VideoSystemView from "./videoSystemView.js";


let VideoSystemApp;

$(function () {
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
    showActor: (event) => VideoSystemApp.handleActor(event.state.person),
    showDirector: (event) => VideoSystemApp.handleDirector(event.state.person),
    login: () => VideoSystemApp.handleLoginForm(),
    showProductionFavorites: () => VideoSystemApp.handlerProdFavorites()
};

/**
 * Evento popstate
 * Es lanzado cada vez que el historial cambia
 */
window.addEventListener('popstate', function (event) {
    try {
        if (event.state) {
            historyActions[event.state.action](event);
        }
    } catch (error) {
        historyActions.init();
    }

    $('body .show').remove();
});

function refreshMain() {
    try {
        historyActions[history.state.action](history);
    } catch (error) {
        historyActions.init();
    }
}

history.replaceState({ action: 'init' }, null); //Primer history init

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let re = new RegExp('(?:(?:^|.*;\\s*)' + cname + '\\s*\\=\\s*([^;]*).*$)|^.*$');
    return document.cookie.replace(re, "$1");
}

export { setCookie, getCookie, refreshMain };
export default VideoSystemApp;