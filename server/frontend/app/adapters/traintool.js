TrainTool.Store = DS.Store.extend({
  push: function(type, data, _partial) {
    // _partial is an internal param used by `update`.
    // If passed, it means that the data should be
    // merged into the existing data, not replace it.
    Ember.assert("You must include an `id` in a hash passed to `push`", data.id != null);
    type = this.modelFor(type);
    // normalize relationship IDs into records
    this._load(type, data, _partial);
    return this.recordForId(type, data.id);
  }
});

TrainTool.ApplicationSerializer = DS.RESTSerializer.extend({
  // When requestType is 'findAll' extract the JSON get the data from data[root].
  // In the case data['items']
  extract: function(store, primaryType, payload, recordId, requestType) {
    var root;
    this.extractMeta(store, primaryType, payload);
    if(requestType === 'findAll' || requestType === 'findQuery'){
    }else{
      root = null;
    }
    payload = this.normalizePayload(primaryType, payload);
    if(Object.keys(payload).length <= 2){
      return [];
    }
    var primaryRecord = this.normalize(primaryType, payload, root);
    return primaryRecord;
  },

  //Update the page tokens from a exercises list
  updatePageTokens: function(store, type, payload){
    var actualMeta = store.metadataFor(type);
    if(actualMeta.actualPageToken !== undefined && actualMeta.actualPageToken){
      store.metaForType(type, { previousPageToken: actualMeta.actualPageToken });
    }
    if(actualMeta.nextPageToken !== undefined && actualMeta.nextPageToken){
      store.metaForType(type, { actualPageToken: actualMeta.nextPageToken });
    }
    if (payload && payload.nextPageToken) {
      store.metaForType(type, { nextPageToken: payload.nextPageToken });
      delete payload.nextPageToken;
    }else{
      store.metaForType(type, { nextPageToken: null });
    }
  },

  extractMeta: function(store, type, payload) {
    this.updatePageTokens(store, type, payload);
  },


  normalize: function(type, hash, prop) {
    if(prop !== undefined && prop){
      hash = hash[prop];
    }

    this.normalizeId(hash);
    this.normalizeAttributes(type, hash);
    this.normalizeRelationships(type, hash);
    this.normalizeUsingDeclaredMapping(type, hash);

    if (this.normalizeHash && this.normalizeHash[prop]) {
      this.normalizeHash[prop](hash);
    }
    return this._super(type, hash, prop);
  },

  normalizeRelationships: function(type, hash) {
    var payloadKey, key;
    if (this.keyForRelationship) {
      type.eachRelationship(function(key, relationship) {
        payloadKey = this.keyForRelationship(key, relationship.kind);
        if (key === payloadKey) { return; }

        hash[key] = hash[payloadKey];
        delete hash[payloadKey];
      }, this);
    }
  },

  serializeIntoHash: function(type, record, options) {
    return this.serialize(record, options);
  },

  serializeHasMany: function(record, json, relationship) {
    var key = relationship.key,
      hasManyRecords = Ember.get(record, key);

    // Embed hasMany relationship if records exist
    if (hasManyRecords && relationship.options.embedded === 'always') {
      json[key] = [];
      hasManyRecords.forEach(function(item, index){
        json[key].push(item.serialize());
      });
    }
    // Fallback to default serialization behavior
    else {
      return this._super(record, json, relationship);
    }
  },

  serializeAttribute: function(record, json, key, attribute) {
    if(record.get(key) === null){
      return;
    }
    this._super(record, json, key, attribute);
  },

  serializeBelongsTo: function(record, json, relationship) {
    var key = relationship.key,
      belongsToRecord = Ember.get(record, key);
     
    if (relationship.options.embedded === 'always') {
      json[key] = belongsToRecord.serialize();
    }
    else {
      return this._super(record, json, relationship);
    }
  }

});

TrainTool.ApplicationAdapter = DS.RESTAdapter.extend({
  //host:'http://localhost:8080',
  host:'https://gup-traintool.appspot.com',
  namespace:'_ah/api/gupapi/v1',

  // Generate an URL for each operation type.
  // In the case that the operation is POST the
  // type in the URL will be in singular form.
  buildURL: function(type, id, operation) {
    var url = [],
        host = this.get('host'),
        prefix = this.urlPrefix();

    if (type) {
      if(operation === 'createRecord' || operation === 'find'){
        url.push(this.pathForTypeSingular(type));
      }else{
        url.push(this.pathForType(type));
      }
    }
    if (id) { url.push("?id="+id); }

    if (prefix) { url.unshift(prefix); }
    url = url.join('/');
    if(operation !== 'createRecord' && operation !== 'find'){
      url += '?order=-created';
    }
    if (!host && url) { url = '/' + url; }
    return url;
  },

  find: function(store, type, id) {
    return this.ajax(this.buildURL(type.typeKey, id, 'find'), 'GET');
  },

  // Return the path in singular.
  pathForTypeSingular: function(type) {
    var camelized = Ember.String.camelize(type);
    return camelized;
  },

  // Create record using the URL based on the operation
  // type.
  createRecord: function(store, type, record) {
    var requestType = "POST";
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    data = serializer.serializeIntoHash(type, record, { includeId: true });
    var response = this.ajax(this.buildURL(type.typeKey, null, 'createRecord'),requestType, { data: data });
    return response;
  }
});
