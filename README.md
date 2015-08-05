# grunt-angular-json2js

>Grunt task for converting JSON files to [AngularJS](http://angularjs.org/) values.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-json2js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-json2js');
```

## The "json2js" task

### Overview
In your project's Gruntfile, add a section named `json2js` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json2js: {
    options: {
            // strip this from the file path
             stripPrefix: 'test/fixture/',

             // prepend this to the
             prependPrefix: 'served/',
             
             // set a modul name, 'json' is default
             modulName: 'json'
    },
    files: [
        '/testData/**/*.json'
    ],
  },
});
```


## Examples
For instance this `test/fixture/data.json`  ...
```json
{
    prop: val
}
```
... with the configuration given above will be converted into:
```js
angular.module('json', []).value('test/fixture/data.json', {
    prop: 'val'
});
```
Inject json fixture into your test case:
```js
describe('me', function(){
    beforeEach(module('json'));

    it('should not fail', function() {
        var testFixture;
        inject(function (_testFixtureDataJson_) {
            testFixture = _testFixtureDataJson_;
        });

        expect(testFixture).toEqual({
            prop: 'val'
        });
    });

});
```

----

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
