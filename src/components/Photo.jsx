import imageSizes from '../image-sizes.json';

export function Photo({ name, alt, className = '', hero = false, sizes = '(max-width: 759px) 100vw, 50vw' }) {
  const { widths, ratio } = imageSizes[name];
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}images/${name}-${widths[1]}.webp`}
      srcSet={widths.map((width) => `${import.meta.env.BASE_URL}images/${name}-${width}.webp ${width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={ratio[0]}
      height={ratio[1]}
      loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
