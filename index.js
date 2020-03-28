'use strict';

const { Builder, By, Key, until } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

(async function example() {
    let driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    try {
        await driver.get('https://listsettlements.com/');
        // await driver.wait(until.elementLocated(By.css(".elementor-button-link")));
        var element = await driver.findElement(By.className("elementor-button-link"));
        await driver.sleep(1 * 1000);
        await driver.executeScript("arguments[0].click();", element)
        await driver.sleep(2 * 1000);
        // await driver.executeScript("document.querySelector('textarea[name=\"form_fields[field_2]\"]').value = 'testtttttt'");
        setText(driver, policyHolderEmailSelector, regEmailForTest);
        setText(driver, policyHolderMessageSelector, 'Izik Policy Holder Message');
        setText(driver, policyHolderNameSelector, 'IzikTestPolicyHolder');
        setText(driver, policyHolderPhoneSelector, '0548197615');
        click(driver, policyHolderButtonSelector);
        await driver.sleep(2 * 1000);
        await driver.sleep(2 * 1000);

        await driver.

        // await driver.('textarea[name="form_fields[field_2]"]', 'username');
        // await page.type('input[name="form_fields[field_3]"]', 'y.modiiin@gmail.com');


        console.log('done');
        // await driver.findElement(By.name('')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
})();




const policyHolderEmailSelector = '[name=\"form_fields[field_3]\"]';
const policyHolderNameSelector = '[name=\"form_fields[field_4]\"]';
const policyHolderMessageSelector = '[name=\"form_fields[field_2]\"]';
const policyHolderPhoneSelector = '[name=\"form_fields[field_5]\"]';

const policyHolderCheckboxKeep = '[for=\"form-field-investorKeep-0\"]';
const policyHolderCheckboxCall = '[for=\"form-field-investorTalk-0\"]';
 
const policyHolderButtonSelector = '[type="submit"]';
const regEmailForTest = 'y.modiiin@gmail.com';

async function setText(driver, element, text) {
    text = getQueryScript(element, 'value', text);
    console.log(text);
    await driver.executeScript(text);
}

async function click(driver, element) {
    const text = getQueryScriptAction(element, 'click');
    console.log(text);
    driver.executeScript(text);
}


function getQueryScript(query, action, value) {
    return 'document.querySelector(\'' + query + '\').' + action + '=\'' + value +'\'';
}
function getQueryScriptAction(query, action) {
    return 'document.querySelector(\'' + query + '\').' + action + '();';
}