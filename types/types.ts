interface FrontMatterInterface{
    title: string,
    description: string ,
    date: string  ,
    thumbnail: string 
}

interface BlogPost {
  slug: string;
  frontMatter: FrontMatterInterface;
  mdContent: string;
}