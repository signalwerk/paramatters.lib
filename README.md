## Scripts
* **npm run build** to run eslint and build the es6 and es5 umd versions of your lib into `dist`
* **npm test** to run tests
* **npm start** to watch `src` and `tests` and re-run tests

## Use localy
((this ist not recommended. it's just for developers working on the lib))

get Lib:
```sh
mkdir -p ./modules
git submodule add https://github.com/signalwerk/paramatters.lib.git "./modules/paramatters.lib"
```


`package.json`

```json
  ...
  "dependencies": {
    "paramatters.lib": "file:modules/paramatters.lib"
  }
  ...
```


## ToDo
* [simple-math-ast](https://github.com/Flyr1Q/simple-math-ast)
* [Font-Parser](https://github.com/yWorks/jsPDF/blob/master/src/libs/ttffont.js)
* type check with [superstruct](https://github.com/ianstormtaylor/superstruct)
* save like [jaysn](https://github.com/lowsprofile/jaysn)
* [Interpolation Weights](https://github.com/jpt/font-scripts/blob/master/Glyphs/Family%20Weights%20Calculator.py#L167-L177)
* [Visual indication of points](https://2019.kerning.it/img/2019/ws/maag/maag-1.jpg)

## Thanks
* [Lib-Starter](https://github.com/w8r/rollup-buble-mocha-boilerplate)

## License
MIT
