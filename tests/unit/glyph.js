import Glyph from '../../src/glyph';
import Contour from '../../src/contour';
import Point from '../../src/point';
import Anchor from '../../src/anchor';

describe('glyph model', () => {

  describe('initialize', () => {

    it('should equal the default values on init', () => {
      var g = new Glyph();

      expect(g.id()).to.be.equal('');
      expect(g.unicode()).to.be.equal(0);
      expect(g.width()).to.be.equal(0);
      expect(g.height()).to.be.equal(0);
      expect(g.name()).to.be.equal('');
    });

    it('should set name with one arguments on constructor', () => {
      var g = new Glyph('ShortHandInitName');

      expect(g.name()).to.be.equal('ShortHandInitName');
    });

    it('should set all attributes when constructed with an object', () => {
      var g = new Glyph({
        id: 'testid',
        unicode: 20,
        width: 300,
        height: 100,
        name: 'TestGlyph'
      });

      expect(g.id()).to.be.equal('testid');
      expect(g.unicode()).to.be.equal(20);
      expect(g.width()).to.be.equal(300);
      expect(g.height()).to.be.equal(100);
      expect(g.name()).to.be.equal('TestGlyph');
    });
  });

  describe('set & get', () => {
    it('should set all attributes by separate functions', () => {
      var g = new Glyph();

      g.id('testid');
      g.unicode(21);
      g.width(301);
      g.height(101);
      g.name('test');

      expect(g.id()).to.be.equal('testid');
      expect(g.unicode()).to.be.equal(21);
      expect(g.width()).to.be.equal(301);
      expect(g.height()).to.be.equal(101);
      expect(g.name()).to.be.equal('test');
    });
  });

  describe('unicode handling', () => {
    it('should set unicode according to a string', () => {
      var g = new Glyph();
      g.unicode('A');
      expect(g.unicode()).to.be.equal(65);
    });
  });

  describe('child handling', () => {

    var contour = null;

    before(function() {

      contour = new Contour();
      contour.name('rect');

      var p1 = new Point();
      p1.x(1);
      p1.y(10);
      p1.name('point 1');

      var p2 = new Point();
      p2.x(2);
      p2.y(20);
      p2.name('point 2');

      var p3 = new Point();
      p3.x(3);
      p3.y(30);
      p3.name('point 3');

      var p4 = new Point();
      p4.x(4);
      p4.y(40);
      p4.name('point 4');

      contour.points.append(p1);
      contour.points.append(p2);
      contour.points.append(p3);
      contour.points.append(p4);

    });

    describe('anchor handling', () => {

      it('should append anchor to glpyh', () => {
        var g = new Glyph();
        var a = new Anchor(10,20);

        expect(g.anchors.length()).to.be.equal(0);
        g.anchors.append(a);
        expect(g.anchors.length()).to.be.equal(1);
      });

      it('should read last anochr of glpyh', () => {
        var g = new Glyph();
        var a = new Anchor(10,20);
        g.anchors.append(a);

        expect(g.anchors.last().x()).to.be.equal(10);
        expect(g.anchors.last().y()).to.be.equal(20);
      });

      it('should read contour by index', () => {
        var g = new Glyph();
        var a = new Anchor(10,20);
        g.anchors.append(a);

        expect(g.anchors.get(0).x()).to.be.equal(10);
        expect(g.anchors.get(0).y()).to.be.equal(20);
      });
    });

    describe('contour handling', () => {

      it('should append contour to glpyh', () => {
        var g = new Glyph();

        expect(g.contours.length()).to.be.equal(0);
        g.contours.append(contour.clone());
        expect(g.contours.length()).to.be.equal(1);
      });

      it('should read last contour of glpyh', () => {
        var g = new Glyph();
        g.contours.append(contour.clone());

        expect(g.contours.last().points.last().x()).to.be.equal(4);
        expect(g.contours.last().points.last().y()).to.be.equal(40);
      });

      it('should read contour by index', () => {
        var g = new Glyph();
        g.contours.append(contour.clone());

        expect(g.contours.get(0).points.last().x()).to.be.equal(4);
        expect(g.contours.get(0).points.last().y()).to.be.equal(40);
      });
    });

    describe('transformations', () => {
      it('should set scale a glyph', () => {
        var g = new Glyph();
        g.contours.append(contour.clone());

        g.scale(2);

        expect(g.contours.last().points.last().x()).to.be.equal(8);
        expect(g.contours.last().points.last().y()).to.be.equal(80);
      });
      it('should move a point', () => {
        var g = new Glyph();
        g.contours.append(contour.clone());

        g.move(2, 2);

        expect(g.contours.get(0).points.last().x()).to.be.equal(6);
        expect(g.contours.get(0).points.last().y()).to.be.equal(42);

      });
    });

    describe('events', () => {
      it('should clone a glyph', () => {

        var g = new Glyph();
        var c = contour.clone();

        c.id('kä@k');
        c.closed(true);
        c.name('test');

        g.contours.append(c);

        var a1 = new Anchor(10,20);
        var a2 = new Anchor(20,30);
        g.anchors.append(a1);
        g.anchors.append(a2);

        var g2 = g.clone();

        expect(g.id()).to.be.equal(g2.id());
        expect(g.unicode()).to.be.equal(g2.unicode());
        expect(g.width()).to.be.equal(g2.width());
        expect(g.height()).to.be.equal(g2.height());
        expect(g.name()).to.be.equal(g2.name());
        expect(g.contours.length()).to.be.equal(g2.contours.length());
        expect(g.anchors.length()).to.be.equal(g2.anchors.length());
      });
    });

  });

});
