"use strict";
exports.__esModule = true;
var cc_bot_1 = require("./definitions/cc_bot");
exports.BASIC_ALLOWED_PREFIXES = ['.', '!', '?', '-', '+', '*', '/'];
exports.isValidPlan = function (plan) { return (typeof plan === 'string' && Object.values(cc_bot_1.Plan).includes(plan)); };
/**
 * Checks if the prefix a user wants a bot to take matches with our guards
 * @param plan Plan of user
 * @param prefix Prefix user wants the bot to take
 */
exports.prefixAllowed = function (plan, prefix) {
    if (!exports.isValidPlan(plan))
        return { allowed: false, error: "Plan is not valid" };
    if (prefix.length > 12)
        return { allowed: false, error: "Prefix too long" };
    if (plan !== cc_bot_1.Plan.BASIC)
        return { allowed: true };
    if (exports.BASIC_ALLOWED_PREFIXES.includes(prefix))
        return { allowed: true };
    return { allowed: false, error: "Basic accounts may only use a small list of prefixes" };
};