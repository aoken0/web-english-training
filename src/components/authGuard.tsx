"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../utils/useAuth";
import { ReactNode, useEffect } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const noRedirectPaths = ["/"];

  useEffect(() => {
    if (!loading && !user && !noRedirectPaths.includes(pathname)) {
      router.push("/"); // 未ログインの場合はログインページへリダイレクト
    }
    // eslint-disable-next-line
  }, [loading, user, router, pathname]);

  if (loading) {
    return <p>Loading...</p>; // ローディング中の表示
  }

  // 認証が不要なパス、またはログイン済みの場合のみ表示
  if (noRedirectPaths.includes(pathname) || user) {
    return <>{children}</>;
  }

  return null; // それ以外は何も表示しない
};

export default AuthGuard;
