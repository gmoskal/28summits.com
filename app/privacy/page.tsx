import { LegalPage, buildLegalMetadata } from "../_components/legal-page";
import { legalDocuments } from "../_lib/site-content";

export const metadata = buildLegalMetadata(legalDocuments.privacy);

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
