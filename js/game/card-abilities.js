(function () {
    'use strict';

    define(['Pixi', 'globalValues'], function (PIXI, globalValues) {
        let widthOnePercent = globalValues.widthOnePercent;
        let heightOnePercent = globalValues.heightOnePercent;

        function stealFromEnemyHealth(attacker, target) {
            let playerHealth = Number(localStorage.getItem('playerHealth'));
            let enemyHealth = Number(localStorage.getItem('enemyHealth'));
            let healthToSteal = attacker.attack;

            if (attacker.isPlayerCard) {
                enemyHealth -= healthToSteal;
                playerHealth += healthToSteal;
            } else {
                enemyHealth += healthToSteal;
                playerHealth -= healthToSteal;
            }

            localStorage.setItem('playerHealth', playerHealth);
            localStorage.setItem('enemyHealth', enemyHealth);

            // perform animation
        }

        function stealManaFromEnemyCard(attacker, target) {
            let manaToSteal = Math.round(target.mana / 2);

            if (manaToSteal > 0) {
                console.log(`Mana before : ${attacker.mana}`)
                attacker.mana += manaToSteal;
                target.mana -= manaToSteal;
                console.log(`Mana after : ${attacker.mana}`)
                attacker.manaStat.text = attacker.mana;
                target.manaStat.text = target.mana;
            }

            // perform animation
        }

        function stealAttackFromEnemyCard(attacker, target, allCards) {
            let attackToSteal = Math.round(target.attack / 2);

            if (attackToSteal > 0) {
                let receiver;
                let containerWidthPercent = receiver.cardSprite.texture.baseTexture.width / 100;

                if (attacker.isPlayerCard) {
                    let playerCardsWhichAttack = allCards.playerCards.filter(c => c.ability === 'normal');
                    receiver = playerCardsWhichAttack[Math.floor(Math.random() * playerCardsWhichAttack.length)];
                } else {
                    let enemyCardsWhichAttack = allCards.enemyCards.filter(c => c.ability === 'normal');
                    receiver = enemyCardsWhichAttack[Math.floor(Math.random() * enemyCardsWhichAttack.length)];
                }

                receiver.attack += attackToSteal;
                target.attack -= attackToSteal;

                receiver.damageStat.text = receiver.attack;
                target.damageStat.text = target.attack;
            }

            // perform animation
        }

        return {
            stealFromEnemyHealth: stealFromEnemyHealth,
            stealManaFromEnemyCard: stealManaFromEnemyCard,
            stealAttackFromEnemyCard: stealAttackFromEnemyCard
        };
    });
}());