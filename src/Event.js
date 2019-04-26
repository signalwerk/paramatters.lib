// import Child from './child.js';

class fEvent {

  constructor() {
    this._events = {};
  }

  // from here: http://notes.jetienne.com/2011/03/22/microeventjs.html
  // maybe replace with: https://github.com/allouis/minivents/
  on(event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  }

  off(event, fct) {
    this._events = this._events || {};
    if (event in this._events === false) {
      return;
    }
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  }

  emit(event) {
    this._events = this._events || {};
    if (event in this._events === false) {
      return;
    }
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }

}

export default fEvent;
