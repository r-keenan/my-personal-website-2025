// Qualifications
export const qualificationsPreviewQuery = `*[_type == "qualification"] | order(order)`;

// Posts
export const postsPreviewQuery = `*[_type == "post" && !(_id in path('drafts.**'))] {
  slug, title, excerpt, dateTime, publishedAt, readingTime,  "author": author->name, mainImage, _id, createdAt
} | order(publishedAt desc)`;

export const fullPostQuery = `*[_type == "post" && slug.current == $slug][0]`;
