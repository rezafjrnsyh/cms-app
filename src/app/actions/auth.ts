"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "admin" && password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth",
      value: "true",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/home");
  }

  redirect("/?error=invalid");
}
