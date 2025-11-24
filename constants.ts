

import { Video, VideoCategory, BlogPost, Testimonial } from './types';

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TaleemforSisters";
export const CONTACT_EMAIL = "taleemforsisters@gmail.com";

// Simple spam filter list (Demonstration purposes)
export const SPAM_WORDS = ['ফালতু', 'বাজে', 'খারাপ', 'spam', 'scam', 'fake', 'টাকা', 'casino', 'betting'];

export const SAMPLE_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'সূরা আল-কাহফের তাফসির | আধুনিক সময়ের জন্য শিক্ষা',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.QURAN,
    duration: '৪৫:২০',
    views: '১২ হাজার',
    date: '২ দিন আগে'
  },
  {
    id: '2',
    title: 'তাহারাত বা পবিত্রতা বোঝা: বোনদের জন্য নির্দেশিকা',
    thumbnail: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.FIQH,
    duration: '১৮:১৫',
    views: '৫.৪ হাজার',
    date: '১ সপ্তাহ আগে'
  },
  {
    id: '3',
    title: 'সকালের জিকির ও এর উপকারিতা',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.ADVICE,
    duration: '১২:০৫',
    views: '৮.৯ হাজার',
    date: '২ সপ্তাহ আগে'
  },
  {
    id: '4',
    title: 'ইসলামে পর্দার গুরুত্ব ও মর্যাদা',
    thumbnail: 'https://images.unsplash.com/photo-1598384746870-3e527eb6195e?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.LIFESTYLE,
    duration: '২২:৩০',
    views: '১৫ হাজার',
    date: '৩ সপ্তাহ আগে'
  },
  {
    id: '5',
    title: '৪০ হাদিস নওয়াবি - হাদিস ১: নিয়তের ওপর আমল নির্ভরশীল',
    thumbnail: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.HADITH,
    duration: '৩০:০০',
    views: '২০ হাজার',
    date: '১ মাস আগে'
  },
  {
    id: '6',
    title: 'নামাজের মধ্যে একাগ্রতা (খুশু) বৃদ্ধির ১০টি উপায়',
    thumbnail: 'https://images.unsplash.com/photo-1534955502668-288f7d27e286?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.ADVICE,
    duration: '১৫:৪৫',
    views: '৩.২ হাজার',
    date: '১ মাস আগে'
  },
  {
    id: '7',
    title: 'রমজান প্রস্তুতি: এখন থেকেই শুরু করুন',
    thumbnail: 'https://images.unsplash.com/photo-1615805787971-947266c219c7?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.LIFESTYLE,
    duration: '২৫:১০',
    views: '৮ হাজার',
    date: '১ মাস আগে'
  },
  {
    id: '8',
    title: 'সূরা আর-রহমান তিলাওয়াত ও অনুবাদ',
    thumbnail: 'https://images.unsplash.com/photo-1597935258916-3463767f23eb?q=80&w=600&auto=format&fit=crop',
    url: 'https://www.youtube.com/@TaleemforSisters/videos',
    category: VideoCategory.QURAN,
    duration: '১০:০০',
    views: '২৫ হাজার',
    date: '২ মাস আগে'
  }
];

