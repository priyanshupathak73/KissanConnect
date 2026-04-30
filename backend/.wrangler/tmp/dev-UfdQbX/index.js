var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-5h8BBh/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// ../node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err2) {
          if (err2 instanceof Error && onError) {
            context2.error = err2;
            res = await onError(err2, context2);
            isError = true;
          } else {
            throw err2;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// ../node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// ../node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// ../node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err2, c) => {
  if ("getResponse" in err2) {
    const res = err2.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err2);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err2, c) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c);
    }
    throw err2;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err2) {
        return this.#handleError(err2, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err2) => this.#handleError(err2, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err2) {
        return this.#handleError(err2, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// ../node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// ../node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// ../node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// ../node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// ../node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// ../node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// ../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// ../node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// src/utils/response.ts
function ok(data, status = 200) {
  return Response.json({ success: true, data }, { status });
}
__name(ok, "ok");
function err(message, status = 400, details) {
  return Response.json(
    { success: false, error: message, ...details ? { details } : {} },
    { status }
  );
}
__name(err, "err");
function unauthorized(msg = "Unauthorized") {
  return err(msg, 401);
}
__name(unauthorized, "unauthorized");
function forbidden(msg = "Forbidden") {
  return err(msg, 403);
}
__name(forbidden, "forbidden");
function notFound(msg = "Not found") {
  return err(msg, 404);
}
__name(notFound, "notFound");
function tooManyRequests(retryAfter) {
  const headers = {};
  if (retryAfter)
    headers["Retry-After"] = String(retryAfter);
  return new Response(
    JSON.stringify({ success: false, error: "Too many requests. Please slow down." }),
    { status: 429, headers: { "Content-Type": "application/json", ...headers } }
  );
}
__name(tooManyRequests, "tooManyRequests");

// src/middleware/rateLimit.ts
var ROUTE_CONFIGS = {
  "POST /api/order": { limit: 10, windowSecs: 60 },
  "POST /api/order/verify": { limit: 10, windowSecs: 60 },
  "POST /api/order/resend-otp": { limit: 5, windowSecs: 60 },
  "GET /api/catalog": { limit: 120, windowSecs: 60 },
  "GET /api/catalog/:id": { limit: 120, windowSecs: 60 },
  "GET /api/track/:ref": { limit: 30, windowSecs: 60 },
  "DEFAULT": { limit: 60, windowSecs: 60 }
};
function getRouteKey(method, path) {
  const normalized = path.replace(/\/api\/catalog\/\d+/, "/api/catalog/:id").replace(/\/api\/track\/[\w-]+/, "/api/track/:ref");
  const key = `${method} ${normalized}`;
  return ROUTE_CONFIGS[key] ? key : "DEFAULT";
}
__name(getRouteKey, "getRouteKey");
async function rateLimitMiddleware(c, next) {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ?? "unknown";
  const routeKey = getRouteKey(c.req.method, c.req.path);
  const config2 = ROUTE_CONFIGS[routeKey] ?? ROUTE_CONFIGS["DEFAULT"];
  const kvKey2 = `rl:${routeKey.replace(/\s+/g, ":")}:${ip}`;
  const now = Date.now();
  const windowMs = config2.windowSecs * 1e3;
  const raw2 = await c.env.STORE_KV.get(kvKey2);
  let data = raw2 ? JSON.parse(raw2) : { count: 0, windowStart: now };
  if (now - data.windowStart >= windowMs) {
    data = { count: 0, windowStart: now };
  }
  data.count += 1;
  await c.env.STORE_KV.put(kvKey2, JSON.stringify(data), {
    expirationTtl: config2.windowSecs + 5
  });
  const remaining = Math.max(0, config2.limit - data.count);
  const resetAt = Math.ceil((data.windowStart + windowMs) / 1e3);
  c.header("X-RateLimit-Limit", String(config2.limit));
  c.header("X-RateLimit-Remaining", String(remaining));
  c.header("X-RateLimit-Reset", String(resetAt));
  if (data.count > config2.limit) {
    const retryAfter = Math.ceil((data.windowStart + windowMs - now) / 1e3);
    return tooManyRequests(retryAfter);
  }
  return next();
}
__name(rateLimitMiddleware, "rateLimitMiddleware");

// src/middleware/auth.ts
async function requireAdmin(c, next) {
  const apiKey = c.req.header("X-API-Key") ?? c.req.header("Authorization")?.replace("Bearer ", "");
  if (!apiKey || apiKey !== c.env.ADMIN_API_KEY) {
    return unauthorized("Admin API key required");
  }
  c.set("auth", { isAdmin: true, isFarmer: false, farmerId: null, adminEmail: "admin", sessionId: null });
  return next();
}
__name(requireAdmin, "requireAdmin");
async function requireAuth(c, next) {
  const apiKey = c.req.header("X-API-Key");
  if (apiKey && apiKey === c.env.ADMIN_API_KEY) {
    c.set("auth", { isAdmin: true, isFarmer: true, farmerId: null, adminEmail: "admin", sessionId: null });
    return next();
  }
  const sessionId = c.req.header("X-Session-ID");
  if (!sessionId)
    return unauthorized("Authentication required");
  const raw2 = await c.env.STORE_KV.get(`session:${sessionId}`);
  if (!raw2)
    return unauthorized("Session expired or invalid");
  const session = JSON.parse(raw2);
  if (Date.now() > session.expiresAt) {
    await c.env.STORE_KV.delete(`session:${sessionId}`);
    return unauthorized("Session expired");
  }
  c.set("auth", {
    isAdmin: session.role === "admin",
    isFarmer: session.role === "farmer",
    farmerId: session.farmerId,
    adminEmail: session.adminEmail,
    sessionId
  });
  return next();
}
__name(requireAuth, "requireAuth");

// src/db/queries.ts
async function getProducts(db, opts = {}) {
  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];
  if (opts.activeOnly !== false) {
    sql += " AND active = 1";
  }
  if (opts.category) {
    sql += " AND category = ?";
    params.push(opts.category);
  }
  if (opts.search) {
    sql += " AND (name LIKE ? OR name_hi LIKE ? OR description LIKE ? OR farmer_name LIKE ?)";
    const q = `%${opts.search}%`;
    params.push(q, q, q, q);
  }
  sql += " ORDER BY is_featured DESC, rating DESC, name ASC";
  const stmt = db.prepare(sql);
  const res = await (params.length ? stmt.bind(...params) : stmt).all();
  return res.results;
}
__name(getProducts, "getProducts");
async function getProductById(db, id) {
  return db.prepare("SELECT * FROM products WHERE id = ?").bind(id).first();
}
__name(getProductById, "getProductById");
async function getProductBySku(db, sku) {
  return db.prepare("SELECT * FROM products WHERE sku = ?").bind(sku).first();
}
__name(getProductBySku, "getProductBySku");
async function getRelatedProducts(db, productId, category) {
  const res = await db.prepare("SELECT * FROM products WHERE category = ? AND id != ? AND active = 1 ORDER BY is_featured DESC LIMIT 6").bind(category, productId).all();
  return res.results;
}
__name(getRelatedProducts, "getRelatedProducts");
async function createProduct(db, p) {
  const result = await db.prepare(`
    INSERT INTO products (
      name, name_hi, sku, category, emoji, description, description_hi,
      price, cost_price, unit, stock_qty, min_qty, max_daily_qty,
      farmer_id, farmer_name, farmer_location, farmer_phone, farmer_email,
      is_organic, is_featured, active, rating, review_count
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    RETURNING id
  `).bind(
    p.name,
    p.name_hi,
    p.sku,
    p.category,
    p.emoji,
    p.description,
    p.description_hi,
    p.price,
    p.cost_price,
    p.unit,
    p.stock_qty,
    p.min_qty,
    p.max_daily_qty,
    p.farmer_id,
    p.farmer_name,
    p.farmer_location,
    p.farmer_phone,
    p.farmer_email,
    p.is_organic,
    p.is_featured,
    p.active,
    p.rating,
    p.review_count
  ).first();
  return result.id;
}
__name(createProduct, "createProduct");
async function updateProduct(db, id, fields) {
  const allowed = [
    "name",
    "name_hi",
    "price",
    "cost_price",
    "stock_qty",
    "min_qty",
    "max_daily_qty",
    "description",
    "description_hi",
    "emoji",
    "is_organic",
    "is_featured",
    "active",
    "farmer_name",
    "farmer_location",
    "farmer_phone",
    "farmer_email"
  ];
  const setClauses = [];
  const params = [];
  for (const key of allowed) {
    if (key in fields) {
      setClauses.push(`${key} = ?`);
      params.push(fields[key]);
    }
  }
  if (setClauses.length === 0)
    return false;
  setClauses.push("updated_at = datetime('now')");
  params.push(id);
  await db.prepare(`UPDATE products SET ${setClauses.join(", ")} WHERE id = ?`).bind(...params).run();
  return true;
}
__name(updateProduct, "updateProduct");
async function decrementStock(db, productId, quantity) {
  await db.prepare(`
    UPDATE products SET stock_qty = MAX(0, stock_qty - ?), updated_at = datetime('now')
    WHERE id = ?
  `).bind(quantity, productId).run();
}
__name(decrementStock, "decrementStock");
async function incrementStock(db, productId, quantity) {
  await db.prepare(`
    UPDATE products SET stock_qty = stock_qty + ?, updated_at = datetime('now')
    WHERE id = ?
  `).bind(quantity, productId).run();
}
__name(incrementStock, "incrementStock");
async function createOrder(db, order, items) {
  const result = await db.prepare(`
    INSERT INTO orders (
      order_ref, customer_name, customer_email, customer_phone, customer_address, notes,
      delivery_type, status, subtotal, delivery_charge, total
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING id
  `).bind(
    order.order_ref,
    order.customer_name,
    order.customer_email,
    order.customer_phone,
    order.customer_address,
    order.notes,
    order.delivery_type,
    "pending",
    order.subtotal,
    order.delivery_charge,
    order.total
  ).first();
  const orderId = result.id;
  for (const item of items) {
    await db.prepare(`
      INSERT INTO order_items
        (order_id, product_id, product_name, product_sku, farmer_id, farmer_name,
         quantity, unit, unit_price, cost_price, line_total)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `).bind(
      orderId,
      item.product_id,
      item.product_name,
      item.product_sku,
      item.farmer_id,
      item.farmer_name,
      item.quantity,
      item.unit,
      item.unit_price,
      item.cost_price,
      item.line_total
    ).run();
  }
  return orderId;
}
__name(createOrder, "createOrder");
async function getOrderByRef(db, ref) {
  return db.prepare("SELECT * FROM orders WHERE order_ref = ?").bind(ref).first();
}
__name(getOrderByRef, "getOrderByRef");
async function getOrderItems(db, orderId) {
  const res = await db.prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id").bind(orderId).all();
  return res.results;
}
__name(getOrderItems, "getOrderItems");
async function updateOrderStatus(db, ref, status, extra = {}) {
  const setClauses = ["status = ?", "updated_at = datetime('now')"];
  const params = [status];
  for (const [k, v] of Object.entries(extra)) {
    setClauses.push(`${k} = ?`);
    params.push(v);
  }
  params.push(ref);
  await db.prepare(`UPDATE orders SET ${setClauses.join(", ")} WHERE order_ref = ?`).bind(...params).run();
}
__name(updateOrderStatus, "updateOrderStatus");
async function incrementOTPAttempts(db, ref) {
  await db.prepare(`
    UPDATE orders SET otp_attempts = otp_attempts + 1, updated_at = datetime('now')
    WHERE order_ref = ?
  `).bind(ref).run();
}
__name(incrementOTPAttempts, "incrementOTPAttempts");
async function incrementOTPResends(db, ref) {
  await db.prepare(`
    UPDATE orders SET otp_resends = otp_resends + 1, updated_at = datetime('now')
    WHERE order_ref = ?
  `).bind(ref).run();
}
__name(incrementOTPResends, "incrementOTPResends");
async function listOrders(db, opts = {}) {
  let sql = "SELECT DISTINCT o.* FROM orders o";
  const params = [];
  if (opts.farmerId) {
    sql += " JOIN order_items oi ON oi.order_id = o.id AND oi.farmer_id = ?";
    params.push(opts.farmerId);
  }
  sql += " WHERE 1=1";
  if (opts.status) {
    sql += " AND o.status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY o.created_at DESC";
  sql += ` LIMIT ${opts.limit ?? 50} OFFSET ${opts.offset ?? 0}`;
  const res = await db.prepare(sql).bind(...params).all();
  return res.results;
}
__name(listOrders, "listOrders");
async function upsertDailySummary(db, date, data) {
  const setClauses = ["updated_at = datetime('now')"];
  const params = [];
  const fields = [
    "total_orders",
    "completed_orders",
    "cancelled_orders",
    "total_revenue",
    "total_farmer_payout",
    "total_items_sold",
    "top_products_json",
    "low_stock_alerts_json",
    "category_breakdown_json",
    "ai_insights"
  ];
  for (const f of fields) {
    if (f in data) {
      setClauses.push(`${f} = ?`);
      params.push(data[f]);
    }
  }
  params.push(date);
  await db.prepare(`
    INSERT INTO daily_summaries (summary_date) VALUES (?)
    ON CONFLICT(summary_date) DO NOTHING
  `).bind(date).run();
  if (setClauses.length > 1) {
    await db.prepare(
      `UPDATE daily_summaries SET ${setClauses.join(", ")} WHERE summary_date = ?`
    ).bind(...params).run();
  }
}
__name(upsertDailySummary, "upsertDailySummary");
async function getDailySummary(db, date) {
  return db.prepare("SELECT * FROM daily_summaries WHERE summary_date = ?").bind(date).first();
}
__name(getDailySummary, "getDailySummary");

// src/routes/catalog.ts
var catalog = new Hono2();
catalog.get("/", async (c) => {
  const category = c.req.query("category");
  const search = c.req.query("search");
  const featured = c.req.query("featured") === "true";
  const products = await getProducts(c.env.DB, {
    category,
    search,
    activeOnly: true
  });
  const result = featured ? products.filter((p) => p.is_featured === 1) : products;
  return ok(
    result.map((p) => ({
      id: p.id,
      name: p.name,
      nameHi: p.name_hi,
      sku: p.sku,
      category: p.category,
      emoji: p.emoji,
      description: p.description,
      descriptionHi: p.description_hi,
      price: p.price,
      unit: p.unit,
      stockQty: p.stock_qty,
      minQty: p.min_qty,
      farmerName: p.farmer_name,
      farmerLocation: p.farmer_location,
      isOrganic: p.is_organic === 1,
      isFeatured: p.is_featured === 1,
      rating: p.rating,
      reviewCount: p.review_count
    }))
  );
});
catalog.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id))
    return err("Invalid product ID");
  const product = await getProductById(c.env.DB, id);
  if (!product || !product.active)
    return notFound("Product not found");
  const related = await getRelatedProducts(c.env.DB, id, product.category);
  return ok({
    product: {
      id: product.id,
      name: product.name,
      nameHi: product.name_hi,
      sku: product.sku,
      category: product.category,
      emoji: product.emoji,
      description: product.description,
      descriptionHi: product.description_hi,
      price: product.price,
      unit: product.unit,
      stockQty: product.stock_qty,
      minQty: product.min_qty,
      maxDailyQty: product.max_daily_qty,
      farmerName: product.farmer_name,
      farmerLocation: product.farmer_location,
      farmerPhone: product.farmer_phone,
      isOrganic: product.is_organic === 1,
      isFeatured: product.is_featured === 1,
      rating: product.rating,
      reviewCount: product.review_count
    },
    related: related.map((p) => ({
      id: p.id,
      name: p.name,
      nameHi: p.name_hi,
      category: p.category,
      emoji: p.emoji,
      price: p.price,
      unit: p.unit,
      stockQty: p.stock_qty,
      isOrganic: p.is_organic === 1,
      rating: p.rating,
      reviewCount: p.review_count,
      farmerName: p.farmer_name,
      farmerLocation: p.farmer_location
    }))
  });
});
catalog.post("/", requireAdmin, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body)
    return err("Invalid JSON body");
  if (!body.name || !body.sku || !body.category || !body.price || !body.costPrice || !body.farmerId || !body.farmerName) {
    return err("Missing required fields: name, sku, category, price, costPrice, farmerId, farmerName");
  }
  const existing = await getProductBySku(c.env.DB, body.sku);
  if (existing)
    return err(`SKU "${body.sku}" already exists`, 409);
  const id = await createProduct(c.env.DB, {
    name: body.name,
    name_hi: body.nameHi ?? "",
    sku: body.sku.toUpperCase(),
    category: body.category,
    emoji: body.emoji ?? "\u{1F33F}",
    description: body.description ?? "",
    description_hi: body.descriptionHi ?? "",
    price: body.price,
    cost_price: body.costPrice,
    unit: body.unit ?? "kg",
    stock_qty: body.stockQty ?? 0,
    min_qty: body.minQty ?? 0.5,
    max_daily_qty: body.maxDailyQty ?? null,
    farmer_id: body.farmerId,
    farmer_name: body.farmerName,
    farmer_location: body.farmerLocation ?? null,
    farmer_phone: body.farmerPhone ?? null,
    farmer_email: body.farmerEmail ?? null,
    is_organic: body.isOrganic ? 1 : 0,
    is_featured: body.isFeatured ? 1 : 0,
    active: 1,
    rating: 4.5,
    review_count: 0
  });
  return ok({ id, message: "Product created" }, 201);
});
catalog.put("/:id", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id))
    return err("Invalid product ID");
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== "object")
    return err("Invalid JSON body");
  const product = await getProductById(c.env.DB, id);
  if (!product)
    return notFound("Product not found");
  await updateProduct(c.env.DB, id, {
    name: body.name ?? void 0,
    name_hi: body.nameHi ?? void 0,
    price: body.price ?? void 0,
    cost_price: body.costPrice ?? void 0,
    stock_qty: body.stockQty ?? void 0,
    min_qty: body.minQty ?? void 0,
    max_daily_qty: body.maxDailyQty ?? void 0,
    description: body.description ?? void 0,
    description_hi: body.descriptionHi ?? void 0,
    emoji: body.emoji ?? void 0,
    is_organic: body.isOrganic !== void 0 ? body.isOrganic ? 1 : 0 : void 0,
    is_featured: body.isFeatured !== void 0 ? body.isFeatured ? 1 : 0 : void 0,
    farmer_name: body.farmerName ?? void 0,
    farmer_location: body.farmerLocation ?? void 0,
    farmer_phone: body.farmerPhone ?? void 0,
    farmer_email: body.farmerEmail ?? void 0
  });
  return ok({ message: "Product updated" });
});
catalog.delete("/:id", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id))
    return err("Invalid product ID");
  const product = await getProductById(c.env.DB, id);
  if (!product)
    return notFound("Product not found");
  await updateProduct(c.env.DB, id, { active: 0 });
  return ok({ message: "Product deactivated" });
});
catalog.patch("/:id/stock", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id))
    return err("Invalid product ID");
  const { qty } = await c.req.json().catch(() => ({ qty: NaN }));
  if (isNaN(qty) || qty < 0)
    return err("qty must be a non-negative number");
  const product = await getProductById(c.env.DB, id);
  if (!product)
    return notFound("Product not found");
  await updateProduct(c.env.DB, id, { stock_qty: qty });
  return ok({ message: "Stock updated", newStock: qty });
});
var catalog_default = catalog;

