module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/my-inventory-hub'),
      subdir: '.',
      reporters: [
        { type: 'html' },       // Reporte en formato HTML
        { type: 'lcovonly' },   // Reporte en formato lcov (lcov.info)
        { type: 'text-summary' } // Resumen de la cobertura en consola
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};