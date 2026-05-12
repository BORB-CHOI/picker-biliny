import type { Metadata } from "next";
import { LegalArticle, LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "피커프로젝트가 운영하는 서비스의 이용 조건과 절차, 회사와 이용자의 권리·의무를 규정한 이용약관입니다.",
  alternates: {
    canonical: "https://picker.ai.kr/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <LegalLayout title="이용약관" effectiveDate="2026년 5월 13일">
      <p className="mb-10 text-[14px] sm:text-[15px] text-[var(--color-text-light)] leading-[1.85]">
        본 약관은 피커프로젝트(이하 &quot;회사&quot;)가 제공하는 모빌리티 통합 서비스 및 관련 부수
        서비스(이하 &quot;서비스&quot;)의 이용과 관련하여, 회사와 이용자 간의 권리·의무 및 책임사항,
        기타 필요한 사항을 규정함을 목적으로 합니다.
      </p>

      <LegalArticle number="제1조" heading="목적">
        <p>
          본 약관은 회사가 운영하는 웹사이트 및 응용 서비스를 통해 제공하는 일체의 서비스 이용에 관한
          기본 사항을 정함을 목적으로 합니다.
        </p>
      </LegalArticle>

      <LegalArticle number="제2조" heading="정의">
        <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>&quot;서비스&quot;란 회사가 제공하는 BILINY, TRINY 및 이에 부수되는 모든 온·오프라인 서비스를 의미합니다.</li>
          <li>&quot;이용자&quot;란 본 약관에 동의하고 서비스를 이용하는 모든 개인 또는 법인을 의미합니다.</li>
          <li>&quot;콘텐츠&quot;란 회사 또는 제휴사가 서비스를 통해 제공하는 모든 정보, 문구, 이미지, 영상, 소프트웨어를 의미합니다.</li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제3조" heading="약관의 게시와 개정">
        <ol className="list-decimal pl-5 space-y-2">
          <li>회사는 본 약관의 내용을 이용자가 쉽게 확인할 수 있도록 서비스 화면에 게시합니다.</li>
          <li>
            회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있으며, 약관이 개정되는
            경우 적용일자 및 개정 사유를 명시하여 최소 7일 전(이용자에게 불리한 변경의 경우 30일 전)
            서비스 화면에 공지합니다.
          </li>
          <li>
            이용자가 개정 약관 시행일 이후에도 서비스를 계속 이용하는 경우 개정 약관에 동의한 것으로
            간주됩니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제4조" heading="약관 외 준칙">
        <p>
          본 약관에서 정하지 아니한 사항은 「약관의 규제에 관한 법률」, 「전자상거래 등에서의 소비자
          보호에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관계 법령 및
          상관례에 따릅니다.
        </p>
      </LegalArticle>

      <LegalArticle number="제5조" heading="서비스의 제공 및 변경">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 다음과 같은 업무를 수행합니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>모빌리티 정보 및 운행 콘텐츠의 제공</li>
              <li>제품 상담 및 문의 접수</li>
              <li>지자체·기업 도입을 위한 컨설팅 및 안내</li>
              <li>기타 회사가 정하는 부수 서비스</li>
            </ul>
          </li>
          <li>
            회사는 서비스의 품질 향상, 운영상·기술상 필요에 따라 제공 중인 서비스의 전부 또는 일부를
            변경할 수 있으며, 변경 시 그 내용과 사유를 사전에 공지합니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제6조" heading="서비스의 중단">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 컴퓨터 등 정보통신 설비의 보수점검·교체 및 고장, 통신두절, 천재지변 등 불가항력의
            사유가 발생한 경우 서비스의 제공을 일시 중단할 수 있습니다.
          </li>
          <li>
            제1항에 따른 서비스 중단으로 발생한 손해에 대하여 회사는 고의 또는 중대한 과실이 없는 한
            책임을 지지 않습니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제7조" heading="이용자의 의무">
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>서비스 신청 또는 문의 시 허위 내용을 기재하는 행위</li>
          <li>회사가 게시한 정보를 무단으로 변경·복제·배포하는 행위</li>
          <li>타인의 개인정보를 도용하거나 권리를 침해하는 행위</li>
          <li>회사의 서비스 운영을 고의로 방해하는 일체의 행위</li>
          <li>관련 법령 또는 본 약관이 금지하는 기타 행위</li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제8조" heading="회사의 의무">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 관련 법령과 본 약관이 금지하는 행위를 하지 아니하며, 안정적인 서비스 제공을 위하여
            최선의 노력을 다합니다.
          </li>
          <li>
            회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보 보호를 위해 보안 시스템을
            갖추며 개인정보처리방침을 공시·준수합니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제9조" heading="지적재산권의 귀속">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            서비스 내 회사가 제작한 콘텐츠에 대한 저작권 및 기타 지적재산권은 회사에 귀속됩니다.
          </li>
          <li>
            이용자는 회사의 사전 서면 동의 없이 서비스를 통해 제공받은 콘텐츠를 영리 목적으로 이용하거나
            제3자에게 이용하게 하여서는 안 됩니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제10조" heading="책임의 제한">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인하여 서비스를
            제공할 수 없는 경우 책임이 면제됩니다.
          </li>
          <li>
            회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
          </li>
          <li>
            회사는 이용자가 서비스를 통하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을
            지지 않습니다.
          </li>
        </ol>
      </LegalArticle>

      <LegalArticle number="제11조" heading="개인정보의 보호">
        <p>
          회사는 이용자의 개인정보를 보호하기 위해 「개인정보 보호법」 등 관련 법령을 준수하며, 자세한
          내용은 별도의 <a href="/privacy" className="text-[var(--color-primary)] underline underline-offset-2 hover:no-underline">개인정보처리방침</a>에 따릅니다.
        </p>
      </LegalArticle>

      <LegalArticle number="제12조" heading="분쟁의 해결">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            본 약관에 관한 분쟁은 대한민국 법령에 따르며, 회사와 이용자 간 발생한 분쟁에 관한 소송은
            민사소송법상의 관할 법원에 제기합니다.
          </li>
          <li>
            회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만히 해결하기 위하여 필요한 모든 노력을
            합니다.
          </li>
        </ol>
      </LegalArticle>

      <section className="mt-12 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-[17px] sm:text-[20px] font-bold text-[var(--color-text)] mb-4">부칙</h2>
        <p className="text-[14px] sm:text-[15px] leading-[1.85] text-[var(--color-text-light)]">
          본 약관은 2026년 5월 13일부터 시행합니다.
        </p>
      </section>
    </LegalLayout>
  );
}
