export type Account = {
  // TODO: us a uuid type
  id: string,
  email: string,
  password: string,
};

export type NewAccount = {
  email: string,
  password: string,
}
