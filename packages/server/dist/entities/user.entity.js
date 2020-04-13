"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const session_entity_1 = require("./session.entity");
let User = class User extends base_entity_1.Base {
};
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false })
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false })
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, select: false })
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(type => session_entity_1.Session, session => session.user)
], User.prototype, "sessions", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map