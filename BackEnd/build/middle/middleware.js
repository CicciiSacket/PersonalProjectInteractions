"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.passwordRequire = exports.validateRegister = void 0;
var bcrypt = require('bcrypt');
var users = require('/Users/studente/Desktop/MsgProject/BackEnd/users.json');
var validPrefix = ["+39"];
var prefixValidate = function (prefix) {
    if (validPrefix.includes(prefix)) {
        return true;
    }
};
var validateRegister = function (_a, res, next) {
    var _b = _a.body, prefix = _b.prefix, phoneNumber = _b.phoneNumber, userName = _b.userName, password = _b.password;
    if ((password.length > 6) && prefixValidate(prefix) && userName && (!isNaN(phoneNumber))) {
        next();
    }
    else {
        return res.status(400).json({ message: "Registration not complete!" });
    }
};
exports.validateRegister = validateRegister;
var passwordRequire = function (_a, res, next) {
    var body = _a.body, params = _a.params;
    var user = users.findIndex(function (item) { return item.phoneNumber == params.phoneNumber; });
    if (bcrypt.compareSync(body.password, users[user].password)) {
        res.locals.user = users[user];
        next();
    }
    else {
        return res.status(403).json({ message: "Wrong password!" });
    }
};
exports.passwordRequire = passwordRequire;
var findUser = function (_a, res, next) {
    var params = _a.params;
    var user = users.findIndex(function (item) { return item.phoneNumber == params.phoneNumber; });
    if (users.includes(users[user])) {
        res.locals.user = users[user];
        next();
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
};
exports.findUser = findUser;
