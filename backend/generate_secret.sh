#!/bin/sh

node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"