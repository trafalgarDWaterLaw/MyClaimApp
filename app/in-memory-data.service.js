"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var claims = [
            { claimType: 'Travel', expense: 2500, date: '21/11/2016' },
            { claimType: 'Mobile', expense: 500, date: '21/11/2016' },
            { claimType: 'HRA', expense: 8000, date: '21/11/2016' }
        ];
        return { claims: claims };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map