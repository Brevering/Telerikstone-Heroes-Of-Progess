(function () {
    'use strict';

    define(['cardController', 'globalValues', 'card', 'minionCard', 'ai', 'player', 'decks', 'sammy', 'statsController'],
        function (cardController, globalValues, Card, MinionCard, AI, player, Decks, Sammy, statsController) {
            let stage = new PIXI.Container(),
                widthOnePercent = globalValues.widthOnePercent,
                heightOnePercent = globalValues.heightOnePercent,
                decks = new Decks(),
                playersAvatars,
                botPlayerName;

            function initializeCard(stage, deck, isPlayerCard, avatars) {
                for (let i = 0; i < deck.length; i += 1) {
                    cardController.initializeCard(stage, deck[i], avatars);
                }
            }

            function getDeck(name, isPlayerCard) {
                if (name === 'koce') {
                    return decks.getKoceDeck(isPlayerCard);
                } else if (name === 'cuki') {
                    return decks.getCukiDeck(isPlayerCard);
                } else if (name === 'doncho') {
                    return decks.getDonchoDeck(isPlayerCard);
                } else if (name === 'evlogi') {
                    return decks.getEvlogiDeck(isPlayerCard);
                }
            }

            function getPlayerImageUrl(playerName) {
                switch (playerName) {
                    case 'koce':
                        return 'images/koce.png';
                    case 'cuki':
                        return 'images/cuki.png';
                    case 'doncho':
                        return 'images/doncho.png';
                    case 'evlogi':
                        return 'images/evlogi.png';
                }
            }

            function getBotPlayerImageUrl(realPlayerName) {
                if (realPlayerName === 'koce') {
                    botPlayerName = ['doncho', 'cuki', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'cuki') {
                    botPlayerName = ['doncho', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'doncho') {
                    botPlayerName = ['cuki', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else {
                    botPlayerName = ['cuki', 'koce', 'doncho'][Math.floor(Math.random() * 3)];
                }

                return getPlayerImageUrl(botPlayerName);
            }

            function initializePlayerAvatar(playerName, allCards) {
                let playerAvatar = new MinionCard(0, 30, 10, getPlayerImageUrl(playerName), true, 'none');

                playerAvatar.cardContainer = new PIXI.Container();
                playerAvatar.cardTexture = PIXI.Texture.fromImage(getPlayerImageUrl(playerName));
                playerAvatar.sprite = new PIXI.Sprite(playerAvatar.cardTexture);
                playerAvatar.sprite.width = 8.5 * widthOnePercent;
                playerAvatar.sprite.height = 20 * heightOnePercent;
                playerAvatar.sprite.position.x = 39.3 * widthOnePercent;
                playerAvatar.sprite.position.y = 59.5 * heightOnePercent;
                playerAvatar.sprite.interactive = true;
                playerAvatar.isAvatar = true;
                playerAvatar.cardId = 98;
                playerAvatar.sprite.cardId = 98;
                playerAvatar.isPlaced = true;
                playerAvatar.isJustPlaced = false;
                playerAvatar.manaStolen = 0;
                playerAvatar.healthStolen = 0;
                playerAvatar.attackStolen = 0;
                playerAvatar.damageDealt = 0;
                allCards.playerCards.push(playerAvatar);

                return playerAvatar;
            }

            function initializeEnemyAvatar(playerName, allCards) {
                let enemyAvatar = new MinionCard(0, 30, 10, getBotPlayerImageUrl(playerName), false, 'none');

                enemyAvatar.cardContainer = new PIXI.Container();
                enemyAvatar.cardTexture = PIXI.Texture.fromImage(getBotPlayerImageUrl(playerName));
                enemyAvatar.sprite = new PIXI.Sprite(enemyAvatar.cardTexture);
                enemyAvatar.sprite.width = 8.5 * widthOnePercent;
                enemyAvatar.sprite.height = 20 * heightOnePercent;
                enemyAvatar.sprite.position.x = 39.3 * widthOnePercent;
                enemyAvatar.sprite.position.y = 8.8 * heightOnePercent;
                enemyAvatar.sprite.interactive = true;
                enemyAvatar.isAvatar = true;
                enemyAvatar.cardId = 99;
                enemyAvatar.sprite.cardId = 99;
                enemyAvatar.isJustPlaced = false;
                enemyAvatar.isPlaced = true;
                enemyAvatar.manaStolen = 0;
                enemyAvatar.healthStolen = 0;
                enemyAvatar.attackStolen = 0;
                enemyAvatar.damageDealt = 0;
                allCards.enemyCards.push(enemyAvatar);

                return enemyAvatar;
            }

            function loadAvatars(playerName, allCards) {
                let playerAvatar = initializePlayerAvatar(playerName, allCards),
                    enemyAvatar = initializeEnemyAvatar(playerName, allCards);

                return [playerAvatar, enemyAvatar];
            }

            function setUpTable() {
                let renderer = PIXI.autoDetectRenderer(globalValues.canvasWidth, globalValues.canvasHeight);
                $('#playFieldCanvas').append(renderer.view);
                let background = new PIXI.Sprite(PIXI.Texture.fromImage('images/table.png'));

                background.width = globalValues.canvasWidth;
                background.height = globalValues.canvasHeight;

                stage.addChild(background);
                initPixi();

                function initPixi() {
                    requestAnimationFrame(initPixi);
                    renderer.render(stage);
                }
            }

            // starts the whole game
            function start() {
                let allCards = cardController.getPlayersCards(),
                    endTurnButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/buttons/end_turn_bg.png'));

                playersAvatars = loadAvatars(localStorage.trainer, allCards);
                setUpTable();

                statsController.initializePlayersStats(
                    playersAvatars[0].mana,
                    playersAvatars[0].health,
                    playersAvatars[1].mana,
                    playersAvatars[1].health,
                    stage);

                let playerDeck = getDeck(localStorage.trainer, true),
                    botDeck = getDeck(botPlayerName, false);

                initializeCard(stage, playerDeck, true, playersAvatars);
                initializeCard(stage, botDeck, false, playersAvatars);
                stage.addChild(playersAvatars[0].sprite);
                stage.addChild(playersAvatars[1].sprite);

                endTurnButton.interactive = true;
                endTurnButton.width = 6 * widthOnePercent;
                endTurnButton.height = 5.9 * heightOnePercent;
                endTurnButton.position.x = 67.3 * widthOnePercent;
                endTurnButton.position.y = 37.7 * heightOnePercent;

                endTurnButton.on('mousedown', function () {
                    if (localStorage.hasToPlaceCard === 'true') {
                        AI.placeCard(allCards, endTurnButton, playersAvatars);
                        localStorage.hasToPlaceCard = 'false';
                    } else {
                        AI.attackPlayerCard(allCards, stage, endTurnButton, playersAvatars);
                    }

                    setTimeout(function () {
                        endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_pressed_bg.png');
                    }, 100);
                });

                player.attachAttackEnemyCardEvents(allCards, stage, playersAvatars);
                cardController.hoverPlayerCard();

                stage.addChild(endTurnButton);
            }

            return {
                start: start,
                avatars: playersAvatars,
                gameStage: stage
            };
        });
} ());