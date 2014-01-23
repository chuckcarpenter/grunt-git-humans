/*
 * grunt-git-humans
 * https://github.com/chuckcarpenter/grunt-git-humans
 *
 * Copyright (c) 2013 Chuck Carpenter
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('git_humans', 'Get your project contributors and make a humans text file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        punctuation: '.',
        separator: ', '
    }),
        path = require('path'),
        cwd = process.cwd(),
        opts = grunt.util._.extend({
          path: './AUTHORS',
          branch: 'master',
          byCommits: false,
          chronologically: false
        },this.data),
        done = this.async();
        // createList = require('./lib/helper').createList;
        
    function writeFile (error, result, code) {
      if (error) {
        grunt.log.error('Please make sure you have \'git-extras\' installed on your system.');
      } else {
        grunt.log.write('Writing to ' + opts.path + ' ... ');
        if ( !!opts.byCommits ) {
            grunt.file.write(path.join(cwd, opts.path), result.stdout);
        } else {
            grunt.file.write(path.join(cwd, opts.path), createList(result.stdout, opts.chronologically));
        }
        grunt.log.ok();
      }
      done(code === 0);
    }

    function createList (stdout, chronologically) {
      var log = stdout.split('\n'),
          authors = [];
      for (var i=0; i<log.length; i++) {
        if (log[i].match(/Author:/)) {
          authors.push(log[i].split(/Author:\s/)[1]);
        }
      }
      if (chronologically) {
        return _.unique(authors.reverse()).join('\n');
      } else {
        return _.unique(authors.sort()).join('\n');
      }
    }

    var outputList = function() {
      var args = ( !!opts.byCommits ) ? ['shortlog', '-nse', 'HEAD'] : ['--git-dir', path.join(cwd, '.git'), '--no-pager', 'log'];
      grunt.util.spawn({
        cmd: 'git',
        args: args
      }, writeFile);
    };

    if (!!opts.branch)
    {
      outputList();
    } else {
      grunt.util.spawn({
        cmd: 'git',
        args: ['--git-dir', path.join(cwd, '.git'), 'branch']},
        function (error, result) {
          if (error) {
            grunt.log.error('Couldn\'t read current branch.');
          } else {
            var branches = result.stdout.split('\n');
            for (var i=0; i<branches.length; i++) {
              var branch = branches[i].match(/^\*\s.+/);
              if (branch) {
                var currentBranch = branch[0].split(/\*\s/)[1];
                if (!branch || opts.branch === currentBranch) {
                  outputList();
                } else {
                  grunt.log.ok('Nothing to do.');
                  done();
                }
              }
            }
          }
        }
      );
    }
   

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};

// grunt.registerMultiTask( 'humans_txt', 'Generate information about people behind the website', function( ) {

//         var options = this.options( {
//                 includeUpdateIn: false,
//                 commentStyle: 'c',
//                 tab: '\t',
//                 intro: 'The humans responsible & colophon'
//             } ),
//             dest;

//         if ( this.files.length > 1 ) {
//             grunt.verbose.warn('Destination not written because too many destinations were provided.');
//         }
//         if ( this.files.length < 1 || !this.files[0].dest) {
//             grunt.verbose.warn('Destination not written because no destination was provided.');
//         } else {
//             dest = this.files[0].dest;
//         }

//         if ( !options.content ) {
//             grunt.verbose.warn('Destination not written because no content was provided.');
//         }

//         var formatKey = function ( str ) {
//             return str.replace( /\w\S*/g, function( txt ) {

//                 return txt.charAt( 0 ).toUpperCase( ) + txt.substr( 1 ).toLowerCase( ).replace( '_', ' ' );

//             } );
//         },
//         writeLastUpdate = function ( ) {
//             var date = new Date( ),
//                 day = date.getDate(),
//                 month = date.getMonth() + 1,
//                 year = date.getFullYear();
//             return "Last update: " + year + "/" + month + "/" + day + '\n';
//         },
//         writeComment,
//         contents = '';

//         switch ( options.commentStyle ) {
//             case 'c':
//                 writeComment = function ( str ) {
//                     return '/* ' + str + ' */\n';
//                 };
//                 break;
//             case 'u':
//                 writeComment = function ( str ) {
//                     return '# ' + str + '\n';
//                 };
//                 break;
//             case 'p':
//                 writeComment = function ( str ) {
//                     return '// ' + str + '\n';
//                 };
//                 break;
//             default:
//                 grunt.log.error('Unknown comment style value.');
//         }

//         // Start creation of CACHE MANIFEST
//         if ( options.intro ) {
//           contents += writeComment( options.intro );
//         }

//         contents += writeComment( 'humanstxt.org' );


//         for ( var section in options.content ) {
//             contents += '\n';

//             contents += writeComment( section.toUpperCase() );

//             // Optional update ( can be overriden with option value )
//             if ( options.includeUpdateIn &&
//                   typeof options.includeUpdateIn === 'string' &&
//                   section.toLowerCase() === options.includeUpdateIn.toLowerCase() ) {
//                 contents += options.tab + writeLastUpdate();
//             }

//             var sectionDetails = options.content[ section ];

//             if ( typeof sectionDetails === 'string' ) {
//                 sectionDetails = [ ].concat( sectionDetails );
//             }

//             for ( var i = 0; i < sectionDetails.length; i++ ) {

//                 if ( typeof sectionDetails[ i ] === 'string' ) {
//                     contents += options.tab + sectionDetails[ i ] + '\n';
//                 } else {

//                     for ( var keyTech in sectionDetails[ i ] ) {
//                         var objTech = sectionDetails[ i ][ keyTech ];
//                         contents += options.tab + formatKey(keyTech) + ": " + objTech + '\n';
//                     }

//                     if (i !== sectionDetails.length - 1) {
//                       contents += '\n';
//                     }
//                 }
//             }
//         }

//         grunt.file.write( dest, contents );

//         grunt.log.writeln( 'File "' + dest + '" created.' );


//     } );

// };

// grunt.registerMultiTask('contributors', 'Generate a list of contributors from your project\'s git history.', function () {
  //   var path = require('path'),
  //       cwd = process.cwd(),
  //       opts = grunt.util._.extend({
  //         path: './AUTHORS',
  //         branch: 'master',
  //         byCommits: false,
  //         chronologically: false
  //       },this.data),
  //       done = this.async(),
  //       createList = require('./lib/helper').createList;

  //   function writeFile (error, result, code) {
  //     if (error) {
  //       grunt.log.error('Please make sure you have \'git-extras\' installed on your system.');
  //     } else {
  //       grunt.log.write('Writing to ' + opts.path + ' ... ');
  //       if ( !!opts.byCommits ) {
  //           grunt.file.write(path.join(cwd, opts.path), result.stdout);
  //       } else {
  //           grunt.file.write(path.join(cwd, opts.path), createList(result.stdout, opts.chronologically));
  //       }
  //       grunt.log.ok();
  //     }
  //     done(code === 0);
  //   }

  //   var outputList = function() {
  //     var args = ( !!opts.byCommits ) ? ['shortlog', '-nse', 'HEAD'] : ['--git-dir', path.join(cwd, '.git'), '--no-pager', 'log'];
  //     grunt.util.spawn({
  //       cmd: 'git',
  //       args: args
  //     }, writeFile);
  //   };

  //   if (opts.branch === true)
  //   {
  //     outputList();
  //   } else {
  //     grunt.util.spawn({
  //       cmd: 'git',
  //       args: ['--git-dir', path.join(cwd, '.git'), 'branch']},
  //       function (error, result) {
  //         if (error) {
  //           grunt.log.error('Couldn\'t read current branch.');
  //         } else {
  //           var branches = result.stdout.split('\n');
  //           for (var i=0; i<branches.length; i++) {
  //             var branch = branches[i].match(/^\*\s.+/);
  //             if (branch) {
  //               var currentBranch = branch[0].split(/\*\s/)[1];
  //               if (!branch || opts.branch === currentBranch) {
  //                 outputList();
  //               } else {
  //                 grunt.log.ok('Nothing to do.');
  //                 done();
  //               }
  //             }
  //           }
  //         }
  //       }
  //     );
  //   }
  // });

// };
