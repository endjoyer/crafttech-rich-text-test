import { ForwardedRef, forwardRef } from 'react';

interface HtmlTextProps {
  html: string;
  id: string;
}

export const HtmlText = forwardRef(
  ({ html, id }: HtmlTextProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        id={`htmltext_${id}`}
        dangerouslySetInnerHTML={{ __html: html }}
        className="html-text"
        ref={ref}
      />
    );
  }
);

HtmlText.displayName = 'HtmlText';
