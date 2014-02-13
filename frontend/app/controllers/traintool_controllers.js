TrainTool.ExerciseController = Ember.ArrayController.extend({
	actions:{
		createExercise:function(){
			var name = this.get('exName');
			var comment = this.get('exComment');
			var equipament = this.get('exEquipament');
			var execution = this.get('exExecution');
			var reps = this.get('exReps');
			if(!name.trim() || !comment.trim()
				|| !equipament.trim() || !execution.trim() || !reps.trim()){ return ;}

			var exercise = this.store.createRecord('exercise',
			{
				name:name,
				comment:comment,
				equipament:equipament,
				execution:execution
			});
			exercise.save();
		}
	}
});