// src/services/inventory.ts
async function validateInventory(db, cartItems) {
  if (!cartItems.length)
    return { ok: false, errors: ["Cart is empty"] };
  const errors = [];
  const validatedItems = [];
  let subtotal = 0;
  for (const entry of cartItems) {
    if (!Number.isInteger(entry.productId) || entry.productId <= 0) {
      errors.push(`Invalid product ID: ${entry.productId}`);
      continue;
    }
    if (entry.quantity <= 0) {
      errors.push(`Quantity must be > 0 for product ${entry.productId}`);
      continue;
    }
    const product = await getProductById(db, entry.productId);
    if (!product) {
      errors.push(`Product #${entry.productId} not found`);
      continue;
    }
    if (!product.active) {
      errors.push(`"${product.name}" is currently unavailable`);
      continue;
    }
    if (entry.quantity < product.min_qty) {
      errors.push(`Minimum order for "${product.name}" is ${product.min_qty} ${product.unit}`);
      continue;
    }
    if (product.max_daily_qty !== null && entry.quantity > product.max_daily_qty) {
      errors.push(`Maximum ${product.max_daily_qty} ${product.unit} per order for "${product.name}"`);
      continue;
    }
    if (product.stock_qty < entry.quantity) {
      errors.push(
        `Insufficient stock for "${product.name}" \u2014 only ${product.stock_qty} ${product.unit} available`
      );
      continue;
    }
    const lineTotal = product.price * entry.quantity;
    subtotal += lineTotal;
    validatedItems.push({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      farmerId: product.farmer_id,
      farmerName: product.farmer_name,
      quantity: entry.quantity,
      unit: product.unit,
      unitPrice: product.price,
      costPrice: product.cost_price,
      lineTotal
    });
  }
  if (errors.length > 0)
    return { ok: false, errors };
  return { ok: true, items: validatedItems, subtotal };
}
__name(validateInventory, "validateInventory");

