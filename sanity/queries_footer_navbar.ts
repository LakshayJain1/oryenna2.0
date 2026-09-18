import { groq } from 'next-sanity'

export const NAVBAR_QUERY = groq`
  *[_type == "navbar"][0] {
    title,
    announcementText,
    navLinks[] {
      label,
      url
    }
  }
`

export const FOOTER_QUERY = groq`
  *[_type == "footer"][0] {
    title,
    brandTagline,
    copyrightText,
    footerColumns[] {
      columnTitle,
      links[] {
        label,
        url
      }
    }
  }
`