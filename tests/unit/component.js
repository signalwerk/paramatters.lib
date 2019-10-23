import Glyph from '../../src/glyph';
import Contour from '../../src/contour';
import Point from '../../src/point';
import Component from '../../src/component';

describe('glyph model', () => {

  describe('initialize', () => {

    it('should equal the default values on init', () => {
      var c = new Component();

      expect(c.id()).to.be.equal('');
      expect(c.base()).to.be.equal(null);
      expect(c.xScale()).to.be.equal(1);
      expect(c.xyScale()).to.be.equal(1);
      expect(c.yxScale()).to.be.equal(1);
      expect(c.yScale()).to.be.equal(1);
      expect(c.xOffset()).to.be.equal(0);
      expect(c.yOffset()).to.be.equal(0);
      expect(c.name()).to.be.equal('');
    });

    it('should set name with one arguments on constructor', () => {
      var g = new Glyph('ShortHandInitName');
      var c = new Component(g);

      expect(c.base().name()).to.be.equal('ShortHandInitName');
    });

    it('should set all attributes when constructed with an object', () => {
      var g = new Glyph('ShortHandInitName');
      var c = new Component({
        id: 'testid',
        base: g,
        xScale: 2,
        xyScale: 3,
        yxScale: 4,
        yScale: 5,
        xOffset: 6,
        yOffset: 7,
        name: 'TestComponent'
      });

      expect(c.id()).to.be.equal('testid');
      expect(c.base().name()).to.be.equal('ShortHandInitName');
      expect(c.xScale()).to.be.equal(2);
      expect(c.xyScale()).to.be.equal(3);
      expect(c.yxScale()).to.be.equal(4);
      expect(c.yScale()).to.be.equal(5);
      expect(c.xOffset()).to.be.equal(6);
      expect(c.yOffset()).to.be.equal(7);
      expect(c.name()).to.be.equal('TestComponent');
    });
  });

  describe('set & get', () => {
    it('should set all attributes by separate functions', () => {

      var g = new Glyph('ShortHandInitName');
      var c = new Component();

      c.id('testid');
      c.base(g);
      c.xScale(2);
      c.xyScale(3);
      c.yxScale(4);
      c.yScale(5);
      c.xOffset(6);
      c.yOffset(7);
      c.name('TestComponent');

      expect(c.id()).to.be.equal('testid');
      expect(c.base().name()).to.be.equal('ShortHandInitName');
      expect(c.xScale()).to.be.equal(2);
      expect(c.xyScale()).to.be.equal(3);
      expect(c.yxScale()).to.be.equal(4);
      expect(c.yScale()).to.be.equal(5);
      expect(c.xOffset()).to.be.equal(6);
      expect(c.yOffset()).to.be.equal(7);
      expect(c.name()).to.be.equal('TestComponent');
    });
  });

  describe('events', () => {
    it('should clone a component', () => {

      var g = new Glyph('ShortHandInitName');
      var c = new Component({
        id: 'testid',
        base: g,
        xScale: 2,
        xyScale: 3,
        yxScale: 4,
        yScale: 5,
        xOffset: 6,
        yOffset: 7,
        name: 'TestComponent'
      });

      var c2 = c.clone();

      expect(c.id()).to.be.equal(c2.id());
      expect(c.base().name()).to.be.equal(c2.base().name());
      expect(c.base()).to.be.equal(c2.base());
      expect(c.xScale()).to.be.equal(c2.xScale());
      expect(c.xyScale()).to.be.equal(c2.xyScale());
      expect(c.yxScale()).to.be.equal(c2.yxScale());
      expect(c.yScale()).to.be.equal(c2.yScale());
      expect(c.xOffset()).to.be.equal(c2.xOffset());
      expect(c.yOffset()).to.be.equal(c2.yOffset());
      expect(c.name()).to.be.equal(c2.name());
    });
  });

});