// src/utils/crypto.ts
async function hmacSHA256(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hmacSHA256, "hmacSHA256");
function timingSafeEqual(a, b) {
  if (a.length !== b.length)
    return false;
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
function toBase64(str) {
  return btoa(str);
}
__name(toBase64, "toBase64");
function generateOTP() {
  const arr = crypto.getRandomValues(new Uint32Array(1));
  return String(arr[0] % 9e5 + 1e5);
}
__name(generateOTP, "generateOTP");

// src/services/otp.ts
var OTP_TTL_SECS = 600;
var MAX_ATTEMPTS = 5;
var MAX_RESENDS = 3;
var RESEND_COOLDOWN_SECS = 60;
function kvKey(orderRef) {
  return `otp:${orderRef}`;
}
__name(kvKey, "kvKey");
async function createOTP(kv, orderRef, customerEmail) {
  const otp2 = generateOTP();
  const data = {
    otp: otp2,
    orderRef,
    customerEmail,
    attempts: 0,
    resends: 0,
    lastResendAt: null,
    createdAt: Date.now()
  };
  await kv.put(kvKey(orderRef), JSON.stringify(data), { expirationTtl: OTP_TTL_SECS });
  return otp2;
}
__name(createOTP, "createOTP");
async function verifyOTP(kv, orderRef, inputOtp) {
  const raw2 = await kv.get(kvKey(orderRef));
  if (!raw2)
    return { success: false, reason: "expired" };
  const data = JSON.parse(raw2);
  if (data.attempts >= MAX_ATTEMPTS) {
    return { success: false, reason: "max_attempts" };
  }
  if (data.otp !== inputOtp.trim()) {
    data.attempts += 1;
    const remainingTtl = Math.max(
      1,
      OTP_TTL_SECS - Math.floor((Date.now() - data.createdAt) / 1e3)
    );
    await kv.put(kvKey(orderRef), JSON.stringify(data), { expirationTtl: remainingTtl });
    return { success: false, reason: "invalid" };
  }
  await kv.delete(kvKey(orderRef));
  return { success: true };
}
__name(verifyOTP, "verifyOTP");
async function resendOTP(kv, orderRef, customerEmail) {
  const raw2 = await kv.get(kvKey(orderRef));
  if (!raw2)
    return { success: false, reason: "not_found" };
  const data = JSON.parse(raw2);
  if (data.resends >= MAX_RESENDS) {
    return { success: false, reason: "max_resends" };
  }
  if (data.lastResendAt !== null) {
    const elapsed = Math.floor((Date.now() - data.lastResendAt) / 1e3);
    if (elapsed < RESEND_COOLDOWN_SECS) {
      return {
        success: false,
        reason: "cooldown",
        retryAfter: RESEND_COOLDOWN_SECS - elapsed
      };
    }
  }
  const newOtp = generateOTP();
  const updatedData = {
    ...data,
    otp: newOtp,
    attempts: 0,
    // reset attempts on resend
    resends: data.resends + 1,
    lastResendAt: Date.now(),
    createdAt: Date.now()
    // fresh TTL start
  };
  await kv.put(kvKey(orderRef), JSON.stringify(updatedData), { expirationTtl: OTP_TTL_SECS });
  return { success: true, otp: newOtp };
}
__name(resendOTP, "resendOTP");

// src/services/resend.ts
var RESEND_API = "https://api.resend.com/emails";
async function sendEmail(apiKey, from, opts) {
  const body = {
    from: opts.from ?? from,
    to: Array.isArray(opts.to) ? opts.to : [opts.to],
    reply_to: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    tags: opts.tags
  };
  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Resend API error ${res.status}: ${errBody}`);
  }
  return res.json();
}
__name(sendEmail, "sendEmail");

// src/emails/base.ts
function emailShell(content, previewText = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>Kissan Connect</title>
${previewText ? `<span style="display:none;max-height:0;overflow:hidden;">${previewText}</span>` : ""}
<style>
  body{margin:0;padding:0;background:#0a0a10;font-family:'Helvetica Neue',Arial,sans-serif;color:#e8e6f5;}
  a{color:#9d93f0;text-decoration:none;}
  .wrapper{max-width:600px;margin:0 auto;padding:24px 16px;}
  .logo-bar{text-align:center;padding:24px 0 16px;}
  .logo-icon{display:inline-block;background:linear-gradient(135deg,#7c6fe9,#34d399);border-radius:12px;width:44px;height:44px;line-height:44px;font-size:22px;text-align:center;vertical-align:middle;margin-right:8px;}
  .logo-name{font-size:22px;font-weight:800;background:linear-gradient(135deg,#9d93f0,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;vertical-align:middle;}
  .card{background:#13131f;border:1px solid #1e1e30;border-radius:16px;overflow:hidden;}
  .card-header{background:linear-gradient(135deg,rgba(124,111,233,0.15),rgba(52,211,153,0.08));padding:28px 28px 20px;border-bottom:1px solid #1e1e30;}
  .card-body{padding:24px 28px;}
  .card-footer{padding:16px 28px;border-top:1px solid #1e1e30;background:#0f0f1a;}
  h1{margin:0 0 8px;font-size:22px;font-weight:800;color:#f0eeff;}
  h2{margin:0 0 12px;font-size:18px;font-weight:700;color:#f0eeff;}
  p{margin:0 0 14px;font-size:15px;line-height:1.65;color:#b8b4d4;}
  .badge{display:inline-block;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
  .badge-purple{background:rgba(124,111,233,.18);color:#9d93f0;border:1px solid rgba(124,111,233,.25);}
  .badge-green{background:rgba(52,211,153,.12);color:#6ee7b7;border:1px solid rgba(52,211,153,.2);}
  .badge-amber{background:rgba(251,191,36,.12);color:#fbbf24;border:1px solid rgba(251,191,36,.2);}
  .badge-red{background:rgba(248,113,113,.12);color:#f87171;border:1px solid rgba(248,113,113,.2);}
  .btn{display:inline-block;padding:14px 32px;border-radius:12px;font-weight:700;font-size:16px;text-align:center;text-decoration:none;background:linear-gradient(135deg,#7c6fe9,#5a4fcf);color:#fff !important;box-shadow:0 4px 20px rgba(124,111,233,.35);}
  .btn-green{background:linear-gradient(135deg,#34d399,#059669) !important;box-shadow:0 4px 20px rgba(52,211,153,.3) !important;}
  .otp-box{background:#0a0a16;border:2px solid #7c6fe9;border-radius:16px;text-align:center;padding:24px;margin:20px 0;}
  .otp-code{font-size:42px;font-weight:900;letter-spacing:12px;color:#9d93f0;font-family:'Courier New',monospace;}
  .table{width:100%;border-collapse:collapse;font-size:14px;}
  .table td{padding:10px 0;border-bottom:1px solid #1e1e30;color:#b8b4d4;vertical-align:top;}
  .table td:last-child{text-align:right;font-weight:600;color:#e8e6f5;}
  .table .total td{border-top:2px solid #7c6fe9;border-bottom:none;padding-top:14px;font-weight:800;font-size:16px;color:#9d93f0;}
  .info-grid{display:table;width:100%;background:#0f0f1a;border:1px solid #1e1e30;border-radius:12px;overflow:hidden;margin:16px 0;}
  .info-row{display:table-row;}
  .info-label{display:table-cell;padding:10px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5a5778;white-space:nowrap;width:120px;}
  .info-val{display:table-cell;padding:10px 14px;font-size:14px;color:#e8e6f5;font-weight:600;}
  .divider{height:1px;background:#1e1e30;margin:20px 0;}
  .footer-text{font-size:12px;color:#3d3a57;text-align:center;line-height:1.6;}
  .footer-text a{color:#5a4fcf;}
  .emoji-icon{font-size:18px;}
</style>
</head>
<body>
<div class="wrapper">
  <div class="logo-bar">
    <span class="logo-icon">\u{1F33F}</span>
    <span class="logo-name">Kissan Connect</span>
  </div>
  ${content}
  <div style="height:20px;"></div>
  <p class="footer-text">
    You received this email because you have an active order with Kissan Connect.<br/>
    Bridging farmers and consumers directly \xB7 <a href="https://kissanconnect.in">kissanconnect.in</a>
  </p>
</div>
</body>
</html>`;
}
__name(emailShell, "emailShell");
function deliveryBadge(type) {
  return type === "delivery" ? '<span class="badge badge-purple">\u{1F69A} Home Delivery</span>' : '<span class="badge badge-green">\u{1F3EA} Self Pickup \u2014 FREE</span>';
}
__name(deliveryBadge, "deliveryBadge");
function inr(amount) {
  return `\u20B9${amount.toLocaleString("en-IN")}`;
}
__name(inr, "inr");

// src/emails/otp.ts
function otpEmail(opts) {
  const expires = opts.expiresInMinutes ?? 10;
  const html = emailShell(
    `
    <div class="card">
      <div class="card-header">
        <p style="margin:0 0 8px;">${deliveryBadge(opts.deliveryType)}</p>
        <h1>\u{1F510} Verify Your Order</h1>
        <p>Hi ${escHtml(opts.customerName)}, you're one step away from confirming your fresh produce order.</p>
      </div>
      <div class="card-body">
        <p style="color:#9d93f0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px;">
          Order Reference
        </p>
        <p style="font-family:'Courier New',monospace;font-size:16px;font-weight:800;color:#f0eeff;margin:0 0 20px;">
          ${escHtml(opts.orderRef)}
        </p>

        <p style="margin:0 0 4px;color:#b8b4d4;">Enter this 6-digit code to confirm your order:</p>
        <div class="otp-box">
          <div class="otp-code">${escHtml(opts.otp)}</div>
          <p style="margin:8px 0 0;font-size:13px;color:#5a5778;">
            \u23F1 Expires in <strong style="color:#fbbf24;">${expires} minutes</strong> &nbsp;\xB7&nbsp;
            Max 5 attempts &nbsp;\xB7&nbsp; Max 3 resends
          </p>
        </div>

        <div class="info-grid">
          <div class="info-row">
            <span class="info-label">Order Ref</span>
            <span class="info-val">${escHtml(opts.orderRef)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Delivery</span>
            <span class="info-val">${opts.deliveryType === "delivery" ? "\u{1F69A} Home Delivery (\u20B940)" : "\u{1F3EA} Self Pickup (FREE)"}</span>
          </div>
        </div>

        <p style="font-size:13px;color:#5a5778;margin:16px 0 0;">
          \u{1F6E1}\uFE0F Do not share this OTP with anyone. Kissan Connect will never ask for your OTP over
          phone or chat. If you did not place this order, ignore this email.
        </p>
      </div>
      <div class="card-footer">
        <p style="margin:0;font-size:13px;color:#5a5778;">
          Didn't place an order? <a href="mailto:support@kissanconnect.in">Contact support</a>
        </p>
      </div>
    </div>`,
    `Your OTP for order ${opts.orderRef} is ${opts.otp}`
  );
  return {
    subject: `\u{1F510} ${opts.otp} \u2014 OTP for your Kissan Connect order ${opts.orderRef}`,
    html
  };
}
__name(otpEmail, "otpEmail");
function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escHtml, "escHtml");

