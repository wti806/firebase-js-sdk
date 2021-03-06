/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const gulp = require('gulp');
const tools = require('../../tools/build');

function copyProtos(dest) {
  return function copyProtos() {
    return gulp
      .src([__dirname + '/src/protos/**/*.proto'])
      .pipe(gulp.dest(dest));
  };
}

const buildModule = gulp.parallel([
  tools.buildCjs(__dirname),
  copyProtos('dist/cjs/src/protos'),
  tools.buildEsm(__dirname),
  copyProtos('dist/esm/src/protos')
]);

const setupWatcher = () => {
  gulp.watch('src/**/*', buildModule);
};

gulp.task('build', buildModule);

gulp.task('dev', gulp.parallel([setupWatcher]));
