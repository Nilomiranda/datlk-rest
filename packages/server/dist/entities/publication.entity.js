"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = require("./base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Publication = class Publication extends base_entity_1.Base {
};
__decorate([
    typeorm_1.Column({ type: 'varchar', length: '400', nullable: false })
], Publication.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.publications, { nullable: false })
], Publication.prototype, "user", void 0);
Publication = __decorate([
    typeorm_1.Entity()
], Publication);
exports.Publication = Publication;
//# sourceMappingURL=publication.entity.js.map