'use client';
import { GlobalWrapper, LRContentWrapper, LContentWrapper, RContentWrapper } from "@/components/GlobalComponents";

export default function Home() {
  return (
    <GlobalWrapper header="ログイン">
      <LRContentWrapper>
        <LContentWrapper>L</LContentWrapper>
        <RContentWrapper>R</RContentWrapper>
      </LRContentWrapper>
    </GlobalWrapper>
  );
}
