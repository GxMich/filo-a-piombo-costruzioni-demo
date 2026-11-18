// Titolo diviso in parole per l'ingresso animato. Gli spazi restano nel testo: la lettura assistita non cambia.
export function Split({ as: Tag = 'h2', text, className = '', css = false, ...props }) {
  const words = text.split(' ');
  return (
    <Tag className={`split ${css ? 'split-css' : ''} ${className}`} data-split={css ? undefined : ''} {...props}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="w"><span className="wi" style={css ? { '--i': i } : undefined}>{word}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
