'use strict';

const qaSettlementsSettings = {
    baseURL: 'https://listsettlements.com/',
    faqURL: 'https://listfunding.com/FAQ/'
}
const qafundingsSettings = {
    baseURL: 'https://listfunding.com/'

}

const settings = qafundingsSettings;
const BASE_URL = settings.baseURL;
const FAQ_URL = settings.faqURL;


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
const phEmailSelector = '#elementor-tab-content-1932 [name=\"form_fields[field_3]\"]';
const phNameSelector = '#elementor-tab-content-1932 [name=\"form_fields[field_4]\"]';
const phMessageSelector = '#elementor-tab-content-1932 [name=\"form_fields[field_2]\"]';
const phPhoneSelector = '#elementor-tab-content-1932 [name=\"form_fields[field_5]\"]';
const policyHolderTab = '#elementor-tab-title-1932';
const policyHolderButtonSelector = '#elementor-tab-content-1932 [type="submit"]';

//FAQ
const investorFaqNameSelector = '[name=\"form_fields[name]\"]';
const investorFaqEmailSelector = '[name=\"form_fields[email]\"]';
const investorFaqQuestionSelector = '[name=\"form_fields[message]\"]';
const investorFaqBtn = '[type="submit"]';
const phFaqBtn = '[name=\"FQAPOLICYHOLDERFORM\"] [type="submit"]';
const faqPhTab = '#elementor-tab-title-4592';
const phFaqNameSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[name]\"]';
const phFaqEmailSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[email]\"]';
const phFaqQuestionSelector = '[name=\"FQAPOLICYHOLDERFORM\"] [name=\"form_fields[message]\"]';
const investorKeepCB = '#form-field-investorKeep-0';
const investorTalkCB = '#form-field-investorTalk-0';
const phInterestedCB = '#form-field-phIntrested-0';
const phTalkCB = '#form-field-phTalk-0';

const joinUsBtn = '.elementor-button-link';
const investorGetStarted = '.menu_bar:nth-child(1) li:last-child';
const phGetStarted = '.menu_bar:nth-child(2) li:last-child';
const closePopupBtn = '.eicon-close';
const popupElement = '.elementor-popup-modal'


const investorCheckboxKeep = '[for=\"form-field-investorKeep-0\"]';
const investorCheckboxCall = '[for=\"form-field-investorTalk-0\"]';

const investorButtonSelector = '[type="submit"]';
const regEmailForTest = 'qalistfunding@gmail.com';

async function setText(element, text) {
    text = getQueryScript(element, 'value', text);
    console.log(text);
    await driver.executeScript(text);
}

async function click(element) {
    const text = getQueryScriptAction(element, 'click');
    console.log(text);
    driver.executeScript(text);
}

function getQueryScript(query, action, value) {
    return 'document.querySelector(\'' + query + '\').' + action + '=\'' + value + '\'';
}
function getQueryScriptAction(query, action) {
    let a = 'document.querySelector(\'' + query + '\').' + action + '();'
    return 'document.querySelector(\'' + query + '\').' + action + '();';
}


(async function testAll() {
    await driver.get(BASE_URL);

    // click(joinUsBtn)
    await driver.sleep(2 * 1000);
    checkPopupLoad()
        .then(() => registrationForInvestor())
        .then(() => registrationForPolicyHolder())
        .then(() => checkFAQ())
        .then(() => driver.quit())
        .catch(e => console.log(e));

})()

async function registrationForInvestor() {
    return new Promise(async (resolve, reject) => {

        const fillFieldsAndSend = checkboxes => {
            setText(investorEmailSelector, regEmailForTest);
            setText(investorPhoneSelector, '0548197615');


            switch (checkboxes) {
                case 0:
                    setText(investorMessageSelector, 'Investor - no checkbox selected');
                    setText(investorNameSelector, 'Investor - no checkbox selected');
                    break;
                case 1:
                    click(investorTalkCB);
                    setText(investorMessageSelector, 'Investor - lets talk checkbox selected');
                    setText(investorNameSelector, 'Investor - lets talk checkbox selected');
                    break;
                default:
                    break;
            }

            click(investorButtonSelector);

        }
        for (let i = 0; i < 2; i++) {
            fillFieldsAndSend(i);
            await driver.sleep(4 * 1000);
        }
        resolve()
    });
}

async function registrationForPolicyHolder() {
    return new Promise(async (resolve, reject) => {

        const fillFieldsAndSend = checkboxes => {
            click(policyHolderTab);
            setText(phEmailSelector, regEmailForTest);
            setText(phPhoneSelector, '0548197615');

            switch (checkboxes) {
                case 0:
                    setText(phMessageSelector, 'PolicyHolder - no checkbox selected');
                    setText(phNameSelector, 'PolicyHolder - no checkbox selected');
                    break;
                case 1:
                    click(phTalkCB);
                    setText(phMessageSelector, 'PolicyHolder - lets talk checkbox selected');
                    setText(phNameSelector, 'PolicyHolder - lets talk checkbox selected');
                    break;
                default:
                    break;
            }

            click(policyHolderButtonSelector);

        }
        for (let i = 0; i < 2; i++) {
            fillFieldsAndSend(i);
            await driver.sleep(4 * 1000);
        }
        resolve();
    })
}

async function checkFAQ() {
    await driver.sleep(2 * 1000);
    await driver.navigate().to(FAQ_URL);
    setText(investorFaqNameSelector, "Investor name");
    setText(investorFaqEmailSelector, regEmailForTest);
    setText(investorFaqQuestionSelector, "Investor question");
    click(investorFaqBtn);
    await driver.sleep(2 * 1000);

    click(faqPhTab);
    setText(phFaqNameSelector, "ph name");
    setText(phFaqEmailSelector, regEmailForTest);
    setText(phFaqQuestionSelector, "ph question");
    click(phFaqBtn);
    await driver.sleep(4000);
}

async function checkPopupLoad() {
    return new Promise(async (resolve, reject) => {
        click(joinUsBtn);
        await driver.sleep(0.5 * 1000);
        await checkPopupVisibility();
        click(closePopupBtn);
        await driver.sleep(0.5 * 1000);
        click(investorGetStarted);
        await checkPopupVisibility();
        await driver.sleep(0.5 * 1000);
        click(closePopupBtn);
        await driver.sleep(0.5 * 1000);
        click(phGetStarted);
        await checkPopupVisibility();
        resolve();
    })
}

async function checkPopupVisibility() {
    let popupDiaplay = await driver.findElement(By.css(popupElement)).getCssValue('display');
    console.log(popupDiaplay);
}
