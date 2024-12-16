export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1596796867443-48bb5d2ebaa0?w=800&q=80",
    excerpt: "World leaders have reached a landmark decision on climate change policies...",
    content: `In a historic moment for global climate action, world leaders from 195 countries have reached a groundbreaking agreement at the latest Climate Summit. The landmark decision sets ambitious targets for reducing greenhouse gas emissions and establishes a framework for international cooperation in addressing climate change.

The agreement, which comes after two weeks of intense negotiations, commits nations to:
- Reduce global emissions by 50% by 2030
- Achieve carbon neutrality by 2050
- Establish a $100 billion annual fund for developing nations
- Implement strict monitoring and reporting mechanisms`,
    author: "Sarah Johnson",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Tech Giant Unveils Revolutionary AI System",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    excerpt: "A breakthrough in artificial intelligence promises to transform industries...",
    content: `A leading tech company has announced a groundbreaking artificial intelligence system that promises to revolutionize multiple industries. The new AI system, developed after years of research, demonstrates unprecedented capabilities in natural language processing and problem-solving.`,
    author: "Michael Chen",
    date: "2024-03-14"
  },
  {
    id: 3,
    title: "Space Tourism Takes Off with First Commercial Flight",
    category: "Science",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    excerpt: "Private space company launches first tourist mission to orbit...",
    content: `The era of space tourism has officially begun with the successful launch of the first commercial space flight carrying civilian passengers...`,
    author: "Emily Rodriguez",
    date: "2024-03-13"
  },
  {
    id: 4,
    title: "Major Breakthrough in Renewable Energy Storage",
    category: "Science",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    excerpt: "Scientists develop new battery technology with unprecedented capacity...",
    content: `Researchers have announced a revolutionary breakthrough in energy storage technology...`,
    author: "David Kim",
    date: "2024-03-12"
  },
  {
    id: 5,
    title: "Global Economic Forum Addresses Digital Currency",
    category: "Business",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    excerpt: "World's leading economists gather to discuss the future of digital currency...",
    content: `The annual Global Economic Forum has concluded with major announcements regarding the future of digital currencies...`,
    author: "Robert Chang",
    date: "2024-03-11"
  },
  {
    id: 6,
    title: "Revolutionary Health Monitoring Device Launched",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    excerpt: "New wearable technology promises to transform personal health monitoring...",
    content: `A groundbreaking health monitoring device has been released, offering unprecedented insights into personal health metrics...`,
    author: "Lisa Martinez",
    date: "2024-03-10"
  },
  {
    id: 7,
    title: "Historic Peace Agreement Signed in Middle East",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1447727214830-cbcbf097b52c?w=800&q=80",
    excerpt: "Long-standing regional conflicts move towards resolution...",
    content: `In a landmark moment for international diplomacy, regional leaders have signed a comprehensive peace agreement...`,
    author: "James Wilson",
    date: "2024-03-09"
  },
  {
    id: 8,
    title: "Quantum Computing Milestone Achieved",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    excerpt: "Scientists achieve quantum supremacy in groundbreaking experiment...",
    content: `Researchers have announced a major breakthrough in quantum computing, demonstrating practical quantum supremacy...`,
    author: "Alice Wong",
    date: "2024-03-08"
  },
  {
    id: 9,
    title: "Global Sports Event Sets New Viewership Record",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    excerpt: "International championship breaks all-time viewing figures...",
    content: `The latest international sports championship has shattered previous viewership records...`,
    author: "Tom Bradley",
    date: "2024-03-07"
  },
  {
    id: 10,
    title: "Breakthrough in Sustainable Agriculture",
    category: "Science",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    excerpt: "New farming technique promises to revolutionize food production...",
    content: `Agricultural scientists have developed a revolutionary farming method that could transform food production...`,
    author: "Maria Garcia",
    date: "2024-03-06"
  },
  // Adding more news items...
  {
    id: 11,
    title: "Entertainment Industry Embraces Virtual Reality",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",
    excerpt: "Major studios announce plans for VR entertainment platforms...",
    content: `The entertainment industry is undergoing a major transformation with the adoption of virtual reality technology...`,
    author: "Chris Anderson",
    date: "2024-03-05"
  },
  // Continue with more items...
  {
    id: 50,
    title: "Artificial Intelligence in Education: A New Era",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    excerpt: "AI-powered learning platforms revolutionize education sector...",
    content: `Educational institutions worldwide are adopting AI-powered learning platforms to enhance student experience...`,
    author: "Jennifer Lee",
    date: "2024-02-01"
  }
];

// Categories for filtering
export const categories = [
  "Politics",
  "Technology",
  "Science",
  "Business",
  "Health",
  "Sports",
  "Entertainment",
  "Education",
  "Environment",
  "Culture"
];