// src/utils/orderRef.ts
function generateOrderRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ORD-";
  const array = crypto.getRandomValues(new Uint8Array(8));
  for (const byte of array) {
    result += chars[byte % chars.length];
  }
  return result;
}
__name(generateOrderRef, "generateOrderRef");
function generateSessionId() {
  const array = crypto.getRandomValues(new Uint8Array(16));
  return [...array].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateSessionId, "generateSessionId");

// src/routes/orders.ts
var DELIVERY_CHARGE = 40;
var orders = new Hono2();
orders.post("/order", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return err("Invalid JSON body");
  }
  const { customer, items, deliveryType } = body;
  if (!customer?.name?.trim())
    return err("customer.name is required");
  if (!customer?.email?.trim())
    return err("customer.email is required");
  if (!customer?.phone?.trim())
    return err("customer.phone is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
    return err("Invalid email address");
  if (!/^[\d+\s\-]{8,15}$/.test(customer.phone))
    return err("Invalid phone number");
  if (!Array.isArray(items) || items.length === 0)
    return err("Order must have at least one item");
  if (deliveryType !== "delivery" && deliveryType !== "pickup")
    return err('deliveryType must be "delivery" or "pickup"');
  if (deliveryType === "delivery" && !customer.address?.trim())
    return err("Delivery address is required for home delivery");
  const inv = await validateInventory(c.env.DB, items.map((i) => ({ productId: i.productId, quantity: i.quantity })));
  if (!inv.ok)
    return err("Inventory validation failed", 422, inv.errors);
  const deliveryCharge = deliveryType === "delivery" ? DELIVERY_CHARGE : 0;
  const total = inv.subtotal + deliveryCharge;
  const orderRef = generateOrderRef();
  const orderId = await createOrder(
    c.env.DB,
    {
      order_ref: orderRef,
      customer_name: customer.name.trim(),
      customer_email: customer.email.trim().toLowerCase(),
      customer_phone: customer.phone.trim(),
      customer_address: customer.address?.trim() ?? null,
      notes: customer.notes?.trim() ?? null,
      delivery_type: deliveryType,
      status: "pending",
      subtotal: inv.subtotal,
      delivery_charge: deliveryCharge,
      total,
      otp_attempts: 0,
      otp_resends: 0,
      payment_link_id: null,
      payment_link_url: null,
      payment_link_expires_at: null,
      razorpay_payment_id: null,
      razorpay_order_id: null,
      paid_at: null,
      tracking_number: null,
      carrier: null,
      shipped_at: null,
      estimated_delivery: null,
      delivered_at: null,
      rejection_reason: null,
      farmer_notes: null,
      accepted_by: null
    },
    inv.items.map((i) => ({
      product_id: i.productId,
      product_name: i.productName,
      product_sku: i.productSku,
      farmer_id: i.farmerId,
      farmer_name: i.farmerName,
      quantity: i.quantity,
      unit: i.unit,
      unit_price: i.unitPrice,
      cost_price: i.costPrice,
      line_total: i.lineTotal
    }))
  );
  for (const item of inv.items) {
    await decrementStock(c.env.DB, item.productId, item.quantity);
  }
  const otp2 = await createOTP(c.env.STORE_KV, orderRef, customer.email.trim().toLowerCase());
  try {
    const { subject, html } = otpEmail({
      customerName: customer.name.trim(),
      orderRef,
      otp: otp2,
      deliveryType
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: customer.email.trim().toLowerCase(),
      subject,
      html,
      tags: [{ name: "type", value: "otp" }, { name: "order_ref", value: orderRef }]
    });
  } catch (e) {
    console.error("[OTP Email Error]", e);
  }
  return ok(
    {
      orderRef,
      message: "Order placed! Check your email for the verification OTP.",
      itemCount: inv.items.length,
      total
    },
    201
  );
});
var orders_default = orders;

// src/emails/orderConfirmation.ts
function orderConfirmEmail(opts) {
  const rows = opts.items.map(
    (i) => `
      <tr>
        <td>${i.emoji} ${escHtml2(i.name)}</td>
        <td style="text-align:center;color:#9d93f0;">${i.quantity} ${i.unit}</td>
        <td style="text-align:right;">${inr(i.lineTotal)}</td>
      </tr>`
  ).join("");
  const html = emailShell(
    `
    <div class="card">
      <div class="card-header">
        <p style="margin:0 0 8px;">${deliveryBadge(opts.deliveryType)}</p>
        <h1>\u2705 Order Verified!</h1>
        <p>
          Great news, ${escHtml2(opts.customerName)}! Your order has been verified and sent to the
          farmer for acceptance. You'll get another email once the farmer confirms.
        </p>
      </div>
      <div class="card-body">
        <p style="color:#9d93f0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px;">
          Order Reference
        </p>
        <p style="font-family:'Courier New',monospace;font-size:18px;font-weight:900;color:#f0eeff;margin:0 0 20px;">
          ${escHtml2(opts.orderRef)}
        </p>

        <h2>\u{1F6D2} Items Ordered</h2>
        <table class="table">
          <thead>
            <tr>
              <td style="color:#5a5778;font-weight:700;">Product</td>
              <td style="text-align:center;color:#5a5778;font-weight:700;">Qty</td>
              <td style="text-align:right;color:#5a5778;font-weight:700;">Total</td>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr><td colspan="2" style="padding:10px 0;border-bottom:1px solid #1e1e30;color:#b8b4d4;">Subtotal</td>
                <td style="text-align:right;padding:10px 0;border-bottom:1px solid #1e1e30;">${inr(opts.subtotal)}</td></tr>
            <tr><td colspan="2" style="padding:8px 0;border-bottom:1px solid #1e1e30;color:#b8b4d4;">
                  Delivery ${opts.deliveryType === "pickup" ? "(Self Pickup)" : ""}
                </td>
                <td style="text-align:right;padding:8px 0;border-bottom:1px solid #1e1e30;color:${opts.deliveryCharge === 0 ? "#34d399" : "#e8e6f5"};">
                  ${opts.deliveryCharge === 0 ? "FREE" : inr(opts.deliveryCharge)}
                </td></tr>
            <tr class="total"><td colspan="2">Total Payable</td><td>${inr(opts.total)}</td></tr>
          </tfoot>
        </table>

        ${opts.farmerNotes ? `
        <div style="background:#0f0f1a;border:1px solid #2a2740;border-left:3px solid #7c6fe9;border-radius:8px;padding:14px 16px;margin-top:16px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;color:#7c6fe9;">\u{1F33E} Farmer Note</p>
          <p style="margin:0;font-size:14px;color:#b8b4d4;">${escHtml2(opts.farmerNotes)}</p>
        </div>` : ""}

        <div style="text-align:center;margin:24px 0 8px;">
          <a href="${opts.trackUrl}" class="btn">\u{1F4E6} Track Your Order</a>
        </div>
      </div>
      <div class="card-footer">
        <p style="margin:0;font-size:13px;color:#5a5778;">
          What's next? The farmer will review and accept your order. Payment link will be sent via email.
        </p>
      </div>
    </div>`,
    `Your order ${opts.orderRef} is verified \u2014 awaiting farmer acceptance`
  );
  return {
    subject: `\u2705 Order ${opts.orderRef} Verified \u2014 Awaiting Farmer Acceptance`,
    html
  };
}
__name(orderConfirmEmail, "orderConfirmEmail");
function escHtml2(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escHtml2, "escHtml");

