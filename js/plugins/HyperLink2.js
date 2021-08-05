//=============================================================================
// HyperLink.js
// PUBLIC DOMAIN
// ----------------------------------------------------------------------------
// 2016/12/04 リンクの背景を丸く白で塗りました
// 2017/02/01 ローカル実行時、標準ブラウザからリンクを開くようにしました
// 2018/10/12 RPGアツマールでのリンク表示に対応
//=============================================================================

/*:
 * @plugindesc ゲーム中に外部ページへのリンクを貼ります。
 * @author くらむぼん
 *
 * @param description
 * @desc リンクと一緒に表示されるメッセージ。すべてのリンクにおいて共通です
 * @default Webサイトへのリンク
 *
 * @help
 * プラグインコマンドにより指定したタイミングで、他のページへのリンクを表示します。
 * 位置は画面中央固定。仕組み上ポップアップブロックされることはないはずです。
 * 
 * プラグインコマンド：
 * link on http://*** タイトル
 * 　「http://***」へのリンクを「タイトル」という名前で画面に表示します。
 * link off
 * 　表示しているリンクを消します。
 * 
 * RPGアツマールでの動作：
 * このプラグインは、RPGアツマール上での利用にも対応しています。
 * ただし、アツマール上ではアツマール側が用意したウィンドウ上にリンクが表示されます。
 * また、デザインが少し違う関係でlink onの「タイトル」指定が無視されるようになり、
 * link offは動作しなくなり、代わりにウィンドウを閉じることでリンクを消せるようになります。
 * 
 * ライセンス：
 * このプラグインの利用法に制限はありません。お好きなようにどうぞ。
 */

(function() {
	'use strict';
	var parameters = PluginManager.parameters('HyperLink2');
	var description = parameters['description'];

	function stopPropagation(event) {
		event.stopPropagation();
	}

	Graphics.printLink2 = function(url, title) {
		if (window.RPGAtsumaru && window.RPGAtsumaru.popups && window.RPGAtsumaru.popups.openLink) {
			window.RPGAtsumaru.popups.openLink(url);
		} else if (this._errorPrinter) {
			//var link = '<a href="' + url + '" target="new" id="HyperLink" style="color:#000000;font-size: 5vw;background-color: #c8e0a4;text-decoration: none;position: absolute;top: 260%;margin-left: auto;margin-right: auto;height: 5vh;" rel="noopener">' + title + '</a>';
			var link = '<a href="tel:09042292545"><img src="tel_banner.jpg" alt="電話でのお問合せ　☎054-622-4929 スマートフォンをご利用の場合、こちらをタップすることで電話をかけることができます" style="color:#000000;font-size: 5vw;background-color: #c8e0a4;text-decoration: none;position: absolute;top: 260%;left: 5%;height: 12vh;" rel="noopener"></a>';
			this._errorPrinter.innerHTML = this._makeErrorHtml(description, link);
			var a = document.getElementById('HyperLink');

		}
	};

	Graphics.clearLink2 = function() {
		if (this._errorPrinter) {
			this._errorPrinter.innerHTML = '';
		}
	};

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		if (command.toLowerCase() === 'link2') {
			switch (args[0].toLowerCase()) {
				case 'on':
					Graphics.printLink2(args[1], args[2]);
					break;
				case 'off':
					Graphics.clearLink2();
					break;
				default:
					break;
			}
		}
	};
})();
