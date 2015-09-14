var taskModel=function(id,name,duration,status){
	var self=this;
	self.taskId=ko.observable(id);
	self.taskName=ko.observable(name);
	self.taskDuration=ko.observable(duration);
	self.taskStatus=ko.observable(status);
	self.setId=function(data){
		self.taskId=data;
	};
	/*self.removeTask=function(){
		taskController.removeTask(this);
	}*/

};
var taskController=function(){
	//this.taskId=ko.observable("");
	//console.log(e);
	var self=this;
	self.taskName=ko.observable();
	self.taskDuration=ko.observable();
	self.taskList=ko.observableArray([]); 
	self.taskStatus=ko.observable("new born");
	
	self.createTask=function(){
		//console.log(this,self);

		var task=new taskModel("null",self.taskName(),self.taskDuration(),self.taskStatus());
		//console.log(task.taskId());
		task.taskCommand="insert";
		if(this.taskValidation()){
			var jsonTask=ko.toJSON(task);
			$.ajax({
				url : '../../controller/taskAssign.php',
				type : "POST",
				data : jsonTask,
				contentType: "application/json;charset=utf-8",
				//dataType: "text json",
				success: function(data){
					//console.log(data);
					task.setId(data);
					self.taskList.push(task);
					//self.taskList.removeTask=self.removeTask();
					
					
				}
			});
		}
	};

	/*self.removeTask=function(task){
		self.taskList.remove(task);
	}*/
	this.taskValidation=function(){
		if(this.taskName()!=""&& this.taskDuration()!=""&& Number(this.taskDuration()) + 0==this.taskDuration())
			return true;
		else
			return false;
	};

	self.removeTask=function(task){
		//var child=this.child();
		console.log(task);
		self.taskList.remove(task);
	}

	this.processTask=function(){
		

	}

};
ko.applyBindings(taskController);