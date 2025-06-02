export type ShowByUrlResponse = {
  showByUrl: {
    title: string;
    standFirst: string;
    diffusionsConnection: {
      edges: {
        node: {
          id: string;
          title: string;
          published_date: string;
          podcastEpisode: {
            playerUrl: string;
            title: string;
          };
        };
      }[];
    };
  };
};
