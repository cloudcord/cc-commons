import { Plan } from "./definitions/cc_bot";
import { CloudCordModule, ModuleConfig } from "./definitions/cc_module";

// Command Prefix Validation

type PrefixAllowedResponse = {
  allowed: boolean,
  error?: string
}

export const BASIC_ALLOWED_PREFIXES = ['.', '!', '?', '-', '+', '*', '/'];

export const isValidPlan = (plan: Plan): boolean => (
  typeof plan === 'string' && Object.values(Plan).includes(plan)
)
/**
 * Checks if the prefix a user wants a bot to take matches with our guards
 * @param plan Plan of user
 * @param prefix Prefix user wants the bot to take
 */
export const prefixAllowed = (plan: Plan, prefix: string): PrefixAllowedResponse => {
  if (!isValidPlan(plan)) return { allowed: false, error: "Plan is not valid" };
  if (prefix.length > 12) return { allowed: false, error: "Prefix too long" };
  if (plan !== Plan.BASIC) return { allowed: true };

  if (BASIC_ALLOWED_PREFIXES.includes(prefix)) return { allowed: true };

  return { allowed: false, error: `Basic accounts may only use a small list of prefixes` }
}

// Module Config Validation

export const MODULE_ROOT_KEYS = ['disabled_commands', 'command_permissions', 'command_options'];
export const PERMISSION_TYPES = ['everyone', 'named_role'];

type ModuleConfigValidatorResponse = {
  valid: boolean,
  error?: string
}

const validateModuleKeys = (omf: CloudCordModule, o: ModuleConfig, m: ModuleConfig): boolean => {
  const mRoot = Object.keys(m),
        oCmds = Object.keys(omf.commands)

  // Makes sure there are no additional keys added to the root of the module object
  if(mRoot.filter((i) => {return MODULE_ROOT_KEYS.indexOf(i) < 0;}).length > 0) return false;

  // Makes sure the user hasn't disabled any commands which aren't part of the module
  if(Object.keys(m.disabled_commands).filter(i => {return !oCmds.includes(i)}).length > 0) return false;

  // Makes sure user hasn't tried to set permissions of any commands that aren't part of the module
  if(Object.keys(m.command_permissions).filter(i => {return !oCmds.includes(i)}).length > 0) return false;

  // Makes sure command permissions conform to correct structure
  if(!Object.keys(m.command_permissions).every(i => {
    const permission = m.command_permissions[i];
    if(!permission) return false;
    if(!PERMISSION_TYPES.includes(permission.type)) return false;

    return true;
  })) return false;

  // Checks passed!
  return true;
}
/**
 * Checks if the config a user wants a module to take matches with our guards
 * @param config Customized config
 */
export const validModuleConfig = (module: CloudCordModule, originalModuleConfig: ModuleConfig,  newConfig: ModuleConfig): ModuleConfigValidatorResponse => {
  if(!validateModuleKeys(module, originalModuleConfig, newConfig)) return {"valid": false, "error": "Invalid module structure"};
  
  return {"valid": true};
}