// src/routes/otp.ts
var otp = new Hono2();
otp.post("/order/verify", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return err("Invalid JSON body");
  }
  const { orderRef, otp: inputOtp } = body;
  if (!orderRef?.trim())
    return err("orderRef is required");
  if (!inputOtp?.trim())
    return err("otp is required");
  if (!/^\d{6}$/.test(inputOtp.trim()))
    return err("OTP must be exactly 6 digits");
  const order = await getOrderByRef(c.env.DB, orderRef.trim().toUpperCase());
  if (!order)
    return notFound("Order not found");
  if (order.status !== "pending") {
    return err(
      order.status === "verified" ? "Order is already verified" : `Order cannot be verified in status: ${order.status}`,
      409
    );
  }
  const result = await verifyOTP(c.env.STORE_KV, order.order_ref, inputOtp.trim());
  if (!result.success) {
    await incrementOTPAttempts(c.env.DB, order.order_ref);
    if (result.reason === "max_attempts") {
      return err("Too many failed attempts. Please resend OTP.", 429);
    }
    if (result.reason === "expired") {
      return err("OTP has expired. Please resend a new OTP.", 410);
    }
    return err("Invalid OTP. Please check and try again.", 422);
  }
  await updateOrderStatus(c.env.DB, order.order_ref, "verified");
  await incrementOTPAttempts(c.env.DB, order.order_ref);
  try {
    const items = await getOrderItems(c.env.DB, order.id);
    const { subject, html } = orderConfirmEmail({
      customerName: order.customer_name,
      orderRef: order.order_ref,
      deliveryType: order.delivery_type,
      items: items.map((i) => ({
        emoji: "\u{1F33F}",
        name: i.product_name,
        quantity: i.quantity,
        unit: i.unit,
        lineTotal: i.line_total
      })),
      subtotal: order.subtotal,
      deliveryCharge: order.delivery_charge,
      total: order.total,
      trackUrl: `${c.env.APP_BASE_URL}/track/${order.order_ref}`
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: order.customer_email,
      subject,
      html,
      tags: [{ name: "type", value: "order_confirmed" }]
    });
  } catch (e) {
    console.error("[Confirm Email Error]", e);
  }
  return ok({
    orderRef: order.order_ref,
    status: "verified",
    message: "Order verified! The farmer will review and accept your order shortly."
  });
});
otp.post("/order/resend-otp", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return err("Invalid JSON body");
  }
  const { orderRef } = body;
  if (!orderRef?.trim())
    return err("orderRef is required");
  const order = await getOrderByRef(c.env.DB, orderRef.trim().toUpperCase());
  if (!order)
    return notFound("Order not found");
  if (order.status !== "pending") {
    return err(`Cannot resend OTP for order in status: ${order.status}`, 409);
  }
  const result = await resendOTP(c.env.STORE_KV, order.order_ref, order.customer_email);
  if (!result.success) {
    if (result.reason === "cooldown") {
      return err(
        `Please wait ${result.retryAfter} seconds before resending.`,
        429,
        { retryAfter: result.retryAfter }
      );
    }
    if (result.reason === "max_resends") {
      return err("Maximum resend limit (3) reached. Please place a new order.", 429);
    }
    return err("OTP not found. Please place a new order.", 404);
  }
  await incrementOTPResends(c.env.DB, order.order_ref);
  try {
    const { subject, html } = otpEmail({
      customerName: order.customer_name,
      orderRef: order.order_ref,
      otp: result.otp,
      deliveryType: order.delivery_type
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: order.customer_email,
      subject,
      html,
      tags: [{ name: "type", value: "otp_resend" }]
    });
  } catch (e) {
    console.error("[Resend OTP Email Error]", e);
  }
  return ok({
    message: "OTP resent successfully. Check your email.",
    orderRef: order.order_ref
  });
});
var otp_default = otp;

// src/services/razorpay.ts
var RAZORPAY_BASE = "https://api.razorpay.com/v1";
var PAYMENT_LINK_EXPIRY_SECS = 3600;
async function createPaymentLink(keyId, keySecret, opts) {
  const auth = toBase64(`${keyId}:${keySecret}`);
  const expireBy = Math.floor(Date.now() / 1e3) + PAYMENT_LINK_EXPIRY_SECS;
  const body = {
    amount: Math.round(opts.amount * 100),
    // paise
    currency: "INR",
    accept_partial: false,
    description: opts.description,
    reference_id: opts.orderRef,
    customer: {
      name: opts.customerName,
      email: opts.customerEmail,
      contact: opts.customerPhone.replace(/\D/g, "").replace(/^0/, "+91")
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: false,
    expire_by: expireBy,
    callback_url: opts.callbackUrl,
    callback_method: "get",
    notes: {
      order_ref: opts.orderRef,
      platform: "Kissan Connect"
    }
  };
  const res = await fetch(`${RAZORPAY_BASE}/payment_links`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Razorpay API error ${res.status}: ${errBody}`);
  }
  return res.json();
}
__name(createPaymentLink, "createPaymentLink");
async function verifyWebhookSignature(rawBody, signature, webhookSecret) {
  const expected = await hmacSHA256(webhookSecret, rawBody);
  return timingSafeEqual(expected, signature);
}
__name(verifyWebhookSignature, "verifyWebhookSignature");
async function cancelPaymentLink(keyId, keySecret, linkId) {
  const auth = toBase64(`${keyId}:${keySecret}`);
  await fetch(`${RAZORPAY_BASE}/payment_links/${linkId}/cancel`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` }
  });
}
__name(cancelPaymentLink, "cancelPaymentLink");

// src/routes/payments.ts
var payments = new Hono2();
payments.post("/webhooks/razorpay", async (c) => {
  const rawBody = await c.req.text();
  const signature = c.req.header("X-Razorpay-Signature") ?? "";
  const isValid = await verifyWebhookSignature(
    rawBody,
    signature,
    c.env.RAZORPAY_WEBHOOK_SECRET
  );
  if (!isValid)
    return forbidden("Invalid webhook signature");
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return err("Invalid JSON payload");
  }
  const event = payload.event ?? "";
  console.log("[Razorpay Webhook]", event);
  if (event === "payment_link.paid") {
    const linkEntity = payload?.payload?.payment_link?.entity;
    const paymentEntity = payload?.payload?.payment?.entity;
    if (!linkEntity) {
      console.error("[Webhook] Missing payment_link entity");
      return ok({ received: true });
    }
    const orderRef = linkEntity.reference_id ?? "";
    const razorpayPaymentId = paymentEntity?.id ?? "";
    if (!orderRef) {
      console.error("[Webhook] No reference_id in payment link entity");
      return ok({ received: true });
    }
    const order = await getOrderByRef(c.env.DB, orderRef);
    if (!order) {
      console.error("[Webhook] Order not found:", orderRef);
      return ok({ received: true });
    }
    if (order.status === "paid" || order.status === "shipped" || order.status === "delivered") {
      return ok({ received: true, message: "Already processed" });
    }
    await updateOrderStatus(c.env.DB, orderRef, "paid", {
      razorpay_payment_id: razorpayPaymentId || null,
      paid_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      const items = await getOrderItems(c.env.DB, order.id);
      await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
        to: order.customer_email,
        subject: `\u2705 Payment Confirmed \u2014 Order ${orderRef} | Kissan Connect`,
        html: buildPaymentConfirmedHtml(order.customer_name, orderRef, order.total, order.delivery_type),
        tags: [{ name: "type", value: "payment_confirmed" }]
      });
    } catch (e) {
      console.error("[Payment Email Error]", e);
    }
    return ok({ received: true, orderRef, status: "paid" });
  }
  return ok({ received: true, event });
});
function buildPaymentConfirmedHtml(name, orderRef, total, deliveryType) {
  const escaped = name.replace(/</g, "&lt;");
  const badge = deliveryType === "delivery" ? '<span class="badge badge-purple">\u{1F69A} Home Delivery</span>' : '<span class="badge badge-green">\u{1F3EA} Self Pickup \u2014 FREE</span>';
  const amountStr = `\u20B9${total.toLocaleString("en-IN")}`;
  return `<!DOCTYPE html><html><body style="background:#0a0a10;font-family:sans-serif;color:#e8e6f5;"><div style="max-width:520px;margin:0 auto;padding:24px;"><div style="background:#13131f;border:1px solid #1e1e30;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,rgba(124,111,233,.15),rgba(52,211,153,.08));padding:28px;border-bottom:1px solid #1e1e30;">${badge}<h1 style="margin:12px 0 8px;font-size:22px;color:#f0eeff;">\u{1F49A} Payment Confirmed!</h1><p style="margin:0;color:#b8b4d4;">Hi ${escaped}, your payment of <strong style="color:#34d399;">${amountStr}</strong> for order <strong style="color:#9d93f0;">${orderRef}</strong> has been received. The farmer will now prepare your order.</p></div></div></div></body></html>`;
}
__name(buildPaymentConfirmedHtml, "buildPaymentConfirmedHtml");
var payments_default = payments;

