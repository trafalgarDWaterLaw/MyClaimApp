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
var ClaimComponent = (function () {
    function ClaimComponent(claimService) {
        this.claimService = claimService;
        this.componentBooleanArr = new Array(7);
        this.expenseHeads = [];
        this.claimTypeArr = [];
        this.isDisplayClaim = false;
    }
    ClaimComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setDefaultBool();
        this.componentBooleanArr[0] = true;
        this.claimService.fillClaims().then(function (claimArr) {
            _this.claimTypeArr = claimArr;
            console.log(_this.claimTypeArr);
            _this.expenseHeads = _this.claimService.getExpenseHeads(claimArr);
            _this.cDate = _this.claimService.getTodaysDate();
            console.log(_this.expenseHeads);
        });
    };
    // ngDoCheck() {
    //   this.displayClaim = this.claimService.getClaims();
    //   if(this.displayClaim.length != 0)
    //     this.isDisplayClaim = true;
    //   else
    //     this.isDisplayClaim = false;
    // }
    ClaimComponent.prototype.selectForm = function (id) {
        console.log('***************************************************');
        console.log('selected drop down ID is' + id);
        console.log('***************************************************');
        if (id === 'Travel') {
            this.setDefaultBool();
            this.componentBooleanArr[0] = true;
        }
        else if (id === 'Daily Allowance') {
            this.setDefaultBool();
            this.componentBooleanArr[1] = true;
        }
        else if (id === 'Lodging and Boarding') {
            this.setDefaultBool();
            this.componentBooleanArr[2] = true;
        }
        else if (id === 'Local Conveyance') {
            this.setDefaultBool();
            this.componentBooleanArr[3] = true;
        }
        else if (id === 'HRA') {
            this.setDefaultBool();
            this.componentBooleanArr[4] = true;
        }
        else if (id === 'Mobile') {
            this.setDefaultBool();
            this.componentBooleanArr[5] = true;
        }
        else if (id === 'Misc') {
            this.setDefaultBool();
            this.componentBooleanArr[6] = true;
        }
    };
    ClaimComponent.prototype.setDefaultBool = function () {
        for (var sze = 0; sze < 7; sze++) {
            this.componentBooleanArr[sze] = false;
        }
        console.log('Component Boolean***************************************************');
        console.log(this.componentBooleanArr);
    };
    ClaimComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'claim-template',
            templateUrl: 'claim.component.html'
        }), 
        __metadata('design:paramtypes', [claims_field_service_1.ClaimServices])
    ], ClaimComponent);
    return ClaimComponent;
}());
exports.ClaimComponent = ClaimComponent;
//# sourceMappingURL=claim.component.js.map