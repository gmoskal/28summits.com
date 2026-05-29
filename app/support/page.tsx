import { LegalPage, buildLegalMetadata } from "../_components/legal-page";
import { legalDocuments } from "../_lib/site-content";

export const metadata = buildLegalMetadata(legalDocuments.support);

export default function SupportPage() {
  return <LegalPage slug="support" />;
}
