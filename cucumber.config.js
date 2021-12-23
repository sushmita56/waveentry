const { Before, BeforeAll, AfterAll, After } = require("@cucumber/cucumber");
const { chromium } = require('playwright');
const { expect } = require("@playwright/test");
global.expect = expect;

BeforeAll(async function () {

    global.browser = await chromium.launch({
        headless: false,
    })

});

AfterAll(async function () {

    await global.browser.close();

});


Before(async function () {

    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();

});


After(async function () {

    await global.page.close();
    await global.context.close();

});