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
import { SettingsEditor, Workbench, VSBrowser, TextSetting, DefaultWait, InputBox, WebDriver, EditorView, By, Marketplace, BottomBarPanel, TerminalView, ComboSetting, ActivityBar, SideBarView, TextEditor } from 'vscode-uitests-tooling';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as utils from '../utils/testUtils';
import * as pjson from '../../../package.json';
import { privateDecrypt } from 'crypto';

describe('Camel runtime provider user preference set test', function () {
    this.timeout(9999960000);

    let settings: SettingsEditor;
    let driver: WebDriver;
    let input: InputBox;
    let terminalView: TerminalView;
    let sideBar: SideBarView;

	let editor: TextEditor;

    const RESOURCES: string = path.resolve('src', 'ui-test', 'resources');
    const CAMEL_CONTEXT_XML = 'camel-context.xml';

    const KNATIVE = 'knative';
    const MONGO = 'mongo';
    const JMX = 'jmx';

    const KNATIVE_PROP = 'knative:type/typeId';
    const MONGO_PROP = 'mongodb:connectionBean';
    const JMX_PROP = 'jmx:serverURL';

    const PROVIDERS_LIST = [
		// runtime provider, knative available, mongo available, jmx available
		['SPRINGBOOT', true, true, true],
		['QUARKUS', true, true, false],
		['KARAF', false, true, true]
	];

    before(async function () {
		this.timeout(200000);
		driver = VSBrowser.instance.driver;

		const marketplace = await Marketplace.open();
		await driver.wait(async function () {
			return await extensionIsActivated(marketplace);
		}, 150000, `The LSP extension was not activated after ${this.timeout} sec.`);
	});


    PROVIDERS_LIST.forEach(function (provider) {
        const PROVIDER = provider.at(0).toString();
		const KNATIVE_AV = provider.at(1);
		const MONGO_AV = provider.at(2);
		const JMX_AV = provider.at(3);

        before(async function () {
            setRuntimeProvider(PROVIDER);
            // open camel-context.xml here
        });

        describe(`${PROVIDER} test`, function () {

            it('Knative component', async function () {
                // insert component

                // open ca 

                // check knative_av
                    // if true, check if available right proposal

                // assert
                assert(true);
			});

            // it('Mongo component', async function () {
			//	// same here
			// });

            // it('JMX', async function () {
			//	// same here
			// });
        });        
    });

    async function setRuntimeProvider(provider: string): Promise<void> {
        settings = await new Workbench().openSettings();
        const textField = await settings.findSetting('Camel catalog runtime provider', 'Camel') as ComboSetting;
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