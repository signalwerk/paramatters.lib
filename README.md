# ⚠️👷‍♂️ This is work in progress… please don't use
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
* [New Spline Methode](https://github.com/raphlinus/spline-research)
* [flatten-quadbez](https://raphlinus.github.io/graphics/curves/2019/12/23/flatten-quadbez.html)
* [simple-math-ast](https://github.com/Flyr1Q/simple-math-ast)
* [Offsetting parameterised Bezier curves](https://github.com/simoncozens/curve-offsetting) → see also bezier.js
* [Curve Harmonization](https://github.com/simoncozens/SuperTool)
* [woff2 parser](https://github.com/Pomax/Font.js/blob/44c95880b5876e1a95ce59ed1aea21ddbc12f437/src/opentype/woff2.js)
* [Font-Parser](https://github.com/yWorks/jsPDF/blob/master/src/libs/ttffont.js)
* type check with [superstruct](https://github.com/ianstormtaylor/superstruct)
* save like [jaysn](https://github.com/lowsprofile/jaysn)
* [Interpolation Weights](https://github.com/jpt/font-scripts/blob/master/Glyphs/Family%20Weights%20Calculator.py#L167-L177)
* [Visual indication of points](https://2019.kerning.it/img/2019/ws/maag/maag-1.jpg)
* [Artistic Construction](https://markareynolds.com/7/)

## Thanks
* [Lib-Starter](https://github.com/w8r/rollup-buble-mocha-boilerplate)

## License
MIT
