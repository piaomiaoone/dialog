;
(function() {
	var drag = function() {
		var objDiv = document.getElementById("dialog");
		objDiv.onmousedown = function(e) {
			e = e || window.event;
			var x = e.clientX / 2 - 355;
			var y = e.clientY / 2 - 125;
			if (objDiv.setCapture) { //此处设置事件捕获范围
				objDiv.setCapture();
			} else if (window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				var pX = e.clientX;
				var pY = e.clientY;
				var tx = pX - x;
				console.log(x)
				var ty = pY - y;
				objDiv.style.left = tx + "px";
				objDiv.style.top = ty + "px";
			};
			document.onmouseup = function() {
				if (objDiv.releaseCapture) { //此处释放捕获范围
					objDiv.releaseCapture();
				} else if (window.captureEvents) {
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				}
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	}
	var A = {
		'alert': function(el, data) {
			var content = "<div id='mask'></div><div id='dialog'><form id='submitData'><div class='header'><span>提交</span><a href='#' data-role='close' class='close'>X</a></div><div class='conent'></div><button id='submit' data-role='submit'>提交</button></form></div>";
			$('body').append(content);
			$('.conent').html(data);
			drag();
		},
		'submit': function(el, data) {
			$('#dialog').remove();
			$('#mask').remove();
		},
		'close': function(el, data) {
			$('#dialog').remove();
			$('#mask').remove();
		}
	};
	$('body').delegate('[data-role]', 'click', function() {
		var el = $(this);
		if (method = A[el.data('role')]) {
			method(el, el.html());
		}
	});

})();