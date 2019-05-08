"use strict";
exports.__esModule = true;
var Plan;
(function (Plan) {
    Plan["BASIC"] = "basic";
    Plan["PRO"] = "pro";
})(Plan || (Plan = {}));
exports.BASIC_ALLOWED_PREFIXES = ['.', '!', '?', '-', '+', '*', '/'];
exports.isValidPlan = function (plan) { return (typeof plan === 'string' && Object.values(Plan).includes(plan)); };
exports.prefixAllowed = function (plan, prefix) {
    if (!exports.isValidPlan(plan))
        return { allowed: false, error: "Plan is not valid" };
    if (prefix.length > 12)
        return { allowed: false, error: "Prefix too long" };
    if (plan !== Plan.BASIC)
        return { allowed: true };
    if (exports.BASIC_ALLOWED_PREFIXES.includes(prefix))
        return { allowed: true };
    return { allowed: false, error: "Basic accounts may only use a small list of prefixes" };
};