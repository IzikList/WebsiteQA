'use strict';

const qaSettlementsSettings = {
    baseURL: 'https://listsettlements.com/',
    faqURL: 'https://listfunding.com/FAQ/'
}
const qafundingsSettings = {
    baseURL: 'https://listfunding.com/'
    
}

const settings = qaSettlementsSettings;
const BASE_URL = qaSettlementsSettings.baseURL;
const FAQ_URL = qaSettlementsSettings.faqURL;


const { Builder, By, Key, until } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

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

//FAQ
const investorFaqNameSelector = '[name=\"form_fields[name]\"]';
const investorFaqEmailSelector = '[name=\"form_fields[email]\"]';
const investorFaqQuestionSelector = '[name=\"form_fields[message]\"]';
const investorFaqBtn = '[type="submit"]';
const phFaqBtn = '[name=\"FQAPOLICYHOLDERFORM\"] [type="submit"]';
const faqPhTab = 'elementor-tab-title-4592';
const phFaqNameSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[name]\"]';
const phFaqEmailSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[email]\"]';
const phFaqQuestionSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[message]\"]';

let popupBtn;

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
    return 'document.querySelector(\'' + query + '\').' + action + '=\'' + value + '\'';
}
function getQueryScriptAction(query, action) {
    return 'document.querySelector(\'' + query + '\').' + action + '();';
}


(async function testAll() {
    await driver.get(BASE_URL);

    try {
        popupBtn = await driver.findElement(By.className("elementor-button-link"));
        await driver.executeScript("arguments[0].click();", popupBtn)
        await driver.sleep(2 * 1000);
        registrationForInvestor()
            .then(() => registrationForPolicyHolder()
                .then(() => checkFAQ()
                ));
        // await driver.get(BASE_URL);
    } finally {
        // await driver.quit();
    }
    // load registration popup

})()

async function registrationForInvestor() {
    return new Promise(async (resolve, reject) => {
        setText(driver, investorEmailSelector, regEmailForTest);
        setText(driver, investorMessageSelector, 'Izik Investor Message');
        setText(driver, investorNameSelector, 'IzikTestInvestor');
        setText(driver, investorPhoneSelector, '0548197615');
        click(driver, investorButtonSelector);
        
        console.log('done');
        resolve()
    });
}

async function registrationForPolicyHolder() {
    return new Promise(async (resolve, reject) => {
        // assume pop up is visible
        var element = await driver.findElement(By.id(policyHolderTabID));
        debugger;
        await driver.executeScript("arguments[0].click();", element);

        // await driver.executeScript("document.querySelector('textarea[name=\"form_fields[field_2]\"]').value = 'testtttttt'");
        setText(driver, investorEmailSelectorTab2, regEmailForTest);
        setText(driver, investorMessageSelectorTab2, 'Izik PolicyHolder Message');
        setText(driver, investorNameSelectorTab2, 'IzikTestPolicyHolder');
        setText(driver, investorPhoneSelectorTab2, '0548197615');
        click(driver, policyHolderButtonSelector);

        // find call checkbox 
        // check v 
        // click again
        resolve()
    })
}

async function checkFAQ() {
    await driver.sleep(2 * 1000);
    await driver.navigate().to(FAQ_URL);
    setText(driver, investorFaqNameSelector, "Investor name");
    setText(driver, investorFaqEmailSelector, regEmailForTest);
    setText(driver, investorFaqQuestionSelector, "Investor question");
    click(driver, investorFaqBtn);
    const element = await driver.findElement(By.id(faqPhTab));
    await driver.sleep(2 * 1000);
    await driver.executeScript("arguments[0].click();", element);
    setText(driver, phFaqNameSelector, "ph name");
    setText(driver, phFaqEmailSelector, regEmailForTest);
    setText(driver, phFaqQuestionSelector, "ph question");
    click(driver, phFaqBtn);

    // const element = await driver.findElement(By.id())
}

function checkPopupRegistration() {

}

function checkPopupLoad() {

}