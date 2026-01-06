"use strict";
globalThis["webpackHotUpdate_openmrs_esm_home_app"]("src_page-header_page-header_component_tsx",{

/***/ "./src/page-header/page-header.component.tsx":
/*!***************************************************!*\
  !*** ./src/page-header/page-header.component.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePageHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @openmrs/esm-framework */ "webpack/sharing/consume/default/@openmrs/esm-framework/@openmrs/esm-framework");
/* harmony import */ var _openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}


function HomePageHeader(param) {
    var dashboardTitle = param.dashboardTitle;
    var _window_getOpenmrsSpaBase, _window;
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), 2), user = _useState[0], setUser = _useState[1];
    var _useState1 = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]), 2), patientLists = _useState1[0], setPatientLists = _useState1[1];
    var _useState2 = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), 2), searchTerm = _useState2[0], setSearchTerm = _useState2[1];
    var _window_getOpenmrsSpaBase1;
    var baseUrl = ((_window_getOpenmrsSpaBase1 = (_window_getOpenmrsSpaBase = (_window = window).getOpenmrsSpaBase) === null || _window_getOpenmrsSpaBase === void 0 ? void 0 : _window_getOpenmrsSpaBase.call(_window)) !== null && _window_getOpenmrsSpaBase1 !== void 0 ? _window_getOpenmrsSpaBase1 : "/openmrs/spa").replace(/\/$/, "");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        (0,_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.openmrsFetch)("".concat(_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.restBaseUrl, "/session")).then(function(res) {
            return setUser(res.data.user);
        }).catch(function(err) {
            return console.error("[HomePageHeader] Error fetching session:", err);
        });
    }, []);
    var userRoles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        var _user_roles;
        return (user === null || user === void 0 ? void 0 : (_user_roles = user.roles) === null || _user_roles === void 0 ? void 0 : _user_roles.map(function(r) {
            return r.display.toLowerCase();
        })) || [];
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        var fetchRecentPatients = function() {
            return _async_to_generator(function() {
                var _res_data_entry, sevenDaysAgo, since, res, patients, err;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                2,
                                ,
                                3
                            ]);
                            sevenDaysAgo = new Date();
                            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                            since = sevenDaysAgo.toISOString();
                            return [
                                4,
                                (0,_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.openmrsFetch)("".concat(_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.fhirBaseUrl, "/Patient?_lastUpdated=ge").concat(since, "&_sort=-_lastUpdated&_count=50"))
                            ];
                        case 1:
                            res = _state.sent();
                            patients = ((_res_data_entry = res.data.entry) === null || _res_data_entry === void 0 ? void 0 : _res_data_entry.map(function(e) {
                                var _patient_identifier_find, _patient_identifier, _patient_meta;
                                var patient = e.resource;
                                return _object_spread_props(_object_spread({}, patient), {
                                    artId: ((_patient_identifier = patient.identifier) === null || _patient_identifier === void 0 ? void 0 : (_patient_identifier_find = _patient_identifier.find(function(id) {
                                        var _id_type_text, _id_type;
                                        return (_id_type = id.type) === null || _id_type === void 0 ? void 0 : (_id_type_text = _id_type.text) === null || _id_type_text === void 0 ? void 0 : _id_type_text.toLowerCase().includes("आफ्नो एआरटि  आईडी लेख्नुहोस्");
                                    })) === null || _patient_identifier_find === void 0 ? void 0 : _patient_identifier_find.value) || "N/A",
                                    registeredDate: ((_patient_meta = patient.meta) === null || _patient_meta === void 0 ? void 0 : _patient_meta.lastUpdated) || "N/A"
                                });
                            })) || [];
                            setPatientLists([
                                {
                                    id: "recent-patients",
                                    name: "हालै दर्ता भएका सहभागीहरू",
                                    members: patients
                                }
                            ]);
                            return [
                                3,
                                3
                            ];
                        case 2:
                            err = _state.sent();
                            console.error("[HomePageHeader] Error fetching recent patients:", err);
                            return [
                                3,
                                3
                            ];
                        case 3:
                            return [
                                2
                            ];
                    }
                });
            })();
        };
        if (userRoles.length && !userRoles.includes("self registration")) {
            fetchRecentPatients();
        }
    }, [
        userRoles
    ]);
    var addPatient = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        (0,_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.navigate)({
            to: "".concat(baseUrl, "/patient-registration")
        });
    }, [
        baseUrl
    ]);
    var openChart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(patient) {
        if (patient.id) (0,_openmrs_esm_framework__WEBPACK_IMPORTED_MODULE_1__.navigate)({
            to: "".concat(baseUrl, "/patient/").concat(patient.id, "/chart")
        });
    }, [
        baseUrl
    ]);
    // 🔍 Filter patients locally as user types
    var displayedPatients = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        var _patientLists_;
        var allPatients = ((_patientLists_ = patientLists[0]) === null || _patientLists_ === void 0 ? void 0 : _patientLists_.members) || [];
        if (!searchTerm.trim()) return allPatients;
        return allPatients.filter(function(p) {
            var _p_artId;
            return (_p_artId = p.artId) === null || _p_artId === void 0 ? void 0 : _p_artId.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [
        searchTerm,
        patientLists
    ]);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, userRoles.includes("self registration") ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
            display: "flex",
            justifyContent: "center",
            marginTop: "100px"
        }
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        style: {
            background: "linear-gradient(145deg, #005d5d, #007f7f)",
            color: "#fff",
            border: "none",
            borderRadius: "80px",
            padding: "2rem 3.5rem",
            fontSize: "2rem",
            fontWeight: 900,
            fontFamily: "Noto Sans Devanagari, sans-serif",
            cursor: "pointer",
            boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
            transition: "all 0.3s ease"
        },
        onMouseEnter: function(e) {
            return e.currentTarget.style.transform = "scale(1.05)";
        },
        onMouseLeave: function(e) {
            return e.currentTarget.style.transform = "scale(1)";
        },
        onClick: addPatient
    }, "✍\uD83C\uDFFB दर्ता गर्नुहोस्")) : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
            marginTop: "80px",
            marginLeft: "40px",
            fontFamily: "Noto Sans Devanagari, sans-serif"
        }
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
        style: {
            color: "#339E71",
            fontSize: "2.4rem",
            marginBottom: "25px"
        }
    }, "\uD83E\uDDFE हालै दर्ता भएका सहभागीहरू"), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
        style: {
            width: "70%",
            borderCollapse: "collapse",
            fontSize: "1.1rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            borderRadius: "12px",
            overflow: "hidden"
        }
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
        style: {
            backgroundColor: "#005d5d",
            color: "#fff"
        }
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
        style: {
            padding: "14px 18px",
            textAlign: "left",
            width: "55%"
        }
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }
    }, "सहभागीको एआरटि आईडी", /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        placeholder: "खोज्नुहोस्...",
        value: searchTerm,
        onChange: function(e) {
            return setSearchTerm(e.target.value);
        },
        style: {
            padding: "6px 10px",
            fontSize: "0.9rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "180px"
        }
    }))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
        style: {
            padding: "14px 18px",
            textAlign: "left"
        }
    }, "दर्ता मिति"))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, displayedPatients.length === 0 ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
        colSpan: 2,
        style: {
            padding: "12px 18px",
            fontStyle: "italic"
        }
    }, "कुनै सहभागी भेटिएन")) : displayedPatients.map(function(p, idx) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
            key: p.id,
            onClick: function() {
                return openChart(p);
            },
            style: {
                cursor: "pointer",
                backgroundColor: idx % 2 === 0 ? "#f9fdf9" : "#ffffff",
                transition: "all 0.2s ease"
            },
            onMouseEnter: function(e) {
                return e.currentTarget.style.backgroundColor = "#e6f7f0";
            },
            onMouseLeave: function(e) {
                return e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#f9fdf9" : "#ffffff";
            }
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
            style: {
                padding: "12px 18px"
            }
        }, p.artId), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
            style: {
                padding: "12px 18px"
            }
        }, p.registeredDate ? new Date(p.registeredDate).toLocaleString() : "N/A"));
    })))));
}


/***/ })

});
//# sourceMappingURL=src_page-header_page-header_component_tsx.c3a6d13427dad532.hot-update.js.map