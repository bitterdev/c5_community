/**
 * Project:     c5 community
 *
 * @copyright 2018 Fabian Bitter
 * 
 * @author Adrian Tillmann Geist (a.t.geist@gmx.de)
 * @author Fabian Bitter (fabian@bitter.de)
 * 
 * @version 1.0.0
 */

module.exports = function(grunt) {
  grunt.initConfig({
    "phonegap-build": {
      release: {
        options: {
          archive: "app.zip",
          "appId": grunt.option("appid"),
          "user": {
            "token": grunt.option("authtoken")
          }
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'app.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: '/'
        }]
      }
    },
    copy: {
      main: {
        files: [{
            src: ['config.xml', 'google-services.json', 'GoogleService-Info.plist'],
            dest: 'dist/',
            filter: 'isFile'
          },
          {
            dest: 'dist/',
            expand: true,
            cwd: 'www',
            src: '**'
          },
          {
            src: ['resources/**'],
            dest: 'dist/'
          }
        ]
      }
    },
    clean: ['dist/', 'app.zip']
  });

  grunt.task.registerTask('updateConfigFile', 'A task for updating the config file.', function() {
    var configFile = "dist/config.xml";
    var fileContents = grunt.file.read(configFile);

    fileContents = fileContents.replace(new RegExp(/xmlns:cdv="(.*)"/g, "mg"), "xmlns:gap=\"http://phonegap.com/ns/1.0\" versionCode=\"1\"");
    //fileContents = fileContents.replace(new RegExp(/spec="([^http].*)"/g, "mg"), "source=\"npm\"");
    fileContents = fileContents.replace("<allow-navigation href=\"*\" />", "<allow-navigation href=\"*\" />\n<plugin name=\"cordova-plugin-fcm-config\" spec=\"https://bitbucket.org/fabianbitter/c5_community_fcm_config\" source=\"git\" />");
    grunt.file.write(configFile, fileContents);
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-phonegap-build');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('deploy', [
    "clean",
    "copy",
    "updateConfigFile",
    "compress",
    "phonegap-build:release",
    "clean"
  ]);
};