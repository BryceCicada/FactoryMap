module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            jenkins: {
                options: {
                    reporter: require('jshint-jenkins-checkstyle-reporter'),
                    reporterOutput: 'artifacts/checkstyle/report-jshint-checkstyle.xml',
                    force: true
                },
                src: [ "<%= jshint.all %>" ]

            }
        },

        clean: ['artifacts']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');


};
