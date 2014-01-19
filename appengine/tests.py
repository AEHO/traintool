#! /usr/bin/env python

import argparse
import subprocess

TESTING_BASE = 'nosetests --with-gae '
TESTING_GAE_ROOT = '--gae-lib-root=%s '
TESTING_DOCTEST = '--with-doctest '
VERBOSE = '--verbose '



def main():
    parser = argparse.ArgumentParser(
        description='Runs all of the tests needed.')
    parser.add_argument('-dt', '--doctests',
        help="runs also with doctests", action='store_true')
    parser.add_argument('-glr', '--gae-lib-root',
        help="path to the GAE root")
    parser.add_argument('-ciro', action='store_true')
    parsed = parser.parse_args()


    if parsed.ciro:
        subprocess.call('nosetests --with-gae ' +\
            '--gae-lib-root=/home/ciro/dev/google_appengine --with-doctest ' +\
            '--verbose', shell=True)
        return

    TESTING_LINE = TESTING_BASE
    
    if parsed.gae_lib_root:
        TESTING_LINE += TESTING_GAE_ROOT % (parsed.gae_lib_root,)
    
    if parsed.doctests:
        TESTING_LINE += TESTING_DOCTEST    

    TESTING_LINE += VERBOSE

    print TESTING_LINE

    subprocess.call(TESTING_LINE, shell=True)


if __name__ == '__main__':
    main()
