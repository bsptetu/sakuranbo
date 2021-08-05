(function() {
var _prevfunc = Game_Action.prototype.executeHpDamage;
 Game_Action.prototype.executeHpDamage = function(target, value) {
 _prevfunc.call(this, target, value);
$gameVariables.setValue(321,value);
};

 })();

Game_Battler.prototype.performMiss = function() {
    $gameVariables.setValue(321,0);
};

Window_BattleLog.prototype.animationBaseDelay = function() {
    return 0;
};

Window_BattleLog.prototype.animationNextDelay = function() {
    return 0;
};

Window_BattleLog.prototype.updateWaitCount = function() {
	var waitMax;
	var waitMin;
   	    waitMax = 3 * 100;
    	waitMin = 1 * 100;

    if (this._waitCount > 0) {
        this._waitCount -= this.isFastForward() ? waitMax : waitMin;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
    	return true;
    }
    return false;
};

BattleManager.endTurn = function() {
    this._phase = 'turnEnd';
    this._preemptive = false;
    this._surprise = false;
    this.allBattleMembers().forEach(function(battler) {
        battler.onTurnEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayRegeneration(battler);
    }, this);
    if (this.isForcedTurn()) {
        //this._turnForced = false;
    }
};

BattleManager.refreshStatus = function() {
    //this._statusWindow.refresh();
};

Scene_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    //this._statusWindow.refresh();
};

Scene_Battle.prototype.refreshStatus = function() {
    //this._statusWindow.refresh();
};



Game_Action.prototype.applyCritical = function(damage) {
    return damage * 1.5;
};

Game_Action.prototype.executeDamage = function(target, value) {
    var result = target.result();
    if (value === 0) {
        result.critical = false;
    }
    if (this.isHpEffect()) {
        this.executeHpDamage(target, value);
     if (target.result().hpDamage === 0) {
if (this.item().damage.type === 1) {
        if (this.item().damage.elementId <= 27) {
            target.startAnimation(64);
        }
    }
    }
    }
    if (this.isMpEffect()) {
        this.executeMpDamage(target, value);
    }
};



Window_BattleStatus.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - width;
    var y = 1400;Graphics.boxHeight - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.openness = 0;
};

Window_PartyCommand.prototype.initialize = function() {
    var y = 720;Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 500, y);
    this.openness = 0;
    this.deactivate();
};

Window_ActorCommand.prototype.initialize = function() {
    var y = 720;Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 500, y);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

Window_ActorCommand.prototype.windowWidth = function() {
    return 200;192;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return 2;
};

Window_PartyCommand.prototype.windowWidth = function() {
    return 200;192;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return 2;
};

Window_BattleLog.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 750, 0, width, height);
    this.opacity = 0;
    this._lines = [];
    this._methods = [];
    this._waitCount = 0;
    this._waitMode = '';
    this._baseLineStack = [];
    this._spriteset = null;
    this.createBackBitmap();
    this.createBackSprite();
    this.refresh();
};

Window_Base.prototype.standardFontSize = function() {
    return 42;
};

Window_Base.prototype.lineHeight = function() {
    return 60;
};

Game_Battler.prototype.refresh = function() {
    Game_BattlerBase.prototype.refresh.call(this);
    if (this.hp === 0) {
        this.addState(this.deathStateId());
        $gameTemp.reserveCommonEvent(19);
    } else {
        this.removeState(this.deathStateId());
    }
};

Sprite_Actor.prototype.retreat = function() {
    this.startMove(300, 0, 30);
};

Sprite_Actor.prototype.setActorHome = function(index) {
    this.setHome(850 + index * 32, 900 + index * 48);
};

Game_Party.prototype.maxBattleMembers = function() {
    return 10;
};

Sprite_Actor.prototype.damageOffsetX = function() {
    return 0;
};

Sprite_Actor.prototype.damageOffsetY = function() {
    return 80;
};

Sprite_Enemy.prototype.damageOffsetX = function() {
    return 0;
};

Sprite_Enemy.prototype.damageOffsetY = function() {
    return 80;
};

Sprite_Enemy.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
};

ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
    if (filename) {
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.loadNormalBitmap(path, hue || 0);
        bitmap.smooth = false;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};

Window_BattleLog.prototype.messageSpeed = function() {
    return 0;
};

(function () {
  var _render = Graphics.render;
  Graphics.render = function (stage) {
    if (this._skipCount < 0) {
      this._skipCount = 0;
    }
    _render.call(this, stage);
  };
})();