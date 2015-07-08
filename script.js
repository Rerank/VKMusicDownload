$(function(){
	var bodyObserver = new MutationObserver(newDOM); // при изменении DOM вызов функции newDOM

	bodyObserver.observe(document.body, {childList: true, subtree: true}); // слушаем body


	$('.audio').each(function (index) { //при первом открытии ВК
		processingOfAudio(this);
	});
	
	function processingOfAudio(current)	{
		var $downloadBtn = $(current).find('.download_btn');
		
		// проверка, нет ли такой кнопки уже на элементе
		if(!$downloadBtn.length) {

			var title = $(current).find('.title_wrap').find("a").text();
			$playBtn = $(current).find('.play_btn');

			var directLink;
			if($playBtn.length) {
				// такой элемент на странице аудиозаписей
			    directLink = $playBtn.find("input:hidden").val();
			} else {
				// а такой в постах
				directLink = $(current).find('.play_btn_wrap').siblings('input').val();
			}

			var $titleSpan = $(current).find('.title_wrap').find("span.title"); // передается в функцию ниже, после него будет вставляться кнопка
			appendBtn($titleSpan, directLink, title);

			$area = $(current).find('.area');	
			hideShowEvent($area);		
				
		};
	}
	function hideShowEvent($area) {
		$area.hover(function() {
				$area.find(".download_btn").show();
			}, function() {
				$area.find(".download_btn").hide();
		});
	}
	function newDOM(mutations) {
		console.log("newDOM output: ");
		for (var i = 0; i < mutations.length; i++) {
			var added = mutations[i].addedNodes;
			console.log(added);
			findAudio(added);
		}
	}

	function findAudio(added) {

		if($(added).hasClass("audio")) // При подгрузке страницы, added сразу является тем, чем надо. Сразу отдельный элемент с классом audio
		{
			processingOfAudio(added);

		}
		else // а при переходе на страницу с аудио, там какие-то NodeList внутри которых уже лежит аудио
		{
			var $audio = $(added).find('.audio');
			
			if ($audio.length) {
				$audio.each(function (index) {
					processingOfAudio(this);
				});
			};
		}
	}

	function appendBtn($titleSpan, directLink, title) {
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

		$titleSpan.after(btn);
	}

});
