"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const user_entity_1 = require("./user.entity");
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["VALID"] = "VALID";
    SessionStatus["INVALID"] = "INVALID";
})(SessionStatus = exports.SessionStatus || (exports.SessionStatus = {}));
let Session = class Session extends Base_1.Base {
};
__decorate([
    typeorm_1.Column({ type: 'enum', nullable: false, default: SessionStatus.VALID, enum: SessionStatus })
], Session.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false })
], Session.prototype, "token", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.sessions)
], Session.prototype, "user", void 0);
Session = __decorate([
    typeorm_1.Entity()
], Session);
exports.Session = Session;
//# sourceMappingURL=session.entity.js.map