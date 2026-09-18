import { type schemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { shopPage } from './shopPage'
import { aboutPage } from './aboutPage'
import { contactPage } from './contactPage'
import { privacyPolicyPage } from './privacyPolicyPage'
import { termsPage } from './termsPage'
import { shippingPage } from './shippingPage'
import { returnsPage } from './returnsPage'
import { faqPage } from './faqPage'
import { faqSection } from './faqSection'
import { heroSection } from './heroSection'
import { productGrid } from './productGrid'
import { collectionGrid } from './collectionGrid'
import { imageText } from './imageText'
import { editorialSection } from './editorialSection'
import { testimonialSection } from './testimonialSection'
import { newsletterSection } from './newsletterSection'
import { richTextSection } from './richTextSection'
import { ctaSection } from './ctaSection'
import { product } from './product'
import { collection } from './collection'
import { journalArticle } from './journalArticle'
import { productInsider } from './productInsider'
import { journalInsider } from './journalInsider'
import { moodRecommendation } from './moodRecommendation'
import { complimentarySample } from './complimentarySample'
import { siteSettings } from './siteSettings'
import { navbar } from './navbar'
import { footer } from './footer'

export const schemaTypes: schemaTypeDefinition[] = [
  homePage,
  shopPage,
  aboutPage,
  contactPage,
  privacyPolicyPage,
  termsPage,
  shippingPage,
  returnsPage,
  faqPage,
  faqSection,
  heroSection,
  productGrid,
  collectionGrid,
  imageText,
  editorialSection,
  testimonialSection,
  newsletterSection,
  richTextSection,
  ctaSection,
  product,
  collection,
  journalArticle,
  productInsider,
  journalInsider,
  moodRecommendation,
  complimentarySample,
  siteSettings,
  navbar,
  footer,
]