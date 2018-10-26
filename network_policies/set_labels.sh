#!/bin/bash
oc label pod nodejs-manager-1-v47dw "podType=app"
oc label pod nodejs-database-2-cflt9 "podType=core-service"
oc label pod nodejs-manager-1-v47dw "primerNombre=eustaquio"
oc label pod nodejs-database-2-cflt9 "primerNombre=eustaquio"
