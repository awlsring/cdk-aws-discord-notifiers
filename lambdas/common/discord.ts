import fetch from 'node-fetch';

export enum EmbedColor {
  Green = 0x00ff00,
  Red = 0xff0000,
  Blue = 0x0000ff,
  Yellow = 0xffff00,
  Orange = 0xffa500,
}

export enum EmbedType {
  Rich = 'rich',
  Image = 'image',
  Video = 'video',
  GIFV = 'gifv',
  Article = 'article',
  Link = 'link',
}

export interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface Embed {
  title?: string;
  type?: EmbedType;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

export interface WebhookMessage {
  readonly content?: string;
  readonly username?: string;
  readonly avatar_url?: string;
  readonly tts?: boolean;
  readonly embeds?: Embed[];
}

export async function sendDiscordWebhookMessage(webhook: string, message: WebhookMessage) {
  return fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}