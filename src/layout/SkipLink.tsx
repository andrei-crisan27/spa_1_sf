import { SECTION_IDS } from '@/config/constants';
import { uiText } from '@/content/common';

export function SkipLink() {
  return (
    <a
      href={`#${SECTION_IDS.main}`}
      onClick={(event) => {
        event.preventDefault();
        document.getElementById(SECTION_IDS.main)?.focus();
      }}
      className="fixed left-4 top-4 z-modal -translate-y-24 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-lift transition-transform focus:translate-y-0"
    >
      {uiText.skipLink}
    </a>
  );
}
