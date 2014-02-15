// Use the raw value passed to the model
TrainTool.ArrayTransform = DS.Transform.extend({
  serialize:function(value){
    return value;
  },
  deserialize:function(value){
    return value;
  }
});