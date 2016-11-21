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
var TravelComponent = (function () {
    function TravelComponent(claimService) {
        this.claimService = claimService;
        this.isCot = false;
        this.isRate = false;
        this.isKms = false;
        //Fields which can be added to Add claim for extensive information about Claim
        this.fromCity = 'Gurgaon';
        this.toDistSelected = 'KANPUR';
        this.fDistSelected = 'DELHI';
        this.toCity = 'Kanpur';
        this.moTSelected = 'Company Vehicle';
        this.coTSelected = '';
        this.expense = 2000.75;
        this.remark = 'Good';
        this.kilometers = 100;
        this.rate = 2000;
    }
    TravelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.claimService.fillClaims().then(function (claimArr) {
            _this.claimFields = _this.claimService.getExpenseHeadByID(3, claimArr);
            _this.fdistrict = _this.claimService.getDDArrayByLabel('From District');
            console.log(_this.fdistrict);
            _this.tdistrict = _this.claimService.getDDArrayByLabel('To District');
            _this.modeOfTravel = _this.claimService.getDDArrayByLabel('Mode of Travel');
        });
    };
    TravelComponent.prototype.getClassOfTravel = function () {
        if (this.moTSelected === 'Bus' || this.moTSelected === 'Car' || this.moTSelected === 'Taxi') {
            this.isRate = true;
            this.isKms = true;
        }
        else {
            this.isRate = false;
            this.isKms = false;
        }
        this.clasOfTravel = this.claimService.getDependentDDArrayByLabel('Class of Travel', this.moTSelected);
        if (this.clasOfTravel.length != 0)
            this.isCot = true;
        else
            this.isCot = false;
    };
    TravelComponent.prototype.addClaim = function () {
        this.claimToAdd = new claim_type_model_1.AddClaim();
        this.claimToAdd.claimType = this.claimFields.name;
        this.claimToAdd.expense = this.expense;
        this.claimToAdd.date = this.claimService.getTodaysDate();
        this.claimService.storeClaim(this.claimToAdd);
        this.setDef();
    };
    TravelComponent.prototype.setDef = function () {
        this.fromCity = 'Gurgaon';
        this.toDistSelected = 'KANPUR';
        this.fDistSelected = 'DELHI';
        this.toCity = 'Kanpur';
        this.moTSelected = 'Company Vehicle';
        this.coTSelected = '';
        this.expense = 2000;
        this.remark = 'Good';
        this.kilometers = 100;
        this.rate = 2000;
    };
    TravelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'travel-template',
            templateUrl: 'travel.component.html'
        }), 
        __metadata('design:paramtypes', [claims_field_service_1.ClaimServices])
    ], TravelComponent);
    return TravelComponent;
}());
exports.TravelComponent = TravelComponent;
//# sourceMappingURL=travel.component.js.map