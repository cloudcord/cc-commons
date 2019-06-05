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
// Module Config Validation
exports.MODULE_ROOT_KEYS = ['disabled_commands', 'command_permissions', 'command_options'];
exports.PERMISSION_TYPES = ['everyone', 'named_role'];
var validateModuleKeys = function (omf, o, m) {
    var mRoot = Object.keys(m), oCmds = Object.keys(omf.commands);
    // Makes sure there are no additional keys added to the root of the module object
    if (mRoot.filter(function (i) { return exports.MODULE_ROOT_KEYS.indexOf(i) < 0; }).length > 0)
        return false;
    // Makes sure the user hasn't disabled any commands which aren't part of the module
    if (m.disabled_commands)
        if (m.disabled_commands.filter(function (i) { return !oCmds.includes(i); }).length > 0)
            return false;
    // Makes sure user hasn't tried to set permissions of any commands that aren't part of the module
    if (m.command_permissions)
        if (Object.keys(m.command_permissions).filter(function (i) { return !oCmds.includes(i); }).length > 0)
            return false;
    // Makes sure command permissions conform to correct structure
    if (m.command_permissions)
        if (!Object.keys(m.command_permissions).every(function (i) {
            var permission = m.command_permissions[i];
            if (!permission)
                return false;
            if (!exports.PERMISSION_TYPES.includes(permission.type))
                return false;
            return true;
        }))
            return false;
    // Checks passed!
    return true;
};
/**
 * Checks if the config a user wants a module to take matches with our guards
 * @param config Customized config
 */
exports.validModuleConfig = function (module, originalModuleConfig, newConfig) {
    if (!validateModuleKeys(module, originalModuleConfig, newConfig))
        return { "valid": false, "error": "Invalid module structure" };
    return { "valid": true };
};
