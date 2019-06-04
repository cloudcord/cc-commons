export interface CommandOptions {
  [key: string]: Object
}

export type CommandPermission = {
  type: string,
  named_role?: string
}

export interface CommandPermissions {
  [key: string]: CommandPermission
}

export type ModuleConfig = {
  command_options?: CommandOptions,
  command_permissions?: CommandPermissions,
  disabled_commands: string[]
}

export type CloudCordModule = {
  commands: Object,
  description: string,
  enabled: boolean,
  gwe_sub: string[],
  icon: string,
  internal_module: boolean,
  internal_reference: string,
  name: string
}