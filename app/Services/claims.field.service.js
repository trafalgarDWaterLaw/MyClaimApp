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
var claim_type_model_1 = require('../Models/claim.type.model');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var claims_mock_json_1 = require('../Mock/claims.mock.json');
var ClaimServices = (function () {
    function ClaimServices(http) {
        this.http = http;
        this.jsonData = claims_mock_json_1.ClaimsMock.Claims;
    }
    //getClaimDynamicData
    ClaimServices.prototype.getExpenseHeads = function (claimTypeArr) {
        var expenseHeads = new Array();
        this.claimTypeDataArr = claimTypeArr;
        console.log("*****Static copy of Array is*********");
        console.log(this.claimTypeDataArr);
        console.log(claimTypeArr.length);
        for (var i = 0; i < claimTypeArr.length; i++) {
            var expHead = new claim_type_model_1.ExpenseHead();
            expHead.id = claimTypeArr[i].id;
            expHead.name = claimTypeArr[i].name;
            expenseHeads.push(expHead);
        }
        return expenseHeads;
    };
    ClaimServices.prototype.getExpenseHeadByID = function (id, claimTypeArr) {
        var idx = claimTypeArr.find(function (el) {
            return el.id === id;
        });
        if (idx != undefined) {
            this.specificClaimFields = idx;
            console.log('************get El by ID************');
            console.log(this.specificClaimFields);
            return idx;
        }
    };
    ClaimServices.prototype.getDDArrayByLabel = function (strLabel) {
        var strArr = new Array();
        for (var k = 0; k < this.specificClaimFields.dropdowns.length; k++) {
            if (this.specificClaimFields.dropdowns[k].label.name === strLabel) {
                var classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                console.log(classOptionArr);
                for (var i = 0; i < classOptionArr.length; i++) {
                    strArr.push(classOptionArr[i].name);
                }
            }
        }
        console.log(strArr);
        return strArr;
    };
    ClaimServices.prototype.getDependentDDArrayByLabel = function (strLabel, selectedName) {
        var strArr = new Array();
        var str = 'Mode of Travel';
        var selectedID;
        for (var k = 0; k < this.specificClaimFields.dropdowns.length; k++) {
            if (this.specificClaimFields.dropdowns[k].label.name === str) {
                var classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                for (var i = 0; i < classOptionArr.length; i++) {
                    if (classOptionArr[i].name == selectedName) {
                        selectedID = classOptionArr[i].id;
                        break;
                    }
                }
            }
        }
        for (var k = 0; k < this.specificClaimFields.dropdowns.length; k++) {
            if (this.specificClaimFields.dropdowns[k].label.name === strLabel) {
                var classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                for (var i = 0; i < classOptionArr.length; i++) {
                    if (classOptionArr[i].belongsTo === selectedID) {
                        strArr.push(classOptionArr[i].name);
                    }
                }
            }
        }
        console.log('************class of travel************');
        console.log(strArr);
        return strArr;
    };
    ClaimServices.prototype.fillClaims = function () {
        var claimTypeArr = new Array();
        for (var pos = 0; pos < this.jsonData.length; pos++) {
            var claim = new claim_type_model_1.ClaimType();
            claim.id = parseInt(this.jsonData[pos].Claimtype.id);
            claim.name = this.jsonData[pos].Claimtype.name;
            this.claimTypeDetailJsonData = this.jsonData[pos].Claimtypedetail;
            claim.dropdowns = new Array();
            claim.labels = new Array();
            for (var innerPos = 0; innerPos < this.claimTypeDetailJsonData.length; innerPos++) {
                if (this.claimTypeDetailJsonData[innerPos].Claimfield.type === 'DropDown') {
                    var ddown = new claim_type_model_1.DropDown();
                    var labelDDObj = new claim_type_model_1.LabelClass();
                    labelDDObj.name = this.claimTypeDetailJsonData[innerPos].Claimfield.label;
                    labelDDObj.isRequired = (this.claimTypeDetailJsonData[innerPos].Claimfield.required === "1");
                    ddown.label = labelDDObj;
                    this.claimFieldOptionDetailJsonData = this.claimTypeDetailJsonData[innerPos].Claimfield.Claimfieldoption;
                    var classOptArr = new Array();
                    for (var innerinPos = 0; innerinPos < this.claimFieldOptionDetailJsonData.length; innerinPos++) {
                        var classOpt = new claim_type_model_1.ClassOption();
                        classOpt.name = this.claimFieldOptionDetailJsonData[innerinPos].name;
                        classOpt.belongsTo = this.claimFieldOptionDetailJsonData[innerinPos].belongsto;
                        classOpt.id = this.claimFieldOptionDetailJsonData[innerinPos].id;
                        classOptArr.push(classOpt);
                    }
                    ddown.classOption = classOptArr;
                    claim.dropdowns.push(ddown);
                }
                else if (this.claimTypeDetailJsonData[innerPos].Claimfield.type.includes('SingleLineText')) {
                    var labelObj = new claim_type_model_1.LabelClass();
                    labelObj.name = this.claimTypeDetailJsonData[innerPos].Claimfield.label;
                    labelObj.isRequired = (this.claimTypeDetailJsonData[innerPos].Claimfield.required === "1");
                    claim.labels.push(labelObj);
                }
            }
            claimTypeArr.push(claim);
        }
        return Promise.resolve(claimTypeArr);
    };
    ClaimServices.prototype.getUniqueArray = function (columnArray) {
        var strUniqueArray = [];
        var _loop_1 = function(i) {
            if (i === 0) {
                strUniqueArray.push(columnArray[i]);
            }
            else {
                console.log(strUniqueArray.find(function (item) { return item == columnArray[i]; }));
                if ((strUniqueArray.find(function (item) { return item == columnArray[i]; }) == undefined)) {
                    strUniqueArray.push(columnArray[i]);
                }
            }
        };
        for (var i = 0; i < columnArray.length; i++) {
            _loop_1(i);
        }
        return strUniqueArray;
    };
    ClaimServices.prototype.getTodaysDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var strDD = dd.toString();
        var strMM = mm.toString();
        var yyyy = today.getFullYear();
        if (dd < 10) {
            strDD = '0' + strDD;
        }
        if (mm < 10) {
            strMM = '0' + strMM;
        }
        var strtoday = strDD + '/' + strMM + '/' + yyyy;
        return strtoday;
    };
    ClaimServices.prototype.storeClaim = function (claimToAdd) {
        //Write to DB
        var claimsURL = 'app/claims';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        console.log('***************Data to store coming is **************************');
        console.log(claimToAdd);
        return this.http.post(claimsURL, JSON.stringify({ claimType: claimToAdd.claimType, expense: claimToAdd.expense, date: claimToAdd.date }), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; });
    };
    ClaimServices.prototype.getClaims = function () {
        //get all the claims from DB
        var claimsURL = 'app/claims';
        return this.http.get(claimsURL)
            .toPromise().then(function (response) { return response.json().data; });
    };
    ClaimServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClaimServices);
    return ClaimServices;
}());
exports.ClaimServices = ClaimServices;
//# sourceMappingURL=claims.field.service.js.map