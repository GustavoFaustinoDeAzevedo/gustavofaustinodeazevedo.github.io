import { Permissions } from '.';

export type FileEntry = {
  name: string;
  content: string;
  ownerUid: number;
  group: string;
  permissions: Permissions;
};
