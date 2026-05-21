import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Community Hub')
    .items([
      S.documentTypeListItem('siteStatus').title("Today's Status"),
      S.divider(),
      S.documentTypeListItem('announcement').title('Announcements'),
      S.documentTypeListItem('event').title('Events / Closures'),
      S.documentTypeListItem('video').title('Training Videos'),
    ])
