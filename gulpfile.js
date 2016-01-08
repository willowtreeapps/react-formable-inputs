const gulp = require('gulp');
const initGulpTasks = require('react-component-gulp-tasks');

initGulpTasks(gulp, {
    component: {
        name: 'react-formable-inputs',
        dependencies: [
            'react',
            'react-dom'
        ],
        lib: 'lib'
    },

    example: {
        src: 'example/src',
        dist: 'example/dist',
        port: 8800,
        files: [
            'index.html',
            '.gitignore',
            'imgs/*'
        ],
        scripts: [
            'app.js'
        ],
        less: [
            'app.less'
        ]
    }
});
