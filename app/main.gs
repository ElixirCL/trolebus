//#region \0@oxc-project+runtime@0.148.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region build/dev/javascript/prelude.mjs
var CustomType = class {
	withFields(fields) {
		let properties = Object.keys(this).map((label) => label in fields ? fields[label] : this[label]);
		return new this.constructor(...properties);
	}
};
var List = class {
	static fromArray(array, tail) {
		return toList(array, tail);
	}
	[Symbol.iterator]() {
		return new ListIterator(this);
	}
	toArray() {
		return [...this];
	}
	atLeastLength(desired) {
		let current = this;
		while (desired-- > 0 && current) current = current.tail;
		return current !== void 0;
	}
	hasLength(desired) {
		let current = this;
		while (desired-- > 0 && current) current = current.tail;
		return desired === -1 && current instanceof Empty;
	}
	countLength() {
		let current = this;
		let length = 0;
		while (current) {
			current = current.tail;
			length++;
		}
		return length - 1;
	}
};
function prepend(element, tail) {
	return new NonEmpty(element, tail);
}
function toList(elements, tail) {
	let t = tail || List$Empty$const;
	for (let i = elements.length - 1; i >= 0; --i) t = new NonEmpty(elements[i], t);
	return t;
}
var _current = /* @__PURE__ */ new WeakMap();
var ListIterator = class {
	constructor(current) {
		_classPrivateFieldInitSpec(this, _current, void 0);
		_classPrivateFieldSet2(_current, this, current);
	}
	next() {
		if (_classPrivateFieldGet2(_current, this) instanceof Empty) return { done: true };
		else {
			let { head, tail } = _classPrivateFieldGet2(_current, this);
			_classPrivateFieldSet2(_current, this, tail);
			return {
				value: head,
				done: false
			};
		}
	}
};
var Empty = class extends List {};
var List$Empty$const = new Empty();
var List$Empty = () => List$Empty$const;
var NonEmpty = class extends List {
	constructor(head, tail) {
		super();
		this.head = head;
		this.tail = tail;
	}
};
var List$NonEmpty = (head, tail) => new NonEmpty(head, tail);
/**
* A bit array is a contiguous sequence of bits similar to Erlang's Binary type.
*/
var BitArray = class {
	/**
	* Constructs a new bit array from a `Uint8Array`, an optional size in
	* bits, and an optional bit offset.
	*
	* If no bit size is specified it is taken as `buffer.length * 8`, i.e. all
	* bytes in the buffer make up the new bit array's data.
	*
	* If no bit offset is specified it defaults to zero, i.e. there are no unused
	* high bits in the first byte of the buffer.
	*
	* @param {Uint8Array} buffer
	* @param {number} [bitSize]
	* @param {number} [bitOffset]
	*/
	constructor(buffer, bitSize, bitOffset) {
		_defineProperty(
			this,
			/**
			* The size in bits of this bit array's data.
			*
			* @type {number}
			*/
			"bitSize",
			void 0
		);
		_defineProperty(
			this,
			/**
			* The size in bytes of this bit array's data. If this bit array doesn't store
			* a whole number of bytes then this value is rounded up.
			*
			* @type {number}
			*/
			"byteSize",
			void 0
		);
		_defineProperty(
			this,
			/**
			* The number of unused high bits in the first byte of this bit array's
			* buffer prior to the start of its data. The value of any unused high bits is
			* undefined.
			*
			* The bit offset will be in the range 0-7.
			*
			* @type {number}
			*/
			"bitOffset",
			void 0
		);
		_defineProperty(
			this,
			/**
			* The raw bytes that hold this bit array's data.
			*
			* If `bitOffset` is not zero then there are unused high bits in the first
			* byte of this buffer.
			*
			* If `bitOffset + bitSize` is not a multiple of 8 then there are unused low
			* bits in the last byte of this buffer.
			*
			* @type {Uint8Array}
			*/
			"rawBuffer",
			void 0
		);
		if (!(buffer instanceof Uint8Array)) throw globalThis.Error("BitArray can only be constructed from a Uint8Array");
		this.bitSize = bitSize ?? buffer.length * 8;
		this.byteSize = Math.trunc((this.bitSize + 7) / 8);
		this.bitOffset = bitOffset ?? 0;
		if (this.bitSize < 0) throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);
		if (this.bitOffset < 0 || this.bitOffset > 7) throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);
		if (buffer.length !== Math.trunc((this.bitOffset + this.bitSize + 7) / 8)) throw globalThis.Error("BitArray buffer length is invalid");
		this.rawBuffer = buffer;
	}
	/**
	* Returns a specific byte in this bit array. If the byte index is out of
	* range then `undefined` is returned.
	*
	* When returning the final byte of a bit array with a bit size that's not a
	* multiple of 8, the content of the unused low bits are undefined.
	*
	* @param {number} index
	* @returns {number | undefined}
	*/
	byteAt(index) {
		if (index < 0 || index >= this.byteSize) return;
		return bitArrayByteAt(this.rawBuffer, this.bitOffset, index);
	}
	equals(other) {
		if (this.bitSize !== other.bitSize) return false;
		const wholeByteCount = Math.trunc(this.bitSize / 8);
		if (this.bitOffset === 0 && other.bitOffset === 0) {
			for (let i = 0; i < wholeByteCount; i++) if (this.rawBuffer[i] !== other.rawBuffer[i]) return false;
			const trailingBitsCount = this.bitSize % 8;
			if (trailingBitsCount) {
				const unusedLowBitCount = 8 - trailingBitsCount;
				if (this.rawBuffer[wholeByteCount] >> unusedLowBitCount !== other.rawBuffer[wholeByteCount] >> unusedLowBitCount) return false;
			}
		} else {
			for (let i = 0; i < wholeByteCount; i++) if (bitArrayByteAt(this.rawBuffer, this.bitOffset, i) !== bitArrayByteAt(other.rawBuffer, other.bitOffset, i)) return false;
			const trailingBitsCount = this.bitSize % 8;
			if (trailingBitsCount) {
				const a = bitArrayByteAt(this.rawBuffer, this.bitOffset, wholeByteCount);
				const b = bitArrayByteAt(other.rawBuffer, other.bitOffset, wholeByteCount);
				const unusedLowBitCount = 8 - trailingBitsCount;
				if (a >> unusedLowBitCount !== b >> unusedLowBitCount) return false;
			}
		}
		return true;
	}
	/**
	* Returns this bit array's internal buffer.
	*
	* @deprecated
	*
	* @returns {Uint8Array}
	*/
	get buffer() {
		if (this.bitOffset !== 0 || this.bitSize % 8 !== 0) throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");
		return this.rawBuffer;
	}
	/**
	* Returns the length in bytes of this bit array's internal buffer.
	*
	* @deprecated
	*
	* @returns {number}
	*/
	get length() {
		if (this.bitOffset !== 0 || this.bitSize % 8 !== 0) throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");
		return this.rawBuffer.length;
	}
};
/**
* Returns the nth byte in the given buffer, after applying the specified bit
* offset. If the index is out of bounds then zero is returned.
*
* @param {Uint8Array} buffer
* @param {number} bitOffset
* @param {number} index
* @returns {number}
*/
function bitArrayByteAt(buffer, bitOffset, index) {
	if (bitOffset === 0) return buffer[index] ?? 0;
	else return buffer[index] << bitOffset & 255 | buffer[index + 1] >> 8 - bitOffset;
}
var Result = class Result extends CustomType {
	static isResult(data) {
		return data instanceof Result;
	}
};
var Ok = class extends Result {
	constructor(value) {
		super();
		this[0] = value;
	}
	isOk() {
		return true;
	}
};
var Result$Ok = (value) => new Ok(value);
var Error = class extends Result {
	constructor(detail) {
		super();
		this[0] = detail;
	}
	isOk() {
		return false;
	}
};
var Result$Error = (detail) => new Error(detail);
function isEqual(x, y) {
	let values = [x, y];
	while (values.length) {
		let a = values.pop();
		let b = values.pop();
		if (a === b) continue;
		if (!isObject(a) || !isObject(b)) return false;
		if (!structurallyCompatibleObjects(a, b) || unequalDates(a, b) || unequalBuffers(a, b) || unequalArrays(a, b) || unequalMaps(a, b) || unequalSets(a, b) || unequalRegExps(a, b)) return false;
		const proto = Object.getPrototypeOf(a);
		if (proto !== null && typeof proto.equals === "function") try {
			if (a.equals(b)) continue;
			else return false;
		} catch {}
		let [keys, get] = getters(a);
		const ka = keys(a);
		const kb = keys(b);
		if (ka.length !== kb.length) return false;
		for (let k of ka) values.push(get(a, k), get(b, k));
	}
	return true;
}
function getters(object) {
	if (object instanceof Map) return [(x) => x.keys(), (x, y) => x.get(y)];
	else {
		let extra = object instanceof globalThis.Error ? ["message"] : [];
		return [(x) => [...extra, ...Object.keys(x)], (x, y) => x[y]];
	}
}
function unequalDates(a, b) {
	return a instanceof Date && (a > b || a < b);
}
function unequalBuffers(a, b) {
	return !(a instanceof BitArray) && a.buffer instanceof ArrayBuffer && a.BYTES_PER_ELEMENT && !(a.byteLength === b.byteLength && a.every((n, i) => n === b[i]));
}
function unequalArrays(a, b) {
	return Array.isArray(a) && a.length !== b.length;
}
function unequalMaps(a, b) {
	return a instanceof Map && a.size !== b.size;
}
function unequalSets(a, b) {
	return a instanceof Set && (a.size != b.size || [...a].some((e) => !b.has(e)));
}
function unequalRegExps(a, b) {
	return a instanceof RegExp && (a.source !== b.source || a.flags !== b.flags);
}
function isObject(a) {
	return typeof a === "object" && a !== null;
}
function structurallyCompatibleObjects(a, b) {
	if (typeof a !== "object" && typeof b !== "object" && (!a || !b)) return false;
	if ([
		Promise,
		WeakSet,
		WeakMap,
		Function
	].some((c) => a instanceof c)) return false;
	return a.constructor === b.constructor;
}
function makeError(variant, file, module, line, fn, message, extra) {
	let error = new globalThis.Error(message);
	error.gleam_error = variant;
	error.file = file;
	error.module = module;
	error.line = line;
	error.function = fn;
	error.fn = fn;
	for (let k in extra) error[k] = extra[k];
	return error;
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/option.mjs
var None$1 = class extends CustomType {};
new None$1();
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/order.mjs
/**
* Less-than
*/
var Lt = class extends CustomType {};
new Lt();
/**
* Equal
*/
var Eq = class extends CustomType {};
new Eq();
/**
* Greater than
*/
var Gt = class extends CustomType {};
new Gt();
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/dict.mjs
/**
* This file uses jsdoc to annotate types.
* These types can be checked using the typescript compiler with "checkjs" option.
*/
var referenceMap = /* @__PURE__ */ new WeakMap();
var tempDataView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
var referenceUID = 0;
/**
* hash the object by reference using a weak map and incrementing uid
* @param {any} o
* @returns {number}
*/
function hashByReference(o) {
	const known = referenceMap.get(o);
	if (known !== void 0) return known;
	const hash = referenceUID++;
	if (referenceUID === 2147483647) referenceUID = 0;
	referenceMap.set(o, hash);
	return hash;
}
/**
* merge two hashes in an order sensitive way
* @param {number} a
* @param {number} b
* @returns {number}
*/
function hashMerge(a, b) {
	return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
/**
* standard string hash popularised by Java
* @param {string} s
* @returns {number}
*/
function hashString(s) {
	let hash = 0;
	const len = s.length;
	for (let i = 0; i < len; i++) hash = Math.imul(31, hash) + s.charCodeAt(i) | 0;
	return hash;
}
/**
* hash a number by converting to two integers and do some jumbling
* @param {number} n
* @returns {number}
*/
function hashNumber(n) {
	tempDataView.setFloat64(0, n);
	const i = tempDataView.getInt32(0);
	const j = tempDataView.getInt32(4);
	return Math.imul(73244475, i >> 16 ^ i) ^ j;
}
/**
* hash a BigInt by converting it to a string and hashing that
* @param {BigInt} n
* @returns {number}
*/
function hashBigInt(n) {
	return hashString(n.toString());
}
/**
* hash any js object
* @param {any} o
* @returns {number}
*/
function hashObject(o) {
	const proto = Object.getPrototypeOf(o);
	if (proto !== null && typeof proto.hashCode === "function") try {
		const code = o.hashCode(o);
		if (typeof code === "number") return code;
	} catch {}
	if (o instanceof Promise || o instanceof WeakSet || o instanceof WeakMap) return hashByReference(o);
	if (o instanceof Date) return hashNumber(o.getTime());
	let h = 0;
	if (o instanceof ArrayBuffer) o = new Uint8Array(o);
	if (Array.isArray(o) || o instanceof Uint8Array) for (let i = 0; i < o.length; i++) h = Math.imul(31, h) + getHash(o[i]) | 0;
	else if (o instanceof Set) o.forEach((v) => {
		h = h + getHash(v) | 0;
	});
	else if (o instanceof Map) o.forEach((v, k) => {
		h = h + hashMerge(getHash(v), getHash(k)) | 0;
	});
	else {
		const keys = Object.keys(o);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			const v = o[k];
			h = h + hashMerge(getHash(v), hashString(k)) | 0;
		}
	}
	return h;
}
/**
* hash any js value
* @param {any} u
* @returns {number}
*/
function getHash(u) {
	if (u === null) return 1108378658;
	if (u === void 0) return 1108378659;
	if (u === true) return 1108378657;
	if (u === false) return 1108378656;
	switch (typeof u) {
		case "number": return hashNumber(u);
		case "string": return hashString(u);
		case "bigint": return hashBigInt(u);
		case "object": return hashObject(u);
		case "symbol": return hashByReference(u);
		case "function": return hashByReference(u);
		default: return 0;
	}
}
/**
* An implementation of the CHAMP data structure, an optimised HAMT.
*
* See: M. J. Steindorfer, J.J. Vinju (2015). Optimizing Hash-Array Mapped Tries for
Fast and Lean Immutable JVM Collections. Available: https://michael.steindorfer.name/publications/oopsla15.pdf
*/
var Dict = class {
	constructor(size, root) {
		this.size = size;
		this.root = root;
	}
};
var bits = 5;
var mask = 31;
var noElementMarker = Symbol();
var _Node_brand = /* @__PURE__ */ new WeakSet();
var Node = class Node {
	constructor(generation, datamap, nodemap, data) {
		_classPrivateMethodInitSpec(this, _Node_brand);
		this.datamap = datamap;
		this.nodemap = nodemap;
		this.data = data;
		this.generation = generation;
	}
	equals(other) {
		if (this === other) return true;
		if (!(other instanceof Node)) return false;
		if (this.datamap !== other.datamap || this.nodemap !== other.nodemap) return false;
		const leftData = this.data;
		const rightData = other.data;
		if (leftData.length !== rightData.length) return false;
		if (this.datamap === 0 && this.nodemap === 0) return _assertClassBrand(_Node_brand, this, _equalsOverflowEntries).call(this, rightData);
		const edgesStart = leftData.length - popcount(this.nodemap);
		for (let i = 0; i < edgesStart; i += 2) if (!isEqual(leftData[i], rightData[i]) || !isEqual(leftData[i + 1], rightData[i + 1])) return false;
		for (let i = edgesStart; i < leftData.length; ++i) if (!leftData[i].equals(rightData[i])) return false;
		return true;
	}
	hashCode() {
		const data = this.data;
		const edgesStart = data.length - popcount(this.nodemap);
		let hash = 0;
		for (let i = 0; i < edgesStart; i += 2) hash = hash + hashMerge(getHash(data[i + 1]), getHash(data[i])) | 0;
		for (let i = edgesStart; i < data.length; ++i) hash = hash + data[i].hashCode() | 0;
		return hash;
	}
};
function _equalsOverflowEntries(otherData) {
	const data = this.data;
	entries: for (let i = 0; i < data.length; i += 2) {
		for (let j = 0; j < otherData.length; j += 2) if (isEqual(data[i], otherData[j])) {
			if (!isEqual(data[i + 1], otherData[j + 1])) return false;
			continue entries;
		}
		return false;
	}
	return true;
}
var emptyNode = /* @__PURE__ */ newNode(0);
var emptyDict = /* @__PURE__ */ new Dict(0, emptyNode);
var errorNil = /* @__PURE__ */ Result$Error(void 0);
function newNode(generation) {
	return new Node(generation, 0, 0, []);
}
/**
* Copies a node and its data array if it's from another generation, making it safe
* to mutate the node.
*/
function copyNode(node, generation) {
	if (node.generation === generation) return node;
	const newData = node.data.slice(0);
	return new Node(generation, node.datamap, node.nodemap, newData);
}
/**
* Copies a node if needed and sets a new value.
*/
function copyAndSet(node, generation, idx, val) {
	if (node.data[idx] === val) return node;
	node = copyNode(node, generation);
	node.data[idx] = val;
	return node;
}
/**
* Copies a node if needed, and then inserts a new key-value pair.
*/
function copyAndInsertPair(node, generation, bit, idx, key, val) {
	const data = node.data;
	const length = data.length;
	const newData = new Array(length + 2);
	let readIndex = 0;
	let writeIndex = 0;
	while (readIndex < idx) newData[writeIndex++] = data[readIndex++];
	newData[writeIndex++] = key;
	newData[writeIndex++] = val;
	while (readIndex < length) newData[writeIndex++] = data[readIndex++];
	return new Node(generation, node.datamap | bit, node.nodemap, newData);
}
function make() {
	return emptyDict;
}
function size(dict) {
	return dict.size;
}
function get(dict, key) {
	const result = lookup(dict.root, key, getHash(key));
	return result !== noElementMarker ? Result$Ok(result) : errorNil;
}
function lookup(node, key, hash) {
	for (let shift = 0; shift < 32; shift += bits) {
		const data = node.data;
		const bit = hashbit(hash, shift);
		if (node.nodemap & bit) node = data[data.length - 1 - index(node.nodemap, bit)];
		else if (node.datamap & bit) {
			const dataidx = Math.imul(index(node.datamap, bit), 2);
			return isEqual(key, data[dataidx]) ? data[dataidx + 1] : noElementMarker;
		} else return noElementMarker;
	}
	const overflow = node.data;
	for (let i = 0; i < overflow.length; i += 2) if (isEqual(key, overflow[i])) return overflow[i + 1];
	return noElementMarker;
}
/**
* We use "transient" values to allow for safer internal mutations of the data
* structure. This is an optimisation only. No mutable API is exposed to the user.
*
* Transients are to be treated as having a linear (single-use, think rust) type.
* A transient value becomes invalid as soon as it's passed to one of the functions.
*
* Internally, we track a "generation" value on each node. If the generation
* doesn't match the one for the current transient, we have to copy - the node
* could still be referenced by another dict instance!
* After that, no other references than the transient one exists, so it's safe
* to mutate in place.
*/
function toTransient(dict) {
	return {
		generation: nextGeneration(dict),
		root: dict.root,
		size: dict.size,
		dict
	};
}
/**
* Consume a transient, producing a normal Dict again.
*/
function fromTransient(transient) {
	if (transient.root === transient.dict.root) return transient.dict;
	return new Dict(transient.size, transient.root);
}
/**
* Find and allocate the next generation id.
*
* @template K,V
* @param {Dict<K,V>} dict
* @returns {number}
*/
function nextGeneration(dict) {
	const root = dict.root;
	if (root.generation < Number.MAX_SAFE_INTEGER) return root.generation + 1;
	const queue = [root];
	while (queue.length) {
		const node = queue.pop();
		node.generation = 0;
		const nodeStart = node.data.length - popcount(node.nodemap);
		for (let i = nodeStart; i < node.data.length; ++i) queue.push(node.data[i]);
	}
	return 1;
}
var globalTransient = /* @__PURE__ */ toTransient(emptyDict);
function insert(dict, key, value) {
	globalTransient.generation = nextGeneration(dict);
	globalTransient.size = dict.size;
	const hash = getHash(key);
	const root = insertIntoNode(globalTransient, dict.root, key, value, hash, 0);
	if (root === dict.root) return dict;
	return new Dict(globalTransient.size, root);
}
/**
* Consume a transient, writing a new key/value pair if the key doesn't exist or updating
* the existing value with a function if it does.
*
* Returns a new transient.
*/
function destructiveTransientUpdateWith(key, fun, value, transient) {
	const hash = getHash(key);
	const existing = lookup(transient.root, key, hash);
	if (existing !== noElementMarker) value = fun(existing);
	transient.root = insertIntoNode(transient, transient.root, key, value, hash, 0);
	return transient;
}
function insertIntoNode(transient, node, key, value, hash, shift) {
	const data = node.data;
	const generation = transient.generation;
	if (shift > 32) {
		for (let i = 0; i < data.length; i += 2) if (isEqual(key, data[i])) return copyAndSet(node, generation, i + 1, value);
		transient.size += 1;
		return copyAndInsertPair(node, generation, 0, data.length, key, value);
	}
	const bit = hashbit(hash, shift);
	if (node.nodemap & bit) {
		const nodeidx = data.length - 1 - index(node.nodemap, bit);
		let child = data[nodeidx];
		child = insertIntoNode(transient, child, key, value, hash, shift + bits);
		return copyAndSet(node, generation, nodeidx, child);
	}
	const dataidx = Math.imul(index(node.datamap, bit), 2);
	if ((node.datamap & bit) === 0) {
		transient.size += 1;
		return copyAndInsertPair(node, generation, bit, dataidx, key, value);
	}
	if (isEqual(key, data[dataidx])) return copyAndSet(node, generation, dataidx + 1, value);
	const childShift = shift + bits;
	let child = emptyNode;
	child = insertIntoNode(transient, child, key, value, hash, childShift);
	const key2 = data[dataidx];
	const value2 = data[dataidx + 1];
	const hash2 = getHash(key2);
	child = insertIntoNode(transient, child, key2, value2, hash2, childShift);
	transient.size -= 1;
	const length = data.length;
	const nodeidx = length - 1 - index(node.nodemap, bit);
	const newData = new Array(length - 1);
	let readIndex = 0;
	let writeIndex = 0;
	while (readIndex < dataidx) newData[writeIndex++] = data[readIndex++];
	readIndex += 2;
	while (readIndex <= nodeidx) newData[writeIndex++] = data[readIndex++];
	newData[writeIndex++] = child;
	while (readIndex < length) newData[writeIndex++] = data[readIndex++];
	return new Node(generation, node.datamap ^ bit, node.nodemap | bit, newData);
}
function fold$1(dict, state, fun) {
	const queue = [dict.root];
	while (queue.length) {
		const node = queue.pop();
		const data = node.data;
		const edgesStart = data.length - popcount(node.nodemap);
		for (let i = 0; i < edgesStart; i += 2) state = fun(state, data[i], data[i + 1]);
		for (let i = edgesStart; i < data.length; ++i) queue.push(data[i]);
	}
	return state;
}
/**
* How many `1` bits are set in a 32-bit integer.
*/
function popcount(n) {
	n -= n >>> 1 & 1431655765;
	n = (n & 858993459) + (n >>> 2 & 858993459);
	return Math.imul(n + (n >>> 4) & 252645135, 16843009) >>> 24;
}
/**
* Given a population bitmap and a bit selected from that map, returns
* how many less significant 1 bits there are.
*
* For example, index(10101, 100) returns 1, since there is a single less
* significant `1` bit. This translates to the 0-based "index" of that bit.
*/
function index(bitmap, bit) {
	return popcount(bitmap & bit - 1);
}
/**
* Extracts a single slice of the hash, and returns a bitmask for the resulting value.
* For example, if the slice returns 5, this function returns 10000 = 1 << 5.
*/
function hashbit(hash, shift) {
	return 1 << (hash >>> shift & mask);
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/dict.mjs
function do_combine(combine, left, right) {
	let _block;
	if (size(left) >= size(right)) _block = [
		left,
		right,
		combine
	];
	else _block = [
		right,
		left,
		(k, l, r) => {
			return combine(k, r, l);
		}
	];
	let $ = _block;
	let big = $[0];
	let small = $[1];
	let combine$1 = $[2];
	return fromTransient(fold$1(small, toTransient(big), (transient, key, value) => {
		let update = (existing) => {
			return combine$1(key, existing, value);
		};
		return destructiveTransientUpdateWith(key, update, value, transient);
	}));
}
/**
* Creates a new dict from a pair of given dicts by combining their entries.
*
* If there are entries with the same keys in both dicts the given function is
* used to determine the new value to use in the resulting dict.
*
* ## Examples
*
* ```gleam
* let a = dict.from_list([#("a", 0), #("b", 1)])
* let b = dict.from_list([#("a", 2), #("c", 3)])
* assert dict.combine(a, b, fn(one, other) { one + other })
*   == dict.from_list([#("a", 2), #("b", 1), #("c", 3)])
* ```
*/
function combine(dict, other, fun) {
	return do_combine((_, l, r) => {
		return fun(l, r);
	}, dict, other);
}
/**
* Creates a new dict from a pair of given dicts by combining their entries.
*
* If there are entries with the same keys in both dicts the entry from the
* second dict takes precedence.
*
* ## Examples
*
* ```gleam
* let a = dict.from_list([#("a", 0), #("b", 1)])
* let b = dict.from_list([#("b", 2), #("c", 3)])
* assert dict.merge(a, b) == dict.from_list([#("a", 0), #("b", 2), #("c", 3)])
* ```
*/
function merge(dict, new_entries) {
	return combine(dict, new_entries, (_, new_entry) => {
		return new_entry;
	});
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/list.mjs
var Ascending = class extends CustomType {};
new Ascending();
var Descending = class extends CustomType {};
new Descending();
function length_loop(loop$list, loop$count) {
	while (true) {
		let list = loop$list;
		let count = loop$count;
		if (list instanceof Empty) return count;
		else {
			loop$list = list.tail;
			loop$count = count + 1;
		}
	}
}
/**
* Counts the number of elements in a given list.
*
* This function has to traverse the list to determine the number of elements,
* so it runs in linear time.
*
* This function is natively implemented by the virtual machine and is highly
* optimised.
*
* ## Examples
*
* ```gleam
* assert list.length([]) == 0
* ```
*
* ```gleam
* assert list.length([1]) == 1
* ```
*
* ```gleam
* assert list.length([1, 2]) == 2
* ```
*/
function length(list) {
	return length_loop(list, 0);
}
/**
* Reverses a list and prepends it to another list.
* This function runs in linear time, proportional to the length of the list
* to prepend.
* 
* @ignore
*/
function reverse_and_prepend(loop$prefix, loop$suffix) {
	while (true) {
		let prefix = loop$prefix;
		let suffix = loop$suffix;
		if (prefix instanceof Empty) return suffix;
		else {
			let first$1 = prefix.head;
			loop$prefix = prefix.tail;
			loop$suffix = prepend(first$1, suffix);
		}
	}
}
/**
* Creates a new list from a given list containing the same elements but in the
* opposite order.
*
* This function has to traverse the list to create the new reversed list, so
* it runs in linear time.
*
* This function is natively implemented by the virtual machine and is highly
* optimised.
*
* ## Examples
*
* ```gleam
* assert list.reverse([]) == []
* ```
*
* ```gleam
* assert list.reverse([1]) == [1]
* ```
*
* ```gleam
* assert list.reverse([1, 2]) == [2, 1]
* ```
*/
function reverse$2(list) {
	return reverse_and_prepend(list, List$Empty$const);
}
/**
* Gets the first element from the start of the list, if there is one.
*
* ## Examples
*
* ```gleam
* assert list.first([]) == Error(Nil)
* ```
*
* ```gleam
* assert list.first([0]) == Ok(0)
* ```
*
* ```gleam
* assert list.first([1, 2]) == Ok(1)
* ```
*/
function first(list) {
	if (list instanceof Empty) return new Error(void 0);
	else {
		let first$1 = list.head;
		return new Ok(first$1);
	}
}
function filter_map_loop(loop$list, loop$fun, loop$acc) {
	while (true) {
		let list = loop$list;
		let fun = loop$fun;
		let acc = loop$acc;
		if (list instanceof Empty) return reverse$2(acc);
		else {
			let first$1 = list.head;
			let rest$1 = list.tail;
			let _block;
			let $ = fun(first$1);
			if ($ instanceof Ok) {
				let first$2 = $[0];
				_block = prepend(first$2, acc);
			} else _block = acc;
			let new_acc = _block;
			loop$list = rest$1;
			loop$fun = fun;
			loop$acc = new_acc;
		}
	}
}
/**
* Returns a new list containing only the elements from the first list for
* which the given functions returns `Ok(_)`.
*
* ## Examples
*
* ```gleam
* assert list.filter_map([2, 4, 6, 1], Error) == []
* ```
*
* ```gleam
* assert list.filter_map([2, 4, 6, 1], fn(x) { Ok(x + 1) }) == [3, 5, 7, 2]
* ```
*/
function filter_map(list, fun) {
	return filter_map_loop(list, fun, List$Empty$const);
}
function map_loop(loop$list, loop$fun, loop$acc) {
	while (true) {
		let list = loop$list;
		let fun = loop$fun;
		let acc = loop$acc;
		if (list instanceof Empty) return reverse$2(acc);
		else {
			let first$1 = list.head;
			loop$list = list.tail;
			loop$fun = fun;
			loop$acc = prepend(fun(first$1), acc);
		}
	}
}
/**
* Returns a new list containing the results of applying the supplied function to each element.
*
* ## Examples
*
* ```gleam
* assert list.map([2, 4, 6], fn(x) { x * 2 }) == [4, 8, 12]
* ```
*/
function map(list, fun) {
	return map_loop(list, fun, List$Empty$const);
}
function append_loop(loop$first, loop$second) {
	while (true) {
		let first = loop$first;
		let second = loop$second;
		if (first instanceof Empty) return second;
		else {
			let first$1 = first.head;
			loop$first = first.tail;
			loop$second = prepend(first$1, second);
		}
	}
}
/**
* Joins one list onto the end of another.
*
* This function runs in linear time, and it traverses and copies the first
* list.
*
* ## Examples
*
* ```gleam
* assert list.append([1, 2], [3]) == [1, 2, 3]
* ```
*/
function append$1(first, second) {
	return append_loop(reverse$2(first), second);
}
function flatten_loop(loop$lists, loop$acc) {
	while (true) {
		let lists = loop$lists;
		let acc = loop$acc;
		if (lists instanceof Empty) return reverse$2(acc);
		else {
			let list = lists.head;
			loop$lists = lists.tail;
			loop$acc = reverse_and_prepend(list, acc);
		}
	}
}
/**
* Joins a list of lists into a single list.
*
* This function traverses all elements twice on the JavaScript target.
* This function traverses all elements once on the Erlang target.
*
* ## Examples
*
* ```gleam
* assert list.flatten([[1], [2, 3], []]) == [1, 2, 3]
* ```
*/
function flatten(lists) {
	return flatten_loop(lists, List$Empty$const);
}
/**
* Maps the list with the given function into a list of lists, and then flattens it.
*
* ## Examples
*
* ```gleam
* assert list.flat_map([2, 4, 6], fn(x) { [x, x + 1] }) == [2, 3, 4, 5, 6, 7]
* ```
*/
function flat_map(list, fun) {
	return flatten(map(list, fun));
}
/**
* Reduces a list of elements into a single value by calling a given function
* on each element, going from left to right.
*
* `fold([1, 2, 3], 0, add)` is the equivalent of
* `add(add(add(0, 1), 2), 3)`.
*
* This function runs in linear time.
*/
function fold(loop$list, loop$initial, loop$fun) {
	while (true) {
		let list = loop$list;
		let initial = loop$initial;
		let fun = loop$fun;
		if (list instanceof Empty) return initial;
		else {
			let first$1 = list.head;
			loop$list = list.tail;
			loop$initial = fun(initial, first$1);
			loop$fun = fun;
		}
	}
}
/**
* Calls a function for each element in a list, discarding the return value.
*
* Useful for calling a side effect for every item of a list.
*
* ```gleam
* import gleam/io
*
* assert list.each(["1", "2", "3"], io.println) == Nil
* // 1
* // 2
* // 3
* ```
*/
function each(loop$list, loop$f) {
	while (true) {
		let list = loop$list;
		let f = loop$f;
		if (list instanceof Empty) return;
		else {
			let first$1 = list.head;
			let rest$1 = list.tail;
			f(first$1);
			loop$list = rest$1;
			loop$f = f;
		}
	}
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/string_tree.mjs
var All = class extends CustomType {};
new All();
/**
* Converts a `StringTree` to a new one with the contents reversed.
*/
function reverse$1(tree) {
	return concat(reverse$2(graphemes(identity$1(tree))));
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/string.mjs
var Leading = class extends CustomType {};
new Leading();
var Trailing = class extends CustomType {};
new Trailing();
/**
* Reverses a `String`.
*
* This function has to iterate across the whole `String` so it runs in linear
* time. Avoid using this in a loop.
*
* ## Examples
*
* ```gleam
* assert string.reverse("stressed") == "desserts"
* ```
*/
function reverse(string) {
	return identity$1(reverse$1(identity$1(string)));
}
/**
* Creates a new `String` by replacing all occurrences of a given substring.
*
* ## Examples
*
* ```gleam
* assert string.replace("www.example.com", each: ".", with: "-")
*   == "www-example-com"
* ```
*
* ```gleam
* assert string.replace("a,b,c,d,e", each: ",", with: "/") == "a/b/c/d/e"
* ```
*/
function replace(string, pattern, substitute) {
	return identity$1(string_replace(identity$1(string), pattern, substitute));
}
/**
* Drops *n* graphemes from the start of a `String`.
*
* This function runs in linear time with the number of graphemes to drop.
*
* ## Examples
*
* ```gleam
* assert string.drop_start(from: "The Lone Gunmen", up_to: 2) == "e Lone Gunmen"
* ```
*/
function drop_start(string, num_graphemes) {
	if (num_graphemes <= 0) return string;
	else {
		let prefix_size = byte_size(string_grapheme_slice(string, 0, num_graphemes));
		return string_byte_slice(string, prefix_size, byte_size(string) - prefix_size);
	}
}
/**
* Creates a list of `String`s by splitting a given string on a given substring.
*
* ## Examples
*
* ```gleam
* assert string.split("home/gleam/desktop/", on: "/")
*   == ["home", "gleam", "desktop", ""]
* ```
*/
function split$1(x, substring) {
	if (substring === "") return graphemes(x);
	else return map(split(identity$1(x), substring), identity$1);
}
/**
* Creates a new `String` by joining two `String`s together.
*
* This function typically copies both `String`s and runs in linear time, but
* the exact behaviour will depend on how the runtime you are using optimises
* your code. Benchmark and profile your code if you need to understand its
* performance better.
*
* If you are joining together large string and want to avoid copying any data
* you may want to investigate using the [`string_tree`](../gleam/string_tree.html)
* module.
*
* ## Examples
*
* ```gleam
* assert string.append(to: "butter", suffix: "fly") == "butterfly"
* ```
*/
function append(first, second) {
	return first + second;
}
function join_loop(loop$strings, loop$separator, loop$accumulator) {
	while (true) {
		let strings = loop$strings;
		let separator = loop$separator;
		let accumulator = loop$accumulator;
		if (strings instanceof Empty) return accumulator;
		else {
			let string = strings.head;
			loop$strings = strings.tail;
			loop$separator = separator;
			loop$accumulator = accumulator + separator + string;
		}
	}
}
/**
* Joins many `String`s together with a given separator.
*
* This function runs in linear time.
*
* ## Examples
*
* ```gleam
* assert string.join(["home", "evan", "Desktop"], with: "/")
*   == "home/evan/Desktop"
* ```
*/
function join(strings, separator) {
	if (strings instanceof Empty) return "";
	else {
		let first$1 = strings.head;
		let rest = strings.tail;
		return join_loop(rest, separator, first$1);
	}
}
/**
* Removes whitespace on both sides of a `String`.
*
* Whitespace in this function is the set of nonbreakable whitespace
* codepoints, defined as Pattern_White_Space in [Unicode Standard Annex #31][1].
*
* [1]: https://unicode.org/reports/tr31/
*
* ## Examples
*
* ```gleam
* assert string.trim("  hats  \n") == "hats"
* ```
*/
function trim(string) {
	return trim_end(trim_start(string));
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
var Nil = void 0;
function identity$1(x) {
	return x;
}
function parse_int$1(value) {
	if (/^[-+]?(\d+)$/.test(value)) return Result$Ok(parseInt(value));
	else return Result$Error(Nil);
}
function to_string$1(term) {
	return term.toString();
}
function string_replace(string, target, substitute) {
	return string.replaceAll(target, substitute);
}
function graphemes(string) {
	const iterator = graphemes_iterator(string);
	if (iterator) return arrayToList(Array.from(iterator).map((item) => item.segment));
	else return arrayToList(string.match(/./gsu));
}
var segmenter = void 0;
function graphemes_iterator(string) {
	if (globalThis.Intl && Intl.Segmenter) {
		segmenter || (segmenter = new Intl.Segmenter());
		return segmenter.segment(string)[Symbol.iterator]();
	}
}
function pop_grapheme(string) {
	let first;
	const iterator = graphemes_iterator(string);
	if (iterator) first = iterator.next().value?.segment;
	else first = string.match(/./su)?.[0];
	if (first) return Result$Ok([first, string.slice(first.length)]);
	else return Result$Error(Nil);
}
function lowercase(string) {
	return string.toLowerCase();
}
function split(xs, pattern) {
	return arrayToList(xs.split(pattern));
}
function concat(xs) {
	let result = "";
	for (const x of xs) result = result + x;
	return result;
}
function string_byte_slice(string, index, length) {
	return string.slice(index, index + length);
}
function string_grapheme_slice(string, idx, len) {
	if (len <= 0 || idx >= string.length) return "";
	const iterator = graphemes_iterator(string);
	if (iterator) {
		while (idx-- > 0) iterator.next();
		let result = "";
		while (len-- > 0) {
			const v = iterator.next().value;
			if (v === void 0) break;
			result += v.segment;
		}
		return result;
	} else return string.match(/./gsu).slice(idx, idx + len).join("");
}
function contains_string(haystack, needle) {
	return haystack.indexOf(needle) >= 0;
}
var unicode_whitespaces = [
	" ",
	"	",
	"\n",
	"\v",
	"\f",
	"\r",
	"",
	"\u2028",
	"\u2029"
].join("");
var trim_start_regex = /* @__PURE__ */ new RegExp(`^[${unicode_whitespaces}]*`);
var trim_end_regex = /* @__PURE__ */ new RegExp(`[${unicode_whitespaces}]*$`);
function trim_start(string) {
	return string.replace(trim_start_regex, "");
}
function trim_end(string) {
	return string.replace(trim_end_regex, "");
}
function console_log(term) {
	console.log(term);
}
function byte_size(string) {
	return new TextEncoder().encode(string).length;
}
Number.MAX_SAFE_INTEGER;
Number.MIN_SAFE_INTEGER;
function arrayToList(array) {
	let list = List$Empty();
	let i = array.length;
	while (i--) list = List$NonEmpty(array[i], list);
	return list;
}
//#endregion
//#region build/dev/javascript/script/currency.mjs
var Currency = class extends CustomType {
	constructor(name, symbol, code, country, locale, decimals) {
		super();
		this.name = name;
		this.symbol = symbol;
		this.code = code;
		this.country = country;
		this.locale = locale;
		this.decimals = decimals;
	}
};
function clp() {
	return new Currency("Peso Chileno", "$", "CLP", "Chile", "es-CL", 0);
}
//#endregion
//#region build/dev/javascript/script/entity.mjs
var Entity = class extends CustomType {
	constructor(id, name, labels) {
		super();
		this.id = id;
		this.name = name;
		this.labels = labels;
	}
};
function banco_estado() {
	return new Entity("cl.bancoestado", "Banco Estado", List$Empty$const);
}
function banco_chile() {
	return new Entity("cl.bancochile", "Banco Chile", toList(["expense:cl-bancochile:payment-notifications"]));
}
function entity_labels(entity) {
	return entity.labels;
}
//#endregion
//#region build/dev/javascript/script/country.mjs
var Country = class extends CustomType {
	constructor(id, name, entities, currencies, timezones) {
		super();
		this.id = id;
		this.name = name;
		this.entities = entities;
		this.currencies = currencies;
		this.timezones = timezones;
	}
};
function chile() {
	return new Country("cl", "Chile", toList([banco_estado(), banco_chile()]), toList([clp()]), toList([
		"America/Santiago",
		"America/Punta_Arenas",
		"Pacific/Easter"
	]));
}
//#endregion
//#region build/dev/javascript/script/config.mjs
var Config = class extends CustomType {
	constructor(countries) {
		super();
		this.countries = countries;
	}
};
function new$$1(countries) {
	return new Config(countries);
}
//#endregion
//#region build/dev/javascript/gleam_stdlib/gleam/result.mjs
/**
* Extracts the `Ok` value from a result, returning a default value if the result
* is an `Error`.
*
* ## Examples
*
* ```gleam
* assert result.unwrap(Ok(1), 0) == 1
* ```
*
* ```gleam
* assert result.unwrap(Error(""), 0) == 0
* ```
*/
function unwrap(result, default$) {
	if (result instanceof Ok) return result[0];
	else return default$;
}
//#endregion
//#region build/dev/javascript/gleam_json/gleam_json_ffi.mjs
function object$1(entries) {
	return Object.fromEntries(entries);
}
function identity(x) {
	return x;
}
//#endregion
//#region build/dev/javascript/gleam_json/gleam/json.mjs
var UnexpectedEndOfInput = class extends CustomType {};
new UnexpectedEndOfInput();
/**
* Encode a string into JSON, using normal JSON escaping.
*
* ## Examples
*
* ```gleam
* > to_string(string("Hello!"))
* "\"Hello!\""
* ```
*/
function string(input) {
	return identity(input);
}
/**
* Encode an int into JSON.
*
* ## Examples
*
* ```gleam
* > to_string(int(50))
* "50"
* ```
*/
function int(input) {
	return identity(input);
}
/**
* Encode a list of key-value pairs into a JSON object.
*
* ## Examples
*
* ```gleam
* > to_string(object([
*   #("game", string("Pac-Man")),
*   #("score", int(3333360)),
* ]))
* "{\"game\":\"Pac-Mac\",\"score\":3333360}"
* ```
*/
function object(entries) {
	return object$1(entries);
}
//#endregion
//#region build/dev/javascript/script/ffi/date_ffi.mjs
function pad_zero(n) {
	return n < 10 ? "0" + n : String(n);
}
function format_token(date, token) {
	switch (token) {
		case "YYYY": return String(date.getFullYear());
		case "YY": return String(date.getFullYear()).slice(-2);
		case "MM": return pad_zero(date.getMonth() + 1);
		case "M": return String(date.getMonth() + 1);
		case "DD": return pad_zero(date.getDate());
		case "D": return String(date.getDate());
		case "HH": return pad_zero(date.getHours());
		case "H": return String(date.getHours());
		case "mm": return pad_zero(date.getMinutes());
		case "m": return String(date.getMinutes());
		case "ss": return pad_zero(date.getSeconds());
		case "s": return String(date.getSeconds());
		default: return token;
	}
}
function parse_with_format(date_string, format) {
	let parts = {};
	let format_tokens = [
		"YYYY",
		"YY",
		"MM",
		"M",
		"DD",
		"D",
		"HH",
		"H",
		"mm",
		"m",
		"ss",
		"s"
	];
	let remaining = format;
	let input = date_string;
	for (let token of format_tokens) if (remaining.includes(token)) {
		let idx = remaining.indexOf(token);
		remaining = remaining.slice(0, idx) + remaining.slice(idx + token.length);
		let regex;
		if (token === "YYYY") regex = /(\d{4})/;
		else if (token === "YY") regex = /(\d{2})/;
		else if (token === "MM" || token === "DD" || token === "HH" || token === "mm" || token === "ss") regex = /(\d{2})/;
		else regex = /(\d{1,2})/;
		let match = input.slice(idx).match(regex);
		if (match) {
			let key;
			switch (token) {
				case "YYYY":
					key = "year";
					break;
				case "YY":
					key = "year_short";
					break;
				case "MM":
				case "M":
					key = "month";
					break;
				case "DD":
				case "D":
					key = "day";
					break;
				case "HH":
				case "H":
					key = "hour";
					break;
				case "mm":
				case "m":
					key = "minute";
					break;
				case "ss":
				case "s": key = "second";
			}
			parts[key] = parseInt(match[1]);
			input = input.slice(0, idx) + input.slice(idx + match[0].length);
		}
	}
	let year = parts.year || (parts.year_short ? parts.year_short > 68 ? 1900 + parts.year_short : 2e3 + parts.year_short : (/* @__PURE__ */ new Date()).getFullYear());
	let month = (parts.month || (/* @__PURE__ */ new Date()).getMonth() + 1) - 1;
	let day = parts.day || 1;
	let hour = parts.hour || 0;
	let minute = parts.minute || 0;
	let second = parts.second || 0;
	return new Date(year, month, day, hour, minute, second);
}
function now() {
	return Date.now();
}
function parse_date$1(date_string, format) {
	try {
		let date = parse_with_format(date_string, format);
		if (isNaN(date.getTime())) return Result$Error(new ParseError("Invalid date: " + date_string));
		return Result$Ok(date.getTime());
	} catch (error) {
		return Result$Error(new ParseError(error.toString()));
	}
}
function format_date$1(date_string, input_format, output_format) {
	try {
		let date = parse_with_format(date_string, input_format);
		if (isNaN(date.getTime())) return Result$Error(new ParseError("Invalid date: " + date_string));
		let result = output_format;
		for (let token of [
			"YYYY",
			"YY",
			"MM",
			"M",
			"DD",
			"D",
			"HH",
			"H",
			"mm",
			"m",
			"ss",
			"s"
		]) result = result.split(token).join(format_token(date, token));
		return Result$Ok(result);
	} catch (error) {
		return Result$Error(new ParseError(error.toString()));
	}
}
function from_timestamp(timestamp) {
	return new Date(timestamp).toISOString();
}
//#endregion
//#region build/dev/javascript/script/ffi/date.mjs
var ParseError = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
//#endregion
//#region build/dev/javascript/script/ffi/properties_ffi.mjs
function get_script_property(key) {
	const value = PropertiesService.getScriptProperties().getProperty(key);
	if (value === null || value === void 0) return new Error(void 0);
	return new Ok(value);
}
//#endregion
//#region build/dev/javascript/script/formatters.mjs
var DateResult = class extends CustomType {
	constructor(raw, timestamp) {
		super();
		this.raw = raw;
		this.timestamp = timestamp;
	}
};
function date(raw, fmt) {
	let $ = parse_date$1(raw, fmt);
	if ($ instanceof Ok) {
		let timestamp = $[0];
		return new DateResult(raw, timestamp);
	} else return new DateResult(raw, 0);
}
function format_date(date_string, input_format, output_format) {
	let $ = format_date$1(date_string, input_format, output_format);
	if ($ instanceof Ok) return $[0];
	else return date_string;
}
function timestamp_to_string(timestamp) {
	return from_timestamp(timestamp);
}
//#endregion
//#region build/dev/javascript/script/types.mjs
var Expense = class extends CustomType {};
var TransactionType$Expense$const = new Expense();
var Deposit = class extends CustomType {};
new Deposit();
var Alert = class extends CustomType {};
new Alert();
var Other = class extends CustomType {};
new Other();
function to_string(t) {
	if (t instanceof Expense) return "expense";
	else if (t instanceof Deposit) return "deposit";
	else if (t instanceof Alert) return "alert";
	else return "other";
}
//#endregion
//#region build/dev/javascript/script/parser.mjs
var DateInfo = class extends CustomType {
	constructor(raw, timestamp) {
		super();
		this.raw = raw;
		this.timestamp = timestamp;
	}
};
var Meta = class extends CustomType {
	constructor(from, to, rut, entity, transaction) {
		super();
		this.from = from;
		this.to = to;
		this.rut = rut;
		this.entity = entity;
		this.transaction = transaction;
	}
};
var ParseResult = class extends CustomType {
	constructor(amount, context, account, date, name, entity, type_, label, currency, comment, meta, parsed) {
		super();
		this.amount = amount;
		this.context = context;
		this.account = account;
		this.date = date;
		this.name = name;
		this.entity = entity;
		this.type_ = type_;
		this.label = label;
		this.currency = currency;
		this.comment = comment;
		this.meta = meta;
		this.parsed = parsed;
	}
};
function empty_meta() {
	return new Meta("", "", "", "", "");
}
function empty_result(entity_name, tt, lbl, curr) {
	return new ParseResult(0, "", "", new DateInfo("", 0), "", entity_name, tt, lbl, curr, "", empty_meta(), false);
}
//#endregion
//#region build/dev/javascript/script/actions/http.mjs
function get_endpoint() {
	let $ = get_script_property("HTTP_ENDPOINT");
	if ($ instanceof Ok) return $[0];
	else return "";
}
function run$1(parse_result, message_id, label_raw, message_date) {
	console_log("Executing HTTP Action");
	if (get_endpoint() === "") {
		console_log("HTTP_ENDPOINT not set, skipping");
		return new Ok(void 0);
	} else {
		let date_str = format_date(timestamp_to_string(parse_result.date.timestamp), "YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD");
		let time_str = format_date(timestamp_to_string(parse_result.date.timestamp), "YYYY-MM-DDTHH:mm:ssZ", "HH:mm");
		let ts = now();
		object(toList([
			["id", string(message_id)],
			["label", string(label_raw)],
			["date", string(date_str)],
			["time", string(time_str)],
			["message_date", string(message_date)],
			["ts", int(ts)]
		]));
		console_log("Payload prepared");
		return new Ok(void 0);
	}
}
//#endregion
//#region build/dev/javascript/script/ffi/spreadsheet_ffi.mjs
function open_by_url(url) {
	try {
		return Result$Ok(SpreadsheetApp.openByUrl(url));
	} catch (error) {
		return Result$Error(new OpenError(error.toString()));
	}
}
function get_active_sheet(spreadsheet) {
	return spreadsheet.getActiveSheet();
}
function append_row(sheet, row) {
	try {
		let array = [];
		for (let item of row) array.push(item);
		sheet.appendRow(array);
		return Result$Ok(null);
	} catch (error) {
		return Result$Error(new WriteError(error.toString()));
	}
}
//#endregion
//#region build/dev/javascript/script/ffi/spreadsheet.mjs
var OpenError = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
var WriteError = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
//#endregion
//#region build/dev/javascript/script/actions/spreadsheet.mjs
var SpreadsheetError = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
function get_sheet_url() {
	let $ = get_script_property("SPREADSHEET_URL");
	if ($ instanceof Ok) return $[0];
	else return "";
}
function run(parse_result, message_id, message_from, message_date, label_raw) {
	console_log("Executing SpreadSheet Action");
	let sheet_url = get_sheet_url();
	if (sheet_url === "") return new Error(new SpreadsheetError("SPREADSHEET_URL not set"));
	else {
		let $ = open_by_url(sheet_url);
		if ($ instanceof Ok) {
			let file = $[0];
			let sheet = get_active_sheet(file);
			let date_str = format_date(timestamp_to_string(parse_result.date.timestamp), "YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD");
			let time_str = format_date(timestamp_to_string(parse_result.date.timestamp), "YYYY-MM-DDTHH:mm:ssZ", "HH:mm");
			let created_at = timestamp_to_string(now());
			let row = toList([
				message_id,
				message_from,
				to_string$1(parse_result.amount),
				parse_result.currency.code,
				parse_result.context,
				parse_result.account,
				date_str,
				time_str,
				to_string(parse_result.type_),
				label_raw,
				parse_result.entity,
				parse_result.comment,
				created_at,
				message_date,
				"{}",
				to_string$1(now())
			]);
			console_log("Saving data");
			if (append_row(sheet, row) instanceof Ok) {
				console_log("Data saved successfully");
				return new Ok(void 0);
			} else return new Error(new SpreadsheetError("Could not append row"));
		} else return new Error(new SpreadsheetError("Could not open spreadsheet"));
	}
}
//#endregion
//#region build/dev/javascript/script/ffi/gmail_ffi.mjs
function search$1(query, start, max) {
	try {
		return Result$Ok(toList(GmailApp.search(query, start, max).map((t) => t)));
	} catch (error) {
		return Result$Error(new SearchError(error.toString()));
	}
}
function get_messages(thread) {
	return toList(thread.getMessages().map((m) => m));
}
function get_labels(thread) {
	return toList(thread.getLabels().map((l) => l));
}
function get_subject(message) {
	return message.getSubject();
}
function get_body(message) {
	return message.getBody();
}
function get_from(message) {
	return message.getFrom();
}
function get_date(message) {
	return message.getDate().toISOString();
}
function get_id(message) {
	return message.getId();
}
function is_unread(message) {
	return message.isUnread();
}
function get_thread(message) {
	return message.getThread();
}
function get_label_name(label) {
	return label.getName();
}
function mark_message_read(message) {
	GmailApp.markMessageRead(message);
}
//#endregion
//#region build/dev/javascript/script/ffi/gmail.mjs
var SearchError = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
var LabelNotFound = class extends CustomType {};
new LabelNotFound();
//#endregion
//#region build/dev/javascript/script/labels.mjs
var Label = class extends CustomType {
	constructor(raw, formatted, key, query) {
		super();
		this.raw = raw;
		this.formatted = formatted;
		this.key = key;
		this.query = query;
	}
};
function for_query(label) {
	let prefix = "trolebus";
	let _block;
	_block = lowercase(replace(label, " ", "+"));
	let formatted = _block;
	return new Label(label, formatted, prefix + "/" + formatted, prefix + "/" + formatted);
}
//#endregion
//#region build/dev/javascript/script/query.mjs
var QueryElement = class extends CustomType {
	constructor(name, entity, label) {
		super();
		this.name = name;
		this.entity = entity;
		this.label = label;
	}
};
var QueryBuilder = class extends CustomType {
	constructor(elements, labels, queries, query) {
		super();
		this.elements = elements;
		this.labels = labels;
		this.queries = queries;
		this.query = query;
	}
};
function build(builder) {
	let _block;
	if (builder.labels instanceof Empty) _block = "in:unread ()";
	else {
		let _block$1;
		let _pipe = builder.labels;
		_block$1 = join(map(_pipe, (l) => {
			return "label:" + l;
		}), " | ");
		_block = "in:unread (" + _block$1 + ")";
	}
	let combined_query = _block;
	let _block$1;
	let _pipe = builder.labels;
	_block$1 = map(_pipe, (l) => {
		return "in:unread (label:" + l + ")";
	});
	let individual_queries = _block$1;
	return new QueryBuilder(builder.elements, builder.labels, individual_queries, combined_query);
}
function new$(entities) {
	return build(fold(entities, new QueryBuilder(make(), List$Empty$const, List$Empty$const, ""), (acc, ent) => {
		return fold(entity_labels(ent), acc, (acc2, lbl) => {
			let label = for_query(lbl);
			let element = new QueryElement(0, ent, label);
			let _block;
			let _pipe = acc2.elements;
			_block = insert(insert(insert(insert(_pipe, label.key, element), label.raw, element), label.formatted, element), label.query, element);
			return new QueryBuilder(_block, append$1(acc2.labels, toList([label.query])), acc2.queries, acc2.query);
		});
	}));
}
function element_for_label(builder, label) {
	let key = lowercase(label);
	return get(builder.elements, key);
}
function element_for_labels(loop$builder, loop$label_names) {
	while (true) {
		let builder = loop$builder;
		let label_names = loop$label_names;
		if (label_names instanceof Empty) return new Error(void 0);
		else {
			let label = label_names.head;
			let rest = label_names.tail;
			let $ = element_for_label(builder, label);
			if ($ instanceof Ok) return $;
			else {
				loop$builder = builder;
				loop$label_names = rest;
			}
		}
	}
}
//#endregion
//#region build/dev/javascript/script/mailer.mjs
var FormattedMessage = class extends CustomType {
	constructor(id, subject, body, from, date, is_unread, labels, message) {
		super();
		this.id = id;
		this.subject = subject;
		this.body = body;
		this.from = from;
		this.date = date;
		this.is_unread = is_unread;
		this.labels = labels;
		this.message = message;
	}
};
var FormattedLabel = class extends CustomType {
	constructor(name, label) {
		super();
		this.name = name;
		this.label = label;
	}
};
var SearchResult = class extends CustomType {
	constructor(threads, messages, labels, item) {
		super();
		this.threads = threads;
		this.messages = messages;
		this.labels = labels;
		this.item = item;
	}
};
function format_message(message, _) {
	let formatted_labels = map(get_labels(get_thread(message)), (l) => {
		return new FormattedLabel(get_label_name(l), l);
	});
	return new FormattedMessage(get_id(message), get_subject(message), get_body(message), get_from(message), get_date(message), is_unread(message), formatted_labels, message);
}
function search(builder, start, max) {
	let queries = builder.queries;
	return flat_map(queries, (query_str) => {
		console_log("Searching for " + query_str);
		let $ = search$1(query_str, start, max);
		if ($ instanceof Ok) {
			let threads = $[0];
			console_log(append("Found ", to_string$1(length(threads)) + " threads"));
			let all_labels = flat_map(threads, (thread) => {
				return map(get_labels(thread), (l) => {
					console_log("label: " + get_label_name(l));
					return new FormattedLabel(get_label_name(l), l);
				});
			});
			return toList([new SearchResult(threads, flat_map(threads, (thread) => {
				return map(get_messages(thread), (msg) => {
					return format_message(msg, builder);
				});
			}), all_labels, query_str)]);
		} else {
			console_log("Search error");
			return List$Empty$const;
		}
	});
}
function mark_as_read(message) {
	console_log("Marking message as read");
	return mark_message_read(message);
}
//#endregion
//#region build/dev/javascript/html_parser/html_parser.mjs
var FILEPATH = "src/html_parser.gleam";
var EmptyElement = class extends CustomType {};
var Element$EmptyElement$const = new EmptyElement();
/**
* StartElement is an opening tag like <div> and can have Attributes and child Elements
*/
var StartElement = class extends CustomType {
	constructor(name, attributes, children) {
		super();
		this.name = name;
		this.attributes = attributes;
		this.children = children;
	}
};
/**
* EndElement just has a name and signals the end of a block
*/
var EndElement = class extends CustomType {
	constructor(name) {
		super();
		this.name = name;
	}
};
/**
* Content is non-HTML parts of the document in-between StartElement and
* EndElement (the "hello" in `<div>hello</div>`)
*/
var Content = class extends CustomType {
	constructor($0) {
		super();
		this[0] = $0;
	}
};
var Attribute = class extends CustomType {
	constructor(key, value) {
		super();
		this.key = key;
		this.value = value;
	}
};
var Start = class extends CustomType {};
var CurrentElementType$Start$const = new Start();
var End = class extends CustomType {};
var CurrentElementType$End$const = new End();
var None = class extends CustomType {};
var CurrentElementType$None$const = new None();
function remove_quotes(in$) {
	let remove_first_quote = (str) => {
		if (str.charCodeAt(0) === 34) return str.slice(1);
		else return str;
	};
	return reverse(remove_first_quote(reverse(remove_first_quote(in$))));
}
function do_get_attrs(loop$in, loop$key, loop$val, loop$finding_value) {
	while (true) {
		let in$ = loop$in;
		let key = loop$key;
		let val = loop$val;
		let finding_value = loop$finding_value;
		let $ = in$.charCodeAt(0);
		if (in$ === "") {
			if (val === "") {
				if (key === "") return [List$Empty$const, ""];
				else return [List$Empty$const, key];
			} else return [toList([new Attribute(key, remove_quotes(val))]), ""];
		} else if (in$ === ">") {
			if (val === "") {
				if (key === "") return [List$Empty$const, ""];
				else return [List$Empty$const, key];
			} else return [toList([new Attribute(key, remove_quotes(val))]), ""];
		} else if ($ === 62) {
			let remain = in$.slice(1);
			if (key === "" && val === "") return [List$Empty$const, remain];
			else return [toList([new Attribute(key, remove_quotes(val))]), remain];
		} else if ($ === 32) {
			if (!finding_value) {
				loop$in = in$.slice(1);
				loop$key = key;
				loop$val = val;
				loop$finding_value = finding_value;
			} else {
				let $1 = do_get_attrs(in$.slice(1), "", "", false);
				let attrs = $1[0];
				let remain_after_attr = $1[1];
				return [prepend(new Attribute(key, remove_quotes(val)), attrs), remain_after_attr];
			}
		} else if ($ === 10) {
			if (!finding_value) {
				loop$in = in$.slice(1);
				loop$key = key;
				loop$val = val;
				loop$finding_value = finding_value;
			} else {
				let $1 = do_get_attrs(in$.slice(1), "", "", false);
				let attrs = $1[0];
				let remain_after_attr = $1[1];
				return [prepend(new Attribute(key, remove_quotes(val)), attrs), remain_after_attr];
			}
		} else if ($ === 9) {
			if (!finding_value) {
				loop$in = in$.slice(1);
				loop$key = key;
				loop$val = val;
				loop$finding_value = finding_value;
			} else {
				let $1 = do_get_attrs(in$.slice(1), "", "", false);
				let attrs = $1[0];
				let remain_after_attr = $1[1];
				return [prepend(new Attribute(key, remove_quotes(val)), attrs), remain_after_attr];
			}
		} else if ($ === 61) {
			loop$in = in$.slice(1);
			loop$key = key;
			loop$val = "";
			loop$finding_value = true;
		} else {
			let $1 = pop_grapheme(in$);
			let head;
			let remain;
			if ($1 instanceof Ok) {
				head = $1[0][0];
				remain = $1[0][1];
			} else throw makeError("let_assert", FILEPATH, "html_parser", 120, "do_get_attrs", "Pattern match failed, no pattern matched the value.", {
				value: $1,
				start: 3265,
				end: 3321,
				pattern_start: 3276,
				pattern_end: 3295
			});
			if (finding_value) {
				loop$in = remain;
				loop$key = key;
				loop$val = val + head;
				loop$finding_value = finding_value;
			} else {
				loop$in = remain;
				loop$key = key + head;
				loop$val = "";
				loop$finding_value = finding_value;
			}
		}
	}
}
function trim_space_to_elem_begin(loop$in) {
	while (true) {
		let in$ = loop$in;
		let $ = in$.charCodeAt(0);
		if ($ === 32) loop$in = in$.slice(1);
		else if ($ === 10) loop$in = in$.slice(1);
		else if ($ === 9) loop$in = in$.slice(1);
		else if ($ === 60) return in$;
		else return in$;
	}
}
/**
* get the attributes for a StartElement and remaining String
*/
function get_attrs(in$) {
	return do_get_attrs(trim_space_to_elem_begin(in$), "", "", false);
}
function do_get_first_element(loop$in, loop$out, loop$currently_parsing) {
	while (true) {
		let in$ = loop$in;
		let out = loop$out;
		let currently_parsing = loop$currently_parsing;
		let $ = in$.charCodeAt(0);
		if (in$.startsWith("</")) {
			let remain = in$.slice(2);
			if (out === "") {
				loop$in = remain;
				loop$out = out;
				loop$currently_parsing = CurrentElementType$End$const;
			} else return [new Content(out), "</" + remain];
		} else if ($ === 60) {
			let remain = in$.slice(1);
			if (out === "") {
				loop$in = remain;
				loop$out = out;
				loop$currently_parsing = CurrentElementType$Start$const;
			} else return [new Content(out), "<" + remain];
		} else if ($ === 62) {
			let remain = in$.slice(1);
			if (currently_parsing instanceof Start) return [new StartElement(out, List$Empty$const, List$Empty$const), remain];
			else if (currently_parsing instanceof End) return [new EndElement(out), remain];
			else return [new Content(out), remain];
		} else if ($ === 32 && currently_parsing instanceof Start) {
			let $1 = get_attrs(in$.slice(1));
			let attrs = $1[0];
			let remain_after_attr = $1[1];
			return [new StartElement(out, attrs, List$Empty$const), remain_after_attr];
		} else if ($ === 10 && currently_parsing instanceof Start) {
			let $1 = get_attrs(in$.slice(1));
			let attrs = $1[0];
			let remain_after_attr = $1[1];
			return [new StartElement(out, attrs, List$Empty$const), remain_after_attr];
		} else if ($ === 9 && currently_parsing instanceof Start) {
			let $1 = get_attrs(in$.slice(1));
			let attrs = $1[0];
			let remain_after_attr = $1[1];
			return [new StartElement(out, attrs, List$Empty$const), remain_after_attr];
		} else if (in$ === "") return [Element$EmptyElement$const, ""];
		else {
			let $1 = pop_grapheme(in$);
			let head;
			let remain;
			if ($1 instanceof Ok) {
				head = $1[0][0];
				remain = $1[0][1];
			} else throw makeError("let_assert", FILEPATH, "html_parser", 81, "do_get_first_element", "Pattern match failed, no pattern matched the value.", {
				value: $1,
				start: 2082,
				end: 2138,
				pattern_start: 2093,
				pattern_end: 2112
			});
			loop$in = remain;
			loop$out = out + head;
			loop$currently_parsing = currently_parsing;
		}
	}
}
/**
* get the first Element and remaining String
*/
function get_first_element(in$) {
	return do_get_first_element(trim_space_to_elem_begin(in$), "", CurrentElementType$None$const);
}
function as_list(in$) {
	if (in$ === "") return List$Empty$const;
	else {
		let $ = get_first_element(in$);
		let first = $[0];
		let remain = $[1];
		return prepend(first, as_list(remain));
	}
}
//#endregion
//#region build/dev/javascript/script/mail_parser.mjs
var HtmlTable = class extends CustomType {
	constructor(sections, flat) {
		super();
		this.sections = sections;
		this.flat = flat;
	}
};
function extract_next_content(loop$elements) {
	while (true) {
		let elements = loop$elements;
		if (elements instanceof Empty) return "";
		else {
			let $ = elements.head;
			if ($ instanceof Content) {
				let text = $[0];
				return trim(text);
			} else loop$elements = elements.tail;
		}
	}
}
function get_attribute(loop$attrs, loop$key) {
	while (true) {
		let attrs = loop$attrs;
		let key = loop$key;
		if (attrs instanceof Empty) return "";
		else {
			let rest = attrs.tail;
			let k = attrs.head.key;
			let v = attrs.head.value;
			if (k === key) return v;
			else {
				loop$attrs = rest;
				loop$key = key;
			}
		}
	}
}
function extract_row(loop$elements, loop$row_data, loop$last_label) {
	while (true) {
		let elements = loop$elements;
		let row_data = loop$row_data;
		let last_label = loop$last_label;
		if (elements instanceof Empty) return [row_data, List$Empty$const];
		else {
			let element = elements.head;
			let rest = elements.tail;
			if (element instanceof StartElement) {
				let $ = element.name;
				if ($ === "td") {
					loop$elements = rest;
					loop$row_data = row_data;
					loop$last_label = last_label;
				} else if ($ === "th") return [row_data, elements];
				else {
					loop$elements = rest;
					loop$row_data = row_data;
					loop$last_label = last_label;
				}
			} else if (element instanceof EndElement) {
				if (element.name === "tr") return [row_data, rest];
				else {
					loop$elements = rest;
					loop$row_data = row_data;
					loop$last_label = last_label;
				}
			} else if (element instanceof Content) {
				let text = element[0];
				let trimmed = trim(text);
				if (trimmed === "") {
					loop$elements = rest;
					loop$row_data = row_data;
					loop$last_label = last_label;
				} else if (last_label === "") {
					loop$elements = rest;
					loop$row_data = row_data;
					loop$last_label = trimmed;
				} else {
					let updated = insert(row_data, last_label, trimmed);
					loop$elements = rest;
					loop$row_data = updated;
					loop$last_label = "";
				}
			} else {
				loop$elements = rest;
				loop$row_data = row_data;
				loop$last_label = last_label;
			}
		}
	}
}
function walk_elements(loop$elements, loop$flat, loop$sections, loop$current_section) {
	while (true) {
		let elements = loop$elements;
		let flat = loop$flat;
		let sections = loop$sections;
		let current_section = loop$current_section;
		if (elements instanceof Empty) return [flat, sections];
		else {
			let element = elements.head;
			let rest = elements.tail;
			if (element instanceof StartElement) {
				let $ = element.name;
				if ($ === "tr") {
					let $1 = extract_row(rest, make(), "");
					let row_data = $1[0];
					let remaining = $1[1];
					let flat_updated = merge(flat, row_data);
					let _block;
					if (current_section === "") _block = sections;
					else {
						let section = current_section;
						let _block$1;
						let $2 = get(sections, section);
						if ($2 instanceof Ok) _block$1 = $2[0];
						else _block$1 = make();
						_block = insert(sections, section, merge(_block$1, row_data));
					}
					let sections_updated = _block;
					loop$elements = remaining;
					loop$flat = flat_updated;
					loop$sections = sections_updated;
					loop$current_section = current_section;
				} else if ($ === "th") {
					let attrs = element.attributes;
					let colspan = get_attribute(attrs, "colspan");
					let text = extract_next_content(rest);
					if (colspan === "2") {
						let new_section = text;
						let _block;
						if (get(sections, new_section) instanceof Ok) _block = sections;
						else _block = insert(sections, new_section, make());
						let sections_with_new = _block;
						loop$elements = rest;
						loop$flat = flat;
						loop$sections = sections_with_new;
						loop$current_section = new_section;
					} else {
						loop$elements = rest;
						loop$flat = flat;
						loop$sections = sections;
						loop$current_section = current_section;
					}
				} else {
					loop$elements = rest;
					loop$flat = flat;
					loop$sections = sections;
					loop$current_section = current_section;
				}
			} else {
				loop$elements = rest;
				loop$flat = flat;
				loop$sections = sections;
				loop$current_section = current_section;
			}
		}
	}
}
function parse_html_tables(html) {
	let result = walk_elements(as_list(html), make(), make(), "");
	return new HtmlTable(result[1], result[0]);
}
function get_value(rows, label) {
	let $ = get(rows.flat, label);
	if ($ instanceof Ok) return $[0];
	else return "";
}
//#endregion
//#region build/dev/javascript/script/parsers/banco_chile.mjs
var entity_name = "Banco Chile";
var entity_id = "cl.bancochile";
var label_purchase = "expense:cl-bancochile:payment-notifications";
function parse_date(date_str) {
	if (date_str === "") return new DateInfo("", 0);
	else return new DateInfo(date_str, date(date_str, "DD/MM/YYYY").timestamp);
}
function do_parse_int(s, negative) {
	let $ = (() => {
		return parse_int$1(s);
	})();
	if ($ instanceof Ok) {
		let n = $[0];
		return new Ok((() => {
			if (negative) return 0 - n;
			else return n;
		})());
	} else return new Error(void 0);
}
function parse_int(s) {
	if (s === "") return new Error(void 0);
	else {
		let $ = (() => {
			return first(graphemes(s));
		})();
		if ($ instanceof Ok) {
			if ($[0] === "-") return do_parse_int(drop_start(s, 1), true);
			else return do_parse_int(s, false);
		} else return do_parse_int(s, false);
	}
}
function parse_amount(amount_str) {
	return unwrap(parse_int(trim(replace(replace(replace(amount_str, "$", ""), ".", ""), ",", ""))), 0);
}
function extract_name(html) {
	let marker = "Estimado(a)";
	if (contains_string(html, marker)) {
		let $1 = split$1(html, marker);
		if ($1 instanceof Empty) return "";
		else {
			let $2 = $1.tail;
			if ($2 instanceof Empty) return "";
			else if ($2.tail instanceof Empty) {
				let rest = $2.head;
				let $4 = split$1(rest, "</h1>");
				if ($4 instanceof Empty) return "";
				else {
					let $5 = $4.tail;
					if ($5 instanceof Empty) return "";
					else if ($5.tail instanceof Empty) {
						let _pipe = $4.head;
						return trim(replace(_pipe, ">", ""));
					} else return "";
				}
			} else return "";
		}
	} else return "";
}
function parse(html_body) {
	let result = empty_result(entity_name, TransactionType$Expense$const, label_purchase, clp());
	let rows = parse_html_tables(html_body);
	let name = extract_name(html_body);
	let rut = get_value(rows, "Rut");
	let account_type = get_value(rows, "Cuenta de Cargo");
	let email = get_value(rows, "Mail");
	let date_str = get_value(rows, "Fecha");
	let account = get_value(rows, "Cuenta");
	let _block;
	let $ = get_value(rows, "N° de Cuenta");
	if ($ === "") _block = account;
	else _block = $;
	let account_number = _block;
	let amount_str = get_value(rows, "Monto Pagado");
	let transaction_id = get_value(rows, "ID");
	let amount = parse_amount(amount_str);
	let date_info = parse_date(date_str);
	let _block$1;
	if (account === "") {
		if (account_type === "") _block$1 = entity_name;
		else _block$1 = account_type;
	} else _block$1 = account_type + " " + account;
	let context = _block$1;
	let _block$2;
	if (email === "") {
		if (name === "") _block$2 = name;
		else _block$2 = name;
	} else _block$2 = name + " <" + email + ">";
	let comment = _block$2;
	return new ParseResult(amount, context, account_number, date_info, entity_name, entity_id, result.type_, result.label, result.currency, comment, new Meta("", name, rut, entity_name, transaction_id), amount > 0);
}
//#endregion
//#region build/dev/javascript/script/email.mjs
var ParsedEmail = class extends CustomType {
	constructor(message, info, element) {
		super();
		this.message = message;
		this.info = info;
		this.element = element;
	}
};
function parse_email(message, element) {
	if (element.entity.id === "cl.bancochile") return parse(message.body);
	else return empty_result(element.entity.name, TransactionType$Expense$const, element.label.raw, clp());
}
function process_message(message, builder) {
	if (message.is_unread) {
		let $1 = element_for_labels(builder, map(message.labels, (l) => {
			return l.name;
		}));
		if ($1 instanceof Ok) {
			let element = $1[0];
			let info = parse_email(message, element);
			if (info.parsed) {
				console_log("Email parsed successfully");
				return new Ok(new ParsedEmail(message, info, element));
			} else {
				console_log("Could not parse email");
				mark_as_read(message.message);
				return new Error(void 0);
			}
		} else return new Error(void 0);
	} else return new Error(void 0);
}
function process_search_result(result, builder) {
	return filter_map(result.messages, (message) => {
		return process_message(message, builder);
	});
}
function get_emails(_, entities) {
	let builder = new$(entities);
	let emails = flat_map(search(builder, 0, 1), (result) => {
		return process_search_result(result, builder);
	});
	console_log(to_string$1(length(emails)) + " emails parsed");
	return emails;
}
function run_http_action(email) {
	if (run$1(email.info, email.message.id, email.element.label.raw, email.message.date) instanceof Ok) console_log("HTTP action completed");
	else console_log("HTTP action failed");
}
function run_spreadsheet_action(email) {
	if (run(email.info, email.message.id, email.message.from, email.message.date, email.element.label.raw) instanceof Ok) console_log("Spreadsheet action completed");
	else console_log("Spreadsheet action failed");
}
function run_actions(emails, _) {
	return each(emails, (email) => {
		console_log("Running actions for email");
		run_spreadsheet_action(email);
		run_http_action(email);
		return mark_as_read(email.message.message);
	});
}
//#endregion
//#region build/dev/javascript/script/script.mjs
function main$1() {
	console_log("Init");
	let config = new$$1(toList([chile()]));
	run_actions(get_emails(config, flat_map(config.countries, (c) => {
		return c.entities;
	})), config);
	return console_log("Done");
}
//#endregion
//#region entrypoint.js
function main() {
	return main$1();
}
main();
//#endregion