export const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'রমজানের জন্য হৃদয়ের প্রস্তুতি',
    excerpt: 'রমজান দ্রুত এগিয়ে আসছে। এই বরকতময় মাসের জন্য আপনার আত্মাকে প্রস্তুত করার ৫টি কার্যকরী পদক্ষেপ এখানে দেওয়া হলো।',
    content: 'রমজান কেবল উপবাসের মাস নয়, এটি আত্মশুদ্ধি এবং তাকওয়া অর্জনের মাস। প্রস্তুতি শুরু করা উচিত শাবান মাস থেকেই। \n\n১. তওবা করা: অতীতের ভুলের জন্য আল্লাহর কাছে ক্ষমা চাওয়া। \n২. কুরআন তিলাওয়াত বাড়ানো: রোজার মাসে কুরআন খতমের পরিকল্পনা করা। \n৩. অতিরিক্ত নফল রোজা: শরীরকে প্রস্তুত করার জন্য শাবান মাসে কিছু রোজা রাখা। \n৪. দান-সদকা: মনের কৃপণতা দূর করতে সাহায্য করে। \n৫. দোয়ার অভ্যাস: আল্লাহর কাছে বেশি বেশি সাহায্য চাওয়া। \n\nআসুন আমরা এই রমজানকে আমাদের জীবনের সেরা রমজান হিসেবে গড়ে তুলি।',
    author: 'সিস্টার আমিনা',
    date: 'মার্চ ১০, ২০২৪',
    imageUrl: 'https://picsum.photos/id/215/800/500',
    tags: ['রমজান', 'আধ্যাত্মিকতা'],
    status: 'approved',
    viewCount: 120
  },
  {
    id: '2',
    title: 'দ্বীন ও দুনিয়ার ভারসাম্য: একজন ছাত্রীর দৃষ্টিকোণ',
    excerpt: 'বিশ্ববিদ্যালয় জীবনে কীভাবে আপনার নামাজ ও ইসলামিক পরিচয় বজায় রাখবেন, তার কিছু বাস্তব পরামর্শ।',
    content: 'আধুনিক যুগে পড়াশোনা এবং দ্বীন পালন একসাথে করা অনেক সময় চ্যালেঞ্জিং মনে হতে পারে। কিন্তু সঠিক পরিকল্পনার মাধ্যমে এটি সম্ভব। \n\nপ্রথমত, নামাজের সময়গুলোকে আপনার ক্লাসের রুটিনের সাথে মিলিয়ে নিন। \nদ্বিতীয়ত, ভালো সঙ্গ নির্বাচন করুন। আপনার বন্ধুরা আপনাকে আল্লাহর কথা মনে করিয়ে দেয় তো? \nতৃতীয়ত, হিজাব বা পর্দা নিয়ে হীনম্মন্যতায় ভুগবেন না। এটি আপনার মুকুট, আপনার পরিচয়। \nচতুর্থত, দ্বীনি ইলম অর্জনের জন্য প্রতিদিন অন্তত ১৫-২০ মিনিট সময় বরাদ্দ রাখুন। \n\nমনে রাখবেন, দুনিয়ার সাফল্য ক্ষণস্থায়ী, কিন্তু আখিরাতের সাফল্য চিরস্থায়ী।',
    author: 'সিস্টার ফাতিমা',
    date: 'ফেব্রুয়ারি ২৫, ২০২৪',
    imageUrl: 'https://picsum.photos/id/334/800/500',
    tags: ['জীবনধারা', 'শিক্ষা'],
    status: 'approved',
    viewCount: 85
  },
  {
    id: '3',
    title: 'ধৈর্যের (সবর) ফজিলত',
    excerpt: 'সবর কেবল অপেক্ষা করা নয়; এটি অপেক্ষার সময় আমাদের আচরণের ধরণ। ধৈর্যের গভীরতা অন্বেষণ।',
    content: 'আল্লাহ তায়ালা কুরআনে বলেছেন, "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।" সবর তিন প্রকার: \n১. আল্লাহর আদেশের ওপর ধৈর্য ধারণ করা। \n২. গুনাহ থেকে বেঁচে থাকার ক্ষেত্রে ধৈর্য ধারণ করা। \n৩. বিপদ-আপদে ধৈর্য ধারণ করা। \n\nজীবনের কঠিন মুহূর্তে হতাশ না হয়ে আল্লাহর ওপর ভরসা রাখাই হলো প্রকৃত মুমিনের পরিচয়।',
    author: 'উম্মে জায়েদ',
    date: 'জানুয়ারি ১৫, ২০২৪',
    imageUrl: 'https://picsum.photos/id/445/800/500',
    tags: ['চরিত্র', 'কুরআন'],
    status: 'approved',
    viewCount: 200
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: "সারা কে.",
    text: "তালিম ফর সিস্টার্স আমার জীবনে আলোর দিশারী হয়ে এসেছে। তাফসির সেশনগুলো অত্যন্ত হৃদয়স্পর্শী।",
    location: "লন্ডন, ইউকে",
    date: "পূর্বের",
    status: 'approved'
  },
  {
    id: 't2',
    name: "আয়েশা এম.",
    text: "পরামর্শগুলো কতটা বাস্তবসম্মত তা আমার খুব ভালো লাগে। এটি আধুনিক বিশ্বে আত্মবিশ্বাসের সাথে দ্বীন পালন করতে সাহায্য করে।",
    location: "টরন্টো, কানাডা",
    date: "পূর্বের",
    status: 'approved'
  },
  {
    id: 't3',
    name: "হানা আর.",
    text: "সহজ ফিকহ সিরিজটি আমার অনেক প্রশ্নের উত্তর দিয়েছে যা আমি অন্য কোথাও জিজ্ঞাসা করতে লজ্জা পেতাম।",
    location: "দুবাই, ইউএই",
    date: "পূর্বের",
    status: 'approved'
  }
];
