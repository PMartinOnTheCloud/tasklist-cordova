$('document').ready(function(){

    
    
    $('button#addtask').on('click',function(){
			var tasktoadd = $('#tasktoadd').val();
            if (tasktoadd.match(/^\s*$/) || tasktoadd == "") {
                return false;
            }
            var tasksLSKeys = Object.keys(tasksLS);

            var tasksLSIndex = tasksLSKeys.length==0 ? 0 : null ;

            for(let value of tasksLSKeys) {
                var tasksLSIndex = tasksLSIndex <= value || tasksLSIndex==null ? parseInt(value)+1 : tasksLSIndex; 
            }

            tasksLS[tasksLSIndex] = tasktoadd ;

			$('ul#taskslist').append(`<li class='ui-first-child ui-last-child' id="${tasksLSIndex}" data-icon='delete'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-delete'>${tasktoadd}</a></li>`);
            $('li > a').click({"tasksLS":tasksLS},deleteTask);

            localStorage.setItem('tasks',JSON.stringify(tasksLS));

    });

    function deleteTask(event) {
        delete event.data.tasksLS[$(this).parent().attr('id')];
        $(this).parent().remove();
        localStorage.setItem('tasks',JSON.stringify(tasksLS));
    }

    function displayTasksInit(tasksLS) {
        Object.entries(JSON.parse(localStorage.getItem('tasks'))).forEach(([key, value]) => {
            $('ul#taskslist').append(`<li class='ui-first-child ui-last-child' id="${key}" data-icon='delete'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-delete'>${value}</a></li>`);
        });
        $('li > a').click({"tasksLS":tasksLS},deleteTask);
    }
    
    var tasksLS = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : JSON.parse(localStorage.setItem('tasks',JSON.stringify({}))) ;

    if (Object.keys(tasksLS).length!=0) {
        displayTasksInit(tasksLS);
    }

});