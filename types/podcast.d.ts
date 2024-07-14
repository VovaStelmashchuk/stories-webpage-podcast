export {PodcastDetails, Charter, Link};

declare global {
  interface Charter {
    time: string;
    description: string;
  }

  interface Link {
    title: string;
    link: string;
  }

  interface PodcastDetails {
    title: string;
    slug: string;
    audioUrl: string;
    charters: Charter[];
    links: Link[];
  }

  interface PodcastUpdate {
    title: string | null;
    charters: Charter[] | null;
    links: Link[] | null;
  }
}

