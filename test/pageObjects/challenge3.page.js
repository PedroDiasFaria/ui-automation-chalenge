var page = require('./page');

var challenge3Page = Object.create(page, {

    /** define elements */
    form: {
        get: function () {
            return $('form');
        }
    },

    button: {
        get: function (){
            return $('button.btn-default');
        }
    },

    name: {
        get: function (){
            return $('#name');
        }
    },

    email: {
        get: function (){
            return $('#email')
        }
    },

    passwords: {
        get: function (){
            return $$('#password');
        }
    },

    country: {
        get: function (){
            return $('select[name=profession]'); //hould be "country" on the html side
        },
    },
  
    countryOptions: {
        get: function (){
            return $$('select[name=profession]>option'); //hould be "country" on the html side
        },
    },

    checkBoxes:{
        get: function (){
            return $$('input[type=checkbox]');
        }
    },

    language: {
        get: function (){
            return $('#language');
        }
    },

    languageOptions: {
        get: function (){
            return $$('#language>option');
        }
    },

    inputs: {
        get: function (){
            return $$('.form-control');
        }
    },

    /** define page methods */
    open: {
        value: function () {
            page.open.call(this, 'https://qatools.mindera.com/buggy.html');
        }
    }
});
module.exports = challenge3Page;