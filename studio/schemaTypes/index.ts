import { type SchemaTypeDefinition } from 'sanity'

// Page + inline sections (sections are objects embedded in Page,
// never standalone documents)
import { page } from './page'
import { hero } from './sections/hero'
import { manifesto } from './sections/manifesto'
import { featuredProducts } from './sections/featuredProducts'
import { productGrid } from './sections/productGrid'
import { collectionGrid } from './sections/collectionGrid'
import { imageText } from './sections/imageText'
import { editorialImage } from './sections/editorialImage'
import { journalGrid } from './sections/journalGrid'
import { quote } from './sections/quote'
import { testimonials } from './sections/testimonials'
import { newsletter } from './sections/newsletter'
import { cta } from './sections/cta'
import { richText } from './sections/richText'
import { textBlock } from './sections/textBlock'
import { faqList } from './sections/faqList'
import { divider } from './sections/divider'

// Referenced content + site chrome
import { product } from './product'
import { collection } from './collection'
import { journalArticle } from './journalArticle'
import { productInsider } from './productInsider'
import { journalInsider } from './journalInsider'
import { navbar } from './navbar'
import { footer } from './footer'

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  hero,
  manifesto,
  featuredProducts,
  productGrid,
  collectionGrid,
  imageText,
  editorialImage,
  journalGrid,
  quote,
  testimonials,
  newsletter,
  cta,
  richText,
  textBlock,
  faqList,
  divider,
  product,
  collection,
  journalArticle,
  productInsider,
  journalInsider,
  navbar,
  footer,
]
