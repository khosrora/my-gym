"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymFeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const prisma_module_1 = require("../prisma/prisma.module");
const gym_features_controller_1 = require("./gym-features.controller");
const gym_features_service_1 = require("./gym-features.service");
let GymFeaturesModule = class GymFeaturesModule {
};
GymFeaturesModule = __decorate([
    (0, common_1.Module)({
        controllers: [gym_features_controller_1.GymFeaturesController],
        providers: [gym_features_service_1.GymFeaturesService],
        imports: [prisma_module_1.PrismaModule, (0, common_1.forwardRef)(() => app_module_1.AppModule)]
    })
], GymFeaturesModule);
exports.GymFeaturesModule = GymFeaturesModule;
//# sourceMappingURL=gym-features.module.js.map