"use server";

import { cookies } from "next/headers";

export function verificaAutenticacao() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return !!token;
}
