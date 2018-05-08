var expect = require('chai').expect;
var challenge2Page = require('../pageObjects/challenge2.page');

describe('Mindera QA Graduate Challenge 2:', function () {

    beforeEach(function () {
        challenge2Page.open();
    });

    it('Shoot all the bubbles that showed up after waiting 5 seconds', function () {
        browser.pause(5000);
        /** Done */
       
        var bubblesArray = challenge2Page.bubbles;
        var expectedScore = bubblesArray.length;

        bubblesArray.forEach(function(bubble){
            bubble.click();
        });

        var finalScore = parseInt(challenge2Page.score.getText());   

        expect(finalScore).to.be.equal(expectedScore);
    });

    it('Shoot all the bubbles that show up, lefting always 1 on the screen', function () {

        var expectedScore = 0;
        var oneBubble = false;

        /** Once the first bubble appears, we can start clicking */
        while(!oneBubble){
            if(challenge2Page.bubbles.length >= 1){
                oneBubble=true;
            }
        }

        /** Set a timeout for the loop.
         *  We can't test it 'endlessly'
         */
        var startTime = Date.now();
        var timeOut = 25000;

        do{
            var bubblesArray = challenge2Page.bubbles;

            /** Every time a new bubble appears, we update the expected score
             *  If we miss a click and let the window have more than one bubble, the loop will end
             */
            if(bubblesArray.length == 1){
                expectedScore++;               
            }else if (bubblesArray.length > 1){
                expectedScore+=bubblesArray.length;
                oneBubble = false;
            }                        

            bubblesArray.forEach(function(bubble){
                bubble.click();
            }); 

            var score = parseInt(challenge2Page.score.getText());
            if(!score){
                score = 0;
            }
            expect(score).to.be.equal(expectedScore);

            bubblesArray = challenge2Page.bubbles;
            if(bubblesArray.length > 1){
                expectedScore+=bubblesArray.length;
                oneBubble = false;
            }
            console.log("time: " + (Date.now() - startTime));

        }while(oneBubble && (Date.now() - startTime) < timeOut)

        /** Confirm one last time */
        expect(score).to.be.equal(expectedScore);
    });
});