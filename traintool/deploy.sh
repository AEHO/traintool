#!/bin/bash

# Deploys the application to a particular account given an email
# provided.

ROOTDIR=$(pwd)
cd $ROOTDIR/lib/google_appengine/
./appcfg.py $* update $ROOTDIR/src
