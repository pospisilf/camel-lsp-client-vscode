import { assert } from 'chai';
import path = require('path');
import { VSBrowser, Marketplace, By, WebDriver, ComboSetting, DefaultWait, SettingsEditor, Workbench } from 'vscode-uitests-tooling';
import * as pjson from '../../../package.json';
import * as utils from '../utils/testUtils';

describe('Camel runtime provider user preference set test', function () {
    this.timeout(9999960000);

    let driver: WebDriver;
    let settings: SettingsEditor;

    const RESOURCES: string = path.resolve('src', 'ui-test', 'resources');
    const CAMEL_CONTEXT_XML = 'camel-context.xml';

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
        ['SPRINGBOOT', true, true, true],
        ['QUARKUS', true, true, false],
        ['KARAF', false, true, true]
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

            it('Knative component', async function () {
                assert.isTrue(true);
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
        await DefaultWait.sleep(5000);
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