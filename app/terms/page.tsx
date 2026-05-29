import { LegalPage, buildLegalMetadata } from "../_components/legal-page";
import { legalDocuments } from "../_lib/site-content";

export const metadata = buildLegalMetadata(legalDocuments.terms);

export default function TermsPage() {
  return <LegalPage document={legalDocuments.terms} />;
}
