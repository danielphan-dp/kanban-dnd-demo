export const sampleData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-2", "column-3", "column-1"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "To-do Column",
          cardOrder: [
            "card-1",
            "card-2",
            "card-3",
            "card-4",
            "card-5",
            "card-6",
            "card-7",
          ],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 1",
              cover:
                "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113__340.jpg",
            },
            {
              id: "card-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 2",
              cover:
                "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg",
            },
            {
              id: "card-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 3",
              cover:
                "https://cdn.pixabay.com/photo/2011/12/14/12/17/galaxy-11098__340.jpg",
            },
            {
              id: "card-4",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 4",
              cover: null,
            },
            {
              id: "card-5",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 5",
              cover: null,
            },
            {
              id: "card-6",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 6",
              cover: null,
            },
            {
              id: "card-7",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card 7",
              cover: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "In-progress Column",
          cardOrder: ["card-8", "card-9", "card-10"],
          cards: [
            {
              id: "card-8",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card 8",
              cover:
                "https://cdn.pixabay.com/photo/2020/03/15/18/56/universe-4934650_960_720.jpg",
            },
            {
              id: "card-9",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card 9",
              cover:
                "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
            },
            {
              id: "card-10",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card 10",
              cover: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Done Column",
          cardOrder: ["card-11", "card-12", "card-13"],
          cards: [
            {
              id: "card-11",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of card 11",
              cover: null,
            },
            {
              id: "card-12",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of card 12",
              cover: null,
            },
            {
              id: "card-13",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of card 13",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
