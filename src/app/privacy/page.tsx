import type { Metadata } from "next";
import { LegalArticle, LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "피커프로젝트가 처리하는 개인정보의 항목, 처리 목적, 보유 기간 및 정보주체의 권리 행사 방법을 안내하는 개인정보처리방침입니다.",
  alternates: {
    canonical: "https://picker.ai.kr/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="개인정보처리방침" effectiveDate="2026년 5월 13일">
      <p className="mb-10 text-[14px] sm:text-[15px] text-[var(--color-text-light)] leading-[1.85]">
        피커프로젝트(이하 &quot;회사&quot;)는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
        보호하고 이와 관련한 고충을 신속하고 원활하게 처리하기 위하여 다음과 같이 개인정보처리방침을
        수립·공개합니다.
      </p>

      <LegalArticle number="제1조" heading="처리하는 개인정보 항목">
        <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-text)]">문의·상담 접수 시</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>필수항목: 이름, 이메일 주소, 전화번호, 소속 기관·기업, 문의 내용</li>
              <li>선택항목: 직책, 사용 환경 정보</li>
            </ul>
          </li>
          <li>
            <strong className="text-[var(--color-text)]">서비스 이용 과정에서 자동 생성·수집되는 항목</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>IP 주소, 쿠키, 서비스 이용기록, 방문 일시, 브라우저 정보</li>
            </ul>
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제2조" heading="개인정보의 처리 목적">
        <p>회사는 다음의 목적을 위하여 개인정보를 처리하며, 목적이 변경되는 경우 사전 동의를 받습니다.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>지자체·기업·투자·기술협력 등 문의 접수 및 회신</li>
          <li>서비스 상담, 제품 도입 협의 및 후속 커뮤니케이션</li>
          <li>서비스 이용 통계 분석 및 품질 개선</li>
          <li>관련 법령상 의무 이행</li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제3조" heading="개인정보의 처리 및 보유 기간">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보 수집 시에 동의받은
            개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
          </li>
          <li>
            구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>문의·상담 기록: 처리 완료 후 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
            </ul>
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제4조" heading="개인정보의 제3자 제공">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 정보주체의 개인정보를 제2조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의,
            법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를
            제3자에게 제공합니다.
          </li>
          <li>현재 회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제5조" heading="개인정보처리의 위탁">
        <p>
          회사는 원활한 서비스 제공을 위해 필요한 경우 다음과 같이 개인정보 처리 업무를 위탁할 수
          있으며, 위탁 계약 시 「개인정보 보호법」 제26조에 따라 위탁업무의 내용과 수탁자를 정보주체가
          언제든지 쉽게 확인할 수 있도록 공개합니다.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>위탁 대상이 발생하는 시점에 본 방침에 반영합니다.</li>
        </ul>
      </LegalArticle>

      <LegalArticle number="제6조" heading="정보주체와 법정대리인의 권리·의무 및 행사방법">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            정보주체는 회사에 대해 언제든지 개인정보 열람, 정정·삭제, 처리정지 요구 등의 권리를 행사할
            수 있습니다.
          </li>
          <li>
            제1항에 따른 권리 행사는 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해
            지체 없이 조치하겠습니다.
          </li>
          <li>
            정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요청한 경우, 회사는 정정 또는 삭제를
            완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제7조" heading="개인정보의 파기">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
            지체 없이 해당 개인정보를 파기합니다.
          </li>
          <li>
            파기의 절차 및 방법은 다음과 같습니다.
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>파기 절차: 파기 사유가 발생한 개인정보를 선정하고 책임자의 승인을 받아 파기합니다.</li>
              <li>파기 방법: 전자적 파일은 복구 불가능한 방법으로 영구 삭제하고, 종이 문서는 분쇄하거나 소각합니다.</li>
            </ul>
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제8조" heading="개인정보의 안전성 확보 조치">
        <p>회사는 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고 있습니다.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
          <li>기술적 조치: 개인정보처리시스템의 접근 권한 관리, 접근통제시스템 운용, 전송 구간 암호화(HTTPS)</li>
          <li>물리적 조치: 자료 보관 장소의 접근 통제</li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제9조" heading="자동수집장치(쿠키)의 운영">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다.
          </li>
          <li>
            이용자는 브라우저 설정을 통해 쿠키 저장을 허용하거나 거부할 수 있으며, 거부 시 일부 서비스
            이용에 제한이 있을 수 있습니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제10조" heading="개인정보 보호책임자">
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한 정보주체의
          불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>개인정보 보호책임자: 피커프로젝트 운영팀</li>
          <li>연락처: kms@picker.ai.kr</li>
        </ul>
      </LegalArticle>

      <LegalArticle number="제11조" heading="권익침해 구제방법">
        <p>
          정보주체는 개인정보 침해에 대한 신고 및 상담을 다음 기관에 문의할 수 있습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청 사이버범죄수사단: (국번없이) 1301 (www.spo.go.kr)</li>
          <li>경찰청 사이버안전국: (국번없이) 182 (cyberbureau.police.go.kr)</li>
        </ul>
      </LegalArticle>

      <LegalArticle number="제12조" heading="개인정보처리방침의 변경">
        <p>
          본 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및
          정정이 있는 경우에는 변경 사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
        </p>
      </LegalArticle>
    </LegalLayout>
  );
}
