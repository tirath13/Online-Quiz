$(document).ready(function(){
	var quizDiv = $('#quiz');
	
	$('button').click(function(){

		$.ajax({
			url: 'data/quizdata.xml',
			type: 'GET',
			dataType : 'xml',
			success : parseXML,
		});
	});

// Function for loading XML

function parseXML(data){
	console.log("quizdata");
	console.log(data);

	$(data).find('quiz').each(function(){
		var counter = 1;
		$(data).find('question').each(function(){
			var quesText = counter + '. ' + $(this).children('text').text(); //Question text

			$( '<ol> </ol>').addClass('question')
			.text(quesText)
			.appendTo(quizDiv);
			
			if(counter<=2)
				quizDiv.slideToggle();

			$(this).children('choices').each(function(){

			var choice = $(this).text(); //Choices text
			var result = $(this).attr('correct');

		    $( '<li></li>').text(choice) // this object referes to one choice
		    .addClass('choices')
		    .slideToggle()
		    .attr('data-correct', result)
		    .attr('type',counter)
		    .appendTo(quizDiv)
		    .slideDown(1000);
		    
		});
			counter++;
		});
		$('<br><a></a>').html("End Quiz")
					    .attr('href',"index.html")
						.appendTo(quizDiv);
	});
}

//Mouse Handler when it enters and leaves the options
$(document).on('mouseenter', '.choices', function () {
	$(this).addClass('choicesHovered');
}) ;

$(document).on('mouseleave', '.choices', function () {
	$(this).removeClass('choicesHovered');
}) ;

//Button to end quiz
$(document).on('mouseenter', 'a', function () {
	$(this).css('color','white');
}) ;

//CLICK HANDLER 
$(document).on('click', '.choices' , function () {

	var a = $(this).text();
	console.log(a);
	var click = $(this).attr('data-correct') ;

//CONDITION CHECK WHETHER THE CLICKED OPTION IS CORRECT ANSWER OR NOT
if ( click == "true")
	$(this).addClass('correct');

else 
{
	$(this).addClass('wrong');
	$(this).fadeIn(100).fadeOut(100).fadeIn(100)
	.fadeOut(100).fadeIn(100).fadeOut(100)
	.fadeIn(100);
}
}) ;

});