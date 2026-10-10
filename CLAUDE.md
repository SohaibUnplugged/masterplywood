# Project requirements

## Architecture and quality

- Build scalable, maintainable code with reusable components and a centralized, typed site configuration and SEO helper appropriate to the chosen framework.
- Keep page content separate from shared layouts and SEO logic. Avoid duplicate metadata implementations and unnecessary dependencies.
- Prefer static generation for public content where practical. Minimize client-side JavaScript, optimize images, reserve image dimensions, and lazy-load below-the-fold media.
- Use semantic HTML, accessible navigation, keyboard support, responsive layouts, and readable contrast.
- Run the production build and meaningful checks before handing off changes. Report any verification limitations.

## SEO defaults for every new page

- Provide a reusable SEO component/helper or framework-native metadata factory that automatically supplies canonical URLs, social metadata, and indexing defaults. Individual pages provide unique content-specific metadata.
- Maintain one authoritative public route inventory or use framework route discovery. Generate sitemap.xml from all indexable public pages; exclude admin, thank-you pages, form-submit endpoints, redirects, and error pages. Do not manually duplicate sitemap URLs.
- Generate robots.txt with an absolute Sitemap line. Disallow /admin and all actual form-submit routes. Robots directives are not access controls: protect admin and submission endpoints separately.
- Index public content by default. Apply noindex to thank-you and admin pages. Never accidentally inherit a global noindex directive in production.
- Give every content page a unique, descriptive meta title of 50–60 characters and meta description of 140–160 characters. Validate lengths and uniqueness during the build or a dedicated check.
- Set an absolute canonical URL on every rendered page using the configured production origin. Use short, readable, lowercase, hyphenated URL slugs and a consistent trailing-slash policy.
- Do not invent a production domain. Configure the real origin before deployment and prevent production builds from emitting placeholder canonical or sitemap URLs.
- Use exactly one descriptive h1 per page. Maintain heading hierarchy without skipped levels: h1, then h2, then h3 as appropriate. Choose levels by document structure rather than visual size.
- Add meaningful alt text to informative images. Use alt="" for purely decorative images. Do not stuff keywords into alt text.
- Include WebSite and Organization JSON-LD from verified business details. Include BreadcrumbList for pages with a breadcrumb hierarchy. Include FAQPage and HowTo only where matching, visible FAQ or instructional content exists; do not fabricate content or promise search rich results.
- Serialize JSON-LD safely and avoid duplicate schema entities; use stable absolute identifiers.
- Supply Open Graph and Twitter card metadata, including title, description, canonical URL, and appropriate absolute image URLs and image alt text.
- Include a favicon, the correct document lang attribute, and a viewport meta tag in the shared layout.
- Provide a helpful custom 404 page that returns HTTP 404.
- Enforce HTTPS in the production hosting configuration or trusted-proxy-aware server redirects. Preserve paths and queries, avoid redirect loops, and keep local development usable over HTTP.

## Completion checks

- Check all actual routes for metadata, canonical URLs, headings, image alternatives, and appropriate structured data.
- Verify that sitemap.xml and robots.txt use the configured origin and correct route inclusion rules.
- Verify that admin and form-submit routes are excluded as intended, and that thank-you and admin pages retain noindex.
- Check custom 404 status and production HTTPS behavior using the selected hosting platform.
- Keep these rules current as the framework, route structure, and deployment platform are selected.
