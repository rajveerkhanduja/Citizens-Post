const cardData = [
    {
      title: "Postal Network Reimagined",
      count: 1234567,
      lastUpdated: "Last updated 23 days ago",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
    },
    {
      title: "Mails",
      count: 987654,
      lastUpdated: "Last updated 10 days ago",
      data: {
        labels: ["July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
    },
    // Add more cards as needed...
  ];
  
  export default cardData;