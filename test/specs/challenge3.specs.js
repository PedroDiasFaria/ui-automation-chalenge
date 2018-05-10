var expect = require('chai').expect;
var challenge3Page = require('../pageObjects/challenge3.page');

describe('Mindera QA Graduate Challenge 3:', function () {

    var dummyForm = {
        name : "Test User Name",
        email: "test@email.com",
        password : "testpassword"
    };

    /**
     * Creates a dummy form
     */
    function createDummy(){
        var nameField = challenge3Page.name;
        nameField.setValue(dummyForm.name);

        var emailField = challenge3Page.email;
        emailField.setValue(dummyForm.email);

        var passwordsArr = challenge3Page.passwords;
        passwordsArr.forEach(function(pw){
            pw.setValue(dummyForm.password);
        });
    
        var countryField = challenge3Page.country;
        var countrySelect = challenge3Page.countryOptions;
        countryField.selectByValue(countrySelect[ (Math.floor(Math.random() * (countrySelect.length))) ].getAttribute('value'));

        var languageField = challenge3Page.language;
        var languageSelect = challenge3Page.languageOptions;
        languageField.selectByValue(languageSelect[ (Math.floor(Math.random() * (languageSelect.length))) ].getAttribute('value'));
    };

    /**
     * Executes every time we want to verify a form submission
     * Clicks the button until an alert is shown (upon validation it is not 100% certain it will appear)
     * 
     * Returns the text on the alert box
     * @param {*} button button to be clicked during execution
     */
    function checkForAlert(button){

        button.click();
        
        while(true){
            try{
                browser.alertText();
                break;
            }catch(NoSuchAlertError){
                button.click();
            }
        }

        return browser.alertText();
    };

    /**
     * Shuffles the character of a string
     */
    String.prototype.shuffle = function () {
        var a = this.split(""),
            n = a.length;
    
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    };

    beforeEach(function () {
        challenge3Page.open();
    });

    it('Click "Create User" button with all fields empty should return a warning message', function () {
        var formButton = challenge3Page.button;

        expect(checkForAlert(formButton)).to.be.equal("The information in the form is not correct.");

        browser.alertDismiss();

    });

    it('Fill the name field and click "Create User" should return a warning message', function () {

        var nameField = challenge3Page.name;

        nameField.setValue(dummyForm.name);

        var formButton = challenge3Page.button;

        expect(checkForAlert(formButton)).to.be.equal("The information in the form is not correct.");

        browser.alertDismiss();

        expect(nameField.getValue()).to.be.equal(dummyForm.name);
    });

    /**
     * It doesn't always show the acceptance alert.
     * The validation on the client side .js has a random success variable of giving this message
     */
    it('Fill the complete form without ticking the "Terms&Conditions" box and click "Create User" can return an acceptance message', function () {

        createDummy();

        var formButton = challenge3Page.button;       

        expect(checkForAlert(formButton)).to.be.equal("Hey! User created..");

        browser.alertDismiss();
    });

    /**
     * It doesn't always show the acceptance alert.
     * The validation on the client side .js has a random success variable of giving this message
     * 
     * The passwords can be different that won't matter
     */
    it('Fill the complete form with "Password" and "Confirm Password" fields differently and click "Create User" should return an accetpance message', function () {
    
        createDummy();

        var confirmPWfield = challenge3Page.passwords[1];
        
        confirmPWfield.setValue(dummyForm.password.shuffle());

        var formButton = challenge3Page.button;       

        expect(checkForAlert(formButton)).to.be.equal("Hey! User created..");

        browser.alertDismiss();
    });

    
    /**
     * It doesn't always show the acceptance alert.
     * The validation on the client side .js has a random success variable of giving this message
     * 
     * The passwords can be different that won't matter
     */
    it('Fill the complete form and click "Create User" should return an acceptance message', function () {
        createDummy();

        var checkBoxes = challenge3Page.checkBoxes;

        checkBoxes.forEach(function(cb){
            cb.click();
        });
        
        var formButton = challenge3Page.button;       

        expect(checkForAlert(formButton)).to.be.equal("Hey! User created..");

        browser.alertDismiss();
    });

    it('If the width of the browser is <= 699px, the input fields are not displayed', function () {

        var minWidth = 699;

        var randomBoundrieWidth = Math.floor(Math.random() * minWidth); //120 is the lower boundarie in the .Css rule, but the viewPort can't resize under 326px

        var formInputs = challenge3Page.inputs;

        browser.setViewportSize({
            width : randomBoundrieWidth,
            height : 750
        });        

        formInputs.forEach(function(input){
            expect(input.getCssProperty('display').value).to.be.equal('none');
        });

        browser.setViewportSize({
            width : (minWidth+1),
            height : 750
        });

        formInputs.forEach(function(input){
            expect(input.getCssProperty('display').value).to.be.equal('block');
        });

    });
});