/*
 * Copyright (C) 2009-2015 Typesafe Inc. <http://www.typesafe.com>
 */
var assert = require("assert");
var jsRoutes = require("./jsRoutes");
var jsRoutesBadHost = require("./jsRoutesBadHost");

describe("The JavaScript router", function() {
    it("should generate a url", function() {
        var data = jsRoutes.controllers.Application.index();
        assert.equal("/", data.url);
    });
    it("should provide the GET method", function() {
        var data = jsRoutes.controllers.Application.index();
        assert.equal("GET", data.method);
    });
    it("should provide the POST method", function() {
        var data = jsRoutes.controllers.Application.post();
        assert.equal("POST", data.method);
    });
    it("should add parameters to the path", function() {
        var data = jsRoutes.controllers.Application.withParam("foo");
        assert.equal("/with/foo", data.url);
    });
    it("should add parameters to the query string", function() {
        var data = jsRoutes.controllers.Application.takeBool(true);
        assert.equal("/take-bool?b=true", data.url);
    });
    it("should properly escape the host", function() {
        var data = jsRoutesBadHost.controllers.Application.index();
        assert(data.absoluteURL().indexOf("'}}};alert(1);a={a:{a:{a:'") >= 0)
    });
});
