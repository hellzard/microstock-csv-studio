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
  }
];
