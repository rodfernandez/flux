export default function (target, name, descriptor) {

  let {value} = descriptor;
  let tag = `${target.constructor.name}.${name}`;
  let before = `${tag}:before`;
  let after = `${tag}:after`;

  descriptor.value = function () {
    performance.mark(before);
    let result = value.call(this, ...arguments);
    performance.mark(after);
    performance.measure(tag, before, after);
    return result;
  };

};
