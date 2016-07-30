(function () {
    'use strict';

    define(['cardCreator'], function (cardCreator) {
        // starts the whole game
        function start() {
            // testing
            // draw 10 cards
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);

            cardCreator.initializeCard('../images/cards/cuki_card.png', true);
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);

            cardCreator.initializeCard('../images/cards/cuki_card.png', true);
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);

            cardCreator.initializeCard('../images/cards/cuki_card.png', true);
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);

            cardCreator.initializeCard('../images/cards/cuki_card.png', true);
            cardCreator.initializeCard('../images/cards/cuki_card.png', true);

            // draw 10 enemy cards
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);

            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);

            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);

            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);

            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
            cardCreator.initializeCard('../images/cards/cuki_card.png', false);
        }

        return {
            start: start
        };
    });
} ());