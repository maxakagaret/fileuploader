const timeOut = 5000;
var fileList = [],
	errorList = [],
	currentIndex = 0,
	uploadingAmount = 0,
	lastIndex = 0;
function ShowAlert(message){
	let errorAlert = $('.modal-uploader .modal-body .error-alert'),
	errorAlertText = errorAlert.find('h4');
	
	errorAlertText.text(message);

	errorAlert.fadeIn(250);
	setTimeout(function(){
		errorAlert.fadeOut(250);
	},timeOut);
}

function ImageProcess(index, file, dropZone, loader, maxFilesAmount, maxImageSize){
	let reader = new FileReader();
	if (file.size > maxImageSize) {
		ShowAlert('Файл '+file.name+' слишком большой!');
		return false;
	}
	if(index==0){
		reader.onloadstart = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.find('.pre-upload').show();
			dropZone.find('.image-files').hide();
			dropZone.find('.video-files').hide();
			dropZone.find('.audio-files').hide();
		};
	}
	if(index==(maxFilesAmount - 1)){
		reader.onloadend = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.removeClass('drop');
			dropZone.find('.pre-upload').hide();
			dropZone.find('.image-files').show();
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ ИЗОБРАЖЕНИЯ').val(1);
			$('.modal-uploader .modal-body .file-area > .btn').show();
		};
	}
	reader.onload = (function (renderedFile) {
		return function (e) {
			let imageInfoBlock = $('.buttons-set .complex-button.pics'),
				imageCounterBlock = imageInfoBlock.find('.included-counter'),
				imageCounterSubBlock = imageInfoBlock.find('.button-container .files-counter'),
				imageCounter = parseInt(imageCounterBlock.text(), 10) + 1,
				imageBox = $('.file-area .image-files'),
				img = e.target.result,

				orig = $('<div class="orig"></div>'),
				hovered = $('<div class="hovered"></div>'),
				thumb = $('<div class="thumb" title="' + (escape(renderedFile.name)) + '"></div>');
			
			orig.css('background-image',"url('" + img + "')");
			hovered.css('background-image',"url('" + img + "')");
			thumb.append(orig);
			thumb.append(hovered);
			thumb.append('<img src="' + img + '" />')
			imageBox.append(thumb);

			if(!imageInfoBlock.hasClass('upload-active')){
				imageInfoBlock.addClass('upload-active');
				imageCounterSubBlock.show();	
			}

			imageCounterBlock.text(imageCounter);
			imageCounterSubBlock.text(imageCounter);
		};
	})(file);

	reader.readAsDataURL(file);
}

function AudioProcess(index, file, dropZone, loader, maxFilesAmount, maxSoundSize){
	let reader = new FileReader();
	if (file.size > maxSoundSize) {
		ShowAlert('Файл '+file.name+' слишком большой!');
		return false;
	}
	if(index==0){
		reader.onloadstart = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.find('.pre-upload').show();
			dropZone.find('.image-files').hide();
			dropZone.find('.video-files').hide();
			dropZone.find('.audio-files').hide();
		};
	}
	if(index==(maxFilesAmount - 1)){
		reader.onloadend = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.removeClass('drop');
			dropZone.find('.pre-upload').hide();
			dropZone.find('.audio-files').show();
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ АУДИО').val(3);
			$('.modal-uploader .modal-body .file-area > .btn').show();
		};	
	}
	reader.onload = (function (renderedFile) {
		return function (e) {
			let audioInfoBlock = $('.buttons-set .complex-button.audio'),
				audioCounterBlock = audioInfoBlock.find('.included-counter'),
				audioCounterSubBlock = audioInfoBlock.find('.button-container .files-counter'),
				audioCounter = parseInt(audioCounterSubBlock.text(), 10) + 1,
				audioBox = $('.file-area .audio-files'),
				audio = e.target.result,

				orig = $('<div class="orig"></div>'),
				hovered = $('<div class="hovered"></div>'),
				thumb = $('<div class="thumb" title="' + renderedFile.name + '"></div>');
			
			orig.css('background-image',"url('img/audio3.png')");
			hovered.css('background-image',"url('img/audio3.png')");
			thumb.append(orig);
			thumb.append(hovered);
			audioBox.append(thumb);

			if(!audioInfoBlock.hasClass('upload-active')){
				audioInfoBlock.addClass('upload-active');
				audioCounterSubBlock.show();	
			}

			audioCounterBlock.text(audioCounter);
			audioCounterSubBlock.text(audioCounter);
		};
	})(file);

	reader.readAsDataURL(file);
}

