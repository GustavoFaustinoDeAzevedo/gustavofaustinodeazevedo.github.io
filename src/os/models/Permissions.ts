export type Permissions = {
  owner: 'r' | 'rw';
  group: 'r' | 'rw';
  others: 'r' | 'rw' | null;
};
