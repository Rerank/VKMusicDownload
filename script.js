$(function(){

	alert('Версия1 jQuery ' + jQuery.fn.jquery);
	$('.audio').each(function (index) {
	var title = $(this).find('.title_wrap').find("a").text();

	var $play_btn = $(this).find('.play_btn')
	if($play_btn.length)
	{
	  var directLink = $play_btn.find("input:hidden").val();
	}
	else
	{
	  var directLink = $(this).find('.play_btn_wrap').siblings('input').val();

	}
	var $titleSpan = $(this).find('.title_wrap').find("span.title");
	var $area = $(this).find('.area');
	$area.hover(
	  function() {
	    $area.find(".download_btn").show();
	  }, function() {
	    $area.find(".download_btn").hide();
	  }
	);
	appendBtn($titleSpan, directLink, title);
	});


	function appendBtn(titleSpan, directLink, title) {
	  var btn = document.createElement('a');
	$(btn).addClass("download_btn")
	$(btn).css('float','right');
	$(btn).css('height','15px');
	$(btn).css('width','15px');
	$(btn).attr("href", directLink)
	$(btn).attr("download", title)
	$(btn).css('background-image','url(http://www.beforward.jp/images/stocklist/download-icon.gif)');
	$(btn).hide();

	$(btn).on('click', function(event) {
	    event.stopPropagation();
	})

	titleSpan.after(btn);
	}
});