// src/emails/paymentLink.ts
function paymentLinkEmail(opts) {
  const html = emailShell(
    `
    <div class="card">
      <div class="card-header">
        <p style="margin:0 0 8px;">${deliveryBadge(opts.deliveryType)}</p>
        <h1>\u{1F4B3} Complete Your Payment</h1>
        <p>
          Wonderful news, ${escHtml3(opts.customerName)}! Your farmer has <strong style="color:#34d399;">accepted</strong>
          your Kissan Connect order. Please complete the payment to get your fresh produce on the way.
        </p>
      </div>
      <div class="card-body">
        <p style="color:#9d93f0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px;">
          Order Reference
        </p>
        <p style="font-family:'Courier New',monospace;font-size:18px;font-weight:900;color:#f0eeff;margin:0 0 20px;">
          ${escHtml3(opts.orderRef)}
        </p>

        <div style="background:#0a1a10;border:1px solid rgba(52,211,153,.25);border-radius:14px;padding:24px;text-align:center;margin:0 0 24px;">
          <p style="margin:0;font-size:13px;color:#5a5778;text-transform:uppercase;letter-spacing:.05em;font-weight:700;">Amount Due</p>
          <p style="margin:8px 0 0;font-size:40px;font-weight:900;color:#34d399;">${inr(opts.total)}</p>
          <p style="margin:8px 0 0;font-size:13px;color:#f87171;">
            \u23F1 Link expires: <strong>${escHtml3(opts.expiresAt)}</strong>
          </p>
        </div>

        <div style="text-align:center;margin:0 0 20px;">
          <a href="${opts.paymentUrl}" class="btn btn-green">
            \u{1F4B3} Pay Now \u2014 ${inr(opts.total)}
          </a>
        </div>

        <p style="font-size:13px;color:#5a5778;text-align:center;">
          Powered by Razorpay \xB7 UPI / Cards / Net Banking / Wallets accepted
        </p>

        ${opts.farmerNotes ? `
        <div class="divider"></div>
        <div style="background:#0f0f1a;border:1px solid #2a2740;border-left:3px solid #7c6fe9;border-radius:8px;padding:14px 16px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;color:#7c6fe9;">\u{1F33E} Message from Your Farmer</p>
          <p style="margin:0;font-size:14px;color:#b8b4d4;">${escHtml3(opts.farmerNotes)}</p>
        </div>` : ""}

        ${opts.deliveryType === "pickup" ? `
        <div style="margin-top:18px;background:#0f0f1a;border:1px solid #1e1e30;border-radius:10px;padding:16px;">
          <p style="margin:0;font-size:14px;color:#b8b4d4;">
            \u{1F3EA} <strong style="color:#34d399;">Pickup Reminder:</strong> After payment, you can collect your order from the farmer's location. Bring your order reference number.
          </p>
        </div>` : ""}

        <div class="divider"></div>
        <div style="text-align:center;">
          <a href="${opts.trackUrl}" style="font-size:14px;color:#7c6fe9;">Track Order Status \u2192</a>
        </div>
      </div>
      <div class="card-footer">
        <p style="margin:0;font-size:13px;color:#5a5778;">
          \u{1F512} This is a secure Razorpay payment link. Do not share the link with others.
          Link expires in 1 hour from the time of sending.
        </p>
      </div>
    </div>`,
    `Pay ${inr(opts.total)} for your Kissan Connect order ${opts.orderRef}`
  );
  return {
    subject: `\u{1F4B3} Pay ${inr(opts.total)} for order ${opts.orderRef} \u2014 Link expires soon`,
    html
  };
}
__name(paymentLinkEmail, "paymentLinkEmail");
function escHtml3(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escHtml3, "escHtml");

// src/emails/rejection.ts
function rejectionEmail(opts) {
  const html = emailShell(
    `
    <div class="card">
      <div class="card-header">
        <p style="margin:0 0 8px;">${deliveryBadge(opts.deliveryType)}</p>
        <p style="margin:0 0 8px;"><span class="badge badge-red">\u274C Order Rejected</span></p>
        <h1>We're Sorry</h1>
        <p>
          Hi ${escHtml4(opts.customerName)}, unfortunately your Kissan Connect order
          <strong style="color:#9d93f0;">${escHtml4(opts.orderRef)}</strong> could not be fulfilled at this time.
        </p>
      </div>
      <div class="card-body">
        <div style="background:#180a0a;border:1px solid rgba(248,113,113,.2);border-left:3px solid #f87171;border-radius:8px;padding:16px;margin:0 0 20px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;color:#f87171;">Reason</p>
          <p style="margin:0;font-size:15px;color:#fca5a5;">${escHtml4(opts.reason)}</p>
        </div>

        <p style="color:#b8b4d4;">
          This could be due to stock running out at the last moment, delivery not being possible to
          your area, or the farmer being unavailable. We apologise for the inconvenience.
        </p>

        <p style="color:#b8b4d4;">
          Any payment already made will be refunded within <strong style="color:#34d399;">5\u20137 business days</strong>
          to your original payment method.
        </p>

        <div style="text-align:center;margin:24px 0 8px;">
          <a href="${opts.shopUrl}" class="btn">\u{1F33F} Browse Other Products</a>
        </div>
      </div>
      <div class="card-footer">
        <p style="margin:0;font-size:13px;color:#5a5778;">
          Need help? <a href="mailto:support@kissanconnect.in">support@kissanconnect.in</a>
        </p>
      </div>
    </div>`,
    `Your order ${opts.orderRef} was rejected \u2014 see details`
  );
  return {
    subject: `\u274C Order ${opts.orderRef} Rejected \u2014 Kissan Connect`,
    html
  };
}
__name(rejectionEmail, "rejectionEmail");
function escHtml4(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escHtml4, "escHtml");

