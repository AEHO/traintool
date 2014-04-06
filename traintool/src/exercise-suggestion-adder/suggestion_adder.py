#coding: utf-8

import json
import urllib.request
import urllib.parse
import sys
import re

OBJECTS_FIELDS_BY_FILE_TYPE = {
    'exercises': {
        'sql': ['name', None, 'body_part', 'equipment', 'execution']
    }
}

URL_BY_OBJECT = {
    'exercises' : 'https://gup-traintool.appspot.com/_ah/api/gupapi/v1/exercises'
}

class Adder:
    def __init__(self, object_type, suggestion = True, sources = []):
        self.sources = []
        self.object_type = object_type
        self.suggestion = suggestion
    
    def add_source_from_argv(self):
        """
            Add some file passed as argument in the sources
        """
        if(len(sys.argv) < 2):
            raise Exception("You need to pass at least one file as argument")
        for source in sys.argv[1:]:
            self.sources.append(source)

    def parse_sql(self, file_instance):
        models = []
        data = file_instance.read()

        fields_in_order = OBJECTS_FIELDS_BY_FILE_TYPE[self.object_type]['sql']

        if(self.object_type == 'exercises'):
            #Remove the first query and leave just the 
            lines = re.findall('\((\".*\")\)', data)
            for line in lines:
                new_exercise = dict()
                values = re.findall('\"([^\"]*)\"', line)
                for i, value in enumerate(values):
                    if i >= len(fields_in_order):
                        break
                    related_field = fields_in_order[i]
                    if related_field == None:
                        continue
                    new_exercise[related_field] = value
                models.append(new_exercise)
        return models
            

    def parse(self, file_instance):
        """
            Parse the data in the file 
        """
        extention = file_instance.name.split('.')[-1]
        if(extention.lower() == 'sql'):
            return self.parse_sql(file_instance)
           

    def send_data(self):
        for source in self.sources:
            with open(source, 'r') as f:
                models = self.parse(f)
            self.save(models)

    def save(self, models):
        url = URL_BY_OBJECT[self.object_type]
        final_data = {'items':[]}
        for model in models:
            model['suggested']=self.suggestion
            final_data['items'].append(model)
        model_json = json.dumps(final_data, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(url, model_json, {'Content-Type': 'application/json'})
        resp = urllib.request.urlopen(req)
        print(resp.read())

if __name__ == "__main__":
    adder = Adder('exercises')
    adder.add_source_from_argv()
    adder.send_data()