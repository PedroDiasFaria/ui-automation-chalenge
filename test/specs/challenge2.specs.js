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

    it('Shoot all the bubbles that show up, leaving at most 1 bubble on the screen', function () {

        var expectedScore = 0;
        var score = parseInt(challenge2Page.score.getText());
        var oneBubble = true;

        /** Set a timeout for the loop.
         *  We can't test it 'endlessly'
         */
        var startTime = Date.now();
        var runTime = 25000;

        /** If there are more than 1 bubble on the screen
         *  ends the loop and increments the expected score
         *  equal to the extra bubbles not clicked
         */
        function checkMultipleBubbles(arr){
            if(arr.length > 1){
                expectedScore+=(arr.length-1);
                oneBubble = false;
            }
        }

        function endlessTest(start, timeout){
            do{
                var bubblesArray = challenge2Page.bubbles;
    
                /** Every time a new bubble appears, we update the expected score
                 *  If we miss a click and let the window have more than one bubble, the loop will end
                 */
                if(bubblesArray.length == 1){
                    expectedScore++;               
                }else{
                    checkMultipleBubbles(bubblesArray);
                }                        
    
                bubblesArray.forEach(function(bubble){
                    bubble.click();
                }); 

                score = parseInt(challenge2Page.score.getText());
                if(!score){
                    score = 0;
                }
                expect(score).to.be.equal(expectedScore);
    
                bubblesArray = challenge2Page.bubbles;
                checkMultipleBubbles(bubblesArray);
                console.log("time: " + (Date.now() - start));
    
            }while(oneBubble && (Date.now() - start) < timeout)
        }

        endlessTest(startTime, runTime);

        /** Confirm one last time */
        expect(score).to.be.equal(expectedScore);
    });
});