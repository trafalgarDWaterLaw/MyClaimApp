"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var claims_field_service_1 = require('./Services/claims.field.service');
var claim_type_model_1 = require('./Models/claim.type.model');
var HRAComponent = (function () {
    function HRAComponent(claimService) {
        this.claimService = claimService;
        //Fields which can be added to Add claim for extensive information about Claim
        this.distSelected = 'DELHI';
        this.city = 'Kanpur';
        this.expense = 8000;
        this.remark = 'House Rent';
    }
    HRAComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.claimService.fillClaims().then(function (claimArr) {
            _this.claimFields = _this.claimService.getExpenseHeadByID(7, claimArr);
            _this.district = _this.claimService.getDDArrayByLabel('District');
            console.log(_this.district);
        });
    };
    HRAComponent.prototype.addClaim = function () {
        this.claimToAdd = new claim_type_model_1.AddClaim();
        this.claimToAdd.claimType = this.claimFields.name;
        this.claimToAdd.expense = this.expense;
        this.claimToAdd.date = this.claimService.getTodaysDate();
        this.claimService.storeClaim(this.claimToAdd);
        this.setDef();
    };
    HRAComponent.prototype.setDef = function () {
        this.distSelected = 'DELHI';
        this.city = 'Kanpur';
        this.expense = 8000;
        this.remark = 'House Rent';
    };
    HRAComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hra-template',
            templateUrl: 'hra.component.html'
        }), 
        __metadata('design:paramtypes', [claims_field_service_1.ClaimServices])
    ], HRAComponent);
    return HRAComponent;
}());
exports.HRAComponent = HRAComponent;
//# sourceMappingURL=hra.component.js.map