var config = {
    '.chosen-select'           : {},
    '.chosen-select-deselect'  : {allow_single_deselect:true},
    '.chosen-select-no-single' : {disable_search_threshold:10},
    '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
    '.chosen-select-width'     : {width:"95%"}
  }
  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }
  
	// Data Preparation for importing gantt json
	function prepData(){
 		deFillGanttImporting();
 		fillGanttImporting();   		
 	};
	
	function deFillGanttImporting(){
		$("#ganttList").empty();
	};
 	
 	function fillGanttImporting()
 	{
 		$.getJSON("/kmcj/returnAllDocFullName.filel", {"directory": "C:\\ganttjson"}).done(
 				function(data) {
		 			if(data.hasgantt == "yes"){
			 	        $.each(data.ganttlist, function(i, item) {
			 	            $("#ganttList").append("<option>" + item + "</option>");
			 	        });
		 			}
		 		});
 	};  

  function rebindChosen(){
	  var config = {
			    '.chosen-select'           : {search_contains:true},
			    '.chosen-select-deselect'  : {allow_single_deselect:true},
			    '.chosen-select-no-single' : {disable_search_threshold:10},
			    '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
			    '.chosen-select-width'     : {width:"95%"}
			  }
			  for (var selector in config) {
			    $(selector).chosen(config[selector]);
			  }

	  };

  $.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig) {

    var resEl = assigTr.find("[name=resourceId]");
    for (var i in taskAssig.task.master.resources) {
      var res = taskAssig.task.master.resources[i];
      var opt = $("<option>");
      opt.val(res.id).html(res.name);
      if (taskAssig.assig.resourceId == res.id)
        opt.attr("selected", "true");
      resEl.append(opt);
    }

    var roleEl = assigTr.find("[name=roleId]");
    for (var i in taskAssig.task.master.roles) {
      var role = taskAssig.task.master.roles[i];
      var optr = $("<option>");
      optr.val(role.id).html(role.name);
      if (taskAssig.assig.roleId == role.id)
        optr.attr("selected", "true");
      roleEl.append(optr);
    }

    if(taskAssig.task.master.canWrite && taskAssig.task.canWrite){
      assigTr.find(".delAssig").click(function() {
        var tr = $(this).closest("[assigId]").fadeOut(200, function() {
          $(this).remove();
        });
      });
    }


  });