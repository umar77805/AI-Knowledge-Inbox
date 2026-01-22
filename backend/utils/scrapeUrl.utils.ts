import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('script').remove();
    $('style').remove();

    return $('body').text().replace(/\s+/g, ' ').trim().substring(0, 10000); // Limit to 10k chars for simplicity
  } catch (error: any) {
    console.error("Scraping failed:", error.message);
    return null;
  }
}