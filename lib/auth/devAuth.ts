import { User } from "@/types";

interface DevAuthUser extends User {
  password: string;
  is_admin: boolean;
}

type DevAuthGlobal = typeof globalThis & {
  __devAuthUsers__?: DevAuthUser[];
  __devAuthNextId__?: number;
};

const globalStore = globalThis as DevAuthGlobal;

const seedUsers: DevAuthUser[] = [
  {
    user_id: 1,
    name: "Demo User",
    email: "demo@example.com",
    phone: "+91-9000000000",
    password: "123456",
    is_admin: false,
    role: "user",
  },
  {
    user_id: 2,
    name: "Yash",
    email: "yash1@gmail.com",
    phone: "+91-9876543210",
    password: "pass123",
    is_admin: false,
    role: "user",
  },
  {
    user_id: 3,
    name: "Rahul",
    email: "rahul2@gmail.com",
    phone: "+91-9876543211",
    password: "pass123",
    is_admin: false,
    role: "user",
  },
  {
    user_id: 4,
    name: "Rohan",
    email: "rohan@gmail.com",
    phone: "+91-9876543212",
    password: "pass123",
    is_admin: false,
    role: "user",
  },
];

function getUsersStore() {
  if (!globalStore.__devAuthUsers__) {
    globalStore.__devAuthUsers__ = [...seedUsers];
  }
  if (!globalStore.__devAuthNextId__) {
    globalStore.__devAuthNextId__ = seedUsers.length + 1;
  }
  return globalStore.__devAuthUsers__;
}

export function shouldUseDevAuth() {
  return !(
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_NAME
  );
}

export function findDevUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase();
  return getUsersStore().find((user) => user.email.toLowerCase() === normalizedEmail) ?? null;
}

export function findDevUserById(userId: number) {
  return getUsersStore().find((user) => user.user_id === userId) ?? null;
}

export function createDevUser(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const users = getUsersStore();
  const user: DevAuthUser = {
    user_id: globalStore.__devAuthNextId__ ?? users.length + 1,
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    password: input.password,
    is_admin: false,
    role: "user",
  };
  globalStore.__devAuthNextId__ = user.user_id + 1;
  users.push(user);
  return user;
}
