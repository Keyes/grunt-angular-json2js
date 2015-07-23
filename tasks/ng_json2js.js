/*
 * grunt-ng-json2js
 * https://github.com/mbcooper/grunt-ng-json2js
 *
 * Copyright (c) 2014 mbcooper
 * Licensed under the MIT license.
 */

'use strict';

var MODULE_NAME = 'json2js';
var util = require('util');
var _ = require('lodash');

module.exports = function (grunt) {

    function requiredOptions(options, properties) {
        var pluralize = grunt.util.pluralize;
        var missing = properties.filter(function (key) {
            return !options[key];
        });
        if (!_.isEmpty(missing)) {
            throw grunt.util.error('Required option property' + pluralize(missing.length, 'y/ies') + ' ' + missing.join(', ') + ' is missing');
        }
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask(MODULE_NAME, 'Converts json to AngularJS modules for test fixtures', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            stripPrefix: '',
            prependPrefix: '',
            moduleName: 'json'
        });

        var TEMPLATE = 'angular.module(\'%s\', []).value(\'%s\', %s);\n';

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            _.each(f.src, function (sourceFile) {

                if (!grunt.file.exists(sourceFile)) {
                    grunt.log.warn('Source file "' + sourceFile + '" not found.');

                } else {
                    var src = grunt.file.read(sourceFile);
                    var jsonPath = sourceFile;

                    var moduleName = (options.stripPrefix) ?
                        jsonPath.replace(options.stripPrefix, '') :
                        jsonPath;

                    moduleName = options.moduleName;

                    var valueName = jsonPath.replace(/\.json$/, '');

                    valueName = (options.stripPrefix) ?
                        valueName.replace(options.stripPrefix, '') :
                        valueName;

                    valueName = valueName.replace(/(?:-|\/)([a-zA-Z0-9])/g, function (all, letter) {
                        return letter.toUpperCase();
                    });

                    var outputPath = jsonPath.replace(/\.json$/, '') + '.js';
                    var output = util.format(TEMPLATE, moduleName, valueName, src);

                    // delete destination if it exists
                    if (grunt.file.exists(outputPath)) {
                        grunt.file.delete(outputPath);
                    }
                    // Write the destination file.

                    grunt.file.write(outputPath, output);

                    // Print a success message.
                    grunt.log.writeln('File "' + outputPath + '" created.');
                }

            });

        });
    });

};
