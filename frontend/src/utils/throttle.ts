// https://remysharp.com/2010/07/21/throttling-function-calls
export default function throttle(fn: any, threshhold: any, scope?: any) {
  threshhold || (threshhold = 250);
  var last: any, deferTimer: any;
  return function() {
    var context: Window | any = scope || window; // this was actually "this"

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
