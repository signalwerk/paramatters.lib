import { dependency } from "./dependency";

class Paramatters {
  render(n) {
    return `${dependency()} + ${n}`;
  }
}

export default Paramatters;