// src/emails/shipping.ts
function shippingEmail(opts) {
  const isPickup = opts.deliveryType === "pickup";
  const html = emailShell(
    `
    <div class="card">
      <div class="card-header">
        <p style="margin:0 0 8px;">${deliveryBadge(opts.deliveryType)}</p>
        <h1>${isPickup ? "\u{1F3EA} Ready for Pickup!" : "\u{1F69A} Your Order is On Its Way!"}</h1>
        <p>
          ${isPickup ? `Hi ${escHtml5(opts.customerName)}, your fresh produce is <strong style="color:#34d399;">ready for collection</strong> at the farmer's location.` : `Hi ${escHtml5(opts.customerName)}, your Kissan Connect order has been dispatched and is heading your way!`}
        </p>
      </div>
      <div class="card-body">
        <p style="color:#9d93f0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 4px;">
          Order Reference
        </p>
        <p style="font-family:'Courier New',monospace;font-size:18px;font-weight:900;color:#f0eeff;margin:0 0 20px;">
          ${escHtml5(opts.orderRef)}
        </p>

        ${!isPickup && (opts.trackingNumber || opts.carrier || opts.estimatedDelivery) ? `
        <div class="info-grid">
          ${opts.trackingNumber ? `
          <div class="info-row">
            <span class="info-label">\u{1F4E6} Tracking</span>
            <span class="info-val" style="font-family:'Courier New',monospace;">${escHtml5(opts.trackingNumber)}</span>
          </div>` : ""}
          ${opts.carrier ? `
          <div class="info-row">
            <span class="info-label">\u{1F69B} Carrier</span>
            <span class="info-val">${escHtml5(opts.carrier)}</span>
          </div>` : ""}
          ${opts.estimatedDelivery ? `
          <div class="info-row">
            <span class="info-label">\u{1F4C5} Est. Delivery</span>
            <span class="info-val" style="color:#34d399;">${escHtml5(opts.estimatedDelivery)}</span>
          </div>` : ""}
        </div>` : ""}

        ${isPickup ? `
        <div style="background:#0a1a10;border:1px solid rgba(52,211,153,.2);border-radius:12px;padding:20px;text-align:center;margin:16px 0;">
          <p style="margin:0;font-size:14px;color:#6ee7b7;">
            \u2705 Bring your <strong>Order Reference ${escHtml5(opts.orderRef)}</strong> when you collect your order.
          </p>
        </div>` : ""}

        ${opts.farmerNotes ? `
        <div style="background:#0f0f1a;border:1px solid #2a2740;border-left:3px solid #7c6fe9;border-radius:8px;padding:14px 16px;margin:16px 0;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;color:#7c6fe9;">\u{1F33E} Farmer Delivery Notes</p>
          <p style="margin:0;font-size:14px;color:#b8b4d4;">${escHtml5(opts.farmerNotes)}</p>
        </div>` : ""}

        <div style="text-align:center;margin:20px 0 4px;">
          <a href="${opts.trackUrl}" class="btn">\u{1F4E6} Track Order Live</a>
        </div>
      </div>
      <div class="card-footer">
        <p style="margin:0;font-size:13px;color:#5a5778;">
          Questions? Reply to this email or contact <a href="mailto:support@kissanconnect.in">support@kissanconnect.in</a>
        </p>
      </div>
    </div>`,
    isPickup ? `Your order ${opts.orderRef} is ready for pickup!` : `Your order ${opts.orderRef} has been shipped!`
  );
  return {
    subject: isPickup ? `\u{1F3EA} Order ${opts.orderRef} Ready for Pickup \u2014 Kissan Connect` : `\u{1F69A} Order ${opts.orderRef} Shipped \u2014 ${opts.estimatedDelivery ? `Arriving ${opts.estimatedDelivery}` : "On its way!"}`,
    html
  };
}
__name(shippingEmail, "shippingEmail");
function escHtml5(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escHtml5, "escHtml");

// src/routes/admin.ts
var admin = new Hono2();
admin.post("/login", async (c) => {
  const { apiKey } = await c.req.json().catch(() => ({ apiKey: "" }));
  if (!apiKey || apiKey !== c.env.ADMIN_API_KEY) {
    return err("Invalid API key", 401);
  }
  const sessionId = generateSessionId();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1e3;
  await c.env.STORE_KV.put(
    `session:${sessionId}`,
    JSON.stringify({
      adminEmail: c.env.ADMIN_EMAIL,
      role: "admin",
      farmerId: null,
      expiresAt
    }),
    { expirationTtl: 86400 }
  );
  return ok({ sessionId, expiresAt, role: "admin", message: "Logged in" });
});
admin.get("/orders", requireAuth, async (c) => {
  const auth = c.get("auth");
  const status = c.req.query("status");
  const limit = parseInt(c.req.query("limit") ?? "50");
  const offset = parseInt(c.req.query("offset") ?? "0");
  const orders2 = await listOrders(c.env.DB, {
    status: status || void 0,
    limit,
    offset,
    farmerId: auth.isAdmin ? void 0 : auth.farmerId ?? void 0
  });
  const result = await Promise.all(
    orders2.map(async (o) => {
      const items = await getOrderItems(c.env.DB, o.id);
      return {
        orderRef: o.order_ref,
        status: o.status,
        deliveryType: o.delivery_type,
        customer: { name: o.customer_name, email: o.customer_email, phone: o.customer_phone },
        subtotal: o.subtotal,
        deliveryCharge: o.delivery_charge,
        total: o.total,
        itemCount: items.length,
        items: items.map((i) => ({ name: i.product_name, qty: i.quantity, unit: i.unit, lineTotal: i.line_total })),
        paymentLinkUrl: o.payment_link_url,
        paidAt: o.paid_at,
        shippedAt: o.shipped_at,
        deliveredAt: o.delivered_at,
        createdAt: o.created_at
      };
    })
  );
  return ok({ orders: result, count: result.length });
});
admin.get("/orders/:ref", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  const auth = c.get("auth");
  if (!auth.isAdmin && auth.farmerId) {
    const items2 = await getOrderItems(c.env.DB, order.id);
    const belongs = items2.some((i) => i.farmer_id === auth.farmerId);
    if (!belongs)
      return forbidden("You do not have access to this order");
  }
  const items = await getOrderItems(c.env.DB, order.id);
  return ok({ ...order, items });
});
admin.post("/orders/:ref/accept", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const body = await c.req.json().catch(() => ({}));
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  if (order.status !== "verified")
    return err(`Order must be "verified" to accept. Current: ${order.status}`, 409);
  const auth = c.get("auth");
  let paymentLinkId = "";
  let paymentLinkUrl = "";
  let paymentLinkExpiresAt = "";
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1e3);
    const link = await createPaymentLink(
      c.env.RAZORPAY_KEY_ID,
      c.env.RAZORPAY_KEY_SECRET,
      {
        orderRef: order.order_ref,
        amount: order.total,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        description: `Kissan Connect Order ${order.order_ref} \u2014 Fresh Produce`,
        callbackUrl: `${c.env.APP_BASE_URL}/track/${order.order_ref}`
      }
    );
    paymentLinkId = link.id;
    paymentLinkUrl = link.short_url;
    paymentLinkExpiresAt = expiresAt.toISOString();
  } catch (e) {
    console.error("[Razorpay Link Error]", e);
    return err("Failed to create payment link. Please try again.", 502);
  }
  await updateOrderStatus(c.env.DB, ref, "accepted", {
    payment_link_id: paymentLinkId,
    payment_link_url: paymentLinkUrl,
    payment_link_expires_at: paymentLinkExpiresAt,
    farmer_notes: body.farmerNotes ?? null,
    accepted_by: auth.adminEmail ?? auth.farmerId ?? "admin"
  });
  try {
    const expiresFormatted = new Date(paymentLinkExpiresAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    });
    const { subject, html } = paymentLinkEmail({
      customerName: order.customer_name,
      orderRef: order.order_ref,
      deliveryType: order.delivery_type,
      total: order.total,
      paymentUrl: paymentLinkUrl,
      expiresAt: expiresFormatted,
      farmerNotes: body.farmerNotes,
      trackUrl: `${c.env.APP_BASE_URL}/track/${order.order_ref}`
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: order.customer_email,
      subject,
      html,
      tags: [{ name: "type", value: "payment_link" }]
    });
  } catch (e) {
    console.error("[Payment Link Email Error]", e);
  }
  return ok({
    message: "Order accepted. Payment link sent to buyer.",
    orderRef: ref,
    paymentLinkUrl,
    paymentLinkExpiresAt
  });
});
admin.post("/orders/:ref/reject", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const body = await c.req.json().catch(() => ({ reason: "" }));
  if (!body.reason?.trim())
    return err("Rejection reason is required");
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  const allowed = ["pending", "verified", "accepted"];
  if (!allowed.includes(order.status)) {
    return err(`Cannot reject order in status: ${order.status}`, 409);
  }
  if (order.payment_link_id && order.status === "accepted") {
    try {
      await cancelPaymentLink(c.env.RAZORPAY_KEY_ID, c.env.RAZORPAY_KEY_SECRET, order.payment_link_id);
    } catch (e) {
      console.error("[Cancel Link Error]", e);
    }
  }
  const items = await getOrderItems(c.env.DB, order.id);
  for (const item of items) {
    await incrementStock(c.env.DB, item.product_id, item.quantity);
  }
  await updateOrderStatus(c.env.DB, ref, "rejected", {
    rejection_reason: body.reason.trim()
  });
  try {
    const { subject, html } = rejectionEmail({
      customerName: order.customer_name,
      orderRef: order.order_ref,
      deliveryType: order.delivery_type,
      reason: body.reason.trim(),
      shopUrl: c.env.APP_BASE_URL
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: order.customer_email,
      subject,
      html,
      tags: [{ name: "type", value: "order_rejected" }]
    });
  } catch (e) {
    console.error("[Rejection Email Error]", e);
  }
  return ok({ message: "Order rejected. Stock restored. Customer notified.", orderRef: ref });
});
admin.post("/orders/:ref/ship", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const body = await c.req.json().catch(() => ({}));
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  if (order.status !== "paid")
    return err(`Order must be "paid" to ship. Current: ${order.status}`, 409);
  const isPickup = order.delivery_type === "pickup";
  await updateOrderStatus(c.env.DB, ref, "shipped", {
    tracking_number: !isPickup && body.trackingNumber ? body.trackingNumber.trim() : null,
    carrier: !isPickup && body.carrier ? body.carrier.trim() : null,
    estimated_delivery: !isPickup && body.estimatedDelivery ? body.estimatedDelivery.trim() : null,
    shipped_at: (/* @__PURE__ */ new Date()).toISOString(),
    farmer_notes: body.farmerNotes?.trim() ?? null
  });
  try {
    const { subject, html } = shippingEmail({
      customerName: order.customer_name,
      orderRef: order.order_ref,
      deliveryType: order.delivery_type,
      trackingNumber: body.trackingNumber,
      carrier: body.carrier,
      estimatedDelivery: body.estimatedDelivery,
      farmerNotes: body.farmerNotes,
      trackUrl: `${c.env.APP_BASE_URL}/track/${order.order_ref}`
    });
    await sendEmail(c.env.RESEND_API_KEY, c.env.EMAIL_FROM, {
      to: order.customer_email,
      subject,
      html,
      tags: [{ name: "type", value: isPickup ? "ready_pickup" : "shipped" }]
    });
  } catch (e) {
    console.error("[Ship Email Error]", e);
  }
  return ok({
    message: isPickup ? "Order marked as ready for pickup. Customer notified." : "Order shipped. Customer notified.",
    orderRef: ref
  });
});
admin.post("/orders/:ref/deliver", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  if (order.status !== "shipped")
    return err(`Order must be "shipped" to mark as delivered. Current: ${order.status}`, 409);
  await updateOrderStatus(c.env.DB, ref, "delivered", {
    delivered_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  return ok({ message: "Order marked as delivered.", orderRef: ref });
});
admin.delete("/session", requireAuth, async (c) => {
  const auth = c.get("auth");
  if (auth.sessionId) {
    await c.env.STORE_KV.delete(`session:${auth.sessionId}`);
  }
  return ok({ message: "Logged out" });
});
var admin_default = admin;

// src/routes/track.ts
var track = new Hono2();
track.get("/:ref", async (c) => {
  const ref = c.req.param("ref").trim().toUpperCase();
  const order = await getOrderByRef(c.env.DB, ref);
  if (!order)
    return notFound("Order not found");
  const items = await getOrderItems(c.env.DB, order.id);
  return ok({
    orderRef: order.order_ref,
    status: order.status,
    deliveryType: order.delivery_type,
    customer: {
      name: order.customer_name,
      email: maskEmail(order.customer_email),
      phone: maskPhone(order.customer_phone)
    },
    subtotal: order.subtotal,
    deliveryCharge: order.delivery_charge,
    total: order.total,
    // Payment info (only show URL, not internal IDs)
    paymentUrl: order.status === "accepted" ? order.payment_link_url ?? void 0 : void 0,
    // Shipping info (only show when shipped/delivered)
    shippingInfo: order.status === "shipped" || order.status === "delivered" ? {
      trackingNumber: order.tracking_number,
      carrier: order.carrier,
      estimatedDelivery: order.estimated_delivery
    } : null,
    // Timeline timestamps
    timeline: {
      placed: order.created_at,
      verified: order.status !== "pending" ? order.updated_at : null,
      paid: order.paid_at,
      shipped: order.shipped_at,
      delivered: order.delivered_at
    },
    farmerNotes: order.farmer_notes,
    rejectionReason: order.status === "rejected" ? order.rejection_reason : null,
    items: items.map((i) => ({
      name: i.product_name,
      emoji: itemEmoji(i.product_sku),
      quantity: i.quantity,
      unit: i.unit,
      unitPrice: i.unit_price,
      lineTotal: i.line_total,
      farmerName: i.farmer_name
    })),
    createdAt: order.created_at
  });
});
function maskEmail(email) {
  const [local, domain2] = email.split("@");
  if (!local || !domain2)
    return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain2}`;
}
__name(maskEmail, "maskEmail");
function maskPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return `****${digits.slice(-4)}`;
}
__name(maskPhone, "maskPhone");
function itemEmoji(sku) {
  const map = {
    "VEG-TOM": "\u{1F345}",
    "VEG-ONI": "\u{1F9C5}",
    "VEG-SPI": "\u{1F96C}",
    "VEG-POT": "\u{1F954}",
    "VEG-CAR": "\u{1F955}",
    "FRT-MNG": "\u{1F96D}",
    "FRT-BAN": "\u{1F34C}",
    "FRT-GUA": "\u{1F350}",
    "FRT-LIM": "\u{1F34B}",
    "DAI-MLK": "\u{1F95B}",
    "DAI-GHE": "\u{1F9C8}",
    "DAI-PAN": "\u{1F9C0}",
    "DAI-CRD": "\u{1F963}",
    "GRN-WHT": "\u{1F33E}",
    "GRN-RIC": "\u{1F35A}",
    "OIL-MUS": "\u{1FAD9}",
    "OIL-COC": "\u{1F965}",
    "HSH-JAG": "\u{1F36F}",
    "HSH-SUG": "\u{1F9C2}"
  };
  const prefix = sku.slice(0, 7);
  return map[prefix] ?? "\u{1F33F}";
}
__name(itemEmoji, "itemEmoji");
var track_default = track;

