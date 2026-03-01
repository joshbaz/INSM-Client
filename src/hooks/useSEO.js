import { useEffect } from 'react';

const useSEO = ({
  title,
  description,
  image = '/logo.png',
  url = window.location.href,
}) => {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = `${title} | INSM Uganda`;
    document.title = formattedTitle;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    setMetaTag('name', 'description', description);

    // 4. Update Open Graph (Facebook/LinkedIn)
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', 'website');

    // 5. Update Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // Cleanup (optional but good for SPA to revert to defaults if needed, 
    // though usually next route overwrites it)
    return () => {
      // We don't necessarily remove tags on unmount because the next 
      // component will immediately update them.
    };
  }, [title, description, image, url]);
};

export default useSEO;
