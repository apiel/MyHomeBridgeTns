/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import {Observable} from 'data/observable';
import frameModule = require('ui/frame');
import { GestureTypes, SwipeGestureEventData } from "ui/gestures";

class Context extends Observable {
    constructor() {
        super();
    }

    public onGoMainPage() {
        frameModule.topmost().navigate({ 
            moduleName: "pages/main-page",
            transition: { name: 'slideLeft' }
        });
    }
}

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new Context();

    var swipable = page.getViewById("swipable-drawer");
    swipable.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
        if (args.direction === 2) page.bindingContext.onGoMainPage();
    });    
}