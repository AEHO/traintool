#!/bin/sh

# Executes the tests

ROOTDIR=$(pwd)

echo Activating virtualenv

. $ROOTDIR/.env/bin/activate

echo Running src tests

nosetests $ROOTDIR/tests -q

deactivate