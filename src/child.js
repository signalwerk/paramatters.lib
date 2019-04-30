// import _ from 'lodash';
import { List } from "immutable";
import log from "./log";

class Child {
  constructor(props) {
    this.props = props;
    // this.children = List();
  }

  get() {
    return this.props.getter().map(item => {
      return this.props.create(item);
    });
  }

  push(point) {
    const contourStore = this.props.parent().store.merge(point.store);

    point.setStore(contourStore);

    point.store.register(point.id(), () => {
      this.props.parent().reload();
    });

    contourStore.contours.reducer("CONTOUR_PUSH_POINT", {
      id: this.props.parent().data.get("id"),
      pointId: point.id()
    });
  }

  // constructor(parent, id) {
  //   this.parent = parent || null;
  //   this.childID = id || '';
  //
  //   this._children = [];
  // }
  //
  // append(element) {
  //
  //   if (_.isArray(element)) {
  //     this._children.push.apply(this._children, element); // to work also with an array
  //   } else {
  //     this._children.push(element);
  //   }
  //
  //   return this.parent;
  // }
  //
  // empty() {
  //   this._children = [];
  // }
  //
  // length() {
  //   return this._children.length;
  // }
  //
  // last() {
  //   return this.get(this.length() - 1);
  // }
  //
  // get first() {
  //   return this.get(0);
  // }
  //
  // forEach(callback) {
  //   this._children.forEach(callback);
  // }
  //
  // map(callback) {
  //   return this._children.map(callback);
  // }
  //
  // // http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
  // move(from, to) {
  //   this._children.splice(to, 0, this._children.splice(from, 1)[0]);
  // }
  //
  // insertAt(index, item) {
  //   this._children.splice(index, 0, item);
  // }
  //
  // get(index) {
  //
  //   // get by name or by intex number
  //   if (_.isNumber(index)) {
  //     return this._children[index];
  //   } else {
  //
  //     var getByName = this._children.filter(
  //
  //       function(element) {
  //         if (element.name() == index) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       }
  //     );
  //
  //     if (getByName.length === 0) {
  //       return false;
  //     } else {
  //       return getByName[0];
  //     }
  //   }
  // }
}

export default Child;
