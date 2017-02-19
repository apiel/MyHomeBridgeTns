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
// import button = require("ui/button");
import { Button } from "ui/button";
import { Label } from "ui/label";
import { Slider } from "ui/slider";
import * as enums from "ui/enums";
import { DockLayout } from "ui/layouts/dock-layout";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { CardView } from 'nativescript-cardview';

class Item{
  name: string; 
  key: string;
  status?: string|number; 
  values?: string[]; 
  number?: { min: number, max: number };
}

class Context extends Observable {
    // items: any = new observableArrayModule.ObservableArray([
    //     {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
    //     {name: "Floor heating on", key: "action/floorHeatingOn"},
    //     {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
    //     {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
    //     {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
    //     {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
    // ]);

    items: Item[] = [
        {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
        {name: "Floor heating on", key: "action/floorHeatingOn"},
        {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
        {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
        {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
        {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
    ];

    // items: Item[] = [{"name":"Spot light chillarea","key":"garage/chill/light","values":["on","off"]},{"name":"Light little table","key":"garage/table/light","values":["on","off"]},{"name":"Gaz heating","key":"garage/gaz/heating","values":["on","off"]},{"name":"WC","key":"garage/wc","values":["on","off"]},{"name":"Spot light climbing wall","key":"garage/climbing-wall/light","values":["on","off"]},{"name":"Spot light kitchen","key":"garage/kitchen/light","values":["on","off"]},{"name":"Store","key":"garage/roof/store","values":["open","close"]},{"name":"Chill floor heating","key":"garage/chill/floor/heating","values":["on","off"]},{"name":"Living room floor heating zone 1","key":"garage/living-room/floor/heating/zone1","values":["on","off"]},{"name":"Living room floor heating zone 2","key":"garage/living-room/floor/heating/zone2","values":["on","off"]},{"name":"Sunlight","key":"sunlight","values":["daytime","nighttime"]},{"name":"Temperature","key":"temperature","number":{"min":-5,"max":40}},{"name":"Thermostat","key":"thermostat","number":{"min":0,"max":30}},{"name":"Heating","key":"heating","values":["on","off"]}];

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

    var swipable = <StackLayout>page.getViewById("swipable");
    swipable.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
        if (args.direction === 1) page.bindingContext.onBack();
        else page.bindingContext.onOpenSettings();
    });    

    for(let item of page.bindingContext.items) {
        let cardview: CardView = new CardView;
        cardview.margin = '10';
        swipable.addChild(cardview);
        let stackLayout: StackLayout = new StackLayout;
        cardview.content = stackLayout;
        let label: Label = new Label;
        label.text = item.name;
        label.margin = '10;'
        stackLayout.addChild(label);

        if (item.values) {
            let segmentedBar = new SegmentedBar;  
            segmentedBar.items = item.values.map(value => { 
                let segmentedBarItem = new SegmentedBarItem;
                segmentedBarItem.title = value;
                return segmentedBarItem;
            });
            stackLayout.addChild(segmentedBar);
        }
        else if (item.number) {
            let slider = new Slider;
            slider.minValue = item.number.min;
            slider.maxValue = item.number.max;
            stackLayout.addChild(slider);

            let dockLayout: DockLayout = new DockLayout;
            stackLayout.addChild(dockLayout);
            let minLabel: Label = new Label;
            minLabel.text = item.number.min;
            DockLayout.setDock(minLabel, enums.Dock.left);
            dockLayout.addChild(minLabel);
            let maxLabel: Label = new Label;
            maxLabel.text = item.number.max;
            DockLayout.setDock(maxLabel, enums.Dock.right);
            dockLayout.addChild(maxLabel);            
        }
        else if (!item.hasOwnProperty('status')) {
            let button: Button = new Button;
            button.text = 'DO';
            stackLayout.addChild(button);
        }
    }
}