// Use the raw value passed to the model
TrainTool.ArrayTransform = DS.Transform.extend({
  serialize:function(value){
    return value;
  },
  deserialize:function(value){
    return value;
  }
});

TrainTool.DateTransform = DS.DateTransform.extend({
  deserialize: function(serialized) {
    var type = typeof serialized;

    if (type === "string" || type === "number") {
      return moment.utc(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is not present in the data,
      // return undefined, not null.
      return serialized;
    } else {
      return null;
    }
  },
});
