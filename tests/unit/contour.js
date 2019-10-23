import Point from '../../src/point';
import Contour from '../../src/contour';

describe('contour model', () => {

  describe('initialize', () => {

    it('should equal the default values on init', () => {
      var c = new Contour();

      expect(c.id()).to.be.equal('');
      expect(c.closed()).to.be.equal(true);
      expect(c.name()).to.be.equal('');
    });

    it('should set name with one arguments on constructor', () => {
      var c = new Contour('ShortHandInitName');

      expect(c.name()).to.be.equal('ShortHandInitName');
    });

    it('should set all attributes when constructed with an object', () => {
      var c = new Contour({
        id:      'testid',
        closed:  false,
        name:    'TestContour'
      });

      expect(c.id()).to.be.equal('testid');
      expect(c.closed()).to.be.equal(false);
      expect(c.name()).to.be.equal('TestContour');
    });
  });

  describe('set & get', () => {
    it('should set all attributes by separate functions', () => {
      var c = new Contour();

      c.id('kä@k');
      c.closed(true);
      c.name('test');

      expect(c.id()).to.be.equal('kä@k');
      expect(c.closed()).to.be.equal(true);
      expect(c.name()).to.be.equal('test');
      // expect(p.print()).to.be.equal('name: test\ntype: line\nx: 2\ny: 3\nsmooth: true\nid: kä@k');
    });
  });

  describe('child handling', () => {
    it('should append point to contour', () => {
      var c = new Contour();
      var p = new Point();

      expect(c.points.length()).to.be.equal(0);
      c.points.append(p);
      expect(c.points.length()).to.be.equal(1);
    });

    it('should read last point of contour', () => {
      var c = new Contour();
      var p = new Point(10,20);
      c.points.append(p);

      expect(c.points.last().x()).to.be.equal(10);
      expect(c.points.last().y()).to.be.equal(20);
    });
    it('should read point by index', () => {
      var c = new Contour();
      var p1 = new Point(10,20);
      var p2 = new Point(15,25);
      c.points.append(p1);
      c.points.append(p2);

      expect(c.points.get(0).x()).to.be.equal(10);
      expect(c.points.get(0).y()).to.be.equal(20);
      expect(c.points.get(1).x()).to.be.equal(15);
      expect(c.points.get(1).y()).to.be.equal(25);
    });
  });

  describe('transformations', () => {
    it('should set scale a point', () => {
      var c = new Contour();
      var p = new Point(2,3);

      c.points.append(p);
      c.scale(2);

      expect(c.points.last().x()).to.be.equal(4);
      expect(c.points.last().y()).to.be.equal(6);

    });
    it('should move a point', () => {
      var c = new Contour();
      var p = new Point(2,3);

      c.points.append(p);
      c.move(2,2);

      expect(c.points.last().x()).to.be.equal(4);
      expect(c.points.last().y()).to.be.equal(5);

    });
  });

  describe('events', () => {
    it('should clone a contour', () => {

      var c = new Contour();
      var p = new Point(2,3);
      c.points.append(p);

      c.id('kä@k');
      c.closed(true);
      c.name('test');

      var c2 = c.clone();

      expect(c.id()).to.be.equal(c2.id());
      expect(c.closed()).to.be.equal(c2.closed());
      expect(c.name()).to.be.equal(c2.name());
      expect(c.points.length()).to.be.equal(c2.points.length());
    });
  });

});
