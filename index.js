'use strict';



const qaSettlementsSettings = {
    baseURL: 'https://listsettlements.com/'
}
const qafundingsSettings = {
    baseURL: 'https://listfunding.com/'
}

const settings = qaSettlementsSettings;
const BASE_URL = qaSettlementsSettings.baseURL;



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
        
        await driver.get(BASE_URL);
        // await driver.wait(until.elementLocated(By.css(".elementor-button-link")));
        // load registration popup
        var element = await driver.findElement(By.className("elementor-button-link"));
        await driver.executeScript("arguments[0].click();", element)
        await driver.sleep(2 * 1000);

        // await driver.executeScript("document.querySelector('textarea[name=\"form_fields[field_2]\"]').value = 'testtttttt'");
        setText(driver, investorEmailSelector, regEmailForTest);
        setText(driver, investorMessageSelector, 'Izik Investor Message');
        setText(driver, investorNameSelector, 'IzikTestInvestor');
        setText(driver, investorPhoneSelector, '0548197615');
        click(driver, investorButtonSelector);
        await driver.sleep(2 * 1000);
        await driver.sleep(2 * 1000);

        await regitrationForPolicyHolder(driver);
        // await driver.

        // await driver.('textarea[name="form_fields[field_2]"]', 'username');
        // await page.type('input[name="form_fields[field_3]"]', 'y.modiiin@gmail.com');


        console.log('done');
        // await driver.findElement(By.name('')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
})();




// regitration popup
const investorEmailSelector = '[name=\"form_fields[field_3]\"]';
const investorNameSelector = '[name=\"form_fields[field_4]\"]';
const investorMessageSelector = '[name=\"form_fields[field_2]\"]';
const investorPhoneSelector = '[name=\"form_fields[field_5]\"]';

// policy holder tab
const investorEmailSelectorTab2 = '#elementor-tab-content-1932 [name=\"form_fields[field_3]\"]'; 
const investorNameSelectorTab2 = '#elementor-tab-content-1932 [name=\"form_fields[field_4]\"]';
const investorMessageSelectorTab2 = '#elementor-tab-content-1932 [name=\"form_fields[field_2]\"]';
const investorPhoneSelectorTab2 = '#elementor-tab-content-1932 [name=\"form_fields[field_5]\"]';
const policyHolderTabID = 'elementor-tab-title-1932';
const policyHolderButtonSelector = '#elementor-tab-content-1932 [type="submit"]';


const investorCheckboxKeep = '[for=\"form-field-investorKeep-0\"]';
const investorCheckboxCall = '[for=\"form-field-investorTalk-0\"]';
 
const investorButtonSelector = '[type="submit"]';
const regEmailForTest = 'qalistfunding@gmail.com';

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

async function regitrationForPolicyHolder(driver) {
    // asume pop up is visible
    var element = await driver.findElement(By.id(policyHolderTabID));
    debugger;
    await driver.executeScript("arguments[0].click();", element)
    await driver.sleep(2 * 1000);

    // await driver.executeScript("document.querySelector('textarea[name=\"form_fields[field_2]\"]').value = 'testtttttt'");
    setText(driver, investorEmailSelectorTab2, regEmailForTest);
    setText(driver, investorMessageSelectorTab2, 'Izik PolicyHolder Message');
    setText(driver, investorNameSelectorTab2, 'IzikTestPolicyHolder');
    setText(driver, investorPhoneSelectorTab2, '0548197615');
    click(driver, policyHolderButtonSelector);

    // find call checkbox 
    // check v 
    // click again
    await driver.sleep(2 * 1000);

}

function checkPopupRegistration() {

}

function checkPopupLoad() {
    
}