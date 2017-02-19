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
import * as observableArrayModule from "data/observable-array";

import { StackLayout } from 'ui/layouts/stack-layout';
import pageModule = require("ui/page");
import button = require("ui/button");

class Item{
  name: string; 
  key: string;
  status?: string|number; 
  values?: string[]; 
  number?: { min: number, max: number };
}

class Context extends Observable {
    items: any = new observableArrayModule.ObservableArray([
        {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
        {name: "Floor heating on", key: "action/floorHeatingOn"},
        {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
        {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
        {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
        {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
    ]);

    public onYo() {
        console.log('yoyo');
        //this.items.push({name: "Uiuiui", key: "action/floorHeatingOn"});
        //this.items.setItem(1, {name: "Uiuiui", key: "action/floorHeatingOn"});

        // let testPage: Page;
        // let pageFactory = function (): Page {
        //     testPage = new pageModule.Page();
        //     var btn4 = new button.Button();
        //     btn4.text = "kk";
        //     testPage.content = btn4;
        //     return testPage;
        // };
        // frameModule.topmost().navigate(pageFactory);     
    }

            // <ListView [items]="items" [itemTemplateSelector]="templateSelector">
            // </ListView>
    // public templateSelector(item: DataItem, index: number, items: any) {
    //     console.log('selctor');
    //     return "item";
    // }


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

    let btn4 = new button.Button();
    btn4.text = "kk";
    let idloop = <StackLayout>page.getViewById("idloop");
    idloop.addChild(btn4);

    // page.content = btn4;
}