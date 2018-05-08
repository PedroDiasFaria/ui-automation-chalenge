var page = require('./page');

var challenge1Page = Object.create(page, {

    /** elements */
    peopleAndCulture: {
        get: function () {
            return $("a.ui-button.ui-button-default");
        }
    },
    contactCity: {
        get: function () {
            return $("div:nth-child(2)>div.footer-contact-city");
        }
    },
    jobList: {
        get: function () {
            /** Done */
            return $("a.jobs-item:last-child")
        }
    },

    /** methods */
    open: {
        value: function () {
            page.open.call(this, "https://www.mindera.com/");
        }
    }
});
module.exports = challenge1Page;