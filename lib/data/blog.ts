import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "mastering-microstock-metadata-seo",
    title: "Mastering Microstock Metadata for Max Visibility",
    excerpt: "Learn how to write titles and tags that agencies love. Understand how search engines on Shutterstock and Adobe Stock rank your images.",
    content: `
# Mastering Microstock Metadata for Maximum Visibility

When you upload an image to a microstock agency like Shutterstock, Adobe Stock, or Getty Images, you aren't just selling art—you're selling a solution to a designer's problem. And how do designers find your solution? Through search.

Your metadata (titles and keywords) is the bridge between your portfolio and the buyer's wallet. In this guide, we'll explore how to optimize your metadata to rank higher and sell more.

## The Anatomy of a Perfect Title
A good title is descriptive, literal, and uses natural language. Don't stuff keywords here!
- **Bad:** \`dog happy jumping grass summer fun pet animal\`
- **Good:** \`A happy Golden Retriever dog jumping to catch a frisbee in a sunny park\`

## Keyword Strategy: The 50-Tag Rule
Most agencies allow up to 50 keywords. Should you use them all? Yes, but only if they are relevant. Irrelevant keywords will lower your conversion rate, which hurts your search ranking long-term.

1. **Literal Elements:** What is in the picture? (e.g., dog, tree, park)
2. **Conceptual Elements:** What does it represent? (e.g., happiness, freedom, summer)
3. **Technical Elements:** How was it shot? (e.g., macro, isolated on white, copy space)

## Avoiding Trademark Rejections
Agencies are incredibly strict about commercial trademarks. A single word like "iPhone", "Lego", or "Disney" in your tags will result in an immediate rejection. Use BuatinCSV's real-time Policy Linter to catch these before you export!

Start optimizing your portfolio today and watch your downloads soar!
    `,
    date: "2026-08-01",
    tags: ["Metadata", "SEO", "Shutterstock", "Adobe Stock"],
    author: "BuatinCSV Team"
  },
  {
    id: "2",
    slug: "streamline-csv-uploads-agencies",
    title: "How to Streamline CSV Uploads to Multiple Agencies",
    excerpt: "Stop copying and pasting tags. Here's a complete workflow to generate, validate, and upload CSVs to 5 different agencies in under 10 minutes.",
    content: `
# How to Streamline CSV Uploads to Multiple Agencies

If you are a serious microstock contributor, you know that uploading the same batch of 50 images to five different agencies can take hours. The tedious process of copy-pasting titles, selecting categories, and ticking the "Generative AI" box is the biggest bottleneck to scaling your income.

## The Old Way vs The New Way

**The Old Way:**
1. Upload images to Agency A. Wait 20 minutes.
2. Select each image. Type the title. Type 50 keywords. Select categories. Submit.
3. Repeat for Agency B, C, D, and E.
*Total time: 3 hours.*

**The New Way (Using CSVs):**
1. Enter your metadata ONCE into a unified spreadsheet or tool like BuatinCSV.
2. Export perfectly formatted CSV files for each specific agency.
3. Upload your images and the CSV via FTP.
4. Click Submit.
*Total time: 10 minutes.*

## Understanding Agency CSV Variations
The main reason people avoid CSVs is because every agency requires a different format:
- **Shutterstock:** Requires 'Categories' as numbers (1-21) or specific strings.
- **Adobe Stock:** Just needs filename, title, and keywords. Very simple.
- **Vecteezy:** Has strict rules about the 'License' column.

## Automate the Translation
By using an automated tool, you just write your tags once. BuatinCSV automatically maps your unified data to the exact column headers, delimiters, and encodings required by each specific agency. It even translates your local tags into English!

Stop wasting time on data entry and spend more time creating assets.
    `,
    date: "2026-08-02",
    tags: ["Workflow", "Productivity", "FTP", "CSV"],
    author: "BuatinCSV Team"
  },
  {
    id: "3",
    slug: "exif-metadata-embedded-jpg",
    title: "EXIF Data Explained: Embed Metadata Directly into JPGs",
    excerpt: "Why rely on agency websites to read your tags? Learn how to embed IPTC and EXIF metadata directly into your image files before uploading.",
    content: `
# EXIF Data Explained: Embed Metadata Directly into JPGs

When you upload a photo to an agency, how does it automatically know the title and keywords you want to use? The answer is embedded metadata.

## What is EXIF and IPTC?
- **EXIF (Exchangeable Image File Format):** Traditionally used by cameras to store technical data like ISO, shutter speed, and aperture.
- **IPTC (International Press Telecommunications Council):** Used by photojournalists and stock contributors to store editorial data, copyright info, titles, descriptions, and keywords.

When microstock contributors say they are "embedding EXIF", they usually mean they are writing IPTC data into the JPG file header.

## Why You Should Embed Metadata
If you don't embed metadata, you are forced to type your keywords manually on every single agency website you use. This is incredibly inefficient. 
By embedding the data directly into the file:
1. **It's Portable:** The keywords travel with the file. You can upload the same file to Shutterstock, Adobe Stock, and Alamy, and they will all read the tags automatically.
2. **It's Safe:** If an agency's database crashes, your original file still contains all the descriptive data.
3. **It's Fast:** You do the work once, on your own computer, using your preferred tools.

## How to Embed Metadata
You can use heavy desktop software like Adobe Lightroom or Photo Mechanic, but what if you're working from a browser or a Chromebook?

That's where **BuatinCSV** comes in. Our platform doesn't just generate CSV spreadsheets; it has a built-in EXIF injector. You can select your processed JPGs, and with one click, BuatinCSV will seamlessly write your optimized titles and keywords directly into the image files using the \`piexifjs\` engine—all without leaving your browser!

Take control of your files today.
    `,
    date: "2026-08-03",
    tags: ["EXIF", "IPTC", "JPG", "Metadata"],
    author: "BuatinCSV Team"
  },
  {
    id: "4",
    slug: "translating-metadata-non-english-markets",
    title: "Translating Metadata: Selling in Non-English Markets",
    excerpt: "Don't limit your sales to English-speaking buyers. Discover why hyper-localizing your keywords can unlock massive earnings in Europe and Asia.",
    content: `
# Translating Metadata: Selling in Non-English Markets

English is the undisputed language of the internet, and nearly every major microstock agency expects you to submit your primary metadata in English. But what if the buyer searching for your image doesn't speak English?

## The Hidden Market
While global agencies automatically translate English keywords into other languages for their buyers (e.g., translating "dog" to "perro" for Spanish users), the automatic translation is often flawed. It misses cultural nuances, slang, and specific regional search terms.

Furthermore, there are massive regional agencies (like Pixta in Japan, or specific European stock sites) where native language metadata is either required or heavily prioritized in the search algorithm.

## How to Hyper-Localize Your Keywords
If you want to capture the Asian or European market, you need to provide accurate, localized metadata.
But hiring a translator for a batch of 1,000 photos is too expensive.

**The Solution:**
You need a workflow that automatically translates your base metadata into multiple languages while retaining the context of stock photography. 

With **BuatinCSV**, we've integrated real-time translation tools powered by the MyMemory API. You can write your keywords in your native language (e.g., Indonesian or Spanish), and the tool will instantly translate them into perfect English for Shutterstock, while also giving you the option to export localized CSVs for regional agencies.

Stop leaving money on the table. Speak your buyer's language!
    `,
    date: "2026-08-03",
    tags: ["Translation", "Localization", "Keywords", "Sales"],
    author: "BuatinCSV Team"
  }
];
