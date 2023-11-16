import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    return rss({
        title: "Joshua Rotimi's Blog",
        description: "I write about web development (mostly Frontend).",
        site: context.site?.toString() || "https://www.joshuarotimi.vercel.app",
        items: posts.map(post => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/blog/${post.slug}`,
            content: sanitizeHtml(parser.render(post.body))
        }))
    });
}