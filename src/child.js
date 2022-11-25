import { isNumber } from "./util";

class Child {
  constructor(props) {
    this.props = props;
  }

  get store() {
    return this.props.parent.store;
  }

  get parent() {
    return this.props.parent;
  }

  get data() {
    return this.props.parent.data;
  }

  get(index) {
    const currentChildren = this.data.get(`${this.props.memeberType}s`);

    if (isNumber(index)) {
      return this.props.create(this.store.resolve(currentChildren.get(index)));
    }
    return currentChildren.map(item => {
      return this.props.create(this.store.resolve(item));
    });
  }

  last() {
    const all = this.props.getter();
    return this.props.create(this.store.resolve(all.get(all.size - 1)));
  }

  get size() {
    return this.props.getter().size;
  }

  push(item) {
    const itemId = item.id;

    item.register(() => this.parent.emit());

    this.store.points.reducer("POINT_ADD", item.store.points.get(itemId));

    this.store.contours.reducer("CONTOUR_PUSH_POINT", {
      id: this.parent.id,
      pointId: itemId
    });

    item.setStore(this.store);

    this.parent.update();

    return this;
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
}

export default Child;
