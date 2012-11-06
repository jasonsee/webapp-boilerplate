#WAT's webapp-boilerplate

##Overview

The webapp-boilerplate is a collection of configuration files and organization
conventions designed to ease the process of bootstrapping new javascript heavy
web applications at WTA. It uses [grunt](http://gruntjs.com) as a build tool
and [compass](http://compass-style.org/) to generate CSS. Both tools require
some minimal setup.

##Installation

0. Clone this repo and point it at a new git repository for your project.

1. Install [node](http://nodejs.org/). If you're on OSX, there's a handy pkg
   installer available on the node homepage. This is the recommended method of
   installation.

2. Install compass. Compass is available as a ruby gem. You should be able to
   do `gem install compass`, though you might use `sudo` depending on your gem
   setup.

3. Install the grunt CLI as a global node package. `npm install -g grunt-cli`

4. Install the dependencies for your project. From the root of this repo, run
   `npm install`. This will read the packages.json file and install packages
   into `./node_modules`.

5. Start the development server with `grunt serve`.
