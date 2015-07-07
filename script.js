$(function(){
	var listObserver = new MutationObserver(newDOM); // при изменении DOM вызов функции newDOM
	listObserver.observe(document.body, {childList: true, subtree: true}); // слушаем body

	// alert('Версия1 jQuery ' + jQuery.fn.jquery);
	$('.audio').each(function (index) {
		processingOfAudio(this);
	});
	
	function processingOfAudio(current)	{
		var $download_btn = $(current).find('.download_btn');
		
		// проверка, нет ли такой кнопки уже на элементе
		if(!$download_btn.length) {

			var title = $(current).find('.title_wrap').find("a").text(),
				$play_btn = $(current).find('.play_btn');

			if($play_btn.length) {
				// такой элемент на странице аудиозаписей
			  	var directLink = $play_btn.find("input:hidden").val();
			} else {
				// а такой в постах
				var directLink = $(current).find('.play_btn_wrap').siblings('input').val();
			}

			var $titleSpan = $(current).find('.title_wrap').find("span.title"), // передается в функцию ниже, после него будет вставляться кнопка
				$area = $(current).find('.area');

			$area.hover(function() {
				$area.find(".download_btn").show();
			}, function() {
				$area.find(".download_btn").hide();
			});

			appendBtn($titleSpan, directLink, title);			
		};
	}

	function newDOM(mutations) {
		for (var i = 0; i < mutations.length; i++) {
			var added = mutations[i].addedNodes;

			findAudio(added);
		}
	}

	function findAudio(added) {
		var $audio = $(added).find('.audio');
		
		if ($audio.length) {
			$audio.each(function (index) {
				processingOfAudio(this);
			});
		};
	}

	function appendBtn(titleSpan, directLink, title) {
		var btn = document.createElement('a');
		$(btn).addClass("download_btn")

		$(btn).css({
			'float': 'right',
			'height': '15px',
			'width': '15px',
			'background-image': 'url(http://www.beforward.jp/images/stocklist/download-icon.gif)'
		});

		$(btn).hide();

		$(btn).attr({
			'href': directLink,
			'download': title
		});

		$(btn).on('click', function(event) {
			event.stopPropagation();
		})

		titleSpan.after(btn);
	}

});
