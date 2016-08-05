(function () {
    'use strict';

    define(['Pixi', 'globalValues', 'cardCreator'], function (PIXI, globalValues, cardCreator) {
        let widthOnePercent = globalValues.widthOnePercent,
            heightOnePercent = globalValues.heightOnePercent;

        function stealFromEnemyHealth(attacker, playerAvatars) {
            let playerHealth = playerAvatars[0].health,
                enemyHealth = playerAvatars[1].health,
                healthToSteal = attacker.attack,
                avatar,
                enemyAvatar;

            if (attacker.isPlayerCard) {
                enemyHealth -= healthToSteal;
                playerHealth += healthToSteal;
                localStorage.playerHealthStolen = Number(localStorage.playerHealthStolen) + Number(healthToSteal);
                avatar = playerAvatars[0];
                enemyAvatar = playerAvatars[1];
            } else {
                enemyHealth += healthToSteal;
                playerHealth -= healthToSteal;
                avatar = playerAvatars[1];
                enemyAvatar = playerAvatars[0];
                localStorage.enemyHealthStolen = Number(localStorage.enemyHealthStolen) + Number(healthToSteal);
            }

            playerAvatars[0].health = playerHealth;
            playerAvatars[1].health = enemyHealth;
            cardCreator.performStealHealthFromPlayerAnimation(avatar, enemyAvatar, healthToSteal);
        }

        function stealManaFromEnemyPlayer(attacker, avatars) {
            let playerMana = Number(localStorage.getItem('playerMana')),
                enemyMana = Number(localStorage.getItem('enemyMana')),
                manaToSteal = Math.round(attacker.mana / 2),
                avatar,
                enemyAvatar;

            if (attacker.isPlayerCard) {
                avatars[0].mana += manaToSteal;
                localStorage.playerManaStolen = Number(localStorage.playerManaStolen) + Number(manaToSteal);
                avatars[1].mana -= manaToSteal;
                avatar = avatars[0];
                enemyAvatar = avatars[1];
            } else {
                avatars[0].mana -= manaToSteal;
                avatars[1].mana += manaToSteal;
                localStorage.enemyManaStolen = Number(localStorageenemyManaStolen) + Number(manaToSteal);
                avatar = avatars[1];
                enemyAvatar = avatars[0];
            }

            cardCreator.performStealManaFromCardAnimation(avatar, enemyAvatar, manaToSteal);
        }

        return {
            stealFromEnemyHealth: stealFromEnemyHealth,
            stealManaFromEnemyPlayer: stealManaFromEnemyPlayer,
        };
    });
} ());