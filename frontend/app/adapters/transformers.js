// Use the raw value passed to the model
TrainTool.ArrayTransform = DS.Transform.extend({
  serialize:function(value){
    if(typeof value === "string"){
      return value.split(/\D/);
    }
    return value;
  },
  deserialize:function(value){
    return value;
  }
});