var setRestConfigs = function(){
  TrainTool.ApplicationSerializer = DS.RESTSerializer.extend({
    pages:[],
    // When requestType is 'findAll' extract the JSON get the data from data[root].
    // In the case data['items']
    extract: function(store, primaryType, payload, recordId, requestType) {
      var root;
      this.extractMeta(store, primaryType, payload);
      if(requestType === 'findAll' || requestType === 'findQuery'){
        root = "items";
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
    serializeIntoHash: function(type, record, options) {
      return this.serialize(record, options);
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
};

var setLocalstorage = function(){
  TrainTool.ApplicationAdapter = DS.LSAdapter.extend({
    namespace:"traintool"
  });
};

if(window.TESTING){
  setLocalstorage();
} else {
  setRestConfigs();
}
