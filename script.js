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
			var $titleWrap = $(current).find('.title_wrap'); // нужно отдельной переменной, что бы передать в функцию hideShowEvent
			var titleArray = $titleWrap.find("a");
			var title = $(titleArray[0]).text() + ' - ' + $(titleArray[1]).text();

			$playBtn = $(current).find('.play_btn');

			var directLink;
			if($playBtn.length) {
				// такой элемент на странице аудиозаписей
			    directLink = $playBtn.find("input:hidden").val();
			} else {
				// а такой в постах
				directLink = $(current).find('.play_btn_wrap').siblings('input').val();
			}

			var $actionsContainer = $(current).find('.actions') // передается в функцию ниже, в него будет вставляться кнопка
			appendBtn($actionsContainer, directLink, title);

			$area = $(current).find('.area');
			hideShowEvent($area,$titleWrap);		
				
		};
	}

	function hideShowEvent($area, $titleWrap) {
		$area.hover(function() {
				$area.find(".download_btn").show();
				$titleWrap.addClass("newWidth");
			}, function() {
				$area.find(".download_btn").hide();
				$titleWrap.removeClass("newWidth");
		});
	}

	function newDOM(mutations) {
		for (var i = 0; i < mutations.length; i++) {
			var added = mutations[i].addedNodes;		
			findAudio(added);
		}
	}

	function findAudio(added) {

		if($(added).hasClass("audio")) {
			// При подгрузке страницы, в added элементы с классом аудио ( а при переходе они внутри NodeList)
			if($(added).length > 1) { // при поиске, в added оказывается массив ( а при прокрутке нет )
				$(added).each(function (index) {
					processingOfAudio(this);
				});
			} else { // этот вариант срабатывает, когда просто прокручиваешь свои записи вниз
				processingOfAudio(added);
			}

		} else {
			// при переходе на страницу с аудио, там какие-то NodeList внутри которых уже лежит аудио
			var $audio = $(added).find('.audio');
			
			if ($audio.length) {
				$audio.each(function (index) {
					processingOfAudio(this);
				});
			};
		}
		
	}

	function appendBtn($actionsContainer, directLink, title) {
		var btn = document.createElement('div');

		$(btn).addClass("download_btn");

		$(btn).hide();

		$(btn).on('click', function(e) {
			e.stopPropagation();
			chrome.runtime.sendMessage({ 
					command: 'download', 
					params: { 
						url: directLink, 
						filename: title + ".mp3"
					}
			});
		});

		$actionsContainer.append(btn);
	}

});
