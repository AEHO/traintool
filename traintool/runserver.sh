#!/bin/sh

# Runs the server locally opened with host 0.0.0.0

ROOTDIR=$( cd $(dirname $0) && pwd )
WIFIIP=$(ip addr | awk '/inet/ && /wlan0/{sub(/\/.*$/,"",$2); print $2}')

echo Activating virtualenv

. $ROOTDIR/.env/bin/activate

echo Initializing local server
echo ---
echo Will run on: $WIFIIP:8000
echo ---

$ROOTDIR/lib/google_appengine/dev_appserver.py src/  --host=0.0.0.0