/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module './css/style.css'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nvar chatForm = document.getElementById('chat-form');\nvar chatMessages = document.querySelector('.chat-messages');\nvar roomName = document.getElementById('room-name');\nvar userList = document.getElementById('users'); // get username and room from URL\n\nvar _Qs$parse = Qs.parse(location.search, {\n  ignoreQueryPrefix: true\n}),\n    username = _Qs$parse.username,\n    room = _Qs$parse.room;\n\nvar socket = io(); // join chatroom\n\nsocket.emit('joinRoom', {\n  username: username,\n  room: room\n}); // get room and users\n\nsocket.on('roomUsers', function (_ref) {\n  var room = _ref.room,\n      users = _ref.users;\n  outputRoomName(room);\n  outputUsers(users);\n}); // message from server\n\nsocket.on('message', function (message) {\n  console.log(message);\n  outputMessage(message); // scroll messages to the bottom\n\n  chatMessages.scrollTop = chatMessages.scrollHeight;\n}); // message submit\n\nchatForm.addEventListener('submit', function (e) {\n  e.preventDefault(); // get message text\n\n  var msg = e.target.elements.msg.value; // emit message to server\n\n  socket.emit('chatMessage', msg); // clear input\n\n  e.target.elements.msg.value = '', e.target.elements.msg.focus();\n}); // output message to DOM\n\nfunction outputMessage(message) {\n  var div = document.createElement('div');\n  div.classList.add('message');\n  div.innerHTML = \"\\n   \\n    <p class=\\\"meta\\\">\".concat(message.username, \" <span>\\u2022 \").concat(message.time, \"</span></p>\\n    \\n    <p class=\\\"text\\\">\").concat(message.text, \"</p>\\n    \");\n  document.querySelector('.chat-messages').appendChild(div);\n} // add room name to DOM\n\n\nfunction outputRoomName(room) {\n  roomName.innerText = room;\n} // add users to DOM\n\n\nfunction outputUsers(users) {\n  userList.innerHTML = \"\\n        \".concat(users.map(function (user) {\n    return \"<li>\".concat(user.username, \"</li>\");\n  }).join(''), \"\\n    \");\n}\n\n//# sourceURL=webpack:///./public/js/main.js?");

/***/ })

/******/ });