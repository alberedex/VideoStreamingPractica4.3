"use strict";

import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from './ObjetosEntidad.js';
import VideoSystem from './VideoSystemObject.js';

function test() {
    let user = new Person("Alberto", "Redondo", "", new Date(2001, 1, 26), "");

    let category1 = new Category("Comedia", "");
    let category2 = new Category("Terror", "");

    let resource1 = new Resource(85,"/resource/1");
    let resource2 = new Resource(124,"/resource/1");

    console.log(user.toString());

    let vs = VideoSystem.getInstance();
    console.log(vs);

    vs.name = "Plataforma VideoSystem";
    console.log(vs);

    vs.addCategory(category1);
    vs.addCategory(category2);

    try {
        vs.addCategory(category1);
    } catch (error) {
        console.error(error.message);
    }

    for (let categoria of vs.categories) {
        console.log(categoria);
    }

}

window.onload = test();