function VideoProcess(index, file, dropZone, loader, maxFilesAmount, maxVideoSize){
	let reader = new FileReader();
	if (file.size > maxVideoSize) {
		ShowAlert('Файл '+file.name+' слишком большой!');
		return false;
	}
	if(index==0){
		reader.onloadstart = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.find('.pre-upload').show();
			dropZone.find('.image-files').hide();
			dropZone.find('.video-files').hide();
			dropZone.find('.audio-files').hide();
		};
	}
	if(index==(maxFilesAmount - 1)){
		reader.onloadend = (ev) => {
			ToggleLoadingAnimation(loader);
			dropZone.removeClass('drop');
			dropZone.find('.pre-upload').hide();
			dropZone.find('.video-files').show();
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ ВИДЕО').val(2);
			$('.modal-uploader .modal-body .file-area > .btn').show();
		};	
	}
	reader.onload = (function (renderedFile) {
		return function (e) {
			let videoInfoBlock = $('.buttons-set .complex-button.video'),
				videoCounterBlock = videoInfoBlock.find('.included-counter'),
				videoCounterSubBlock = videoInfoBlock.find('.button-container .files-counter'),
				videoCounter = parseInt(videoCounterSubBlock.text(), 10) + 1,
				videoBox = $('.file-area .video-files'),
				video = e.target.result,

				orig = $('<div class="orig"></div>'),
				hovered = $('<div class="hovered"></div>'),
				thumb = $('<div class="thumb" title="' + renderedFile.name + '"></div>');
			
			orig.css('background-image',"url('img/video3.png')");
			hovered.css('background-image',"url('img/video3.png')");
			thumb.append(orig);
			thumb.append(hovered);
			videoBox.append(thumb);

			if(!videoInfoBlock.hasClass('upload-active')){
				videoInfoBlock.addClass('upload-active');
				videoCounterSubBlock.show();	
			}

			videoCounterBlock.text(videoCounter);
			videoCounterSubBlock.text(videoCounter);
		};
	})(file);

	reader.readAsDataURL(file);
}

function DragDropInit(dropZone){
	if (typeof(window.FileReader) == 'undefined') {
		ShowAlert('Не поддерживается браузером!')
	}
	dropZone[0].ondragover = function() {
		dropZone.addClass('hover');
		return false;
	};
	dropZone[0].ondragleave = function() {
		dropZone.removeClass('hover');
		return false;
	};
	dropZone[0].ondrop = function(event) {
		event.preventDefault();

		let files = event.dataTransfer.files,
			maxImageSize = 1000000,
			maxAudioSize = 10000000,
			maxVideoSize = 50000000,
			errors = '',
			loader = dropZone.find('.pre-upload .loader'),
			maxFilesAmount = files.length < 12 ? files.length : 12;

		if(fileList.length + files.length > 12){
			ShowAlert('можно загружать не более 12 файлов');
			return false;
		}

		dropZone.removeClass('hover');
		dropZone.addClass('drop');
		
		for(let i = 0; i < maxFilesAmount && fileList.length < 12; i++){
			let file = files[i];

			fileList.push(file);

			if (file.type.match('image.*')) {
				ImageProcess(i, file, dropZone, loader, maxFilesAmount, maxImageSize);
			}
			else if(file.type.match('audio.*')){
				AudioProcess(i, file, dropZone, loader, maxFilesAmount, maxAudioSize);
			}
			else if(file.type.match('video.*')){
				VideoProcess(i, file, dropZone, loader, maxFilesAmount, maxVideoSize);
			}
		}

	};
}

function ToggleLoadingAnimation(loader){
	if(!loader.hasClass('in')){
		StartLoadingAnimation(loader);		
	}
	else{
		StopLoadingAnimation(loader);
	}
}

function StartLoadingAnimation(loader){	
	loader.addClass('in');
	let shift = 0;
	loader.find('.circle').each(function(){
		let circle = $(this);
		setTimeout(function(){ 
			circle.addClass('animated');
		}, shift*100);
		shift++;
	});
}

function StopLoadingAnimation(loader){
	loader.removeClass('in');
	let shift = 0;
	loader.find('.circle').each(function(){
		let circle = $(this);
		setTimeout(function(){ 
			circle.removeClass('animated');
		}, shift*100);
		shift++;
	});
}

