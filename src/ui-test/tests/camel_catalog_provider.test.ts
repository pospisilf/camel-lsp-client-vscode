/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License", destination); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { assert, expect } from 'chai';
import { SettingsEditor, Workbench, VSBrowser, TextSetting, DefaultWait, InputBox, WebDriver, EditorView, By, Marketplace, BottomBarPanel, TerminalView, ComboSetting, ActivityBar, SideBarView, TextEditor, ContentAssist } from 'vscode-uitests-tooling';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as utils from '../utils/testUtils';
import * as pjson from '../../../package.json';
import * as ca from '../utils/contentAssist';

describe('Camel runtime provider user preference set test', function () {
    this.timeout(9999960000);

    let settings: SettingsEditor;
    let driver: WebDriver;
    let input: InputBox;
    let terminalView: TerminalView;
    let sideBar: SideBarView;

    let editor: TextEditor;
    let contentAssist: ContentAssist;

    const RESOURCES: string = path.resolve('src', 'ui-test', 'resources');
    const CAMEL_CONTEXT_XML = 'camel-context.xml';

    const URI_POSITION = 33;

    const KNATIVE = 'knative';
    const MONGO = 'mongo';
    const JMX = 'jmx';

    const KNATIVE_PROP = 'knative:type/typeId';
    const MONGO_PROP = 'mongodb:connectionBean';
    const JMX_PROP = 'jmx:serverURL';

    before(async function () {
        this.timeout(200000);
        driver = VSBrowser.instance.driver;

        await VSBrowser.instance.openResources(RESOURCES);
        await VSBrowser.instance.waitForWorkbench();

        const marketplace = await Marketplace.open();
        await driver.wait(async function () {
            return await extensionIsActivated(marketplace);
        }, 150000, `The LSP extension was not activated after ${this.timeout} sec.`);
    });

    

    const PROVIDERS_LIST = [
        // runtime provider, knative available, mongo available, jmx available
       // ['SPRINGBOOT', true, true, true],
        ['QUARKUS', true, true, false],
     //   ['KARAF', false, true, true]
    ];

    PROVIDERS_LIST.forEach(function (provider) {
        const PROVIDER = provider.at(0).toString();
        const KNATIVE_AV = provider.at(1);
        const MONGO_AV = provider.at(2);
        const JMX_AV = provider.at(3);

        before(async function () {
            setRuntimeProvider(PROVIDER);
        });
  
        describe(`${PROVIDER} test`, function () {

            beforeEach(async function () {
                await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));
            });

            afterEach(async function () {
				await utils.closeEditor(CAMEL_CONTEXT_XML, false);
			});

            it('Knative component', async function () {

                // otevřu editor
                const editor = new TextEditor();
                await editor.isDisplayed();
                await editor.typeTextAt(3, URI_POSITION, KNATIVE);

                contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
                const items = await contentAssist.getItems();

                if (KNATIVE_AV){
                    assert.equal(items.length, 1);
                    const timer = await contentAssist.getItem(KNATIVE_PROP);
                    assert.equal(await utils.getTextExt(timer), KNATIVE_PROP);
                } else {
                    assert.equal(items.length, 0);
                } 
            });


            it('Mongo component', async function () {

                // otevřu editor
                const editor = new TextEditor();
                await editor.isDisplayed();
                await editor.typeTextAt(3, URI_POSITION, MONGO);

                contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
                const items = await contentAssist.getItems();

              //  await DefaultWait.sleep(100000);

                if (MONGO_AV){
                    assert.equal(items.length, 2); // mozna spis contains???
                    const timer = await contentAssist.getItem(MONGO_PROP);
                    assert.equal(await utils.getTextExt(timer), MONGO_PROP);
                } else {
                    assert.equal(items.length, 0);
                } 
            });


            it('JMX component', async function () {

                // otevřu editor
                const editor = new TextEditor();
                await editor.isDisplayed();
                await editor.typeTextAt(3, URI_POSITION, JMX);

                contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
                const items = await contentAssist.getItems();

               // await DefaultWait.sleep(100000000);
                

                if (JMX_AV){
                    assert.equal(items.length, 1);
                    const timer = await contentAssist.getItem(JMX_PROP);
                    assert.equal(await utils.getTextExt(timer), JMX_PROP);
                } else {
                    assert.equal(items.length, 0);
                } 
            });



        });
    });

    async function setRuntimeProvider(provider: string): Promise<void> {
        settings = await new Workbench().openSettings();

        const textField = await settings.findSetting('Camel catalog runtime provider', 'Camel') as ComboSetting;

        console.log('tadyyyy');
        console.log(await textField.getValues());

        await textField.setValue(provider);

        
        utils.closeEditor('Settings', true);
    }

    async function extensionIsActivated(marketplace: Marketplace): Promise<boolean> {
        try {
            const item = await marketplace.findExtension(`@installed ${pjson.displayName}`);
            const activationTime = await item.findElement(By.className('activationTime'));
            if (activationTime !== undefined) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
});