// src/routes/summaries.ts
var summaries = new Hono2();
summaries.get("/daily", requireAdmin, async (c) => {
  const date = c.req.query("date") ?? todayIST();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return err("date must be YYYY-MM-DD");
  const summary = await getDailySummary(c.env.DB, date);
  if (!summary)
    return notFound(`No summary for ${date}`);
  return ok({
    ...summary,
    topProducts: JSON.parse(summary.top_products_json ?? "[]"),
    lowStockAlerts: JSON.parse(summary.low_stock_alerts_json ?? "[]"),
    categoryBreakdown: JSON.parse(summary.category_breakdown_json ?? "{}")
  });
});
summaries.post("/generate", requireAdmin, async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const targetDate = body.date ?? todayIST();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate))
    return err("date must be YYYY-MM-DD");
  const ordersRes = await c.env.DB.prepare(`
    SELECT o.id, o.status, o.subtotal, o.total, o.delivery_charge, o.created_at FROM orders o
    WHERE DATE(o.created_at) = ?
  `).bind(targetDate).all();
  const orders2 = ordersRes.results;
  const completed = orders2.filter((o) => ["paid", "shipped", "delivered"].includes(o.status));
  const cancelled = orders2.filter((o) => ["rejected", "cancelled"].includes(o.status));
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0);
  const completedIds = completed.map((o) => o.id);
  let topProductsMap = {};
  let totalItemsSold = 0;
  let totalFarmerPayout = 0;
  const categoryMap = {};
  for (const oid of completedIds) {
    const itemsRes = await c.env.DB.prepare(
      "SELECT oi.*, p.category, p.emoji FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?"
    ).bind(oid).all();
    for (const item of itemsRes.results) {
      totalItemsSold += item.quantity;
      totalFarmerPayout += item.cost_price * item.quantity;
      categoryMap[item.category] = (categoryMap[item.category] ?? 0) + item.line_total;
      if (!topProductsMap[item.product_sku]) {
        topProductsMap[item.product_sku] = { name: item.product_name, qty: 0, revenue: 0, emoji: item.emoji };
      }
      topProductsMap[item.product_sku].qty += item.quantity;
      topProductsMap[item.product_sku].revenue += item.line_total;
    }
  }
  const topProducts = Object.entries(topProductsMap).sort(([, a], [, b]) => b.revenue - a.revenue).slice(0, 5).map(([sku, v]) => ({ sku, ...v }));
  const lowStockRes = await c.env.DB.prepare(
    `SELECT id, name, sku, category, emoji, stock_qty, unit FROM products WHERE stock_qty < 10 AND active = 1 ORDER BY stock_qty ASC LIMIT 10`
  ).all();
  const lowStockAlerts = lowStockRes.results.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category,
    emoji: p.emoji,
    stockQty: p.stock_qty,
    unit: p.unit
  }));
  let aiInsights = null;
  if (c.env.ANTHROPIC_API_KEY) {
    try {
      aiInsights = await generateAIInsights(c.env.ANTHROPIC_API_KEY, {
        date: targetDate,
        totalOrders: orders2.length,
        completedOrders: completed.length,
        totalRevenue,
        topProducts,
        lowStockAlerts,
        categoryBreakdown: categoryMap
      });
    } catch (e) {
      console.error("[AI Insights Error]", e);
    }
  }
  await upsertDailySummary(c.env.DB, targetDate, {
    total_orders: orders2.length,
    completed_orders: completed.length,
    cancelled_orders: cancelled.length,
    total_revenue: totalRevenue,
    total_farmer_payout: totalFarmerPayout,
    total_items_sold: totalItemsSold,
    top_products_json: JSON.stringify(topProducts),
    low_stock_alerts_json: JSON.stringify(lowStockAlerts),
    category_breakdown_json: JSON.stringify(categoryMap),
    ai_insights: aiInsights
  });
  return ok({
    date: targetDate,
    totalOrders: orders2.length,
    completedOrders: completed.length,
    cancelledOrders: cancelled.length,
    totalRevenue,
    totalFarmerPayout,
    totalItemsSold,
    topProducts,
    lowStockAlerts,
    categoryBreakdown: categoryMap,
    aiInsights,
    message: "Summary generated"
  });
});
async function generateAIInsights(apiKey, data) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are an agricultural e-commerce analyst for Kissan Connect.
Analyze today's sales data and provide 3 actionable insights in 2-3 sentences each.
Focus on crop movement trends, low stock risks, and farmer income.

Data: ${JSON.stringify(data, null, 2)}

Respond in plain text, no markdown formatting.`
        }
      ]
    })
  });
  if (!res.ok)
    throw new Error(`Anthropic API: ${res.status}`);
  const json = await res.json();
  return json.content[0]?.text ?? "";
}
__name(generateAIInsights, "generateAIInsights");
function todayIST() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
__name(todayIST, "todayIST");
var summaries_default = summaries;

// src/index.ts
var app = new Hono2();
app.use("*", async (c, next) => {
  const origin = c.req.header("Origin") ?? "";
  const allowed = (c.env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim());
  const isDev = c.env.ENVIRONMENT !== "production";
  const allow = isDev || allowed.includes(origin) || allowed.includes("*");
  if (allow) {
    c.header("Access-Control-Allow-Origin", origin || "*");
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-Key, X-Session-ID");
    c.header("Access-Control-Expose-Headers", "X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset");
    c.header("Access-Control-Max-Age", "86400");
  }
  if (c.req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }
  return next();
});
app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
});
app.use("/api/*", async (c, next) => {
  const path = c.req.path;
  if (path.startsWith("/api/admin") || path.startsWith("/api/webhooks") || path.startsWith("/api/summaries")) {
    return next();
  }
  return rateLimitMiddleware(c, next);
});
app.get(
  "/health",
  (c) => Response.json({
    status: "ok",
    service: "kissan-api",
    version: "1.0.0",
    env: c.env.ENVIRONMENT,
    ts: (/* @__PURE__ */ new Date()).toISOString()
  })
);
app.route("/api/catalog", catalog_default);
app.route("/api", orders_default);
app.route("/api", otp_default);
app.route("/api/webhooks", payments_default);
app.route("/api/admin", admin_default);
app.route("/api/track", track_default);
app.route("/api/summaries", summaries_default);
app.onError((err2, c) => {
  console.error("[Unhandled Error]", err2);
  return Response.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
});
app.notFound(
  (c) => Response.json(
    { success: false, error: "Route not found", path: c.req.path },
    { status: 404 }
  )
);
var src_default = app;

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-5h8BBh/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-5h8BBh/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
