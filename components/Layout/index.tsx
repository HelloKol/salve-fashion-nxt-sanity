import { SiteHeader, SiteFooter } from "@/components";

export default function Layout({ children }: any) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