function toggleFilesType(activeType=''){
	switch(activeType){
		case 'pics': 
			$('.modal-uploader .modal-body .file-area .image-files').show().addClass('active');
			$('.modal-uploader .modal-body .file-area .video-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .file-area .audio-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ ИЗОБРАЖЕНИЯ').val(1);
			break;
		case 'video':
			$('.modal-uploader .modal-body .file-area .image-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .file-area .video-files').show().addClass('active');
			$('.modal-uploader .modal-body .file-area .audio-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ ВИДЕО').val(2);
			break;
		case 'audio':
			$('.modal-uploader .modal-body .file-area .image-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .file-area .video-files').hide().removeClass('active');
			$('.modal-uploader .modal-body .file-area .audio-files').show().addClass('active');
			$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text('ЗАГРУЗИТЬ АУДИО').val(3);
			break;
		// default:
		// 	$('.modal-uploader .modal-body .file-area .image-files').hide();
		// 	$('.modal-uploader .modal-body .file-area .video-files').hide();
		// 	$('.modal-uploader .modal-body .file-area .audio-files').hide();
		// 	$('.modal-uploader .modal-body .file-area .pre-upload').show();
		// 	break;
	}
	$('.modal-uploader .modal-body .full-upload-button-box').css({'visibility':'hidden'});
}

function uploadProgress(event,index){
	var percent = parseInt((event.loaded * currentIndex) / (event.total * uploadingAmount) * 100 );
    $('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').text(percent + '%');
}

