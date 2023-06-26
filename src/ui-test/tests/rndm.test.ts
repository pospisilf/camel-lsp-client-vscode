import { assert, expect } from 'chai';
import { SettingsEditor, Workbench, ComboSetting, DefaultWait, Marketplace, VSBrowser, WebDriver, By, ContentAssist, TextEditor } from 'vscode-uitests-tooling';
import * as utils from '../utils/testUtils';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as pjson from '../../../package.json';

describe('Camel runtime provider user preference set test', function () {
    this.timeout(9999960000);

    let settings: SettingsEditor;
    let driver: WebDriver;

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

    after(async function () {
        resetUserSettings('camel.Camel catalog runtime provider');
    });


    describe('Spring', function () {

        before(async function () {
            setRuntimeProvider('SPRINGBOOT');
        });

        // beforeEach(async function () {
        //     await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));
        // });

        // afterEach(async function () {
        //     await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        // });

        // available

        // it('aaa', async function () {
        //     await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

        //     await DefaultWait.sleep(5000);
           

        //     await utils.closeEditor(CAMEL_CONTEXT_XML, false);

        // });


        it('kantive', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);
            //await DefaultWait.sleep(50000);
            await editor.typeTextAt(3, URI_POSITION, KNATIVE);

            await DefaultWait.sleep(5000);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(KNATIVE_PROP);
            assert.equal(await utils.getTextExt(timer), KNATIVE_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);

        });

        // available
          it('mongo', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await DefaultWait.sleep(5000);
            await editor.isDisplayed();
           

            await editor.typeTextAt(3, URI_POSITION, MONGO);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 2);
            const timer = await contentAssist.getItem(MONGO_PROP);
            assert.equal(await utils.getTextExt(timer), MONGO_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        });

        // available
        it('JMX', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);

            await editor.typeTextAt(3, URI_POSITION, JMX);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(JMX_PROP);
            assert.equal(await utils.getTextExt(timer), JMX_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        });

    });


    describe('Quarkus', function () {

        before(async function () {
            setRuntimeProvider('QUARKUS');
        });

        // beforeEach(async function () {
        //     await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));
        // });

        // afterEach(async function () {
        //     await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        // });

        // available

        it('kantive', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);
            //await DefaultWait.sleep(50000);
            await editor.typeTextAt(3, URI_POSITION, KNATIVE);

            await DefaultWait.sleep(5000);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(KNATIVE_PROP);
            assert.equal(await utils.getTextExt(timer), KNATIVE_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);

        });

        // available
          it('mongo', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await DefaultWait.sleep(5000);
            await editor.isDisplayed();
           

            await editor.typeTextAt(3, URI_POSITION, MONGO);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 2);
            const timer = await contentAssist.getItem(MONGO_PROP);
            assert.equal(await utils.getTextExt(timer), MONGO_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        });

        // available
        it('JMX', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);

            await editor.typeTextAt(3, URI_POSITION, JMX);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(JMX_PROP);
            assert.equal(await utils.getTextExt(timer), JMX_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        });

    });


    describe('Karaf', function () {

        before(async function () {
            setRuntimeProvider('KARAF');
        });

        // beforeEach(async function () {
        //     await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));
        // });

        // afterEach(async function () {
        //     await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        // });

        // available

        it('kantive', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);
            //await DefaultWait.sleep(50000);
            await editor.typeTextAt(3, URI_POSITION, KNATIVE);

            await DefaultWait.sleep(5000);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(KNATIVE_PROP);
            assert.equal(await utils.getTextExt(timer), KNATIVE_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);

        });

        // available
          it('mongo', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await DefaultWait.sleep(5000);
            await editor.isDisplayed();
           

            await editor.typeTextAt(3, URI_POSITION, MONGO);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 2);
            const timer = await contentAssist.getItem(MONGO_PROP);
            assert.equal(await utils.getTextExt(timer), MONGO_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
        });

        // available
        it('JMX', async function () {
            await VSBrowser.instance.openResources(path.join(RESOURCES, CAMEL_CONTEXT_XML));

            const editor = new TextEditor();
            await editor.isDisplayed();

            await DefaultWait.sleep(5000);

            await editor.typeTextAt(3, URI_POSITION, JMX);

            contentAssist = await editor.toggleContentAssist(true) as ContentAssist;
            const items = await contentAssist.getItems();

            assert.equal(items.length, 1);
            const timer = await contentAssist.getItem(JMX_PROP);
            assert.equal(await utils.getTextExt(timer), JMX_PROP);

            await utils.closeEditor(CAMEL_CONTEXT_XML, false);
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

    function resetUserSettings(id: string) {
        const settingsPath = path.resolve('test-resources', 'settings', 'User', 'settings.json');
        const reset = fs.readFileSync(settingsPath, 'utf-8').replace(new RegExp(`"${id}.*`), '').replace(/,(?=[^,]*$)/, '');
        fs.writeFileSync(settingsPath, reset, 'utf-8');
        
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