$('document').ready(function(){
    $('button#addtask').on('click',function(){
			var tasktoadd = $('#tasktoadd').val();
            console.log(tasktoadd);
			$('ol#taskslist').append('<li>'+tasktoadd+'</li>');
    });
});