function stateChange(event) {
    if (event.target.readyState == 4) {
        if (event.target.status == 200) {
        	if(lastIndex == currentIndex){
        		ShowAlert('Загрузка успешно завершена!');	
        	}
        } else {
            errorList.push('Номер ошибки: '+event.target.status);
        }
    }
}
$(document).ready(function(){
	$('.btn-open-modal').click(function(){
		$('.modal-uploader').show();
		setTimeout(function(){
			$('.modal-uploader').addClass('opened');
		}, 50);
	});

	$('.btn-close-modal').click(function(){
		$('.modal-uploader').removeClass('opened');
		setTimeout(function(){
			$('.modal-uploader').hide();
		}, 250);
	});
	
	$('.modal-uploader .modal-fade').click(function(){
		$('.modal-uploader').removeClass('opened');
		setTimeout(function(){
			$('.modal-uploader').hide();
		}, 250);
	});

	let circles='';
	for(let i=0; i<10; i++){
		circles += '<span class="circle"></span>';
	}

	$('.modal-uploader .modal-body .file-area .pre-upload .loader').append(circles);

	$('.modal-uploader .modal-body .file-area .pre-upload .loader').click(function(){
		if(!$(this).hasClass('in')){
			StartLoadingAnimation($(this));
		}
		else{
			StopLoadingAnimation($(this));
		}
	});

	$('.modal-uploader .modal-body .buttons-set:not(.blocked) .complex-button').hover(function(){
		if($(this).hasClass('upload-active')){

			if($(this).hasClass('pics')){
				toggleFilesType('pics');
			}
			else if($(this).hasClass('video')){
				toggleFilesType('video');
			}
			else if($(this).hasClass('audio')){
				toggleFilesType('audio');
			}
		}
		else{
			$('.modal-uploader .modal-body .full-upload-button-box').css({'visibility':'hidden'});
		}
	},
	function(){
		toggleFilesType();
		$('.modal-uploader .modal-body .full-upload-button-box').css({'visibility':'visible'});	
	});

	//$('.modal-uploader .modal-body .file-area .image-files')

	$('.modal-uploader .modal-body .file-area .image-files').bind('DOMMouseScroll mousewheel', function(e){
		if(e.originalEvent.deltaY < 0) {
            $(this).scrollLeft($(this).scrollLeft() + 100);
        }
        else{
            $(this).scrollLeft($(this).scrollLeft() - 100);
        }
	});
	$('.modal-uploader .modal-body .file-area .video-files').bind('DOMMouseScroll mousewheel', function(e){
		if(e.originalEvent.deltaY < 0) {
            $(this).scrollLeft($(this).scrollLeft() + 100);
        }
        else{
            $(this).scrollLeft($(this).scrollLeft() - 100);
        }
	});
	$('.modal-uploader .modal-body .file-area .audio-files').bind('DOMMouseScroll mousewheel', function(e){
		if(e.originalEvent.deltaY < 0) {
            $(this).scrollLeft($(this).scrollLeft() + 200);
        }
        else{
            $(this).scrollLeft($(this).scrollLeft() - 200);
        }
	});

	$('.modal-uploader .modal-body .file-area > .btn').click(function(e){
		e.preventDefault();
		let box = $('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').val(),
			shift = 200,
			scrollingArea;

		if($(this).hasClass('btn-prev')){
			shift *=  -1;
		}

		if(box!='0'){
			if(box=='1'){
				scrollingArea = $('.modal-uploader .modal-body .file-area .image-files');
			}
			else if(box=='2'){
				scrollingArea = $('.modal-uploader .modal-body .file-area .video-files');
			}
			else if(box=='3'){
				scrollingArea = $('.modal-uploader .modal-body .file-area .audio-files');
			}
			scrollingArea.animate({scrollLeft: scrollingArea.scrollLeft() + shift}, 250);
		}
	});

	$('.modal-uploader .modal-body .full-upload-button-box .full-upload-button').click(function(e){
		e.preventDefault();

		let uploadedFilesType = ''
			uploadingFiles = [],
			uploadButton = $('.modal-uploader .modal-body .full-upload-button-box .full-upload-button'),
			progressMeter = $('.modal-uploader .modal-body .full-upload-button-box .loading-progress'),
			dropZone = $('.modal-uploader .modal-body .file-area'),
			refreshIntervalId = [];
		uploadButton.hide();
		progressMeter.show();
    	progressMeter.find('.loading-percent').text('0%');
    	$('.modal-uploader .modal-body .buttons-set').addClass('blocked');

		switch($(this).val()){
			case '1': uploadedFilesType='image.*'; break;
			case '2': uploadedFilesType='video.*'; break;
			case '3': uploadedFilesType='audio.*'; break;
		}
		
		for(let i = 0; i < fileList.length; i++){
			if(fileList[i].type.match(uploadedFilesType)){
				uploadingFiles.push(fileList[i]);
			}
		}
		for(let i=0; i < uploadingFiles.length; i++){
			if(uploadedFilesType == 'image.*'){
				let img = $(dropZone.find('.image-files .thumb')[0]).find('.hovered')
					start = 50;
					shift = 20;
				img.width("40%");

				refreshIntervalId.push(setInterval(function(){
					img.width(start+shift+"%");
					start = start + shift;
					shift = shift/2;
				},500));
			}
			var data = new FormData();
			data.append(i, uploadingFiles[i]);
			$.ajax({
				url: 'upload.php',
				type: 'POST',
				data: data,
				async: false,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,
				success: function( respond, textStatus, jqXHR ){
					if(typeof(respond.error) === 'undefined'){
						console.log('No errors');
						let percent = Math.floor((i+1)/uploadingFiles.length*100);
						progressMeter.find('.loading-percent').text(percent+"%");
						progressMeter.find('.loading-bar').width(percent+"%");
						if(uploadedFilesType == 'image.*'){
							clearInterval(refreshIntervalId[i]);
							$(dropZone.find('.image-files .thumb')[i]).find('.hovered').width('100%');
						}
					}
					else{
						errorList.push(respond.error);
					}
				},
					error: function( jqXHR, textStatus, errorThrown ){
					errorList.push(textStatus);
				}
			});
			
		}
		if(errorList.length == 0){
			ShowAlert('Загрузка успешно завершена!');
		}
		else{
			ShowAlert('Произошла ошибка! ' + errorList.join());
		}	
		fileList = [];
			
		dropZone.find('.image-files').empty().hide();
		dropZone.find('.video-files').empty().hide();
		dropZone.find('.audio-files').empty().hide();
		dropZone.find('.pre-upload').show();
		uploadButton.val(0);

		$('.buttons-set .complex-button').removeClass('upload-active');
		$('.buttons-set .complex-button .text-container .on-upload .included-counter').text(0);
		$('.buttons-set .complex-button .button-container .files-counter').text(0);
		$('.modal-uploader .modal-body .file-area > .btn').hide();
		$('.modal-uploader .modal-body .buttons-set').removeClass('blocked');
		
		setTimeout(function(){
			uploadButton.text('ВБЕРИТЕ ФАЙЛЫ ДЛЯ ЗАГРУЗКИ');
			progressMeter.hide();
			uploadButton.show();
			progressMeter.find('.loading-percent').text("0%");
			progressMeter.find('.loading-bar').width("0%");
		}, timeOut);	
	})
	DragDropInit($('.modal-uploader .modal-body .file-area'));
});