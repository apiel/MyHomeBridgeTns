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

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }
    
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    public onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }

    public onBack() {
        frameModule.topmost().navigate({ 
            moduleName: "pages/drawer",
            transition: { name: 'slideRight' }
        });
    }

    public onOpenSettings() {
        frameModule.topmost().navigate({ 
            moduleName: "pages/settings",
            transition: { name: 'slideLeft' }
        });
    }
}

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new Context();

    var swipable = page.getViewById("swipable");
    swipable.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
        if (args.direction === 1) page.bindingContext.onBack();
        else page.bindingContext.onOpenSettings();
    });    
}