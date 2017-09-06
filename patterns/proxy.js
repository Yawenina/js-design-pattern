function proxy(fn, wait) {
  let timerId,
    lastInvokeTime = 0,
    args,
    context;
  const execute = function() {
    fn.apply(context, args);
    lastInvokeTime = Date.now();
  };
  return function() {
    const now = Date.now();
    context = this;
    args = arguments;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    const timeSinceLastInvoke = now - lastInvokeTime;
    const diff = wait - timeSinceLastInvoke < 0 ? wait : wait - timeSinceLastInvoke;

    timerId = setTimeout(() => {
      execute();
    }, diff);
  };
}
