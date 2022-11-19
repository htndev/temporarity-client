"use strict";
exports.__esModule = true;
exports.routesReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var routes_1 = require("../actions/routes");
var initialState = {
    routes: [],
    isFetchingRoutes: false,
    fetchRoutesError: null,
    isCreatingRoute: false,
    createRouteError: null,
    routesWithDetails: {}
};
exports.routesReducer = toolkit_1.createReducer(initialState, function (build) {
    return build
        .addCase(routes_1.FETCH_ROUTES_STARTED, function (state) {
        state.isFetchingRoutes = true;
        state.routes = [];
    })
        .addCase(routes_1.FETCH_ROUTES_COMPLETED, function (state, _a) {
        var payload = _a.payload;
        state.isFetchingRoutes = false;
        state.routes = payload.routes;
    })
        .addCase(routes_1.FETCH_ROUTES_FAILED, function (state, _a) {
        var payload = _a.payload;
        state.isFetchingRoutes = false;
        state.fetchRoutesError = payload;
    })
        .addCase(routes_1.CREATE_ROUTE_STARTED, function (state) {
        state.isCreatingRoute = true;
        state.createRouteError = null;
    })
        .addCase(routes_1.CREATE_ROUTE_COMPLETED, function (state) {
        state.isCreatingRoute = false;
        state.createRouteError = null;
    })
        .addCase(routes_1.CREATE_ROUTE_FAILED, function (state, _a) {
        var payload = _a.payload;
        state.isCreatingRoute = false;
        state.createRouteError = payload;
    })
        .addCase(routes_1.ADD_ROUTE_DETAILS, function (state, _a) {
        var payload = _a.payload;
        if (payload) {
            state.routesWithDetails[payload.routeId] = payload.details;
        }
    })
        .addCase(routes_1.CLEAR_ROUTES_DETAILS, function (state) {
        state.routesWithDetails = {};
    })
        .addCase(routes_1.UPDATE_ROUTE_METHODS, function (state, _a) {
        var payload = _a.payload;
        var routeIndex = state.routes.findIndex(function (r) { return r.id === (payload === null || payload === void 0 ? void 0 : payload.routeId); });
        if (payload && routeIndex !== -1) {
            state.routes[routeIndex].methods = payload.methods;
        }
    })
        .addCase(routes_1.UPDATE_ROUTE_STATUS, function (state, _a) {
        var payload = _a.payload;
        var routeIndex = state.routes.findIndex(function (r) { return r.id === (payload === null || payload === void 0 ? void 0 : payload.routeId); });
        if (payload && routeIndex !== -1) {
            state.routes[routeIndex].status = payload.status;
        }
    });
});
