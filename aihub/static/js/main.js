// Shorthand for $( document ).ready()
$(function() {
    console.log( "ready!" );

    $("#file").change(function(){
         //submit the form here
         $("#upload-label").text("File selected.")
         $("#upload-label").css("background-color", "white")
         $("#upload-label").css("border", "none")
	 });

    $('#submit').click(function (event) {

		event.preventDefault()
		var file = $('#file').get(0).files[0];
		var formData = new FormData();
		formData.append('file', file);

		$('#upload-form').hide();
		$('#loader').show();


		$.ajax({
			url: '.',
			//Ajax events
			beforeSend: function (e) {
				console.log("sending to server for processing")
			},
			success: function (data) {

				var transcriptions = parseTranscription(data.results.split(/\n/))

				// displayTranscriptions(transcriptions)

				if (data.encoding == "video"){
					loadVideoAndTranscribe(file, transcriptions)
				} else if (data.encoding == "audio") {
					console.log(transcriptions)
					displayTranscriptions(transcriptions)
					$('#loader').hide();
				}

			},
			error: function (e) {
				alert('error ' + e.message);

				$('#upload-form').show();
				$('#loader').hide();
			},
			// Form data
			data: formData,
			type: 'POST',
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});
		return false;
	});


	$('#picture-submit').click(function (event) {

		$('#picture-form').hide();
		$('#loader').show();
	});

	// ParticlesJS Config.
	createParticles();



});



function loadVideoAndTranscribe(file, transcriptions) {

	$("#transcribed-video").html('<video class="video-js vjs-default-skin" controls \
		width="720" height="480" id="video">\
			<source src="'+URL.createObjectURL(file)+'" \
			type="'+file.type+'">\
		</video>')

	var video = document.getElementById("video")
	video.load()

	console.log(video)

	video.addEventListener("loadedmetadata", function() {
		var track = this.addTextTrack("captions", "English", "en");
		track.mode = "showing";

		for (var i = 0; i < transcriptions.length; i++) {

			track.addCue(new VTTCue(transcriptions[i].start_time, 
				transcriptions[i].end_time, 
				transcriptions[i].transcription));

		}

		// track.addCue(new VTTCue(0, 12, "[Test]"));
		// track.addCue(new VTTCue(18.7, 21.5, "This blade has a dark past."));
		// track.addCue(new VTTCue(22.8, 26.8, "It has shed much innocent blood."));
	
		var video = videojs('video')

		// Initialize the plugin.
		var transcript = video.transcript();

		// Then attach the widget to the page.
		var transcriptContainer = document.querySelector('#transcript');
		transcriptContainer.appendChild(transcript.el()); 

		// $('#upload-form').show();
		$('#loader').hide();

	});


}



function displayTranscriptions(transcriptions) {

	for (var i = 0; i < transcriptions.length; i++){
		$('<div/>', {
			id: "transcription-"+i,
		    class: "row"
		}).appendTo('#transcriptions');

		$('<p/>', {
		    class: "transcription",
		    text: "[" + transcriptions[i].start_time + " - " + transcriptions[i].end_time + "]: "+transcriptions[i].transcription
		}).appendTo('#transcription-'+i);

		// $('<p/>', {
		//     class: "confidence",
		//     text: transcriptions[i].confidence
		// }).appendTo('#transcription-'+i);

		// $('<p/>', {
		//     class: "start-time",
		//     text: transcriptions[i].start_time
		// }).appendTo('#transcription-'+i);

		// $('<p/>', {
		//     class: "end-time",
		//     text: transcriptions[i].end_time
		// }).appendTo('#transcription-'+i);
	}
}



function parseTranscription(data) {

	var transcripts = [], confidences = [], start = [], end = []

	for (var i = 0; i < data.length; i++){

		if (data[i].trim().startsWith("Transcript")) {
			var find = 'Transcript: ';
			var re = new RegExp(find, 'g');

			var str = data[i].trim().replace(re, '');
			transcripts.push(str)
		}

		if (data[i].trim().startsWith("Confidence")) {
			var find = 'Confidence: ';
			var re = new RegExp(find, 'g');

			var str = data[i].trim().replace(re, '');
			confidences.push(str)
		}

		if (data[i].trim().startsWith("Start Time")) {
			var find = 'Start Time: ';
			var re = new RegExp(find, 'g');

			var str = data[i].trim().replace(re, '');
			start.push(str)
		}

		if (data[i].trim().startsWith("End Time")) {
			var find = 'End Time: ';
			var re = new RegExp(find, 'g');

			var str = data[i].trim().replace(re, '');
			end.push(str)
		}

	}


	var transcriptions = []

	for (var i = 0; i < transcripts.length; i++){
		transcriptions.push({
			transcription: transcripts[i],
			confidence: confidences[i],
			start_time: start[i],
			end_time: end[i]
		})
	}

	return transcriptions

}





function createParticles() {

	var colors = ["#2ecc71", "#27ae60", "#16a085", "#1abc9c"]

	var elementName = "particles"
	if($('#particles').length != 0) elementName = "particles"
	if($('#particles-splash').length != 0) elementName = "particles-splash"

	particlesJS(elementName, {
	  "particles": {
	    "number": {
	      "value": 64,
	      "density": {
	        "enable": true,
	        "value_area": 700
	      }
	    },
	    "color": {
	      "value": colors
	    },
	    "shape": {
	      "type": "circle",
	      "stroke": {
	        "width": 0,
	        "color": "#000000"
	      },
	      "polygon": {
	        "nb_sides": 15
	      }
	    },
	    "opacity": {
	      "value": 0.5,
	      "random": true,
	      "anim": {
	        "enable": false,
	        "speed": 1.5,
	        "opacity_min": 0.15,
	        "sync": false
	      }
	    },
	    "size": {
	      "value": 15,
	      "random": true,
	      "anim": {
	        "enable": true,
	        "speed": 2,
	        "size_min": 0.15,
	        "sync": false
	      }
	    },
	    "line_linked": {
	      "enable": true,
	      "distance": 110,
	      "color": "#33b1f8",
	      "opacity": 0.25,
	      "width": 1
	    },
	    "move": {
	      "enable": true,
	      "speed": 1.6,
	      "direction": "none",
	      "random": false,
	      "straight": false,
	      "out_mode": "out",
	      "bounce": false,
	      "attract": {
	        "enable": false,
	        "rotateX": 600,
	        "rotateY": 1200
	      }
	    }
	  },
	  "interactivity": {
	    "detect_on": "canvas",
	    "events": {
	      "onhover": {
	        "enable": true,
	        "mode": "repulse"
	      },
	      "onclick": {
	        "enable": true,
	        "mode": "push"
	      },
	      "resize": true
	    },
	    "modes": {
	      "grab": {
	        "distance": 400,
	        "line_linked": {
	          "opacity": 1
	        }
	      },
	      "bubble": {
	        "distance": 400,
	        "size": 40,
	        "duration": 2,
	        "opacity": 8,
	        "speed": 3
	      },
	      "repulse": {
	        "distance": 200,
	        "duration": 0.4
	      },
	      "push": {
	        "particles_nb": 4
	      },
	      "remove": {
	        "particles_nb": 2
	      }
	    }
	  },
	  "retina_detect": true
	});

	var count_particles, stats, update;
	stats = new Stats;
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
	count_particles = document.querySelector('.js-count-particles');
	update = function() {
	  stats.begin();
	  stats.end();
	  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
	    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
	  }
	  requestAnimationFrame(update);
	};
	requestAnimationFrame(update);;
}