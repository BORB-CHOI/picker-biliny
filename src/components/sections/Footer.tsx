export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white py-12 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xl font-black tracking-tight">PICKER PROJECT</p>
            <p className="mt-1 text-xs text-white/40">주식회사 피커프로젝트</p>
            <p className="mt-2 text-sm text-white/50">
              중소도시의 이동권을 다시 설계합니다.
            </p>
            <p className="mt-2 text-xs text-white/40">
              Tel. 010-6287-9917
            </p>
          </div>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="transition-colors hover:text-white">이용약관</a>
            <a href="#" className="transition-colors hover:text-white">개인정보처리방침</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-sm text-white/30">
          &copy; 2026 Picker Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
