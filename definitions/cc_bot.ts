export enum State {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ERRORED_SCHEDULE_RESTART = 'errored_schedule_restart'
}

export enum Plan {
  BASIC = 'basic',
  PRO = 'pro'
}

export type Authorization = {
  discord_token: string
}

export type Interface = {
  command_prefix: string
}

export type Status = {
  node: string,
  pid: string
}

export type Statistics = {
  discord_token: string
}

export interface Modules {
  [key: string]: Object;
}

export type CloudCordBot = {
  id: string,
  name: string,
  creator: string,
  avatar_url: string,
  deployed_at: string,
  admin_access: string[],
  state: State,
  authorization: Authorization,
  interface: Interface,
  modules: Modules,
  statistics: Statistics,
  status: Status
}