(function () {
    'use strict';

    define(['Pixi', 'globalValues'], function (PIXI, globalValues) {
        let playerManaStat,
            playerHealthStat,
            enemyManaStat,
            enemyHealthStat;

        function initializePlayersStats(playerMana, playerHealth, enemyMana, enemyHealth, stage) {
            playerManaStat = initStat(playerMana, 0x00ccff, 48, 65, stage);
            playerHealthStat = initStat(playerHealth, 0xff0000, 33, 65, stage);
            enemyManaStat = initStat(enemyMana, 0x00ccff, 48, 10, stage);
            enemyHealthStat = initStat(enemyHealth, 0xff0000, 33, 10, stage);
        }

        function updatePlayerMana(value) {
            playerManaStat.text = value;
        }

        function updatePlayerHealth(value) {
            playerHealthStat.text = value;
        }

        function updateEnemyMana(value) {
            enemyManaStat.text = value;
        }

        function updateEnemyHealth(value) {
            enemyHealthStat.text = value;
        }

        function initStat(value, color, leftOffset, topOffset, stage) {
            let stat = new PIXI.Text(value, {
                font: 'bold ' + 5 * globalValues.widthOnePercent + 'px Arial',
                fill: color,
                align: 'center',
                stroke: 'black',
                strokeThickness: 3
            });
            stat.x = globalValues.widthOnePercent * leftOffset;
            stat.y = globalValues.heightOnePercent * topOffset;
            stage.addChild(stat);

            return stat;
        }

        return {
            initializePlayersStats: initializePlayersStats,
            updatePlayerMana: updatePlayerMana,
            updatePlayerHealth: updatePlayerHealth,
            updateEnemyMana: updateEnemyMana,
            updateEnemyHealth: updateEnemyHealth
        };
    });
}());